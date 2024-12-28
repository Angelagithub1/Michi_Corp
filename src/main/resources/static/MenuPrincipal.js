class MenuPrincipal extends Phaser.Scene {
    constructor() {
        super( {key: "MenuPrincipal"});
        this.time = new Phaser.Time.Clock();
        this.connectedUsers = [];
        this.serverActive = false;
        this.threshold = 5000;
    }

    // Función preload para cargar recursos antes de iniciar el juego
    preload() {
        this.load.image("fondo", "assets/Pantalla_inicio/fondo_inicio.png"); // Fondo del menú

        // Botones con tres imágenes para cada uno: normal, seleccionado y pulsado
        this.load.image("botonInicioNormal", "assets/Pantalla_inicio/jugar/Normal.png");
        this.load.image("botonInicioEncima", "assets/Pantalla_inicio/jugar/Seleccionado.png");
        this.load.image("botonInicioPulsado", "assets/Pantalla_inicio/jugar/pulsado.png");

        this.load.image("botonTutorialNormal", "assets/Pantalla_inicio/Tutorial/Normal.png");
        this.load.image("botonTutorialEncima", "assets/Pantalla_inicio/Tutorial/Seleccionado.png");
        this.load.image("botonTutorialPulsado", "assets/Pantalla_inicio/Tutorial/pulsado.png");

        this.load.image("botonCreditosNormal", "assets/Pantalla_inicio/Creditos/normal.png");
        this.load.image("botonCreditosEncima", "assets/Pantalla_inicio/Creditos/seleccionado.png");
        this.load.image("botonCreditosPulsado", "assets/Pantalla_inicio/Creditos/pulsado.png");

        this.load.image("botonSalirNormal", "assets/Pantalla_inicio/salir/normal.png");
        this.load.image("botonSalirEncima", "assets/Pantalla_inicio/salir/seleccionado.png");
        this.load.image("botonSalirPulsado", "assets/Pantalla_inicio/salir/pulsado.png");

        this.load.image("botonConectado", "assets/Pantalla_inicio/iconos/conectado.png");
        this.load.image("botonDesconectado", "assets/Pantalla_inicio/iconos/desconectado.png");

        this.load.audio("sonidoBoton", "assets/musica/SonidoBoton.mp3");
        this.load.audio("Sonido", "assets/musica/MenuPrincipal.mp3");
    }

    // Función create para inicializar objetos una vez que se han cargado los recursos
    create() {
        // Fondo del menú
        const background = this.add.image(config.width / 2, config.height / 2, 'fondo');
        background.setScale(config.width / background.width, config.height / background.height); // Escalar fondo

        // Música
        this.sonido = this.sound.add("Sonido", { loop: true, volume: 0.8 });
        this.sonido.play(); // Comienza a sonar la música desde que aparece el juego

        const sonidoBoton = this.sound.add("sonidoBoton", { loop: false, volume: 0.5 });

        const serverStatusIcon = this.add.image(750, 10, "botonDesconectado").setScale(0.5);
        // Botón de "Inicio"
        const botonInicio = this.add.image(config.width / 2, 300, 'botonInicioNormal')
            .setInteractive() // Hacerlo interactivo
            .setScale(0.5) // Escalado del botón
            .on('pointerover', () => botonInicio.setTexture('botonInicioEncima')) // Cambiar a imagen seleccionada al pasar el ratón
            .on('pointerout', () => botonInicio.setTexture('botonInicioNormal')) // Volver a imagen normal al salir
            .on('pointerdown', () => botonInicio.setTexture('botonInicioPulsado')) // Cambiar a imagen pulsada al hacer clic
            .on('pointerup', () => {
                botonInicio.setTexture('botonInicioNormal');
                sonidoBoton.play();
                console.log('Botón Inicio clickeado');
                // Acción al hacer clic, cambiar a otra escena
                this.scene.start('IniciarSesion');
            });

        // Botón de "Tutorial"
        const botonTutorial = this.add.image(config.width / 2, 430, 'botonTutorialNormal')
            .setInteractive() // Hacerlo interactivo
            .setScale(0.6) // Escalado del botón
            .on('pointerover', () => botonTutorial.setTexture('botonTutorialEncima'))
            .on('pointerout', () => botonTutorial.setTexture('botonTutorialNormal'))
            .on('pointerdown', () => botonTutorial.setTexture('botonTutorialPulsado'))
            .on('pointerup', () => {
                botonTutorial.setTexture('botonTutorialNormal');
                sonidoBoton.play();
                console.log('Botón Tutorial clickeado');
                // Acción para el botón de Tutorial
                this.scene.start('TutorialScene1');
            });

        // Botón de "Créditos"
        const botonCreditos = this.add.image(config.width / 2, 530, 'botonCreditosNormal')
            .setInteractive() // Hacerlo interactivo
            .setScale(0.6) // Escalado del botón
            .on('pointerover', () => botonCreditos.setTexture('botonCreditosEncima'))
            .on('pointerout', () => botonCreditos.setTexture('botonCreditosNormal'))
            .on('pointerdown', () => botonCreditos.setTexture('botonCreditosPulsado'))
            .on('pointerup', () => {
                botonCreditos.setTexture('botonCreditosNormal');
                sonidoBoton.play();
                console.log('Botón Créditos clickeado');
                this.scene.start('creditos');
            });

        // Botón de "Salir"
        const botonSalir = this.add.image(config.width / 2, 630, 'botonSalirNormal')
            .setInteractive() // Hacerlo interactivo
            .setScale(0.6) // Escalado del botón
            .on('pointerover', () => botonSalir.setTexture('botonSalirEncima'))
            .on('pointerout', () => botonSalir.setTexture('botonSalirNormal'))
            .on('pointerdown', () => botonSalir.setTexture('botonSalirPulsado'))
            .on('pointerup', () => {
                botonSalir.setTexture('botonSalirNormal');
                sonidoBoton.play();
                console.log('Botón Salir clickeado');
                // Acción al hacer clic en salir (cerrar la ventana o salir del juego)
                window.location.replace("https://www.google.com");
            });
        
        // Crear texto para mostrar usuarios conectados
        const connectedUsersText = this.add.text(10, 10, "Usuarios conectados:", {
            font: "16px Arial",
            fill: "#ffffff",
        });
        
        //Registrar actividad del usuario
        this.time.addEvent({
            delay:5000,
            callback:this.keepAlive,
            callbackScope:this,
                loop: true
            })
    }

    // Función update que se ejecuta en cada fotograma (60 veces por segundo por defecto)
    update(time, delta) {
        // La música ya está sonando, no es necesario volver a llamarla aquí
    }

    keepAlive(){
        fetch('/api/users/seen',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: '12345'
            })
        })
        .then(response=>{
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => console.error('Error:', error));
    }
}
