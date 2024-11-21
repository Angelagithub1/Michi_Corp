class TutorialScene1 extends Phaser.Scene {
    constructor() {
        super('TutorialScene1');
    }

    preload() {
        // Carga las imágenes que usarás en el tutorial
        this.load.image('image1', 'ruta/a/tu/imagen1.png');
        this.load.image('image2', 'ruta/a/tu/imagen2.png');
        this.load.image('button', 'ruta/a/tu/boton.png');
    }

    create() {
        // Título
        this.add.text(400, 50, 'Tutorial - Escena 1', {
            font: '24px Arial',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Imágenes
        this.add.image(150, 300, 'image1').setScale(0.5); // Imagen a la izquierda
        this.add.image(650, 300, 'image2').setScale(0.5); // Imagen a la derecha

        // Texto en el medio
        this.add.text(400, 300, 'Este es un texto explicativo.\nAquí puedes agregar información sobre el tutorial.', {
            font: '18px Arial',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        // Botón de continuar
        const nextButton = this.add.image(650, 500, 'button').setInteractive().setScale(0.5);
        this.add.text(650, 500, 'Continuar', { font: '16px Arial', color: '#000000' }).setOrigin(0.5);
        nextButton.on('pointerdown', () => {
            this.scene.start('TutorialScene2'); // Cambia a la siguiente escena
        });

        // Botón de retroceder
        const backButton = this.add.image(150, 500, 'button').setInteractive().setScale(0.5);
        this.add.text(150, 500, 'Volver', { font: '16px Arial', color: '#000000' }).setOrigin(0.5);
        backButton.on('pointerdown', () => {
            // Aquí puedes definir qué hacer, como volver a un menú principal
            console.log('No hay escena anterior a la 1.');
        });
    }
}

// Escena 2 del tutorial
class TutorialScene2 extends Phaser.Scene {
    constructor() {
        super('TutorialScene2');
    }

    preload() {
        this.load.image('image1', 'ruta/a/tu/imagen1.png');
        this.load.image('image2', 'ruta/a/tu/imagen2.png');
        this.load.image('button', 'ruta/a/tu/boton.png');
    }

    create() {
        this.add.text(400, 50, 'Tutorial - Escena 2', {
            font: '24px Arial',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.add.image(150, 300, 'image1').setScale(0.5); // Imagen a la izquierda
        this.add.image(650, 300, 'image2').setScale(0.5); // Imagen a la derecha

        this.add.text(400, 300, 'Este es el segundo paso del tutorial.\nPuedes incluir más información aquí.', {
            font: '18px Arial',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        const nextButton = this.add.image(650, 500, 'button').setInteractive().setScale(0.5);
        this.add.text(650, 500, 'Continuar', { font: '16px Arial', color: '#000000' }).setOrigin(0.5);
        nextButton.on('pointerdown', () => {
            console.log('Última escena. No hay más.');
        });

        const backButton = this.add.image(150, 500, 'button').setInteractive().setScale(0.5);
        this.add.text(150, 500, 'Volver', { font: '16px Arial', color: '#000000' }).setOrigin(0.5);
        backButton.on('pointerdown', () => {
            this.scene.start('TutorialScene1'); // Vuelve a la escena anterior
        });
    }
}