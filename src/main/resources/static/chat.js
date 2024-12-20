$(document).ready(function () {
    const chatBox = $('#chat-box');
    const messageInput = $('#message-input');
    const sendBtn = $('#send-btn');
    let lastTimestamp = 0; // Track the last fetched timestamp

    // Base URL dynamically derived from the current browser location
    const baseUrl = `${window.location.origin}/api/chat`;

    // Fetch messages from the server
function fetchMessages() {
    console.log("Llamando al servidor para obtener mensajes...");
    $.get(baseUrl, { since: lastTimestamp }, function (data) {
        console.log("Respuesta del servidor:", data); // Verifica la estructura de la respuesta

        if (data && data.messages && data.messages.length > 0) {
            data.messages.forEach(msg => {
                console.log("Mensaje individual:", msg); // Verifica cada mensaje
                chatBox.append(`<div>${msg.username}: ${msg.text}</div>`); // Muestra nombre de usuario y texto
            });
            chatBox.scrollTop(chatBox.prop('scrollHeight')); // Desplázate hacia abajo
            lastTimestamp = data.timestamp; // Actualiza el último timestamp
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error("Error al obtener mensajes:", textStatus, errorThrown);
    });
}

    // Send a new message to the server
    function sendMessage() {
        const message = messageInput.val().trim();
        if (!message) return;
        if(this.nombreA!=null){
            const user =this.nombreA;
        }else{
            const user = 'Ninguno';
        }
        const payload={
            message:message,
            
        }
        $.post(baseUrl, payload,function(){//{ message: message }, function () {
            messageInput.val(''); // Clear the input
            fetchMessages(); // Fetch new messages
        });
    }

    // Event listeners
    sendBtn.on('click', sendMessage);
    messageInput.on('focus', () => {
        scene.chatActivo = true;
        if (scene.input) {
            scene.input.keyboard.enabled = false; // Desactiva controles del juego
        }
    });
    
    messageInput.on('blur', () => {
        scene.chatActivo = false;
        if (scene.input) {
            scene.input.keyboard.enabled = true; // Reactiva controles del juego
        }
    });
    
    // Captura las teclas y detiene la propagación al juego
    messageInput.on('keydown', (event) => {
        event.stopPropagation(); // ¡Evita que Phaser procese estas teclas!
    });
});