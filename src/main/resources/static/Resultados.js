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
        const partida = localStorage.getItem('gameData');

        console.log('ID de la partida guardada en localStorage:', id);
        console.log('La partida guardada en localStorage:', partida);

        if (!id) {
            console.error('No se encontró gameID en localStorage');
            return;
        }
        const music = this.sound.add("sonidoVictoria", { loop: false, volume: 0.3 });
        music.play();
        
        let fondoKey = '';
        let mensaje = '';
        let empate = 'Ninguno';
    
        if (puntosA > puntosB) {
            fondoKey = 'fondo_victoria_gatoA';  // Gato A gana
            const id = localStorage.getItem('gameID');
            this.getPlayersByGameID(id).then((jugadores)  => {
                if (jugadores && jugadores.length >= 2) {
                    this.nombreA = this.add.text(280, 100, jugadores[0].username, { font: "45px Arial", color: "black" });
                    this.nombreB = this.add.text(880, 100, jugadores[1].username, { font: "45px Arial", color: "black" });
                } else {
                    console.error('No se encontraron jugadores para este gameID');
                }

                
                this.actualizarJugador(jugadores[0],puntosA)
                this.actualizarJugador(jugadores[1],puntosB)
                this.getGameByID(id).then((p) => {
                    this.actualizarPartida(p);
    
                });

                }).catch((error) => {
                
                console.error('Error al crear la partida:', error.message);

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
                
                this.actualizarJugador(jugadores[0],puntosA)
                this.actualizarJugador(jugadores[1],puntosB)
                this.getGameByID(id).then((p) => {
                    this.actualizarPartida(p);
    
                });
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
    
                this.actualizarJugador(jugadores[0],puntosA)
                this.actualizarJugador(jugadores[1],puntosB)
                this.getGameByID(id).then((p) => {
                    this.actualizarPartida(p);
    
                });

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
        return response.json();
    } catch (error) {
        // Manejar cualquier error de la consulta
        console.error('Error en la consulta al servidor:', error.message);
        return null;
    }
}
async getGameByID(gameID) {
    try {
        
        // Usar backticks para interpolar la variable gameID en la URL
        const response = await fetch(`/api/games/${gameID}`);
        
        // Verificar si la respuesta es correcta
        this.mostrarErrorConexionServidor(response.status);

        // Retornar la respuesta en formato JSON
        return response.json();
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

        const username = jugador.username;  
    
        const response = await fetch(`/api/users/${username}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUserData)
        });
        this.mostrarErrorConexionServidor(response.status);
        console.log('Jugador actualizado:', newUserData);
    } catch (error) {
        // Manejar errores de red o del servidor
        console.error("Error al actualizar jugador:", error.message);
        return null;
    }
    }
    
    async actualizarPartida(partida) {
        try{
            const newDate = new Date();
            const j1 = partida.listUsuarios[0];
            const j2 = partida.listUsuarios[1];

            let ganador = "";
            let perdedor = "";

            if(j1.score > j2.score){
                ganador = j1.username;
                perdedor = j2.username;
            } else if (j1.score < j2.score) {
                ganador = j2.username;
                perdedor = j1.username;
            } else {
                ganador = "Ninguno";
                perdedor = "Ninguno";
            }


            const newGameData = {
                id: partida.id,
                mapType: partida.mapType,
                startTime: partida.startTime,
                endTime: newDate.toISOString(),
                winner: ganador,
                loser: perdedor,
                listUsuarios: partida.listUsuarios
            };

            const gameID = partida.id;  
        
            const response = await fetch(`/api/games/${gameID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newGameData)
            });
            this.mostrarErrorConexionServidor(response.status);
        
            console.log('Partida actualizada: ', newGameData);
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
            this.scene.start('MenuPrincipal');
        } 
    }
}   
