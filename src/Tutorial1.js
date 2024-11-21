// Escena 1 del tutorial
class TutorialScene1 extends Phaser.Scene {
    constructor() {
        super('TutorialScene1');
    }

    preload() {
        // Carga las imágenes que usarás en el tutorial
        this.load.image('Tutorial_fondo', 'assets/Interfaces montadas/fondo_x.png');
        this.load.image('GatoA', 'assets/sprites/gatoA.png');
        this.load.image('GatoB', 'assets/sprites/gatoB.png');

        // Botones con 3 estados
        this.load.image('Boton_continuar_normal', 'assets/Interfaces montadas/continuar/normal.png');
        this.load.image('Boton_continuar_encima', 'assets/Interfaces montadas/continuar/seleccionado.png');
        this.load.image('Boton_continuar_pulsado', 'assets/Interfaces montadas/continuar/pulsado.png');

        this.load.image('Boton_atras_normal', 'assets/Interfaces montadas/volver/normal.png');
        this.load.image('Boton_atras_encima', 'assets/Interfaces montadas/volver/seleccionado.png');
        this.load.image('Boton_atras_pulsado', 'assets/Interfaces montadas/volver/pulsado.png');
    }

    create() {
        // Fondo del tutorial
        this.add.image(400, 300, 'Tutorial_fondo');

        // Título
        this.add.text(580, 100, 'Tutorial: Objetivo', {
            font: '24px Arial',
            color: '#000000'
        }).setOrigin(0.5);

        // Imágenes gatos
        //this.add.image(50, 300, 'GatoA').setScale(0.5); // Imagen a la izquierda del todo
        //this.add.image(750, 300, 'GatoB').setScale(0.5); // Imagen a la derecha del todo

        // Texto en el medio
        this.add.text(400, 300, 'Este es un texto explicativo.\nAquí puedes agregar información sobre el tutorial.', {
            font: '18px Arial',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.05);
        

        // Botón de retroceder en la esquina inferior izquierda
        const backButton = this.add.image(0, 700, 'Boton_atras_normal').setOrigin(0, 1).setInteractive().setScale(0.7);

        backButton.on('pointerover', () => {
            backButton.setTexture('Boton_atras_encima');
        });

        backButton.on('pointerout', () => {
            backButton.setTexture('Boton_atras_normal');
        });

        backButton.on('pointerdown', () => {
            backButton.setTexture('Boton_atras_pulsado');
        });

        backButton.on('pointerup', () => {
            backButton.setTexture('Boton_atras_normal');
            console.log('No hay escena anterior a la 1.');
        });

        // Botón de continuar en la esquina inferior derecha
        const nextButton = this.add.image(1200, 700, 'Boton_continuar_normal').setOrigin(1, 1).setInteractive().setScale(0.7)

        nextButton.on('pointerover', () => {
            nextButton.setTexture('Boton_continuar_encima');
        });

        nextButton.on('pointerout', () => {
            nextButton.setTexture('Boton_continuar_normal');
        });

        nextButton.on('pointerdown', () => {
            nextButton.setTexture('Boton_continuar_pulsado');
        });

        nextButton.on('pointerup', () => {
            nextButton.setTexture('Boton_continuar_normal');
            this.scene.start('TutorialScene2'); // Cambia a la siguiente escena
        });
    }
}

// Escena 2 del tutorial
class TutorialScene2 extends Phaser.Scene {
    constructor() {
        super('TutorialScene2');
    }

    preload() {
        // Carga los recursos necesarios para la escena 2
        this.load.image('Tutorial_fondo', 'assets/Interfaces_montadas/fondo_x.png');
        this.load.image('GatoA', 'assets/sprites/gatoA.png');
        this.load.image('GatoB', 'assets/sprites/gatoB.png');

        this.load.image('Boton_continuar_normal', 'assets/Interfaces_montadas/continuar/normal.png');
        this.load.image('Boton_continuar_encima', 'assets/Interfaces_montadas/continuar/seleccionado.png');
        this.load.image('Boton_continuar_pulsado', 'assets/Interfaces_montadas/continuar/pulsado.png');
        this.load.image('Boton_atras_normal', 'assets/Interfaces_montadas/volver/normal.png');
        this.load.image('Boton_atras_encima', 'assets/Interfaces_montadas/volver/seleccionado.png');
        this.load.image('Boton_atras_pulsado', 'assets/Interfaces_montadas/volver/pulsado.png');
    }

    create() {
        // Fondo del tutorial
        this.add.image(400, 300, 'Tutorial_fondo');

        // Título
        this.add.text(400, 50, 'Tutorial: Paso 2', {
            font: '24px Arial',
            color: '#000000'
        }).setOrigin(0.5);

        // Imágenes
        this.add.image(50, 300, 'GatoA').setScale(0.5); // Imagen a la izquierda del todo
        this.add.image(750, 300, 'GatoB').setScale(0.5); // Imagen a la derecha del todo

        // Texto en el medio
        this.add.text(400, 300, 'Este es el segundo paso del tutorial.\nAquí puedes agregar más información.', {
            font: '18px Arial',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.5);

        // Botón de retroceder en la esquina inferior izquierda
        const backButton = this.add.image(0, 600, 'Boton_atras_normal').setOrigin(0, 1).setInteractive();

        backButton.on('pointerover', () => {
            backButton.setTexture('Boton_atras_encima');
        });

        backButton.on('pointerout', () => {
            backButton.setTexture('Boton_atras_normal');
        });

        backButton.on('pointerdown', () => {
            backButton.setTexture('Boton_atras_pulsado');
        });

        backButton.on('pointerup', () => {
            backButton.setTexture('Boton_atras_normal');
            this.scene.start('TutorialScene1'); // Vuelve a la escena anterior
        });

        // Botón de continuar en la esquina inferior derecha
        const nextButton = this.add.image(800, 600, 'Boton_continuar_normal').setOrigin(1, 1).setInteractive();

        nextButton.on('pointerover', () => {
            nextButton.setTexture('Boton_continuar_encima');
        });

        nextButton.on('pointerout', () => {
            nextButton.setTexture('Boton_continuar_normal');
        });

        nextButton.on('pointerdown', () => {
            nextButton.setTexture('Boton_continuar_pulsado');
        });

        nextButton.on('pointerup', () => {
            nextButton.setTexture('Boton_continuar_normal');
            console.log('Última escena. No hay más.');
        });
    }
}
