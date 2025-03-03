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

        Datos = JSON.parse(data.data);
        if(Datos==null){ console.warn("Problema")}


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
    Time=Datos.Time;
    pezX=Datos.xPez;
    pezY=Datos.yPez;
    tipoPez2=Datos.pezTipo;
    gameOnPause2 = Datos.pause;
    userDesconectado2 = Datos.desconectado;
    mapa2= Datos.map;
    continuar=Datos.continuar;
    PezGloboDir2=Datos.LanzamientoDir;

}


function mensajeParaJ2(Datos) {
    //Jugador listo
    gatoAHasSelected= Datos.ready;
    gatoA.x = Datos.x;
    gatoA.y = Datos.y;
    pescarGatoA=Datos.pescar;

    Time= Datos.Time;

    pezX=Datos.xPez;
    pezY=Datos.yPez;
    tipoPez1=Datos.pezTipo;
    gameOnPause1 = Datos.pause;
    userDesconectado1 = Datos.desconectado;
    mapa1= Datos.map;
    continuar=Datos.continuar;
    PezGloboDir1=Datos.LanzamientoDir;

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
    
    sendH0() {
        userDesconectado2=true;    
        const data = {
            ready: gatoBHasSelected,
            x: gatoB.x,
            y: gatoB.y,
            pescar: pescarGatoB,
            Time:Time,
            xPez: pezX,
            yPez: pezY,
            pezTipo:tipoPez2,
            pause: gameOnPause2,
            desconectado: userDesconectado2,
            map:mapa2,
            continuar: continuar,
            LanzamientoDir:PezGloboDir2
        };
        console.log("Tiempo:",data.Time)
        connection.send(JSON.stringify(data));
    }

    
    sendH1() {
        userDesconectado1=true;    
        const data = {
            ready: gatoAHasSelected,
            x: gatoA.x,
            y: gatoA.y,
            pescar: pescarGatoA,
            Time:Time,
            xPez: pezX,
            yPez: pezY,
            pezTipo:tipoPez1,
            pause: gameOnPause1,
            desconectado: userDesconectado1,
            map:mapa1,
            continuar: continuar,
            LanzamientoDir: PezGloboDir1
        };
        console.log("Tiempo",data.Time);
        connection.send(JSON.stringify(data));
    }

}