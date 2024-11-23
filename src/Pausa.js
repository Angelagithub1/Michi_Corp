class PauseMenu extends Phaser.Scene {
    constructor() {
        super('PauseMenu');
    }

    preload() {
        // Cargar imágenes necesarias
        this.load.image('Pause_fondo', 'assets/pausa/fondo_pausa.png'); // Fondo del menú
        this.load.image('Boton_volver_normal', 'assets/pausa/volver/normal.png');
        this.load.image('Boton_volver_encima', 'assets/pausa/volver/seleccionado.png');
        this.load.image('Boton_volver_pulsado', 'assets/pausa/volver/pulsado.png');
        this.load.image('Boton_inicio_normal', 'assets/pausa/pantalla_inicio/normal.png');
        this.load.image('Boton_inicio_encima', 'assets/pausa/pantalla_inicio/seleccionado.png');
        this.load.image('Boton_inicio_pulsado', 'assets/pausa/pantalla_inicio/pulsado.png');

        // Cargar imágenes de la barra de volumen
        this.load.image('Barra_volumen', 'assets/pausa/barra.png');
        this.load.image('Control_deslizador', 'assets/pausa/handler_barra.png');
    }

    create() {
        // Agregar fondo en las coordenadas especificadas
        this.add.image(700, 900, 'Pause_fondo');

        // Crear barra de volumen en las coordenadas específicas
        const barraVolumen = this.add.image(700, 950, 'Barra_volumen').setScale(1);
        const deslizador = this.add.image(700, 950, 'Control_deslizador').setInteractive();

        // Volumen inicial (global)
        let volumenActual = this.sound.volume;

        // Hacer el deslizador arrastrable
        this.input.setDraggable(deslizador);

        deslizador.on('drag', (pointer, dragX) => {
            // Restringir el movimiento horizontal dentro de la barra
            const minX = barraVolumen.x - barraVolumen.width / 2 + deslizador.width / 2;
            const maxX = barraVolumen.x + barraVolumen.width / 2 - deslizador.width / 2;

            if (dragX >= minX && dragX <= maxX) {
                deslizador.x = dragX;

                // Calcular el volumen basado en la posición del deslizador
                const porcentaje = (dragX - minX) / (maxX - minX);
                volumenActual = porcentaje;
                this.sound.setVolume(volumenActual); // Ajustar volumen global
            }
        });

        // Crear botón de volver al menú principal en las coordenadas especificadas
        const botonVolver = this.add.image(600, 1150, 'Boton_volver_normal').setInteractive();

        botonVolver.on('pointerover', () => {
            botonVolver.setTexture('Boton_volver_encima');
        });

        botonVolver.on('pointerout', () => {
            botonVolver.setTexture('Boton_volver_normal');
        });

        botonVolver.on('pointerdown', () => {
            botonVolver.setTexture('Boton_volver_pulsado');
        });

        botonVolver.on('pointerup', () => {
            botonVolver.setTexture('Boton_volver_normal');
            this.scene.start('GameScene'); // Volver al menú principal
        });

        // Crear botón de volver al menú de inicio
        const botonInicio = this.add.image(800, 1150, 'Boton_inicio_normal').setInteractive(); // Ajustar posición

        botonInicio.on('pointerover', () => {
            botonInicio.setTexture('Boton_inicio_encima');
        });

        botonInicio.on('pointerout', () => {
            botonInicio.setTexture('Boton_inicio_normal');
        });

        botonInicio.on('pointerdown', () => {
            botonInicio.setTexture('Boton_inicio_pulsado');
        });

        botonInicio.on('pointerup', () => {
            botonInicio.setTexture('Boton_inicio_normal');
            this.scene.start('MenuPrincipal'); // Cambiar a la escena de inicio
        });
    }
}
