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

<<<<<<< HEAD
    scene: [ MenuPrincipal, GameScene, TutorialScene1, TutorialScene2, Creditos, PauseMenu, ResultScreen], // Scene que contiene la lógica del juego
=======

    scene: [GameScene, MenuPrincipal, TutorialScene1, TutorialScene2, Creditos, PauseMenu, ResultScreen], // Scene que contiene la lógica del juego
>>>>>>> 6a4982cbd190e1f826ac9b7ac6252377cb718f75

    audio: {
        disableWebAudio: false // Configuración para el audio
    }
};


// Creación del juego usando la configuración definida
const game = new Phaser.Game(config);

// Variables globales para los gatos y controles
let gatoA, gatoB, cursor,keys,izqA,izqB,arribaA,arribaB,peces,gatoAwait,gatoBwait, puntosA, puntosB, textoA, textoB, arbusto,pez,zonasProhibidas,tierra, abiertoA, abiertoB, pezGloboA, pezGloboB,agua;




