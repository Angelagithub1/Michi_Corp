function WebSocketConnection() {
	connection = new WebSocket('ws://'+ location.host +'/user');
	console.log(connection);
    connection.onopen = function() {
		console.log('Estableciendo conexion');
	}
	connection.onerror = function(e) {
		console.log('WS error: ' + e)
	}
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
    }
	connection.onclose = function() {
		console.log('WS Conexion cerrada')
		conexionIniciada = false
		
	}
}

function mensajeParaJ1(Datos) {
    //Jugador listo
    gatoBHasSelected= Datos.ready;
    gatoB.x = Datos.x;
    gatoB.y = Datos.y;
    pescarGatoB=Datos.pescar;

    Time = Datos.Time;

    pezX=Datos.xPez;
    pezY=Datos.yPez;

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

    gameOnPause2 = Datos.pause;
    userDesconectado2 = Datos.desconectado;
    mapa2= Datos.map;
    continuar=Datos.continuar;
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

    explosionPezGlobo1= Datos.pezGloboExplotando;
    capturaPezGlobo1 = Datos.pezGloboCapturado;
    lanzarPezGlobo1 = Datos.pezGloboLanzado;

    gatoAParalizado = Datos.jugadorParalizado;
    gatoAexplosion = Datos.jugadorExplosion;
    inventarioA = Datos.inventario;
    inventarioAbierto1= Datos.inventarioAbierto;
    puntosA = Datos.puntos;
    colisionPez1 = Datos.hasCollidedFish;
    
    ganarA = Datos.ganado;
    perderA = Datos.perdido;

    gameOnPause1 = Datos.pause;
    userDesconectado1 = Datos.desconectado;
    mapa1= Datos.map;
    continuar=Datos.continuar;

}


class MapaOnline extends Phaser.Scene {
    constructor() {
        super( {key: "MapaOnline"}); // Nombre de la escena
        this.connectedUsers = [];
        this.serverActive = false;
        this.threshold = 5000;
        this.connectedUsersText="";
        this.player="";
    }

    preload() {

        // Botones con 3 estado
        this.load.image("Mapa_fondo","assets/Mapas/fondo.png")

        //Boton continuar
        this.load.image('Boton_continuar_normal', 'assets/Interfaces montadas/continuar/normal.png');
        this.load.image('Boton_continuar_encima', 'assets/Interfaces montadas/continuar/seleccionado.png');
        this.load.image('Boton_continuar_pulsado', 'assets/Interfaces montadas/continuar/pulsado.png');

        //Boton atras
        this.load.image('Boton_atras_normal', 'assets/Interfaces montadas/volver/normal.png');
        this.load.image('Boton_atras_encima', 'assets/Interfaces montadas/volver/seleccionado.png');
        this.load.image('Boton_atras_pulsado', 'assets/Interfaces montadas/volver/pulsado.png');

        //Mapa descampado
        this.load.image('Descampado_normal', 'assets/Mapas/mapas_botones/Descampado/normal.png');
        this.load.image('Descampado_seleccionado', 'assets/Mapas/mapas_botones/Descampado/seleccion.png');
        this.load.image('Descampado_presionado', 'assets/Mapas/mapas_botones/Descampado/pulsado.png');

        //Mapa juego de mesa
        this.load.image('JuegoMesa_normal', 'assets/Mapas/mapas_botones/Juedo de mesa/normal.png');
        this.load.image('JuegoMesa_seleccionado', 'assets/Mapas/mapas_botones/Juedo de mesa/seleccionado.png');
        this.load.image('JuegoMesa_presionado', 'assets/Mapas/mapas_botones/Juedo de mesa/pulsado.png');

        //Mapa vortice
        this.load.image('Vortice_normal', 'assets/Mapas/mapas_botones/Vortice/bloqueado.png');
        this.load.image('Vortice_seleccionado', 'assets/Mapas/mapas_botones/Vortice/seleccionado.png');

        //Caras gatos
        this.load.image('CaraGatoA', 'assets/inventario/Menta.png');
        this.load.image('CaraGatoB', 'assets/inventario/Chocolate.png');

        //Juego
        this.load.spritesheet("gatoB","assets/sprites/gatoB.png", { frameWidth: 280, frameHeight: 600 });
        this.load.spritesheet("gatoA","assets/sprites/gatoA.png", { frameWidth: 280, frameHeight: 600 });
       
        // Cargar la música
        //this.load.audio("backgroundMusic", "assets/musica/los-peces-en-el-mar-loop-c-16730.mp3");
        this.load.audio("sonidoPezBueno", "assets/musica/RecogerPezBueno.mp3");
        this.load.audio("sonidoPezMalo", "assets/musica/RecogerPezMalo.mp3");
        this.load.audio("sonidoAnguila", "assets/musica/RecogerAnguila.mp3");
        this.load.audio("LanzamientoPezGlobo", "assets/musica/LanzamientoPezGlobo.mp3");
        this.load.audio("ExplosionPezGlobo", "assets/musica/ExplosionPezGlobo.mp3");
        this.load.audio("Pesca", "assets/musica/Pesca.mp3");

   }

