// Configuración básica del juego en Phaser
const config = {
    type: Phaser.AUTO,
    parent: 'container',  // Asegúrate de que Phaser se dibuje en el contenedor con id="container"
    width: 1200,  // Usamos un tamaño fijo de 600px para el ancho
    height:720,  // Usamos el mismo valor para la altura
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH, // Centra el juego automáticamente
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // Sin gravedad
            debug: false // Desactivar el modo de depuración
        }
    },

    scene: [GameScene], // Scene que contiene la lógica del juego

    audio: {
        disableWebAudio: false // Configuración para el audio
    }
};


// Creación del juego usando la configuración definida
const game = new Phaser.Game(config);

// Variables globales para los gatos y controles

let gatoA, gatoB, cursor,keys,izqA,izqB,arribaA,arribaB,peces,gatoAwait,gatoBwait, puntosA, puntosB, textoA, textoB, arbusto,agua,pez,zonasProhibidas,tierra;



