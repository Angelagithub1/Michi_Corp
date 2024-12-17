class Mapa extends Phaser.Scene {
    constructor() {
        super( {key: "Mapas"}); // Nombre de la escena
    }

    preload() {

         // Botones con 3 estado
         this.load.image("Mapa_fondo","assets/Mapas/fondo.png")

         this.load.image('Boton_atras_normal', 'assets/Interfaces montadas/volver/normal.png');
         this.load.image('Boton_atras_encima', 'assets/Interfaces montadas/volver/seleccionado.png');
         this.load.image('Boton_atras_pulsado', 'assets/Interfaces montadas/volver/pulsado.png');

         this.load.image('Descampado_normal', 'assets/Mapas/mapas_botones/Descampado/normal.png');
         this.load.image('Descampado_seleccionado', 'assets/Mapas/mapas_botones/Descampado/seleccion.png');
         this.load.image('Descampado_presionado', 'assets/Mapas/mapas_botones/Descampado/pulsado.png');

         this.load.image('JuegoMesa_normal', 'assets/Mapas/mapas_botones/Juedo de mesa/normal.png');
         this.load.image('JuegoMesa_seleccionado', 'assets/Mapas/mapas_botones/Juedo de mesa/seleccionado.png');
         this.load.image('JuegoMesa_presionado', 'assets/Mapas/mapas_botones/Juedo de mesa/pulsado.png');

         this.load.image('Vortice_normal', 'assets/Mapas/mapas_botones/Vortice/bloqueado.png');
         this.load.image('Vortice_seleccionado', 'assets/Mapas/mapas_botones/Vortice/seleccionado.png');
    }

    create() {
        // Escala y centra el fondo
        const backgroundC = this.add.image(this.scale.width / 2, this.scale.height / 2, 'Mapa_fondo');
        backgroundC.setScale(
            Math.max(this.scale.width / backgroundC.width, this.scale.height / backgroundC.height)
        );
        
        let mapaElegido = null; 
    
        // MAPA DESCAMPADO
        const DescampadoButton = this.add.image(config.width / 6, config.height / 2, 'Descampado_normal')
            .setInteractive()
            .setScale(0.7);
    
        DescampadoButton.on('pointerover', () => {
            DescampadoButton.setTexture('Descampado_seleccionado');
        });
    
        DescampadoButton.on('pointerout', () => {
            DescampadoButton.setTexture('Descampado_normal');
        });
    
        DescampadoButton.on('pointerdown', () => {
            DescampadoButton.setTexture('Descampado_presionado');
        });
    
        DescampadoButton.on('pointerup', async () => {
            DescampadoButton.setTexture('Descampado_normal');
            mapaElegido = 'Descampado';
            
            this.nuevaPartida(mapaElegido).then((partida) => {
                localStorage.setItem('partida', JSON.stringify(partida));
                console.log('Partida guardada en localStorage:', partida);
                this.scene.start('Mapa1_online');
            }).catch((error) => {
                console.error('Error al crear la partida:', error.message);
            });
        });

    
        // MAPA JUEGO DE MESA
        const JuegoMButton = this.add.image(config.width / 2, config.height / 2, 'JuegoMesa_normal')
            .setInteractive()
            .setScale(0.7);
    
        JuegoMButton.on('pointerover', () => {
            JuegoMButton.setTexture('JuegoMesa_seleccionado');
        });
    
        JuegoMButton.on('pointerout', () => {
            JuegoMButton.setTexture('JuegoMesa_normal');
        });
    
        JuegoMButton.on('pointerdown', () => {
            JuegoMButton.setTexture('JuegoMesa_presionado');
        });
    
        JuegoMButton.on('pointerup', async () => {
            JuegoMButton.setTexture('JuegoMesa_normal');
            mapaElegido = 'Mesa';
            
            this.nuevaPartida(mapaElegido).then((partida) => {
                localStorage.setItem('partida', JSON.stringify(partida));
                console.log('Partida guardada en localStorage:', partida);
                this.scene.start('Mapa2_online');
            }).catch((error) => {
                console.error('Error al crear la partida:', error.message);
            });
        });
    
        // BOTÓN DE RETROCEDER
        const backButton = this.add.image(0, 700, 'Boton_atras_normal')
            .setOrigin(0, 1)
            .setInteractive()
            .setScale(0.7);
    
        backButton.on('pointerover', () => {
            backButton.setTexture('Boton_atras_encima');
        });
    
        backButton.on('pointerout', () => {
            backButton.setTexture('Boton_atras_normal');
        });
    
        backButton.on('pointerdown', () => {
            backButton.setTexture('Boton_atras_pulsado');
        });
    
        backButton.on('pointerup', async () => {
            backButton.setTexture('Boton_atras_normal');
            mapaElegido = 'Vortice';
            
            this.nuevaPartida(mapaElegido).then((partida) => {
                localStorage.setItem('partida', JSON.stringify(partida));
                console.log('Partida guardada en localStorage:', partida);
                this.scene.start('MenuPrincipal');
            }).catch((error) => {
                console.error('Error al crear la partida:', error.message);
            });
        });
    }

    async getPlayers() {
        try {
            // Corregir la URL entre comillas
            const response = await fetch("/api/users");
            
            // Manejar el error de conexión si el código de respuesta es diferente a 200
            this.mostrarErrorConexionServidor(response.status);
            
            // Devolver la respuesta como JSON
            return await response.json();
        } catch (error) {
            // Manejar errores de red o del servidor
            console.error("Error al obtener los jugadores:", error.message);
            return null;
        }
    }

    async nuevaPartida(mapaElegido) {
        try {
            // Crear la fecha actual
            const newDate = new Date();
    
            // Crear el objeto con los datos del juego
            const gameData = {
                id: 0,
                mapType: mapaElegido,
                startTime: newDate.toISOString(),
                endTime: null,
                winner: null,
                loser: null,
                listUsuarios: await this.getPlayers()  // Asegúrate de que getPlayers funcione correctamente
            };
    
            console.log(gameData);
    
            // Hacer la solicitud POST para crear la partida
            const response = await fetch("/api/games", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(gameData)  // Convertir el objeto a JSON
            });
    
            // Manejar el error de la respuesta
            this.mostrarErrorConexionServidor(response.status);
    
            // Procesar la respuesta JSON
            const newGame = await response.json();
            console.log('Partida creada:', newGame);
    
            // Obtener la ID del juego creado para usarla más tarde
            const gameID = newGame.id;
            localStorage.setItem('gameID', gameID);
            console.log('ID de la partida guardada en localStorage:', gameID);
    
            // Retornar los datos del nuevo juego
            return newGame;
        } catch (error) {
            // Manejar errores de red o del servidor
            console.error("Error al crear la partida:", error.message);
            return null;
        }
    }
    

    mostrarErrorConexionServidor(status) {
        const httpErrors = [
            500, // Internal Server Error
            501, // Not Implemented
            502, // Bad Gateway
            503, // Service Unavailable
            504  // Gateway Timeout
        ];
        if (httpErrors.includes(status)) {
            alert("Se ha perdido la conexión con el servidor");
            // Redirige a una página HTML que tiene tu menú
            window.location.href = "menu_principal.html"; // Página que contiene el menú
        }
    }

    

    
}