   create() {
    Time = 2; // 90 segundos
    // Escala y centra el fondo
    const backgroundC = this.add.image(this.scale.width / 2, this.scale.height / 2, 'Mapa_fondo');
    backgroundC.setScale(
        Math.max(this.scale.width / backgroundC.width, this.scale.height / backgroundC.height)
    );

    const sonidoBoton= this.sound.add("sonidoBoton", { loop: false, volume: 0.5 });

    // Establece la conexión WebSocket si aún no está activa
    if (!conexionIniciada) {
        WebSocketConnection();
        conexionIniciada = true;
    }

    // Crear texto para mostrar usuarios conectados
    this.connectedUsersText = this.add.text(10, 10, "Usuarios conectados:", {
        font: "16px Arial",
        fill: "#ffffff",
    });
    this.connectedUsersText.setPosition(20, 20);

    this.player=this.add.text(10,10,"_",{
        font: "24px Arial",
        fill: "#ffffff",
    });
    this.player.setPosition(500,40);
    
    this.gatoCara=this.add.image(1000, 100,'CaraGatoA');
    this.gatoCara.setScale(0.3);
    
    backgroundC.setScale(
        Math.max(this.scale.width / backgroundC.width, this.scale.height / backgroundC.height)
    );
    
    let mapaElegido = null; 

    // MAPA DESCAMPADO
    this.DescampadoButton = this.add.image(config.width / 6, config.height / 2, 'Descampado_normal')
        .setInteractive()
        .setScale(0.7);

    this.DescampadoButton.on('pointerover', () => {
        this.DescampadoButton.setTexture('Descampado_seleccionado');
    });

    this.DescampadoButton.on('pointerout', () => {
        this.DescampadoButton.setTexture('Descampado_normal');
    });

    this.DescampadoButton.on('pointerdown', () => {
        this.DescampadoButton.setTexture('Descampado_presionado');
    });

    this.DescampadoButton.on('pointerup', async () => {
        //DescampadoButton.setTexture('Descampado_normal');
        if(host==0){
            console.log("Se asigna al host0");
            mapa2=1;
            console.log("mapa: "+mapa2);
            //this.sendH0();
        }
        if(host==1){
            console.log("Se asigna al host1");
            mapa1=1;
            console.log("mapa: "+mapa1);
            //this.sendH1();
        }
        
        
        //this.scene.start('GameLocal1');
    });



    // MAPA JUEGO DE MESA
    this.JuegoMButton = this.add.image(config.width / 2, config.height / 2, 'JuegoMesa_normal')
        .setInteractive()
        .setScale(0.7);

        this.JuegoMButton.on('pointerover', () => {
        this.JuegoMButton.setTexture('JuegoMesa_seleccionado');
    });

    this.JuegoMButton.on('pointerout', () => {
        this.JuegoMButton.setTexture('JuegoMesa_normal');
    });

    this.JuegoMButton.on('pointerdown', () => {
        this.JuegoMButton.setTexture('JuegoMesa_presionado');
    });

    this.JuegoMButton.on('pointerup', async () => {
        //JuegoMButton.setTexture('JuegoMesa_normal');
        //this.scene.start('GameLocal2');
        if(host==0){
            console.log("Se asigna al host0");
            mapa2=2;
            console.log("mapa: "+mapa2);
            //this.sendH0();
        }
        if(host==1){
            console.log("Se asigna al host1");
            mapa1=2;
            console.log("mapa: "+mapa1);
            //this.sendH1();
        }
        
        
    });

    //MAPA DE VORTICE
    this.VorticeButton = this.add.image(config.width-config.width/6, config.height / 2, 'Vortice_normal').setInteractive().setScale(0.7);
    this.VorticeButton.on('pointerover', () => {
        this.VorticeButton.setTexture('Vortice_seleccionado');
    });

    this.VorticeButton.on('pointerout', () => {
        this.VorticeButton.setTexture('Vortice_normal');
    });
    this.VorticeButton.on('pointerdown', () => {
        this.VorticeButton.setTexture('Vortice presionado');
    });

    this.VorticeButton.on('pointerup', async () => {
        //JuegoMButton.setTexture('JuegoMesa_normal');
        //this.scene.start('GameLocal2');
        if(host==0){
            console.log("Se asigna al host0");
            mapa2=3;
            console.log("mapa: "+mapa2);
            //this.sendH0();
        }
        if(host==1){
            console.log("Se asigna al host1");
            mapa1=3;
            console.log("mapa: "+mapa1);
            //this.sendH1();
        }
    });




    // Botón de continuar
    this.nextButton = this.add.image(1200, 700, 'Boton_continuar_normal')
        .setOrigin(1, 1)
        .setInteractive()
        .setScale(0.7)
        .on('pointerover', () => this.nextButton.setTexture('Boton_continuar_encima'))
        .on('pointerout', () => this.nextButton.setTexture('Boton_continuar_normal'))
        .on('pointerdown', () => this.nextButton.setTexture('Boton_continuar_pulsado'))
        .on('pointerup',()=> {
            this.nextButton.setTexture('Boton_continuar_normal');
            sonidoBoton.play();
            
            this.time.addEvent({
                delay: 1000, // Cada segundo
                callback: this.updateTimer,
                callbackScope: this,
                loop: true,
            });
            console.log("Temporizador:"+Time);

    });
    
    // BOTÓN DE RETROCEDER
    const backButton = this.add.image(0, 700, 'Boton_atras_normal')
        .setOrigin(0, 1)
        .setInteractive()
        .setScale(0.7);

    backButton.on('pointerover', () => {
        backButton.setTexture('Boton_atras_encima');
    });

    backButton.on('pointerout', () => {
        backButton.setTexture('Boton_atras_normal');
    });

    backButton.on('pointerdown', () => {
        backButton.setTexture('Boton_atras_pulsado');
    });

    backButton.on('pointerup', async () => {
        backButton.setTexture('Boton_atras_normal');
        this.scene.start('MenuPrincipal');
        
    });

    //JUEGO
    //gatos
    // Crear el gatoB
    gatoB = this.physics.add.sprite(1090, 160, 'gatoB');
    gatoB.setScale(0.25).setFrame(1);
    gatoB.setSize(280, 57); // Ajusta el tamaño del área de colisión (ancho y alto)
    gatoB.setOffset(0, 453);
    gatoB.setCollideWorldBounds(false);
    gatoB.name='GatoB';
    gatoB.canMove=true;
    gatoB.setVisible(false);

    // Crear el gatoA
    gatoA = this.physics.add.sprite(200, 620, 'gatoA');
    gatoA.setScale(0.25).setFrame(1);
    gatoA.setSize(280, 57); // Ajusta el tamaño del área de colisión (ancho y alto)
    gatoA.setOffset(0, 453);
    gatoA.setCollideWorldBounds(false); 
    gatoA.name='GatoA';
    gatoA.canMove=true;
    gatoA.setVisible(false);
    /*
    this.gatoA = this.physics.add.sprite(200, 620, "gatoA").setVisible(false);
    this.gatoB = this.physics.add.sprite(1090, 160, "gatoB").setVisible(false);

    this.pezCreado=this.physics;

    this.puntosA=0;
    this.puntosB=0;

    this.gatoAHasSelected=true;
    this.gatoBHasSelected=true;

    this.gameOnPause1=false;
    this.gameOnPause2=false;

    this.gatoA.setCollideWorldBounds(true);
    this.gatoB.setCollideWorldBounds(true);*/

}


async update(){
    if (Time <= 0) {
        this.timeUp(); // Llamar a la función para manejar el fin del tiempo
    }
    if(host==0){
        this.player.setText("Tu personaje es: Luigi");
        //gatob
        this.gatoCara.setTexture('CaraGatoA');
        this.sendH0();
    }
    if(host==1){
        this.player.setText("Tu personaje es: Mario");
        //gatoa
        this.gatoCara.setTexture('CaraGatoB');
        this.sendH1();
    }
    if(host==0){
        userDesconectado2=false;
        if(mapa2==1){
            this.DescampadoButton.setTexture('Descampado_seleccionado')
            this.JuegoMButton.setTexture('JuegoMesa_normal')
        }
        if(mapa2==2){
            this.JuegoMButton.setTexture('JuegoMesa_seleccionado');
            this.DescampadoButton.setTexture('Descampado_normal')
        }
        this.sendH0();
    }
    if(host==1){
        userDesconectado1=false;
        if(mapa1==1){
            this.DescampadoButton.setTexture('Descampado_seleccionado')
            this.JuegoMButton.setTexture('JuegoMesa_normal')
        }
        if(mapa1==2){
            this.JuegoMButton.setTexture('JuegoMesa_seleccionado');
            this.DescampadoButton.setTexture('Descampado_normal')
        }   
        this.sendH1();
    }
    if(mapa1!=null && mapa2!=null){
        //console.log("Entra");
        if(mapa1==mapa2 &&mapa1!=0){
            this.nextButton.setInteractive();
            console.log("Son iguales");
        }else{
            console.log("Mapa1:"+mapa1);
            console.log("Mapa2:"+mapa2);
            this.nextButton.disableInteractive();  
        }
    }else{
        //console.log("No se ha registrado el mapa");
        this.nextButton.disableInteractive();
        if(mapa1==null){
            console.log("El mapa1 no ha sido asignado");
        }
        if(mapa2==null){
            console.log("El mapa 2 no ha sido asignado");
        }
        if(mapa1==mapa2){
            if(mapa1==0){
                console.log("Los dos mapas siguen en 0");
            }
        }else{
            if(mapa1==0){
                console.log("El mapa1 es 0");
            }
            if(mapa2==0){
                console.log("El mapa2 es 0");
            }
        }  
    }
    
 }

