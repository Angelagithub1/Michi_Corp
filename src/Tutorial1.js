// Escena 1 del tutorial
class TutorialScene1 extends Phaser.Scene {
    constructor() {
        super({key: "TutorialScene1"});
    }

    preload() {
        // Carga las imágenes que usarás en el tutorial
        this.load.image('Tutorial_fondo', 'assets/Interfaces montadas/fondo_x.png');

        this.load.spritesheet("gatoB","assets/sprites/gatoB.png", { frameWidth: 280, frameHeight: 600 });
        this.load.spritesheet("gatoA","assets/sprites/gatoA.png", { frameWidth: 280, frameHeight: 600 });   

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
        this.add.text(620, 100, 'Tutorial: Objetivo y Controles', {
            font: '50px Arial',
            color: '#000000'
        }).setOrigin(0.5);

        // Imágenes gatos

        gatoA = this.add.sprite(200, 350, 'gatoA'); // Imagen a la izquierda del todo
        gatoA.setScale(0.6).setFrame(1);
        gatoB = this.add.sprite(1050, 350, 'gatoB'); // Imagen a la derecha del todo
        gatoB.setScale(0.6).setFrame(1);;


        // Texto en el medio
        this.add.text(330, 250, 'El objetivo de este juego es obtener el mayor puntaje posible', {
            font: '20px Arial',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.03);

        this.add.text(330, 280, 'capturando peces de perfil y perjudicando al rival en un tiempo limitado.', {
            font: '20px Arial',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.03);
        
        this.add.text(420, 350, 'Para moverse, Menta usara W,A,S,D y para pescar la Q.', {
            font: '20px Arial',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.03);

        this.add.text(420, 380, 'Chocolate usara las flechas del teclado y la P para pescar.', {
            font: '20px Arial',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.03);

        this.add.text(330, 450, 'Para capturar el pez, solo hay que pasar por encima de el. ', {
            font: '20px Arial',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.03);

        this.add.text(330, 480, 'En cuanto al inventario, Menta lo activa con la E y Chocolate con la L', {
            font: '20px Arial',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.03);

        this.add.text(330, 510, 'y para lanzar los objetos que tengan, Menta con la F y Chocolate con la O.', {
            font: '20px Arial',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.03);


        this.add.text(170, 150, 'MENTA', {
            font: 'bold 20px Arial',
            color: '#013220',
            align: 'center'
        }).setOrigin(0.05);

        this.add.text(990, 150, 'CHOCOLATE', {
            font: 'bold 20px Arial',
            color: '#013220',
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
            this.scene.start('MenuPrincipal'); // Vuelve al menú principal
        });

        // Botón de continuar
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