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

        // Cargar imágenes de la barra de volumen
        this.load.image('Barra_volumen', 'assets/pausa/barra.png');
        this.load.image('Control_deslizador', 'assets/pausa/handler_barra.png');
    }

    create() {
        // Fondo del menú de pausa
        this.add.image(600, 400, 'Pause_fondo').setScale(0.75);

        // Crear barra de volumen
        const barraVolumen = this.add.image(600, 450, 'Barra_volumen').setScale(0.8);
        const deslizador = this.add.image(700, 480, 'Control_deslizador').setInteractive();

        // Configuración de volumen
        let volumenActual = this.sound.volume;
        this.input.setDraggable(deslizador);

        deslizador.on('drag', (pointer, dragX) => {
            const minX = barraVolumen.x - barraVolumen.width / 4 + deslizador.width / 4;
            const maxX = barraVolumen.x + barraVolumen.width / 4 - deslizador.width / 4;

            if (dragX >= minX && dragX <= maxX) {
                deslizador.x = dragX;
                const porcentaje = (dragX - minX) / (maxX - minX);
                volumenActual = porcentaje;
                this.sound.setVolume(volumenActual);
            }
        });

        // Botón para reanudar el juego
        const botonVolver = this.add.image(600, 600, 'Boton_volver_normal').setInteractive().setScale(0.8);

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
            this.scene.resume('Nivel1'); // Reanudar la escena Nivel1
            this.scene.stop(); // Detener la escena PauseMenu para evitar conflictos
        });
        
    }
}