 updateTimer() {
    Time -= 1; // Decrementar el tiempo restante
    // Verificar si el tiempo ha llegado a cero
}

timeUp() {
        if(mapa1==1){
            this.scene.start('GameOnline1'); // Cambia a la siguiente escena
        }
        if(mapa1==2){
            this.scene.start('GameOnline1'); // Cambia a la siguiente escena
        }
        if(host==0){this.sendH0();}
        if(host==1){this.sendH1();}
    }


    sendH0() {
        userDesconectado2=true;    
        const data = {
            //Player 2 ready
            ready: gatoBHasSelected,
        
            //Posición del jugador
            x: gatoB.x,
            y: gatoB.y,
            pescar: pescarGatoB,

            Time: Time,

            xPez: pezX,
            yPez: pezY,

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

            pause: gameOnPause2,
            desconectado: userDesconectado2,
            map:mapa2,
            continuar: continuar

        };
        console.log("Tiempo:",data.Time)
        //console.log("Enviando datos desde sendH0:", data);
        connection.send(JSON.stringify(data));
    }

    
    sendH1() {
        userDesconectado1=true;    
        const data = {
            //Player 1 ready
            ready: gatoAHasSelected,
        
            //Posición del jugador
            x: gatoA.x,
            y: gatoA.y,
            pescar: pescarGatoA,

            Time: Time,

            xPez: pezX,
            yPez: pezY,

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

            pause: gameOnPause1,
            desconectado: userDesconectado1,
            map:mapa1,

            continuar: continuar
        };
        console.log("Tiempo",data.Time);
        //console.log("Enviando datos desde sendH1:", data);
        connection.send(JSON.stringify(data));
    }

}


