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
       // music.play();
    
        
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


    // Crear el gatoB
    gatoB = this.physics.add.sprite(370, 720, 'gatoB');
    gatoB.setScale(0.25, 0.25).setFrame(1);
    gatoB.setCollideWorldBounds(true);

    // Crear el gatoA
    gatoA = this.physics.add.sprite(1700, 90, 'gatoA');
    gatoA.setScale(0.25, 0.25).setFrame(1);
    gatoA.setCollideWorldBounds(true); 
    
    //cursor
    cursor = this.input.keyboard.createCursorKeys();
    keys={
        A: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        D: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        W: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        S: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
        Q: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
        P: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)
    }
    
}


update() {
    
    // MOVIMIENTO DEL GATOA
    if (keys.D.isDown) {
        gatoA.setVelocityX(160);  // Mover a la derecha
        gatoA.anims.play('caminar_drchA', true);  // Reproducir animación de caminar hacia la derecha
        izqA=false;
    } else if (keys.A.isDown) {
        gatoA.setVelocityX(-160);  // Mover a la izquierda
        gatoA.anims.play('caminar_izqA', true);  // Reproducir animación de caminar hacia la izquierda
        izqA=true; 
    }else{
        gatoA.setVelocityX(0);  // Detener el movimiento horizontal
        if (gatoA.body.velocity.y === 0) {  // Solo si no hay movimiento vertical
            if (izqA) {
                gatoA.setFrame(17);  // Frame quieto mirando hacia la izquierda
            } else {
                gatoA.setFrame(25);  // Frame quieto mirando hacia la derecha
            }
        }
    }

    if (keys.W.isDown) {
        gatoA.setVelocityY(-160);  // Mover hacia arriba
        gatoA.anims.play('espaldasA', true);  // Reproducir animación
        arribaA = true;  // Quitar el flip para que el gato vaya hacia arriba
    } else if (keys.S.isDown) {
        gatoA.setVelocityY(160);  // Mover hacia abajo
        gatoA.anims.play('frenteA', true);  // Reproducir animación
        arribaA = false;  // Quitar el flip para que el gato vaya hacia abajo
    } else {
        gatoA.setVelocityY(0); 
        if (gatoA.body.velocity.x === 0) {  // Solo si no hay movimiento horizontal
            if (arribaA) {
                gatoA.setFrame(9);  // Frame quieto mirando hacia arriba
            } else {
                gatoA.setFrame(1);  // Frame quieto mirando hacia abajo
            }
        }
    }

    // MOVIMIENTO DEL GATOB
    if (cursor.right.isDown) {
        gatoB.setVelocityX(160);  // Mover a la derecha
        gatoB.play('caminar_drchB', true);  // Reproducir animación
        izqB=false;
    } else if (cursor.left.isDown) {
        gatoB.setVelocityX(-160);  // Mover a la izquierda
        gatoB.play('caminar_izqB', true);  // Reproducir animación
        izqB=true;
    } else {
        gatoB.setVelocityX(0);  // Detener el movimiento horizontal
        if (gatoB.body.velocity.y === 0) {  // Solo si no hay movimiento vertical
            if (izqB) {
                gatoB.setFrame(17);  // Frame quieto mirando hacia la izquierda
            } else {
                gatoB.setFrame(25);  // Frame quieto mirando hacia la derecha
            }
        }
    }

    if (cursor.up.isDown) {
        gatoB.setVelocityY(-160);  // Mover hacia arriba
        gatoB.play('espaldasB', true);  // Reproducir animación
        arribaB = true;
    } else if (cursor.down.isDown) {
        gatoB.setVelocityY(160);  // Mover hacia abajo
        gatoB.play('frenteB', true);  // Reproducir animación
        arribaB = false;
    } else {
        gatoB.setVelocityY(0);  // Detener el movimiento vertical
        if (gatoB.body.velocity.x === 0) {  // Solo si no hay movimiento horizontal
            if (arribaB) {
                gatoB.setFrame(9);  // Frame quieto mirando hacia arriba
            } else {
                gatoB.setFrame(1);  // Frame quieto mirando hacia abajo
            }
        }
    }
    
}
} 