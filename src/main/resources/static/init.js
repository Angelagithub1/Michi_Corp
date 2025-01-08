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

    scene: [Iniciarsesion, MenuPrincipal, Chat, TutorialScene1, TutorialScene2, TutorialScene3, Creditos, GameOnline1,Mapa, GameLocal1, GameLocal2, PauseMenu, ResultScreen], // Scene que contiene la lógica del juego

    audio: {
        disableWebAudio: false // Configuración para el audio
    }
};


// Creación del juego usando la configuración definida
const game = new Phaser.Game(config);

// Variables globales para los gatos y controles
let gatoA, gatoB, cursor,keys,izqA,izqB,arribaA,arribaB,peces,gatoAwait,gatoBwait, puntosA, puntosB, textoA, textoB, arbusto,pez,zonasProhibidas,tierra,pesca,mapa, abiertoA, abiertoB, pezGloboA, pezGloboB,agua,mapaElegido, gameID, nombreA, nombreB,botonServer;
//Variables para websockets
let pezCreado, pescarGatoA,pescarGatoB,explosionPezGlobo, gatoAexplosion,gatoBexplosion,capturaPezGlobo1,capturaPezGlobo2,lanzarPezGlobo1,lanzarPezGlobo2,gatoAParalizado,gatoBParalizado,inventarioA,inventarioB,inventarioAbierto1,inventarioAbierto2,ganarA,ganarB,perderA,perderB,colisionPez1,colisionPez2,gameOnPause1,gameOnPause2,userDesconectado1,userDesconectado2;
var conexionIniciada=false, gatoAHasSelected=false, gatoBHasSelected=false,host = null, connection;