/*function WebSocketConnection() {
    connection = new WebSocket('ws://' + location.host + '/user');
    console.log(connection);

    connection.onopen = function() {
        console.log('✅ Conexión WebSocket establecida');
    };

    connection.onerror = function(e) {
        console.log('❌ WS error:', e);
    };

    connection.onmessage = function (data) {
        console.log("📥 Mensaje recibido del servidor:", data.data);
        Datos = JSON.parse(data.data);
        
        if (Datos.EsHost == 1) {
            host = 1;
        } else if (Datos.EsHost == 0) {
            host = 0;
        } 
    
        // 🔄 ACTUALIZAR ESTADO SEGÚN HOST
        if (host === 1) {
            continuarP2 = Datos.continuar; // Solo almacena el estado del otro jugador
        } else if (host === 0) {
            continuarP1 = Datos.continuar;
        }
    
        // 🛠️ DEBUG: Imprimir valores de sincronización
        console.log(`🔄 Estado actualizado -> continuarP1: ${continuarP1}, continuarP2: ${continuarP2}`);
    
        // 🏁 Verificar si ambos jugadores están listos
        verificarCambioDeEscena();
    };
    

    connection.onclose = function() {
        console.log('⚠️ WS Conexion cerrada');
        conexionIniciada = false;
    };
}

function verificarCambioDeEscena() {
    console.log("🔄 Verificando cambio de escena... P1 =", continuarP1, "P2 =", continuarP2);

    if (continuarP1 === true && continuarP2 === true) {
        console.log("🚀 Ambos jugadores listos. Iniciando el juego...");
        iniciarJuego();
    } else {
        console.log("⏳ Aún esperando que ambos jugadores presionen continuar...");
    }
}



function mensajeParaJ1(Datos) {
    //Jugador listo
    gatoBHasSelected= Datos.ready;
    gatoB.x = Datos.x;
    gatoB.y = Datos.y;
    pescarGatoB=Datos.pescar;

    Time = Datos.Time;

    pezX=Datos.xPez;
    pezY=Datos.yPez;

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

    gameOnPause2 = Datos.pause;
    userDesconectado2 = Datos.desconectado;
    mapa2= Datos.map;

    continuarP1 = Datos.continuar;

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

    gameOnPause1 = Datos.pause;
    userDesconectado1 = Datos.desconectado;
    mapa1= Datos.map;

    continuarP2 = Datos.continuar;

}

// Variables globales para el control del estado de continuar
let continuarP1 = false;
let continuarP2 = false;

class MapaOnline extends Phaser.Scene {
    constructor() {
        super( {key: "MapaOnline"}); // Nombre de la escena
        this.connectedUsers = [];
        this.serverActive = false;
        this.threshold = 5000;
        this.connectedUsersText="";
        this.player="";
    }

    preload() {

        // Botones con 3 estado
        this.load.image("Mapa_fondo","assets/Mapas/fondo.png")

        //Boton continuar
        this.load.image('Boton_continuar_normal', 'assets/Interfaces montadas/continuar/normal.png');
        this.load.image('Boton_continuar_encima', 'assets/Interfaces montadas/continuar/seleccionado.png');
        this.load.image('Boton_continuar_pulsado', 'assets/Interfaces montadas/continuar/pulsado.png');

        //Boton atras
        this.load.image('Boton_atras_normal', 'assets/Interfaces montadas/volver/normal.png');
        this.load.image('Boton_atras_encima', 'assets/Interfaces montadas/volver/seleccionado.png');
        this.load.image('Boton_atras_pulsado', 'assets/Interfaces montadas/volver/pulsado.png');

        //Mapa descampado
        this.load.image('Descampado_normal', 'assets/Mapas/mapas_botones/Descampado/normal.png');
        this.load.image('Descampado_seleccionado', 'assets/Mapas/mapas_botones/Descampado/seleccion.png');
        this.load.image('Descampado_presionado', 'assets/Mapas/mapas_botones/Descampado/pulsado.png');

        //Mapa juego de mesa
        this.load.image('JuegoMesa_normal', 'assets/Mapas/mapas_botones/Juedo de mesa/normal.png');
        this.load.image('JuegoMesa_seleccionado', 'assets/Mapas/mapas_botones/Juedo de mesa/seleccionado.png');
        this.load.image('JuegoMesa_presionado', 'assets/Mapas/mapas_botones/Juedo de mesa/pulsado.png');

        //Mapa vortice
        this.load.image('Vortice_normal','assets/Mapas/mapas_botones/Juedo de mesa/normal.png'); //'assets/Mapas/mapas_botones/Vortice/Vortice_normal.png');
        this.load.image('Vortice_seleccionado', 'assets/Mapas/mapas_botones/Juedo de mesa/seleccionado.png');//'assets/Mapas/mapas_botones/Vortice/seleccionado.png');
        this.load.image('Vortice_presionado', 'assets/Mapas/mapas_botones/Juedo de mesa/pulsado.png');//'assets/Mapas/mapas_botones/Vortice/Vortice_presionado.png');

        //Juego
        this.load.spritesheet("gatoB","assets/sprites/gatoB.png", { frameWidth: 280, frameHeight: 600 });
        this.load.spritesheet("gatoA","assets/sprites/gatoA.png", { frameWidth: 280, frameHeight: 600 });
       
        // Cargar la música
        //this.load.audio("backgroundMusic", "assets/musica/los-peces-en-el-mar-loop-c-16730.mp3");
        this.load.audio("sonidoPezBueno", "assets/musica/RecogerPezBueno.mp3");
        this.load.audio("sonidoPezMalo", "assets/musica/RecogerPezMalo.mp3");
        this.load.audio("sonidoAnguila", "assets/musica/RecogerAnguila.mp3");
        this.load.audio("LanzamientoPezGlobo", "assets/musica/LanzamientoPezGlobo.mp3");
        this.load.audio("ExplosionPezGlobo", "assets/musica/ExplosionPezGlobo.mp3");
        this.load.audio("Pesca", "assets/musica/Pesca.mp3");

        //Cara gatos
        this.load.image('CaraGatoA', 'assets/inventario/Menta.png');
        this.load.image('CaraGatoB', 'assets/inventario/Chocolate.png');

   }

   create() {
    Time = 2; // 90 segundos

    this.time.addEvent({
        delay: 5000,
        callback: this.updateConnectedUsers,
        callbackScope: this,
        loop: true,
    });
    // Escala y centra el fondo
    const backgroundC = this.add.image(this.scale.width / 2, this.scale.height / 2, 'Mapa_fondo');
    backgroundC.setScale(
        Math.max(this.scale.width / backgroundC.width, this.scale.height / backgroundC.height)
    );

    // Agregar contador visual de tiempo
this.timerText = this.add.text(600, 100, "Tiempo restante: 15", {
    font: "32px Arial",
    fill: "#ff0000"
});
this.timerText.setOrigin(0.5);

let timeLeft = 15; // Tiempo inicial

// Evento para actualizar el tiempo en pantalla cada segundo
this.time.addEvent({
    delay: 1000, // Se ejecuta cada 1 segundo
    callback: () => {
        if (timeLeft > 0) {
            timeLeft--;
            this.timerText.setText("Tiempo restante: " + timeLeft);
        }
    },
    loop: true
});

// Evento para asignar mapa automáticamente después de 15 segundos
this.time.addEvent({
    delay: 15000, // A los 15 segundos
    callback: () => {
        if (mapa1 === 0 && host === 1) {
            mapa1 = 1; // Selecciona el Descampado por defecto
            console.log("Tiempo agotado. Se asigna Descampado a host.");
            this.sendH1();
        }
        if (mapa2 === 0 && host === 0) {
            mapa2 = 1; // Selecciona el Descampado por defecto
            console.log("Tiempo agotado. Se asigna Descampado a no-host.");
            this.sendH0();
        }
    },
    loop: false
});


    const sonidoBoton= this.sound.add("sonidoBoton", { loop: false, volume: 0.5 });

    // Establece la conexión WebSocket si aún no está activa
    if (!conexionIniciada) {
        WebSocketConnection();
        conexionIniciada = true;
    }

    // Crear texto para mostrar usuarios conectados
    this.connectedUsersText = this.add.text(10, 10, "Usuarios conectados:", {
        font: "16px Arial",
        fill: "#ffffff",
    });
    this.connectedUsersText.setPosition(20, 20);

    this.player=this.add.text(10,10,"_",{
        font: "24px Arial",
        fill: "#ffffff",
    });
    this.player.setPosition(500,40);
    
    this.gatoCara=this.add.image(1000, 100,'CaraGatoA');
    this.gatoCara.setScale(0.3);


    backgroundC.setScale(
        Math.max(this.scale.width / backgroundC.width, this.scale.height / backgroundC.height)
    );
    
    let mapaElegido = null; 

    // MAPA DESCAMPADO
    this.DescampadoButton = this.add.image(config.width / 6, config.height / 2, 'Descampado_normal')
        .setInteractive()
        .setScale(0.7);

    this.DescampadoButton.on('pointerover', () => {
        this.DescampadoButton.setTexture('Descampado_seleccionado');
    });

    this.DescampadoButton.on('pointerout', () => {
        this.DescampadoButton.setTexture('Descampado_normal');
    });

    this.DescampadoButton.on('pointerdown', () => {
        this.DescampadoButton.setTexture('Descampado_presionado');
    });

    this.DescampadoButton.on('pointerup', async () => {
        //DescampadoButton.setTexture('Descampado_normal');
        if(host==0){
            console.log("Se asigna al host0");
            mapa2=1;
            console.log("mapa: "+mapa2);
            //this.sendH0();
        }
        if(host==1){
            console.log("Se asigna al host1");
            mapa1=1;
            console.log("mapa: "+mapa1);
            //this.sendH1();
        }
        
        
        //this.scene.start('GameLocal1');
    });



    // MAPA JUEGO DE MESA
    this.JuegoMButton = this.add.image(config.width / 2, config.height / 2, 'JuegoMesa_normal')
        .setInteractive()
        .setScale(0.7);

        this.JuegoMButton.on('pointerover', () => {
        this.JuegoMButton.setTexture('JuegoMesa_seleccionado');
    });

    this.JuegoMButton.on('pointerout', () => {
        this.JuegoMButton.setTexture('JuegoMesa_normal');
    });

    this.JuegoMButton.on('pointerdown', () => {
        this.JuegoMButton.setTexture('JuegoMesa_presionado');
    });

    this.JuegoMButton.on('pointerup', async () => {
        //JuegoMButton.setTexture('JuegoMesa_normal');
        //this.scene.start('GameLocal2');
        if(host==0){
            console.log("Se asigna al host0");
            mapa2=2;
            console.log("mapa: "+mapa2);
            //this.sendH0();
        }
        if(host==1){
            console.log("Se asigna al host1");
            mapa1=2;
            console.log("mapa: "+mapa1);
            //this.sendH1();
        }
        
        
    });

    //MAPA DE VORTICE
    this.VorticeButton = this.add.image(config.width-config.width/6, config.height / 2, 'Vortice_normal').setInteractive().setScale(0.7);
    this.VorticeButton.on('pointerover', () => {
        this.VorticeButton.setTexture('Vortice_seleccionado');
    });

    this.VorticeButton.on('pointerout', () => {
        this.VorticeButton.setTexture('Vortice_normal');
    });
    this.VorticeButton.on('pointerdown', () => {
        this.VorticeButton.setTexture('Vortice presionado');
    });

    this.VorticeButton.on('pointerup', async () => {
        //JuegoMButton.setTexture('JuegoMesa_normal');
        //this.scene.start('GameLocal2');
        if(host==0){
            console.log("Se asigna al host0");
            mapa2=3;
            console.log("mapa: "+mapa2);
            //this.sendH0();
        }
        if(host==1){
            console.log("Se asigna al host1");
            mapa1=3;
            console.log("mapa: "+mapa1);
            //this.sendH1();
        }
    });



    // Botón de continuar
    this.nextButton = this.add.image(1200, 700, 'Boton_continuar_normal')
        .setOrigin(1, 1)
        .setInteractive()
        .setScale(0.7)
        .on('pointerover', () => this.nextButton.setTexture('Boton_continuar_encima'))
        .on('pointerout', () => this.nextButton.setTexture('Boton_continuar_normal'))
        .on('pointerdown', () => this.nextButton.setTexture('Boton_continuar_pulsado'))
        .on('pointerup',()=> {
            this.nextButton.setTexture('Boton_continuar_normal');
            sonidoBoton.play();

            if (host === 1) {
                continuarP1 = true;
                this.sendH1();
            } else {
                continuarP2 = true;
                this.sendH0();
            }
        
            console.log("🔄 Estado después de presionar continuar: P1 =", continuarP1, " P2 =", continuarP2);
    
           //  Verificar si ambos han presionado continuar
            if (continuarP1 === true && continuarP2 === true) {
                console.log("🚀 Ambos jugadores listos. Llamando a iniciarJuego()...");
                this.iniciarJuego();
            } else {
                console.log("⏳ Esperando al otro jugador...");
            }

    });
    
    // BOTÓN DE RETROCEDER
    const backButton = this.add.image(0, 700, 'Boton_atras_normal')
        .setOrigin(0, 1)
        .setInteractive()
        .setScale(0.7);

    backButton.on('pointerover', () => {
        backButton.setTexture('Boton_atras_encima');
    });

    backButton.on('pointerout', () => {
        backButton.setTexture('Boton_atras_normal');
    });

    backButton.on('pointerdown', () => {
        backButton.setTexture('Boton_atras_pulsado');
    });

    backButton.on('pointerup', async () => {
        backButton.setTexture('Boton_atras_normal');
        this.scene.start('MenuPrincipal');
        
    });

    //JUEGO
    //gatos
    // Crear el gatoB
    gatoB = this.physics.add.sprite(1090, 160, 'gatoB');
    gatoB.setScale(0.25).setFrame(1);
    gatoB.setSize(280, 57); // Ajusta el tamaño del área de colisión (ancho y alto)
    gatoB.setOffset(0, 453);
    gatoB.setCollideWorldBounds(false);
    gatoB.name='GatoB';
    gatoB.canMove=true;
    gatoB.setVisible(false);

    // Crear el gatoA
    gatoA = this.physics.add.sprite(200, 620, 'gatoA');
    gatoA.setScale(0.25).setFrame(1);
    gatoA.setSize(280, 57); // Ajusta el tamaño del área de colisión (ancho y alto)
    gatoA.setOffset(0, 453);
    gatoA.setCollideWorldBounds(false); 
    gatoA.name='GatoA';
    gatoA.canMove=true;
    gatoA.setVisible(false);
    /*
    this.gatoA = this.physics.add.sprite(200, 620, "gatoA").setVisible(false);
    this.gatoB = this.physics.add.sprite(1090, 160, "gatoB").setVisible(false);

    this.pezCreado=this.physics;

    this.puntosA=0;
    this.puntosB=0;

    this.gatoAHasSelected=true;
    this.gatoBHasSelected=true;

    this.gameOnPause1=false;
    this.gameOnPause2=false;

    this.gatoA.setCollideWorldBounds(true);
    this.gatoB.setCollideWorldBounds(true);*/
    
