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
    scene:[TutorialScene1]
};

// Creación del juego usando la configuración definida
const game = new Phaser.Game(config);

// Función preload para cargar recursos antes de iniciar el juego
function preload() {
    // Aquí es donde normalmente cargarías imágenes, sonidos, etc.
    
}

function create() {
    // Aquí es donde se crean y colocan los objetos en el juego (sprites, texto, etc.)

}

// Función update que se ejecuta en cada fotograma (60 veces por segundo por defecto)
// time es el tiempo transcurrido desde el inicio del juego
// delta es el tiempo en milisegundos desde el último fotograma
function update(time, delta) {
    // Aquí puedes actualizar la posición de los objetos, detectar colisiones, etc.
}

