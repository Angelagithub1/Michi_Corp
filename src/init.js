// Configuración básica del juego en Phaser
const config = {
    // Ancho del lienzo del juego (1200 píxeles)
    width: 1200,
    // Alto del lienzo del juego (700 píxeles)
    height: 700,
    // ID del contenedor HTML donde se insertará el lienzo del juego
    parent: "container",
    // Tipo de renderizado, puede ser Phaser.CANVAS, Phaser.WEBGL o Phaser.AUTO
    // Phaser.AUTO elige automáticamente el mejor renderizado según el entorno
    type: Phaser.AUTO,
    // Definición de las funciones de escena: preload, create y update
    scene:[GameScene]
};

// Creación del juego usando la configuración definida
const game = new Phaser.Game(config);
var gatoA;
var gatoB;


