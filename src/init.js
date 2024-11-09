// Configuración básica del juego en Phaser
const config = {
    // Ancho del lienzo del juego (320 píxeles)
    width: 320,
    // Alto del lienzo del juego (180 píxeles)
    height: 180,
    // ID del contenedor HTML donde se insertará el lienzo del juego
    parent: "container",
    // Tipo de renderizado, puede ser Phaser.CANVAS, Phaser.WEBGL o Phaser.AUTO
    // Phaser.AUTO elige automáticamente el mejor renderizado según el entorno
    type: Phaser.AUTO,
    // Definición de las funciones de escena: preload, create y update
    scene: {
        preload: preload, // Función para cargar recursos (imágenes, sonidos, etc.)
        create: create,   // Función para crear objetos y elementos del juego
        update: update    // Función que se ejecuta en cada fotograma para actualizar el estado del juego
    }
}

// Creación del juego usando la configuración definida
var game = new Phaser.Game(config);

// Función preload para cargar recursos antes de iniciar el juego
function preload() {
    console.log("Soy preload");
    // Aquí es donde normalmente cargarías imágenes, sonidos, etc.
}

// Función create para inicializar objetos una vez que se han cargado los recursos
function create() {
    console.log("Soy create");
    // Aquí es donde se crean y colocan los objetos en el juego (sprites, texto, etc.)
}

// Función update que se ejecuta en cada fotograma (60 veces por segundo por defecto)
// time es el tiempo transcurrido desde el inicio del juego
// delta es el tiempo en milisegundos desde el último fotograma
function update(time, delta) {
    console.log(delta);
    // Aquí puedes actualizar la posición de los objetos, detectar colisiones, etc.
}