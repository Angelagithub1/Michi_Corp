// Configuración básica del juego en Phaser
const config = {
    type: Phaser.AUTO,
    parent: 'container',  // Asegúrate de que Phaser se dibuje en el contenedor con id="container"
    width: 1500,  // Usamos un tamaño fijo de 600px para el ancho
    height: 1000,  // Usamos el mismo valor para la altura
    scale: {
        mode: Phaser.Scale.FIT,  // Asegura que el juego se ajuste al contenedor sin distorsionar
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
<<<<<<< HEAD
let gatoA, gatoB, cursor, keys, izqA, izqB, arribaA, arribaB, peces, gatoAwait, gatoBwait, puntosA, puntosB, textoA, textoB, arbusto, agua;
=======
let gatoA, gatoB, cursor,keys,izqA,izqB,arribaA,arribaB,peces,gatoAwait,gatoBwait, puntosA, puntosB, textoA, textoB, arbusto,agua,pez;




>>>>>>> d731d57e76cd064a24119ecc62eb218f4edacff2
