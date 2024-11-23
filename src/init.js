// Configuración básica del juego en Phaser
const config = {
    type: Phaser.AUTO,
    width: 1280, // Ancho dinámico basado en el tamaño de la ventana
    height: 720, // Alto dinámico basado en el tamaño de la ventana
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH // Centra el juego automáticamente
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // Sin gravedad
            debug: false // Desactivar el modo de depuración
        }
    },
<<<<<<< HEAD
    scene: [ResultScreen], // Scene que contiene la lógica del juego
=======
    scene: [GameScene], // Scene que contiene la lógica del juego
>>>>>>> bb5505472585a9e8cca8c35bb085ef751e870016

    audio: {
        disableWebAudio: false //configuracion para el audio
    }
};

// Creación del juego usando la configuración definida
const game = new Phaser.Game(config);

// Variables globales para los gatos y controles
let gatoA, gatoB, cursor,keys,izqA,izqB,arribaA,arribaB,peces,gatoAwait,gatoBwait, puntosA, puntosB, textoA, textoB;




