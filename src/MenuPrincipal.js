class MenuPrincipal extends Phaser.Scene {
    constructor() {
        super( {key: "MenuPrincipal"});
    }

// Función preload para cargar recursos antes de iniciar el juego
preload() {
    this.load.image("fondo", "assets/Pantalla_inicio/fondo_inicio.png"); // Fondo del menú

    // Botones con tres imágenes para cada uno: normal, seleccionado y pulsado
    this.load.image("botonInicioNormal", "assets/Pantalla_inicio/jugar/Normal.png");
    this.load.image("botonInicioEncima", "assets/Pantalla_inicio/jugar/pulsado.png");
    this.load.image("botonInicioPulsado", "assets/Pantalla_inicio/jugar/Seleccionado.png");

    this.load.image("botonTutorialNormal", "assets/Pantalla_inicio/Tutorial/Normal.png");
    this.load.image("botonTutorialEncima", "assets/Pantalla_inicio/Tutorial/pulsado.png");
    this.load.image("botonTutorialPulsado", "assets/Pantalla_inicio/Tutorial/Seleccionado.png");

    this.load.image("botonCreditosNormal", "assets/Pantalla_inicio/Creditos/normal.png");
    this.load.image("botonCreditosEncima", "assets/Pantalla_inicio/Creditos/pulsado.png");
    this.load.image("botonCreditosPulsado", "assets/Pantalla_inicio/Creditos/seleccionado.png");

    this.load.image("botonSalirNormal", "assets/Pantalla_inicio/salir/normal.png");
    this.load.image("botonSalirEncima", "assets/Pantalla_inicio/salir/pulsado.png");
    this.load.image("botonSalirPulsado", "assets/Pantalla_inicio/salir/seleccionado.png");
}

// Función create para inicializar objetos una vez que se han cargado los recursos
create() {
    
    // Fondo del menú
    const background = this.add.image(config.width / 2, config.height / 2, 'fondo');
    background.setScale(config.width / background.width, config.height / background.height); // Escalar fondo

    // Botón de "Inicio"
    const botonInicio = this.add.image(config.width / 2, 250, 'botonInicioNormal')
        .setInteractive() // Hacerlo interactivo
        .setScale(0.5) // Hacer más pequeño el botón
        .on('pointerover', () => botonInicio.setTexture('botonInicioEncima')) // Cambiar a imagen seleccionada al pasar el ratón
        .on('pointerout', () => botonInicio.setTexture('botonInicioNormal')) // Volver a imagen normal al salir
        .on('pointerdown', () => botonInicio.setTexture('botonInicioPulsado')) // Cambiar a imagen pulsada al hacer clic
        .on('pointerup', () => {
            botonInicio.setTexture('botonInicioNormal');
            console.log('Botón Inicio clickeado');
            // Acción al hacer clic, cambiar a otra escena

            this.scene.add("GameScene", new GameScene);
            this.scene.start('GameScene');
<<<<<<< HEAD
            
=======
>>>>>>> 6cf6e4888d94491acbd48da33d6d8f780bc72b7f
        });

    // Botón de "Tutorial"
    const botonTutorial = this.add.image(config.width / 2, 370, 'botonTutorialNormal')
        .setInteractive()
        .setScale(0.6) // Hacer más pequeño el botón
        .on('pointerover', () => botonTutorial.setTexture('botonTutorialEncima'))
        .on('pointerout', () => botonTutorial.setTexture('botonTutorialNormal'))
        .on('pointerdown', () => botonTutorial.setTexture('botonTutorialPulsado'))
        .on('pointerup', () => {
            botonTutorial.setTexture('botonTutorialNormal');
            console.log('Botón Tutorial clickeado');
            // Aquí puedes agregar la acción para el botón de Tutorial
        });

    // Botón de "Créditos"
    const botonCreditos = this.add.image(config.width / 2, 470, 'botonCreditosNormal')
        .setInteractive()
        .setScale(0.6) // Hacer más pequeño el botón
        .on('pointerover', () => botonCreditos.setTexture('botonCreditosEncima'))
        .on('pointerout', () => botonCreditos.setTexture('botonCreditosNormal'))
        .on('pointerdown', () => botonCreditos.setTexture('botonCreditosPulsado'))
        .on('pointerup', () => {
            botonCreditos.setTexture('botonCreditosNormal');
            console.log('Botón Créditos clickeado');
<<<<<<< HEAD

            // Al hacer click, muestra los creditos (nombres de los integrantes y el equipo)
            this.scene.add("Creditos", new Creditos);
            this.scene.start('Creditos');
=======
            // Aquí puedes agregar la acción para el botón de Créditos
>>>>>>> 6cf6e4888d94491acbd48da33d6d8f780bc72b7f
        });

    // Botón de "Salir"
    const botonSalir = this.add.image(config.width / 2, 570, 'botonSalirNormal')
        .setInteractive()
        .setScale(0.6) // Hacer más pequeño el botón
        .on('pointerover', () => botonSalir.setTexture('botonSalirEncima'))
        .on('pointerout', () => botonSalir.setTexture('botonSalirNormal'))
        .on('pointerdown', () => botonSalir.setTexture('botonSalirPulsado'))
        .on('pointerup', () => {
            botonSalir.setTexture('botonSalirNormal');
            console.log('Botón Salir clickeado');
            // Acción al hacer clic en salir (cerrar la ventana o salir del juego)
            window.close(); // Cierra la ventana (en algunos navegadores)
        });
    
}

// Función update que se ejecuta en cada fotograma (60 veces por segundo por defecto)
// time es el tiempo transcurrido desde el inicio del juego
// delta es el tiempo en milisegundos desde el último fotograma
update(time, delta) {
    // Aquí puedes actualizar la posición de los objetos, detectar colisiones, etc.
}
}
