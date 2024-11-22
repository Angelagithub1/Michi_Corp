class GameScene extends Phaser.Scene {

    constructor() {
        super("Nivel1"); // Nombre único de la escena
    }

preload() {
    // Aquí es donde normalmente cargarías imágenes, sonidos, etc.
    this.load.image("escenario", "assets/Escenario/v2/fondo.png");
    this.load.spritesheet("gatoB","assets/sprites/gatoB.png", { frameWidth: 280, frameHeight: 600 });
    this.load.spritesheet("gatoA","assets/sprites/gatoA.png", { frameWidth: 280, frameHeight: 600 });

    // Cargar la música
    this.load.audio("backgroundMusic", "assets/musica/los-peces-en-el-mar-loop-c-16730.mp3");

}

// Función create para inicializar objetos una vez que se han cargado los recursos
create() {
    // Aquí es donde se crean y colocan los objetos en el juego (sprites, texto, etc.)
    
    // Crear la imagen y ajustarla al tamaño del escenario
    const background = this.add.image(config.width / 2, config.height / 2, 'escenario'); // Centrar la imagen
    background.setScale(config.width / background.width, config.height / background.height); // Escalar la imagen
    
    // Reproducir música de fondo
        const music = this.sound.add("backgroundMusic", { loop: true, volume: 0.1 });
        music.play();
    
        
    //ANIMACIONES DE LOS GATOS
    // Animación 1: Quieto mirando al frente (frames de la fila 1)
    this.anims.create({
        key: 'frenteB',
        frames: this.anims.generateFrameNumbers('gatoB', { start: 0, end: 3 }), 
        frameRate: 5,
        repeat: -1 // Repetir infinito
    });
    this.anims.create({
        key: 'frenteA',
        frames: this.anims.generateFrameNumbers('gatoA', { start: 0, end: 3 }), 
        frameRate: 5,
        repeat: -1 // Repetir infinito
    });

    // Animación 2: Quieto de espaldas (frames de la fila 2)
    this.anims.create({
        key: 'espaldasB',
        frames: this.anims.generateFrameNumbers('gatoB', { start: 8, end: 11 }), 
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'espaldasA',
        frames: this.anims.generateFrameNumbers('gatoA', { start: 8, end: 11 }), 
        frameRate: 5,
        repeat: -1
    });

    // Animación 3: Caminando hacia la derecha (frames de la fila 3)
    this.anims.create({
        key: 'caminar_drchB',
        frames: this.anims.generateFrameNumbers('gatoB', { start: 23, end: 26 }),
        frameRate: 5, 
        repeat: -1
    });
    this.anims.create({
        key: 'caminar_drchA',
        frames: this.anims.generateFrameNumbers('gatoA', { start: 23, end: 26 }),
        frameRate: 5,
        repeat: -1
    });

    // Animación 4: Caminando hacia la izquierda (frames de la fila 4)
    this.anims.create({
        key: 'caminar_izqB',
        frames: this.anims.generateFrameNumbers('gatoB', { start: 16, end: 19 }), 
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'caminar_izqA',
        frames: this.anims.generateFrameNumbers('gatoA', { start: 16, end: 19 }), 
        frameRate: 5,
        repeat: -1
    });

    // Animación 5: Pescando (frames de la fila 5)
    this.anims.create({
        key: 'pescar_izqB',
        frames: this.anims.generateFrameNumbers('gatoB', { start: 32, end: 32 }), 
        frameRate: 0,
        repeat: 0 // No repetir, animación se ejecuta una vez
    });
    this.anims.create({
        key: 'pescar_izqA',
        frames: this.anims.generateFrameNumbers('gatoA', { start: 32, end: 32 }), 
        frameRate: 0,
        repeat: 0 // No repetir, animación se ejecuta una vez
    });
    this.anims.create({
        key: 'pescar_drchA',
        frames: this.anims.generateFrameNumbers('gatoA', { start: 40, end: 40 }), 
        frameRate: 0,
        repeat: 0 // No repetir, animación se ejecuta una vez
    });
    this.anims.create({
        key: 'pescar_drchB',
        frames: this.anims.generateFrameNumbers('gatoB', { start: 40, end: 40 }), 
        frameRate: 0,
        repeat: 0 // No repetir, animación se ejecuta una vez
    });


    // Crear el sprite de los gatos y probar animaciones
    gatoB = this.add.sprite(160, 520, 'gatoB');
    gatoB.setScale(0.25, 0.25);

    gatoA = this.add.sprite(840, 220, 'gatoA');
    gatoA.setScale(0.25, 0.25);
    
    // Cambiar de animación con interacción
    //gatoB
    this.input.keyboard.on('keydown-RIGHT', () => gatoB.play('caminar_drchB'));
    this.input.keyboard.on('keydown-LEFT', () => gatoB.play('caminar_izqB'));
    this.input.keyboard.on('keydown-UP', () => gatoB.play('espaldasB'));
    this.input.keyboard.on('keydown-DOWN', () => gatoB.play('frenteB'));
    this.input.keyboard.on('keydown-SPACE', () => gatoB.play('pescar_drchB'));

    //gatoA
    this.input.keyboard.on('keydown-D', () => gatoA.play('caminar_drchA'));
    this.input.keyboard.on('keydown-A', () => gatoA.play('caminar_izqA'));
    this.input.keyboard.on('keydown-W', () => gatoA.play('espaldasA'));
    this.input.keyboard.on('keydown-S', () => gatoA.play('frenteA'));
    this.input.keyboard.on('keydown-Q', () => gatoA.play('pescar_izqA'));
    
    // Activar colisión con el mundo
    gatoA.setColliderWorldBounds(true); 
    gatoB.setColliderWorldBounds(true); 
}

// Función update que se ejecuta en cada fotograma (60 veces por segundo por defecto)
// time es el tiempo transcurrido desde el inicio del juego
// delta es el tiempo en milisegundos desde el último fotograma
update(time, delta) {
    // Aquí puedes actualizar la posición de los objetos, detectar colisiones, etc.
    if(this.input.keyboard.on('keydown-RIGHT')){
        gatoB.setVelocity(100);
    }
}
} 