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
        const players = this.registry.get('players');
        const jugadorA = this.registry.get('jugadorA');
        const jugadorB = this.registry.get('jugadorB');
        const puntosA = this.registry.get('puntuacionA');
        const puntosB = this.registry.get('puntuacionB');
        const gameID = this.registry.get('gameID');
    
        let ganador = '';
        let perdedor = '';
        const tiempoFinal = new Date().toISOString();

        const music = this.sound.add("sonidoVictoria", { loop: false, volume: 0.3 });
        music.play();
        
        let fondoKey = '';
        let mensaje = '';
    
        if (puntosA > puntosB) {
            fondoKey = 'fondo_victoria_gatoA';  // Gato A gana
            mensaje = "¡"+ jugadorA.username + 'gana!';
            ganador = jugadorA;
            perdedor = jugadorB;
        } else if (puntosA < puntosB) {
            fondoKey = 'fondo_victoria_gatoB';  // Gato B gana
            mensaje = "¡" + jugadorB.username + 'gana!';;
            ganador = jugadorB;
            perdedor = jugadorA;
        } else {
            fondoKey = 'fondo_empate';  // Empate
            mensaje = '¡Es un empate!';
            ganador = 'empate';
            perdedor = 'empate';
        }   

        const datosGanador = players.find(player => player.id === ganador);
        const datosPerdedor = players.find(player => player.id === perdedor);
    
        this.actualizarJugador(datosGanador, puntosA > puntosB ? puntosA : puntosB);
        this.actualizarJugador(datosPerdedor, puntosA < puntosB ? puntosA : puntosB);
    
        this.actualizarPartida(gameID, ganador, perdedor, tiempoFinal, players);

        // Asignar fondo correspondiente
        this.add.image(370, 200, fondoKey).setOrigin(0.29).setScale(0.75);

        // Mostrar mensaje
        this.add.text(650, 50, mensaje, {
            font: '45px Arial',
            color: '#000000',
        }).setOrigin(0.5);
   
        // Mostrar puntuaciones
        this.add.text(200, 100, `Gato A: ${puntosA}\nGato B: ${puntosB}`, {
            font: '45px Arial',
            color: '#000000',
            align: 'center',
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
    
    async actualizarJugador(jugador, newScore) {
        const newUserData = {
            username: jugador.username,
            password: jugador.password,
            score: newScore
        };
    
        const response = await fetch(`http://localhost:8080/api/users/${jugador.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUserData)
        });
    
        if (!response.ok) {
            throw new Error('Error al actualizar el jugador');
        }
    
        console.log('Jugador actualizado:', await response.json());
    }
    
    async actualizarPartida(gameID, ganador, perdedor, tiempoFinal, players) {
        const newGameData = {
            mapType: this.registry.get('mapaElegido'),
            endTime: tiempoFinal,
            winner: ganador,
            loser: perdedor,
            listUsuarios: players.map(player => player.id)
        };
    
        const response = await fetch(`http://localhost:8080/api/games/${gameID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newGameData)
        });
    
        if (!response.ok) {
            throw new Error('Error al actualizar la partida');
        }
    
        console.log('Partida actualizada:', await response.json());
    }
}   
