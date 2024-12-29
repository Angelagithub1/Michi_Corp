class Chat extends Phaser.Scene {
    constructor() {
        super('Chat');
    }
    init(data) {
        this.escenaPrevia = data.escenaPrevia; // Guardar el nombre de la escena en pausa
    }

    create() {
        // Crear chat inicialmente oculto
        // Crear un formulario de chat oculto inicialmente
        this.chatContainer = this.add.container(200, 200);

        const baseUrl = `${window.location.origin}/api/chat`;

        // Fondo para el chat
        const chatBackground = this.add.rectangle(0, 0, 300, 200, 0x333333)
            .setOrigin(0)
            .setStrokeStyle(2, 0xffffff);
        this.chatContainer.add(chatBackground);

        // Campo de entrada (simulado)
        const messageInput = this.add.rectangle(10, 150, 280, 30, 0xffffff)
            .setOrigin(0);
        this.chatContainer.add(messageInput);

        this.inputText = this.add.text(15, 155, '', {
            font: '16px Arial',
            color: '#000'
        }).setOrigin(0);
        this.chatContainer.add(this.inputText);

        // Botón para enviar mensajes
        const sendButton = this.add.text(210, 155, 'Enviar', {
            font: '16px Arial',
            fill: '#fff',
            backgroundColor: '#28a745',
            padding: { left: 5, right: 5, top: 2, bottom: 2 }
        })
        .setInteractive()
        .on('pointerdown', () => {
            const message = this.inputText.text;
            if (message.trim() !== '') {
                this.sendMessage(message);
                this.inputText.setText('');
            }
        });
        this.chatContainer.add(sendButton);

        // Contenedor de mensajes
        this.messageLog = this.add.container(10, 10);
        this.chatContainer.add(this.messageLog);

        // Detectar teclas en el chat
        this.input.keyboard.on('keydown', (event) => {
            if (this.chatContainer.visible) {
                if (event.key === 'Backspace') {
                    this.inputText.setText(this.inputText.text.slice(0, -1));
                } else if (event.key.length === 1) {
                    this.inputText.setText(this.inputText.text + event.key);
                }
            }
        });

        const sendBtn = this.add.image(600, 600, 'Enviar').setInteractive().setScale(0.8);
        sendBtn.on('click', this.sendMessage);
        messageInput.on('focus', () => {
            scene.chatActivo = true; // Usa la referencia explícita a la escena
            if (scene.input) {
                scene.input.keyboard.enabled = false; // Desactiva controles del juego
            }
        });

        messageInput.on('blur', () => {
            scene.chatActivo = false; // Usa la referencia explícita a la escena
            if (scene.input) {
                scene.input.keyboard.enabled = true; // Reactiva controles del juego
            }
        });
    
        // Captura las teclas y detiene la propagación al juego
        messageInput.on('keydown', (event) => {
            event.stopPropagation(); // ¡Evita que Phaser procese estas teclas!
            if(event.key =='Enter'){
                sendMessage();
            }
        });
        
    }

     fetchMessages(initialLoad = false) {
        console.log("Llamando al servidor para obtener mensajes...");
        $.get(this.baseUrl, { since: initialLoad ? 0 : lastTimestamp }, function (data) {
            if (data && data.messages && data.messages.length > 0) {
                data.messages.forEach(msg => {
                    chatBox.append(`<div>[${msg.username}] ${msg.text}</div>`);
                });
                chatBox.scrollTop(chatBox.prop('scrollHeight'));
                lastTimestamp = data.timestamp;
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error("Error fetching messages:", textStatus, errorThrown);
        });
    }
     sendMessage() {
        const message = this.inputText.text.trim();
        if (!message) return;

        const username = 'UsuarioName';//jugadores[0].username;
        const payload = { message: message, 
                          username:username
        };

        console.log('Mensaje enviado', payload);

        $.post(this.baseUrl, payload, () => {      //Aunque es jQuery, no depende de objetos DOM, solo necesita datos, asi que se puede seguir usando
            this.inputText.setText(''); // Reinicia el campo de entrada
            fetchMessages(); // Actualiza los mensajes desde el servidor
        }).fail((jqXHR, textStatus, errorThrow) => {
            console.error("Error al enviar el mensaje:", textStatus, errorThrow);
        });
    }
}

