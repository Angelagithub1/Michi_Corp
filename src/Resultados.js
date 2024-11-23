class ResultScreen extends Phaser.Scene {
    constructor() {
        super('ResultScreen');
    }

    preload() {
        // Cargar fondos para victoria y empate dependiendo del gato
        this.load.image('fondo_victoria_gatoA', 'assets/victoria_derrota_empate/victoria_derrota_1.png');
        this.load.image('fondo_victoria_gatoB', 'assets/victoria_derrota_empate/victoria_derrota_2.png');

        // Fondo de empate
        this.load.image('fondo_empate', 'assets/victoria_derrota_empate/empate.png');

        // Botones
        this.load.image('boton_inicio_normal', 'assets/victoria_derrota_empate/pantalla_inicio/normal.png');
        this.load.image('boton_inicio_encima', 'assets/victoria_derrota_empate/pantalla_inicio/pulsado.png');
        this.load.image('boton_inicio_pulsado', 'assets/victoria_derrota_empate/pantalla_inicio/seleccionado.png');
    }

    create() {
        // Variables globales de puntuación
        const puntuacionA = this.registry.get('puntuacionA') || 0;
        const puntuacionB = this.registry.get('puntuacionB') || 0;

        let fondoKey = '';
        let mensaje = '';

        // Determinar el resultado y el fondo correspondiente
        if (puntosA > puntosB) {
            fondoKey = 'fondo_victoria_gatoA';  // Gato A gana
            mensaje = '¡Gato A gana!';
        } else if (puntosA < puntosB) {
            fondoKey = 'fondo_victoria_gatoB';  // Gato B gana
            mensaje = '¡Gato B gana!';
        } else {
            fondoKey = 'fondo_empate';  // Empate
            mensaje = '¡Es un empate!';
        }

        // Asignar fondo correspondiente
        this.add.image(400, 300, fondoKey).setOrigin(0.29);

        // Mostrar mensaje
        this.add.text(750, 100, mensaje, {
            font: '45px Arial',
            color: '#000000',
        }).setOrigin(0.5);

        // Mostrar puntuaciones
        this.add.text(200, 200, `Gato A: ${puntosA}\nGato B: ${puntosB}`, {
            font: '45px Arial',
            color: '#000000',
            align: 'center',
        }).setOrigin(0.5);

        // Botón para volver al inicio del juego
        const botonInicio = this.add.image(750, 900, 'boton_inicio_normal').setInteractive();

        botonInicio.on('pointerover', () => botonInicio.setTexture('boton_inicio_encima'));
        botonInicio.on('pointerout', () => botonInicio.setTexture('boton_inicio_normal'));
        botonInicio.on('pointerdown', () => botonInicio.setTexture('boton_inicio_pulsado'));
        botonInicio.on('pointerup', () => {
            botonInicio.setTexture('boton_inicio_normal');
            this.scene.start('GameScene'); // Cambiar a la escena inicial del juego
        });
    }
}
