class ResultScreen extends Phaser.Scene {
    constructor() {
        super('ResultScreen');
    }

    preload() {
        // Cargar fondos para victoria y empate dependiendo del gato
        this.load.image('fondo_victoria_gatoA', 'assets/victoria_derrota_empate/victoria_derrota_1.png');
        this.load.image('fondo_victoria_gatoB', 'assets/victoria_derrota_empate/victoria_derrota_2.png');

        // Fondo de empate
        this.load.image('fondo_empate', 'assets/victoria_derrota_empate/empate.png');

        // Botones
        this.load.image('Boton_continuar_normal', 'assets/Interfaces montadas/continuar/normal.png');
        this.load.image('Boton_continuar_encima', 'assets/Interfaces montadas/continuar/seleccionado.png');
        this.load.image('Boton_continuar_pulsado', 'assets/Interfaces montadas/continuar/pulsado.png');

        this.load.audio("sonidoVictoria", "assets/musica/Victoria.mp3");
    }

    create() {
    
        const id = localStorage.getItem('gameID');
        const partida = localStorage.getItem('newGame');

        if (!id) {
            console.error('No se encontró gameID en localStorage');
            return;
        }
        const music = this.sound.add("sonidoVictoria", { loop: false, volume: 0.3 });
        music.play();
        
        let fondoKey = '';
        let mensaje = '';
    
        if (puntosA > puntosB) {
            fondoKey = 'fondo_victoria_gatoA';  // Gato A gana
            this.getPlayersByGameID(id).then((jugadores) => {
                if (jugadores && jugadores.length >= 2) {
                    this.nombreA = this.add.text(280, 100, jugadores[0].username, { font: "45px Arial", color: "black" });
                    this.nombreB = this.add.text(880, 100, jugadores[1].username, { font: "45px Arial", color: "black" });
                } else {
                    console.error('No se encontraron jugadores para este gameID');
                }

                }).catch((error) => {
                console.error('Error al crear la partida:', error.message);
                this.actualizarPartida(id,partida,this.nombreA,this.nombreB)
                this.actualizarJugador(this.nombreA,puntosA)
                this.actualizarJugador(this.nombreB,puntosB)
            });

                mensaje = "¡GANADOR!" ;

        } else if (puntosA < puntosB) {
            fondoKey = 'fondo_victoria_gatoB';  // Gato B gana
            this.getPlayersByGameID(id).then((jugadores) => {
                if (jugadores && jugadores.length >= 2) {
                    this.nombreA = this.add.text(280, 100, jugadores[0].username, { font: "45px Arial", color: "black" });
                    this.nombreB = this.add.text(880, 100, jugadores[1].username, { font: "45px Arial", color: "black" });
                } else {
                    console.error('No se encontraron jugadores para este gameID');
                }
                console.error("Se ha guardado este nombres:", this.nombreA);
                console.error("Se ha guardado estos nombres:", this.nombreB);
                this.actualizarPartida(id, partida,this.nombreB,this.nombreA)
                this.actualizarJugador(this.nombreA,puntosA)
                this.actualizarJugador(this.nombreB,puntosB)
                }).catch((error) => {
                console.error('Error al crear la partida:', error.message);
            });
            mensaje = "¡GANADOR!" ;
        } else {
            fondoKey = 'fondo_empate';  // Empate
            this.getPlayersByGameID(id).then((jugadores) => {
                if (jugadores && jugadores.length >= 2) {
                    this.nombreA = this.add.text(280, 100, jugadores[0].username, { font: "45px Arial", color: "black" });
                    this.nombreB = this.add.text(880, 100, jugadores[1].username, { font: "45px Arial", color: "black" });
                } else {
                    console.error('No se encontraron jugadores para este gameID');
                }
                this.actualizarPartida(id,partida,this.empate,this.empate)
                this.actualizarJugador(this.nombreA,puntosA)
                this.actualizarJugador(this.nombreB,puntosB)
                }).catch((error) => {
                console.error('Error al crear la partida:', error.message);
            });
            mensaje = "¡EMPATE!" ;
        }   

        // Asignar fondo correspondiente
        this.add.image(370, 200, fondoKey).setOrigin(0.29).setScale(0.75);

        // Mostrar mensaje
        this.add.text(650, 50, mensaje, {
            font: '45px Arial',
            color: '#000000',
        }).setOrigin(0.5);
   
   
        // Botón para volver al inicio del juego
        // Botón de continuar
        const nextButton = this.add.image(1200, 700, 'Boton_continuar_normal').setOrigin(1, 1).setInteractive().setScale(0.7)
   
        nextButton.on('pointerover', () => {
            nextButton.setTexture('Boton_continuar_encima');
        });
   
        nextButton.on('pointerout', () => {
            nextButton.setTexture('Boton_continuar_normal');
        });
   
        nextButton.on('pointerdown', () => {
            nextButton.setTexture('Boton_continuar_pulsado');
        });
   
        nextButton.on('pointerup', () => {
            nextButton.setTexture('Boton_continuar_normal');
            this.scene.start('MenuPrincipal'); // Vuelve al menú principal
        });
    }
    async getPlayersByGameID(gameID) {
    try {
        // Usar backticks para interpolar la variable gameID en la URL
        const response = await fetch(`/api/games/players/game/${gameID}`);
        
        // Verificar si la respuesta es correcta
        this.mostrarErrorConexionServidor(response.status);

        // Retornar la respuesta en formato JSON
        return await response.json();
    } catch (error) {
        // Manejar cualquier error de la consulta
        console.error('Error en la consulta al servidor:', error.message);
        return null;
    }
}
    
    async actualizarJugador(jugador, newScore) {
        try{
        const newUserData = {
            id : jugador.id,
            username: jugador.username,
            password: jugador.password,
            score: newScore
        };
    
        const response = await fetch(`/api/users/${username}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(username, newUserData)
        });
        this.mostrarErrorConexionServidor(response.status);
        console.log('Jugador actualizado:', await response.json());
    } catch (error) {
        // Manejar errores de red o del servidor
        console.error("Error al actualizar jugador:", error.message);
        return null;
    }
    }
    
    async actualizarPartida(id,partida,nombreW,nombreP) {
        try{
            const newGameData = {
                id: partida.id,
                mapType: partida.mapType,
                startTime: partida.startTime,
                endTime: newDate.toISOString(),
                winner: nombreW,
                loser: nombreP,
                listUsuarios: partida.listUsuarios
            };
        
            const response = await fetch(`/api/games/${gameID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(id,newGameData)
            });
            this.mostrarErrorConexionServidor(response.status);
        
            console.log('Partida actualizada:', await response.json());
        } catch (error) {
            // Manejar errores de red o del servidor
            console.error("Error al actualizar la partida:", error.message);
            return null;
        }
        }
    mostrarErrorConexionServidor(status){
        const httpErrors = [
            500, // Internal Server Error
            501, // Not Implemented
            502, // Bad Gateway
            503, // Service Unavailable
            504 // Gateway Timeout
        ];
        if(httpErrors.includes(status)) { 
            alert("Se ha perdido la conexión con el servidor");
            window.location.href = "MenuPrincipal.js";
        } 
    }
}   
