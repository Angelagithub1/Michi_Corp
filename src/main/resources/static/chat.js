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
        this.fetchMessages(true);
        
    }
    fetchMessages(initialLoad = false) {
        console.log("Llamando al servidor para obtener mensajes...");
        $.get(this.baseUrl, { since: initialLoad ? 0 : lastTimestamp }, (data) => {
            if (data && data.messages && data.messages.length > 0) {
                data.messages.forEach((msg) => {
                    this.displayMessage(msg.username, msg.text);
                });
                lastTimestamp = data.timestamp;
            }
        }).fail((jqXHR, textStatus, errorThrown) => {
            console.error("Error fetching messages:", textStatus, errorThrown);
        });
    }
    
/*
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
*/
    sendMessage() {
        const message = this.inputText.text.trim();
        if (!message) return;
    
        const username = 'UsuarioName';
        const payload = { message, username };
    
        console.log('Mensaje enviado', payload);
    
        $.post(`/api/chat`, payload)
        .done((response) => {
            console.log('Mensaje enviado:', response);
            this.displayMessage(response.username, response.text);
            //this.displayMessage(response.username, response.text); // Contexto correcto
        })
        .fail((jqXHR, textStatus, errorThrown) => {
            console.error('Error al enviar mensaje:', textStatus, errorThrown);
        });
    }
    displayMessage(username, text) {
        // Crear un texto para el mensaje
        const messageText = this.add.text(0, this.messageLog.list.length * 20, `[${username}] ${text}`, {
            font: '14px Arial',
            color: '#fff',
            wordWrap: { width: 280, useAdvancedWrap: true }
        }).setOrigin(0);
    
        // Agregar el texto al contenedor de mensajes
        this.messageLog.add(messageText);
    
        // Ajustar el contenedor si excede la altura visible
        if (this.messageLog.height > 180) {
            this.messageLog.y -= 20; // Desplazar hacia arriba para simular scroll
        }
    }
    


/*
     sendMessage() {
        const message = this.inputText.text.trim();
        if (!message) return;

        const username = 'UsuarioName';//jugadores[0].username;
        const payload = { message: message, 
                          username:username
        };

        console.log('Mensaje enviado', payload);

        $.post(`/api/chat`, {
            message: this.inputText.text.trim(),
            username: 'UsuarioName'
        })
        .done(function(response) {
            console.log('Mensaje enviado:', response);
            // Actualiza la vista localmente con el mensaje recibido
            displayMessage(response.username, response.text);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.error('Error al enviar mensaje:', textStatus, errorThrown);
        });
    }
    */
/*
        $.post('http://localhost:8080/api/chat', {
            message: message,
            username: username
        })
        .done(function(response) {
            console.log('Mensaje enviado:', response);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.error('Error al enviar mensaje:', textStatus, errorThrown);
        });
        *//* *
    

     displayMessage(username, text) {       //SUPUESTAMENTE ESTO DEBERIA MOSTRAR EL TEXTO
        const newMessage = `(${username}): ${text}`;
        console.log('Mostrando mensaje:', newMessage);
        // Aquí puedes añadir el mensaje al contenedor de mensajes
        const messageElement = document.createElement('div');
        messageElement.textContent = newMessage;
        document.getElementById('messageLog').appendChild(messageElement);
    }*/
    
}

