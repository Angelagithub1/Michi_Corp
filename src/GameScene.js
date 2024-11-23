class GameScene extends Phaser.Scene {

    constructor() {
        super("Nivel1"); // Nombre único de la escena
    }

preload() {
    // Aquí es donde normalmente cargarías imágenes, sonidos, etc.
    this.load.image("escenario", "assets/Escenario/v7/Final.png");

    this.load.image("inv_sinDesplegar_normal_gatoA", "assets/inventario/inventario_sin_desplegar_normal.png");
    this.load.image("inv_sinDesplegar_normal_gatoB", "assets/inventario/inventario_sin_desplegar_normal_2.png");
    this.load.image("boton_izq", "assets/inventario/botones/abrir.png");
    this.load.image("boton_der", "assets/inventario/botones/abrir_2.png");
    this.load.image("inv_Desplegado_normal_gatoA", "assets/inventario/montada_sin_exclamacion.png");
    this.load.image("inv_Desplegado_normal_gatoB", "assets/inventario/montada_sin_exclamacion_2.png");


    this.load.spritesheet("gatoB","assets/sprites/gatoB.png", { frameWidth: 280, frameHeight: 600 });
    this.load.spritesheet("gatoA","assets/sprites/gatoA.png", { frameWidth: 280, frameHeight: 600 });
    this.load.spritesheet("piraña","assets/sprites/chimuelo_HS.png", { frameWidth: 300, frameHeight: 300 });
    this.load.spritesheet("pez","assets/sprites/Nemo_HS.png", { frameWidth: 300, frameHeight: 300 });
    this.load.spritesheet("angila","assets/sprites/chispitas_HS.png", { frameWidth: 900, frameHeight: 300 });
    this.load.spritesheet("pezGlobo","assets/sprites/puffer_HS.png", { frameWidth: 300, frameHeight: 300 });

    this.load.image('Boton_pausa_normal', 'assets/Interfaces montadas/pausa/normal.png');
    this.load.image('Boton_pausa_encima', 'assets/Interfaces montadas/pausa/pulsado.png');
    this.load.image('Boton_pausa_pulsado', 'assets/Interfaces montadas/pausa/seleccionado.png');

    // Cargar la música
    this.load.audio("backgroundMusic", "assets/musica/los-peces-en-el-mar-loop-c-16730.mp3");

}

// Función create para inicializar objetos una vez que se han cargado los recursos
create() {
    // Aquí es donde se crean y colocan los objetos en el juego (sprites, texto, etc.)
    
    // Crear la imagen y ajustarla al tamaño del escenario
    const background = this.add.image(config.width / 2, config.height / 2, 'escenario'); // Centrar la imagen
    background.setScale(config.width / background.width, config.height / background.height); // Escalar la imagen


    //Inventario A
    const inventario_Pleg_A=this.add.container(40, config.height / 2); //Contenedor de la interfaz plegada
    inventario_Pleg_A.setScale(0.4, 0.4);
    const inventarioPlegadoA = this.add.image(0, 0, 'inv_sinDesplegar_normal_gatoA');   //Imagen plegada
    inventario_Pleg_A.add([inventarioPlegadoA]);  // Añadir imagen al container
    inventario_Pleg_A.setVisible(true);       //Inicialmente se ve

    const inventario_Des_A=this.add.container(90, config.height / 2); //Contenedor de la interfaz plegada
    inventario_Des_A.setScale(0.4, 0.4);
    const inventarioDesplegadoA = this.add.image(0, 0, 'inv_Desplegado_normal_gatoA');   //Imagen plegada
    inventario_Des_A.add([inventarioDesplegadoA]);  // Añadir imagen al container
    inventario_Des_A.setVisible(false);       //Inicialmente se ve

    const botonDesplegarA = this.add.image(40, config.height / 2, 'boton_izq')
        .setInteractive() // Hacerlo interactivo
        .setScale(0.4); // Escalado del boton
        botonDesplegarA.on('pointerdown', () => {   //Desactivar visibilidad de interfaz y boton
            inventario_Pleg_A.setVisible(false);  // Alterna visibilidad
            botonDesplegarA.setVisible(false);
            inventario_Des_A.setVisible(true);
            botonPlegarA.setVisible(true);
        });
        const botonPlegarA = this.add.image(143, config.height / 2, 'boton_der')
        .setInteractive() // Hacerlo interactivo
        .setScale(0.4); // Escalado del boton
        botonPlegarA.setVisible(false);
        botonPlegarA.on('pointerdown', () => {   //Desactivar visibilidad de interfaz y boton
            inventario_Pleg_A.setVisible(true);  // Alterna visibilidad
            botonDesplegarA.setVisible(true);
            inventario_Des_A.setVisible(false);
            botonPlegarA.setVisible(false);
        });
        
        //Inventario B
        const inventario_Pleg_B=this.add.container(1240, config.height / 2); //Contenedor de la interfaz plegada
        inventario_Pleg_B.setScale(0.4, 0.4);
        const inventarioPlegadoB = this.add.image(0, 0, 'inv_sinDesplegar_normal_gatoB');   //Imagen plegada
        inventario_Pleg_B.add([inventarioPlegadoB]);  // Añadir imagen al container
        inventario_Pleg_B.setVisible(true);       //Inicialmente se ve
    
        const inventario_Des_B=this.add.container(1190, config.height / 2); //Contenedor de la interfaz plegada
        inventario_Des_B.setScale(0.4, 0.4);
        const inventarioDesplegadoB = this.add.image(0, 0, 'inv_Desplegado_normal_gatoB');   //Imagen plegada
        inventario_Des_B.add([inventarioDesplegadoB]);  // Añadir imagen al container
        inventario_Des_B.setVisible(false);       //Inicialmente se ve
    
        const botonDesplegarB = this.add.image(1240, config.height / 2, 'boton_der')
            .setInteractive() // Hacerlo interactivo
            .setScale(0.4); // Escalado del boton
            botonDesplegarB.on('pointerdown', () => {   //Desactivar visibilidad de interfaz y boton
                inventario_Pleg_B.setVisible(false);  // Alterna visibilidad
                botonDesplegarB.setVisible(false);
                inventario_Des_B.setVisible(true);
                botonPlegarB.setVisible(true);
            });
            const botonPlegarB = this.add.image(1137, config.height / 2, 'boton_izq')
            .setInteractive() // Hacerlo interactivo
            .setScale(0.4); // Escalado del boton
            botonPlegarB.setVisible(false);
            botonPlegarB.on('pointerdown', () => {   //Desactivar visibilidad de interfaz y boton
                inventario_Pleg_B.setVisible(true);  // Alterna visibilidad
                botonDesplegarB.setVisible(true);
                inventario_Des_B.setVisible(false);
                botonPlegarB.setVisible(false);
            });

    
    // Reproducir música de fondo
        const music = this.sound.add("backgroundMusic", { loop: true, volume: 0.1 });
        //music.play();
    
    // PUNTOS DE JUGADORES
    textoA=this.add.text(20,20, "PuntosA: 0");      // AJUSTAR LETRA, TAMAÑO, ETC
    textoB=this.add.text(background.width-20,20, "PuntosB: 0");      // AJUSTAR LETRA, TAMAÑO, ETC
    
    const botonPausa = this.add.image(1200, 90, 'Boton_pausa_normal').setInteractive().setScale(0.7);

    botonPausa.on('pointerover', () => {
        botonPausa.setTexture('Boton_pausa_encima');
    });

    botonPausa.on('pointerout', () => {
        botonPausa.setTexture('Boton_pausa_normal');
    });

    botonPausa.on('pointerdown', () => {
        botonPausa.setTexture('Boton_pausa_pulsado');
    });

    botonPausa.on('pointerup', () => {
        botonPausa.setTexture('Boton_pausa_normal');
        this.scene.start('PauseMenu'); // Volver al menú principal
    });
    
// Crear texto para mostrar el temporizador
this.timerText = this.add.text(config.width / 2, 20, "Tiempo: 90", { fontSize: "32px", color: "#ffffff" });
this.timerText.setOrigin(0.5, 0); // Centrar el texto horizontalmente

// Configurar el temporizador
this.remainingTime = 90; // 90 segundos
this.time.addEvent({
    delay: 1000, // Cada segundo
    callback: this.updateTimer,
    callbackScope: this,
    loop: true,
});



    puntosA=0;  // Inicializar las variables de los puntos en 0
    puntosB=0;
        
    //ANIMACIONES DE LOS GATOS
    // Animación 1: Quieto mirando al frente (frames de la fila 1)
    this.anims.create({
        key: 'frenteB',
        frames: this.anims.generateFrameNumbers('gatoB', { start: 0, end: 2 }), 
        frameRate: 5,
        repeat: -1 // Repetir infinito
    });
    this.anims.create({
        key: 'frenteA',
        frames: this.anims.generateFrameNumbers('gatoA', { start: 0, end: 2 }), 
        frameRate: 5,
        repeat: -1 // Repetir infinito
    });

    // Animación 2: Quieto de espaldas (frames de la fila 2)
    this.anims.create({
        key: 'espaldasB',
        frames: this.anims.generateFrameNumbers('gatoB', { start: 8, end: 10 }), 
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'espaldasA',
        frames: this.anims.generateFrameNumbers('gatoA', { start: 8, end: 10 }), 
        frameRate: 5,
        repeat: -1
    });

    // Animación 3: Caminando hacia la derecha (frames de la fila 3)
    this.anims.create({
        key: 'caminar_drchB',
        frames: this.anims.generateFrameNumbers('gatoB', { start: 24, end: 26 }),
        frameRate: 5, 
        repeat: -1
    });
    this.anims.create({
        key: 'caminar_drchA',
        frames: this.anims.generateFrameNumbers('gatoA', { start: 24, end: 26 }),
        frameRate: 5,
        repeat: -1
    });

    // Animación 4: Caminando hacia la izquierda (frames de la fila 4)
    this.anims.create({
        key: 'caminar_izqB',
        frames: this.anims.generateFrameNumbers('gatoB', { start: 16, end: 18 }), 
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'caminar_izqA',
        frames: this.anims.generateFrameNumbers('gatoA', { start: 16, end: 18 }), 
        frameRate: 5,
        repeat: -1
    });

    //ANIMACION DE LOS PECES
    //PIRAÑA
    this.anims.create({
        key: 'nadarP',
        frames: this.anims.generateFrameNumbers('piraña', { start: 0, end:4 }), 
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'salirP',
        frames: this.anims.generateFrameNumbers('piraña', { start: 5, end:12 }), 
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'idleP',
        frames: this.anims.generateFrameNumbers('piraña', { start: 13, end:17 }), 
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'morderP',
        frames: this.anims.generateFrameNumbers('piraña', { start: 18, end:21 }), 
        frameRate: 5,
        repeat: -1
    });

    //PEZ
    this.anims.create({
        key: 'nadarE',
        frames: this.anims.generateFrameNumbers('pez', { start: 0, end:4 }), 
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'salirE',
        frames: this.anims.generateFrameNumbers('pez', { start: 5, end:12 }), 
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'idleE',
        frames: this.anims.generateFrameNumbers('pez', { start: 13, end:15 }), 
        frameRate: 5,
        repeat: -1
    });

    //PEZ GLOBO
    this.anims.create({
        key: 'nadarPG',
        frames: this.anims.generateFrameNumbers('pezGlobo', { start: 0, end:4 }), 
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'salirPG',
        frames: this.anims.generateFrameNumbers('pezGlobo', { start: 5, end:13 }), 
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'inflarPG',
        frames: this.anims.generateFrameNumbers('pezGlobo', { start: 16, end:24 }), 
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'explotarPG',
        frames: this.anims.generateFrameNumbers('pezGlobo', { start: 25, end:29 }), 
        frameRate: 5,
        repeat: -1
    });

    //ANGILA
    this.anims.create({
        key: 'nadarA',
        frames: this.anims.generateFrameNumbers('angila', { start: 0, end:7 }), 
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'salirA',
        frames: this.anims.generateFrameNumbers('angila', { start: 8, end:19 }), 
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'idleA',
        frames: this.anims.generateFrameNumbers('angila', { start: 23, end:29 }), 
        frameRate: 5,
        repeat: -1
    });

    
    // Crear el gatoB
    gatoB = this.physics.add.sprite(1090, 90, 'gatoB');
    gatoB.setScale(0.25, 0.25).setFrame(1);
    gatoB.setCollideWorldBounds(true);
    gatoB.name='GatoB';

    // Crear el gatoA
    gatoA = this.physics.add.sprite(200, 620, 'gatoA');

    gatoA.setScale(0.25, 0.25).setFrame(1);
    gatoA.setCollideWorldBounds(true); 
    gatoA.name='GatoA';
    
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
    
    //peces
    this.peces = this.physics.add.group();

    //Colision de los gatos con los peces
    this.physics.add.overlap(gatoA, this.peces,this.destruirPeces,null,this);   //Si se chocan, se llama a la funcion 
    this.physics.add.overlap(gatoB, this.peces,this.destruirPeces,null,this);   //Si se chocan, se llama a la funcion

    //temporizador
    gatoAwait=false;
    gatoBwait=false;


    //regiones 
    arbusto = {x: 150, y: 75, width: 995, height: 620};
    
    const agua = [
        { x: 300, y: 0 ,width: 685, height: 70 },  // Región 1
        { x: 300, y: 600, width: 685, height: 120 } // Región 2
    ];
    agua.forEach(region => {
        const rect = this.add.rectangle(region.x, region.y, region.width, region.height,  0x0000ff, 0.2);
        rect.setOrigin(0, 0); // Asegura que las coordenadas comiencen desde la esquina superior izquierda
    });
    
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

    //pesca
    if (keys.Q.isDown && !gatoAwait) {
        // Activar el temporizador para gatoA
        gatoAwait = true;
        
        gatoA.setFrame(32);
        this.time.delayedCall(3000, this.aparecerPeces, [7], this);
        
    }

    if (keys.P.isDown && !gatoBwait) {
        // Activar el temporizador para gatoB
        gatoBwait= true;
        s
        gatoB.setFrame(32);
        
        this.time.delayedCall(3000, this.aparecerPeces, [7], this); // Espera 3 segundos y llama a la función
    }
    //RESTRICCIONES 
    //arbustos
     // Restringir a gatoA
    if (gatoA.x < arbusto.x) gatoA.x = arbusto.x;
    if (gatoA.x > arbusto.x + arbusto.width) gatoA.x = arbusto.x + arbusto.width;
    if (gatoA.y < arbusto.y) gatoA.y = arbusto.y;
    if (gatoA.y > arbusto.y + arbusto.height) gatoA.y = arbusto.y + arbusto.height;

    // Restringir a gatoB
    if (gatoB.x < arbusto.x) gatoB.x = arbusto.x;
    if (gatoB.x > arbusto.x + arbusto.width) gatoB.x = arbusto.x + arbusto.width;
    if (gatoB.y < arbusto.y) gatoB.y = arbusto.y;
    if (gatoB.y > arbusto.y + arbusto.height) gatoB.y = arbusto.y + arbusto.height;
    
}
aparecerPeces(cantidad) {
    if (!this.peces) {
        console.error('El grupo de peces no está definido correctamente.');
        return;
    }

    for (let i = 0; i < cantidad; i++) {
        // Elegir un tipo de pez aleatorio
        let tipoPez = Phaser.Math.RND.pick(['pez', 'piraña', 'pezGlobo', 'angila']);
        
        // Generar una posición aleatoria en el juego
        let posX = Phaser.Math.RND.between(0, this.sys.canvas.width);
        let posY = Phaser.Math.RND.between(0, this.sys.canvas.height);
        
        // Crear el pez en la posición aleatoria y asignar un tipo aleatorio
        let nuevoPez = this.peces.create(posX, posY, tipoPez);
        if (tipoPez === 'angila') {
            nuevoPez.setScale(0.25);
        }else{
            nuevoPez.setScale(0.45);
        }
        nuevoPez.setSize(0.2, 0.2)
    }
    gatoAwait = false;
    gatoBwait = false;
}

destruirPeces(gato, pez){
   // console.log('Colision detectada con un pez', pez)
    pez.destroy();  // El pez se destruye cuando uno de los jugadores lo toca
    
    
    // Dependiendo de la animacion que tenga en ese momento el pez, se identifica que es uno u otro y se aplica el efecto correspondiente
    if (pez.anims.currentAnim.key === 'idleE'){     // Pez normal
        // Dependiendo de cual de los dos gatos sea el que colisione con los peces, se actualiza un texto u otro
        if(gato.name=='GatoA'){ 
            puntosA=puntosA + 1;
            textoA.setText("Puntos: " + puntosA)
        } else if(gato.name=='GatoB'){
            puntosB=puntosB + 1;
            textoB.setText("Puntos: " + puntosB)
        }
    } else if(pez.anims.currentAnim.key === 'idleP'){   // Piraña
        if(gato.name=='GatoA'){ 
            puntosA=puntosA - 3;
            textoA.setText("Puntos: " + puntosA)
        } else if(gato.name=='GatoB'){
            puntosB=puntosB - 3;
            textoB.setText("Puntos: " + puntosB)
        }
    } else if(pez.anims.currentAnim.key === 'idleA'){   // Anguila
        if(gato.name=='GatoA'){ 
            gatoA.setVelocityX(0);
            gatoA.setVelocityY(0);
        } else if(gato.name=='GatoB'){
            puntosB=puntosB - 3;
            textoB.setText("Puntos: " + puntosB)
        }
    }   
    //console.log(puntosA);    
gato.canMove=false;
        setTimeout(()=>{
            gato.canMove=true;
        }, 5000);
    };       

//c582e58a9294c0b62866b97a2b0987c31940a

explotarPezGlobo(){
    if(gato.name=='GatoA'){ 
        puntosA=puntosA - 2;
        textoA.setText("Puntos: " + puntosA)
    } else if(gato.name=='GatoB'){
        puntosB=puntosB - 2;
        textoB.setText("Puntos: " + puntosB)
    }
};

} 