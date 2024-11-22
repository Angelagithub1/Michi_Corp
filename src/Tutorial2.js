// Escena 2 del tutorial
class TutorialScene2 extends Phaser.Scene {
    constructor() {
        super('Tutorial2');
    }

    preload() {
        // Carga las imágenes que usarás en el tutorial
        this.load.image('Tutorial_fondo', 'assets/Interfaces montadas/fondo_x.png');

        this.load.spritesheet("chimuelo","assets/sprites/chimuelo_HS.png", { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet("chispitas","assets/sprites/chispitas_HS.png", { frameWidth: 900, frameHeight: 300 });
        this.load.spritesheet("nemo","assets/sprites/Nemo_HS.png", { frameWidth: 300, frameHeight: 300 });   
        this.load.spritesheet("puffer","assets/sprites/puffer_HS.png", { frameWidth: 300, frameHeight: 300 });      

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
        this.add.text(620, 100, 'Tutorial: Peces', {
            font: '50px Arial',
            color: '#000000'
        }).setOrigin(0.5);

        // Imágenes de los peces con nombres distintos

        const chimuelo = this.add.sprite(200, 350, 'chimuelo'); // Imagen piraña
        chimuelo.setScale(0.6).setFrame(15);

        const chispitas = this.add.sprite(400, 450, 'chispitas'); // Imagen anguila electrica
        chispitas.setScale(0.6).setFrame(25);

        const nemo = this.add.sprite(600, 550, 'nemo'); // Imagen pez normal
        nemo.setScale(0.6).setFrame(15);

        const puffer = this.add.sprite(800, 650, 'puffer'); // Imagen pez globo
        puffer.setScale(0.6).setFrame(15);

        const pufferI = this.add.sprite(100, 650, 'puffer'); // Imagen pez globo
        pufferI.setScale(0.6).setFrame(20);

        // Texto en el medio
        this.add.text(350, 250, 'El objetivo de este juego es obtener el mayor puntaje posible', {
            font: '20px Arial',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.03);

        this.add.text(350, 280, 'capturando peces y perjudicando al rival en un tiempo limitado.', {
            font: '20px Arial',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.03);
        
        this.add.text(420, 350, 'Para moverse, el jugador 1 usara W,A,S,D ', {
            font: '20px Arial',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.03);

        this.add.text(420, 380, 'y el jugador 2 usara las flechas del teclado.', {
            font: '20px Arial',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.03);

        this.add.text(370, 450, 'Para pescar el pez, debera pulsar el gato 1 el Q y el gato 2 la P ', {
            font: '20px Arial',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.03);

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
            this.scene.start('Tutorial1'); // Vuelve al menú principal
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
            this.scene.start('MenuPrincipal'); // Vuelve al menú principal
        });
    }
}