/*
}

iniciarJuego() {
    console.log("✅ Ambos jugadores han presionado 'Continuar'. Iniciando juego...");

    // Cambiar escena dentro de la clase MapaOnline
    let currentScene = Phaser.Scene.get('MapaOnline');
    if (currentScene) {
        currentScene.scene.start('MenuPrincipal');
    } else {
        console.error("❌ Error: No se pudo cambiar de escena.");
    }
}


async update(){
    
    if(host==0){
        this.player.setText("Tu personaje es: Luigi");
        //gatob
        this.gatoCara.setTexture('CaraGatoA');
        this.sendH0();
    }
    if(host==1){
        this.player.setText("Tu personaje es: Mario");
        //gatoa
        this.gatoCara.setTexture('CaraGatoB');
        this.sendH1();
    }

    if(host==0){
        userDesconectado2=false;
        if(mapa2==1){
            this.DescampadoButton.setTexture('Descampado_seleccionado')
            this.JuegoMButton.setTexture('JuegoMesa_normal')
            this.VorticeButton.setTexture('Vortice_normal')
        }
        if(mapa2==2){
            this.JuegoMButton.setTexture('JuegoMesa_seleccionado');
            this.DescampadoButton.setTexture('Descampado_normal')
            this.VorticeButton.setTexture('Vortice_normal')
        }
        if(mapa2==3){
            this.VorticeButton.setTexture('Vortice_seleccionado')
            this.DescampadoButton.setTexture('Descampado_normal')
            this.JuegoMButton.setTexture('JuegoMesa_normal')
        }  
        
    }
    if(host==1){
        userDesconectado1=false;
        if(mapa1==1){
            this.DescampadoButton.setTexture('Descampado_seleccionado')
            this.JuegoMButton.setTexture('JuegoMesa_normal')
            this.VorticeButton.setTexture('Vortice_normal')
        }
        if(mapa1==2){
            this.JuegoMButton.setTexture('JuegoMesa_seleccionado');
            this.DescampadoButton.setTexture('Descampado_normal')
            this.VorticeButton.setTexture('Vortice_normal')
        }
        if(mapa1==3){
            this.VorticeButton.setTexture('Vortice_seleccionado')
            this.DescampadoButton.setTexture('Descampado_normal')
            this.JuegoMButton.setTexture('JuegoMesa_normal')
        }   
        
    }
    if(mapa1!=null && mapa2!=null){
        //console.log("Entra");
        if(mapa1==mapa2 &&mapa1!=0){
            this.nextButton.setInteractive();
            console.log("Son iguales");
        }else{
            console.log("Mapa1:"+mapa1);
            console.log("Mapa2:"+mapa2);
            this.nextButton.disableInteractive();  
        }
    }else{
        //console.log("No se ha registrado el mapa");
        this.nextButton.disableInteractive();
        
    }

    console.log("🔄 Estado en update(): P1 =", continuarP1, " P2 =", continuarP2);

    verificarCambioDeEscena();
}
async updateTimer() {
    Time -= 1; // Decrementar el tiempo restante

}

sendH0() {
    userDesconectado2 = true;
    const data = {
        ready: gatoBHasSelected,
        x: gatoB.x,
        y: gatoB.y,
        pescar: pescarGatoB,
        Time: Time,
        xPez: pezX,
        yPez: pezY,
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
        pause: gameOnPause2,
        desconectado: userDesconectado2,
        map: mapa2,
        continuar: continuarP2  // ✔ Enviar el estado de continuarP2
    };

    console.log("📤 Enviando datos desde sendH0:", JSON.stringify(data));
    connection.send(JSON.stringify(data));
}

sendH1() {
    userDesconectado1 = true;
    const data = {
        ready: gatoAHasSelected,
        x: gatoA.x,
        y: gatoA.y,
        pescar: pescarGatoA,
        Time: Time,
        xPez: pezX,
        yPez: pezY,
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
        pause: gameOnPause1,
        desconectado: userDesconectado1,
        map: mapa1,
        continuar: continuarP1  // ✔ Enviar el estado de continuarP1
    };

    console.log("📤 Enviando datos desde sendH1:", JSON.stringify(data));
    connection.send(JSON.stringify(data));
}

}

*/
