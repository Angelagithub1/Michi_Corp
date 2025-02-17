function WebSocketConnection(scene) {
	connection = new WebSocket('ws://'+ location.host +'/user');
	console.log(connection);
    connection.onopen = function() {
		console.log('Estableciendo conexion');
	}
	connection.onerror = function(e) {
		console.log('WS error: ' + e)
	}
    connection.onmessage = function (data) {
        /*
        console.log("📥 Mensaje recibido del servidor:", data.data);*/
        Datos = JSON.parse(data.data);
        if(Datos==null){ console.warn("Problema")}
    /*
        //if () {
            console.log("🎣 Renderizando pez recibido...");
            //scene.renderizarPez(Datos);
            let nuevoPez = this.peces.add.sprite(Datos.xPez, Datos.yPez, Datos.pezTipo);
            nuevoPez.body.setCollideWorldBounds(true); 
            this.peces.add(nuevoPez);
            nuevoPez.setScale(0.5);
            nuevoPez.setDepth(2); 
        //}else{
            //console.warn("Pez no visible");
        //}*/

        if (Datos.EsHost == 1) {
            host = 1;
        } else if (Datos.EsHost == 0) {
            host = 0;
        } else if (host == 1) {
            mensajeParaJ1(Datos);
        } else if (host == 0) {
            mensajeParaJ2(Datos);
        }
    };
    /*
	connection.onmessage = function(data) {
		Datos = JSON.parse(data.data);
			if (Datos.EsHost == 1) {
				host = 1;
			} else if (Datos.EsHost == 0) {
				host = 0;
			} else if (host == 1) {
				mensajeParaJ1(Datos);
			} else if (host == 0) {
				mensajeParaJ2(Datos);
			}
    }*/
	connection.onclose = function() {
		console.log('WS Conexion cerrada')
		conexionIniciada = false
        Time=0;
		
	}
}


function mensajeParaJ1(Datos) {
    //Jugador listo
    gatoBHasSelected= Datos.ready;
    gatoB.x = Datos.x;
    gatoB.y = Datos.y;
    pescarGatoB=Datos.pescar;
    //animacionGato = Datos.gato2Anims;

    Time=Datos.Time;

    pezX2=Datos.xPez;
    pezY2=Datos.yPez;
    tipoPez2=Datos.pezTipo;
    pezAnims2=Datos.animacionPez;

    explosionPezGlobo= Datos.pezGloboExplotando;
    capturaPezGlobo2 = Datos.pezGloboCapturado;
    lanzarPezGlobo2 = Datos.pezGloboLanzado;

    gatoBParalizado = Datos.jugadorParalizado;
    gatoBexplosion = Datos.jugadorExplosion;
    inventarioB = Datos.inventario;
    inventarioAbierto2= Datos.inventarioAbierto;
    puntosB = Datos.puntos;
    colisionPez2 = Datos.hasCollidedFish;
    
    ganarB = Datos.ganado;
    perderB = Datos.perdido;

    gameOnPause = Datos.pause;
    userDesconectado2 = Datos.desconectado;
    mapa2= Datos.map;
}

function mensajeParaJ2(Datos) {
    //Jugador listo
    gatoAHasSelected= Datos.ready;
    gatoA.x = Datos.x;
    gatoA.y = Datos.y;
    pescarGatoA=Datos.pescar;
    //animacionGato = Datos.gato1Anims;

    Time=Datos.Time;

    pezX1=Datos.xPez;
    pezY1=Datos.yPez;
    tipoPez1=Datos.pezTipo;
    pezAnims1=Datos.animacionPez;

    explosionPezGlobo1= Datos.pezGloboExplotando;
    capturaPezGlobo1 = Datos.pezGloboCapturado;
    lanzarPezGlobo1 = Datos.pezGloboLanzado;

    gatoAParalizado = Datos.jugadorParalizado;
    inventarioA = Datos.inventario;
    inventarioAbierto1= Datos.inventarioAbierto;
    puntosA = Datos.puntos;
    colisionPez1 = Datos.hasCollidedFish;
    
    ganarA = Datos.ganado;
    perderA = Datos.perdido;

    gameOnPause = Datos.pause;
    userDesconectado1 = Datos.desconectado;
    mapa1= Datos.map;
}
class PauseMenu extends Phaser.Scene {
    constructor() {
        super('PauseMenu');
    }

    init(data) {
        this.escenaPrevia = data.escenaPrevia; // Guardar el nombre de la escena en pausa
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

        this.load.audio("sonidoBoton", "assets/musica/SonidoBoton.mp3");
    }

    create() {
        // Fondo del menú de pausa
        this.add.image(600, 400, 'Pause_fondo').setScale(0.75);

        const sonidoBoton= this.sound.add("sonidoBoton", { loop: false, volume: 0.5 });

        //Texto Volumen
        this.add.text(535, 400, 'Volumen', {
            font: 'bold 34px Arial',
            color: '#313473',
            align: 'center',
        }).setOrigin(0.03);

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
            sonidoBoton.play();
        });
        
        botonVolver.on('pointerup', () => {
            botonVolver.setTexture('Boton_volver_normal');
            gameOnPause=false;
            this.sendH0();
            this.sendH1();
        });
        
    }
    update(){
        if(!gameOnPause){
            if (this.escenaPrevia) {
                this.scene.resume(this.escenaPrevia);
            }
            this.scene.stop(); // Detener la escena PauseMenu para evitar conflictos
        }
    }
    
sendH0(){
    //userDesconectado2=false;
    if (host == 0) {
        const data = {
            
                //Player 2 ready
                ready: gatoBHasSelected,

                //Posición del jugador
                x: gatoB.x,
                y: gatoB.y,
                pescar: pescarGatoB,
        
                Time:Time,
                
                xPez:pezX2,
                yPez:pezY2,
                pezTipo:tipoPez2,
                animacionPez:pezAnims2,

                pezGloboExplotando: explosionPezGlobo,
                pezGloboCapturado: capturaPezGlobo2, 
                pezGloboLanzado: lanzarPezGlobo2,
                
                jugadorParalizado: gatoBParalizado,
                jugadorExplosion: gatoBexplosion,
                inventario: inventarioB,
                inventarioAbierto: inventarioAbierto2,
                puntos: puntosB,
                hasCollidedFish: colisionPez2,

                ganado: ganarB,
                perdido: perderB,

                pause:gameOnPause,
                desconectado: userDesconectado2,
                map: mapa2,
                continuar:continuar
        }
        connection.send(
            JSON.stringify(data)
        );
    }
}

sendH1(){
    //userDesconectado1=false;
    if (host == 1) {
        const data={
            //Player 1 ready
            ready: gatoAHasSelected,

            //Posición del jugador
            x: gatoA.x,
            y: gatoA.y,
            pescar: pescarGatoA,
    
            Time:Time,
            
            xPez:pezX1,
            yPez:pezY1,
            pezTipo:tipoPez1,
            animacionPez:pezAnims1,

            pezGloboExplotando: explosionPezGlobo,
            pezGloboCapturado: capturaPezGlobo1, 
            pezGloboLanzado: lanzarPezGlobo1,
            
            jugadorParalizado: gatoAParalizado,
            jugadorExplosion: gatoAexplosion,
            inventario: inventarioA,
            inventarioAbierto: inventarioAbierto1,
            puntos: puntosA,
            hasCollidedFish: colisionPez1,

            ganado: ganarA,
            perdido: perderA,

            pause:gameOnPause,
            desconectado: userDesconectado1,
            map: mapa1,
            continuar:continuar
        }
        connection.send(
            JSON.stringify(data)
        );
    }
}

}