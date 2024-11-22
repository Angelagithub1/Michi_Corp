// Configuración básica del juego en Phaser
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth, // Ancho dinámico basado en el tamaño de la ventana
    height: window.innerHeight, // Alto dinámico basado en el tamaño de la ventana
    scale: {
        mode: Phaser.Scale.RESIZE, // Ajusta el juego automáticamente al tamaño de la pantalla
        autoCenter: Phaser.Scale.CENTER_BOTH // Centra el juego automáticamente
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // Sin gravedad
            debug: false // Desactivar el modo de depuración
        }
    },
    scene: [GameScene] // Scene que contiene la lógica del juego
};

// Creación del juego usando la configuración definida
const game = new Phaser.Game(config);

// Variables globales para los gatos y controles
let gatoA, gatoB, cursor,keys,izqA,izqB,arribaA,arribaB,peces,gatoAwait,gatoBwait;




