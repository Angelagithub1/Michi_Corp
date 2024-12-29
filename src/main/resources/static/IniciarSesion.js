class Iniciarsesion extends Phaser.Scene {
    constructor() {
        super( {key: "IniciarSesion"});
        this.players = []; // Lista para almacenar datos de los jugadores
        this.isLoginMode = true; // Modo actual: true -> Login, false -> Registro
        this.currentPlayer = 1; // Para rastrear el jugador actual (1 o 2)
    }

    preload() {
        // Cargar recursos como imágenes
        this.load.image("Mapa_fondo", "assets/Mapas/fondo.png");
    }

    create() {
        // Fondo de pantalla
        const background = this.add.image(config.width / 2, config.height / 2, 'Mapa_fondo');
        background.setScale(config.width / background.width, config.height / background.height);
    
        // Texto alternar formulario
        this.toggleButton = this.add.text(config.width / 2, 150, 'Cambiar para Registrar', { fontSize: '30px Arial Black', color: '#ff0' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerover', () => this.toggleButton.setColor('#888')) // Oscurece el texto
            .on('pointerout', () => this.toggleButton.setColor('#ff0'))  // Vuelve al color original
            .on('pointerdown', () => {
                this.toggleButton.setColor('#fff'); // Aclara el texto al hacer clic
                this.toggleForm();
            });
    
        // Botón para alternar al modo de eliminación
        this.deleteModeButton = this.add.text(config.width / 2, 190, 'Eliminar Usuario', { fontSize: '30px Arial Black', color: '#ff0' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerover', () => this.deleteModeButton.setColor('#888')) // Oscurece el texto
            .on('pointerout', () => this.deleteModeButton.setColor('#ff0'))  // Vuelve al color original
            .on('pointerdown', () => {
                this.deleteModeButton.setColor('#fff'); // Aclara el texto al hacer clic
                this.activateDeleteMode();
            });
    
        // Texto de jugadores conectados
        this.playersText = this.add.text(config.width / 2, 515, 'Jugadores: 0/2', { fontSize: '30px Arial Black', color: '#000' }).setOrigin(0.5);
    
        // Crear formulario HTML
        this.createHTMLForms();
    }
    

    createHTMLForms() {
        this.form = document.createElement('form');
        this.form.id = 'login-form'; // Asegúrate de que este id sea el correcto
        console.log(this.form); // Verifica que el id esté asignado correctamente
    
        // Input para nombre de usuario
        this.usernameInput = document.createElement('input');
        this.usernameInput.type = 'text';
        this.usernameInput.placeholder = 'Nombre de usuario';
        this.usernameInput.classList.add('input-field');
        this.form.appendChild(this.usernameInput);
    
        // Input para contraseña
        this.passwordInput = document.createElement('input');
        this.passwordInput.type = 'password';
        this.passwordInput.placeholder = 'Contraseña';
        this.passwordInput.classList.add('input-field');
        this.form.appendChild(this.passwordInput);
    
        // Botón de enviar (se usa para iniciar sesión o registrar)
        this.submitButton = document.createElement('button');
        this.submitButton.type = 'button';
        this.submitButton.innerText = 'Aceptar';
        this.submitButton.classList.add('submit-button');
        this.submitButton.onclick = () => this.handleSubmit();
        this.form.appendChild(this.submitButton);
    
        // Botón de eliminar (independiente, solo visible en modo eliminación)
        this.deleteActionButton = document.createElement('button');
        this.deleteActionButton.type = 'button';
        this.deleteActionButton.innerText = 'Eliminar';
        this.deleteActionButton.classList.add('submit-button');
        this.deleteActionButton.style.display = 'none'; // Oculto inicialmente
        this.deleteActionButton.onclick = () => this.handleDelete(this.usernameInput.value, this.passwordInput.value);
        this.form.appendChild(this.deleteActionButton);
    
        // Evento para controlar la visibilidad del botón "Eliminar"
        this.usernameInput.addEventListener('input', () => this.checkDeleteForm());
        this.passwordInput.addEventListener('input', () => this.checkDeleteForm());
    
        // Añadir formulario al contenedor correcto
        const gameContainer = document.getElementById('game-container');
        gameContainer.appendChild(this.form); // Añadir el formulario al contenedor
    }
    
    checkDeleteForm() {
    // Verificar si ambos campos (usuario y contraseña) están completos
    const isFormFilled = this.usernameInput.value.trim() !== '' && this.passwordInput.value.trim() !== '';
    
    // Mostrar el botón de eliminar solo si ambos campos están completos y si estamos en el modo de eliminación
    if (isFormFilled && this.isDeleteMode) {
        this.deleteActionButton.style.display = 'block'; // Mostrar el botón de eliminar
    } else {
        this.deleteActionButton.style.display = 'none'; // Ocultar el botón de eliminar
    }
}

    activateDeleteMode() {
        this.isDeleteMode = true; // Activar el modo de eliminación
        this.isLoginMode = false; // Desactivar el modo de inicio de sesión/registro

        // Ocultar el botón de iniciar sesión/registrar
        this.submitButton.style.display = 'none';

        // Ocultar el botón de "Jugar" si ya existe
        if (this.playButton) {
            this.playButton.style.display = 'none'; // Ocultar el botón de jugar
        }

        // Llamar a checkDeleteForm para verificar si los campos están completos
        this.checkDeleteForm();
    }

    toggleForm() {
        // Cambia entre el modo de inicio de sesión y el modo de registro
        this.isLoginMode = !this.isLoginMode;
        this.submitButton.innerText = this.isLoginMode ? 'Iniciar sesión' : 'Registrar';
        this.toggleButton.setText(this.isLoginMode ? 'Cambiar para Registrar' : 'Cambiar para Iniciar sesión');
   
        // Restaura el formulario a su estado inicial
        if (this.isLoginMode) {
            // Restablece el estado si estamos en modo de inicio de sesión o registro
            this.submitButton.style.display = 'block';  // Muestra el botón de aceptar
            this.deleteActionButton.style.display = 'none'; // Oculta el botón de eliminar
            this.isDeleteMode = false;
        }
    }
   
    async handleSubmit() {
        const username = this.usernameInput.value;
        const password = this.passwordInput.value;
        console.log(username, password);

        if (!username || !password) {
            alert("Por favor, completa ambos campos.");
            return;
        }

        if (this.isLoginMode) {
            await this.handleLogin(username, password);
        } else {
            await this.handleRegister(username, password);
        }
    }

    async handleDelete(username, password) {
        try {
            const response = await fetch(`/api/users/${username}/${password}`, {
                method: 'DELETE',
            });
    
            this.mostrarErrorConexionServidor(response.status);

            // Eliminar el jugador de la lista en el cliente
            this.removePlayer(username);
    
            // Limpiar los campos del formulario
            this.usernameInput.value = '';
            this.passwordInput.value = '';
        } catch (error) {
            console.error(`Error al eliminar el usuario ${username}:`, error.message);
            alert('Error al eliminar usuario.');
        }
    }
    
    
    
    removePlayer(username) {
        // Elimina el jugador de la lista
        this.players = this.players.filter(player => player.username !== username);
        
        // Actualiza el texto de jugadores
        this.playersText.setText(`Jugadores: ${this.players.length}/2`);
        
        // Si hay solo 1 jugador, elimina el botón de "Jugar"
        if (this.players.length < 2 && this.playButton) {
            this.playButton.remove();
            this.playButton = null;
        }
        
        // Si hay espacio para más jugadores, reinicia el formulario para el siguiente jugador
        if (this.players.length < 2) {
            alert(`Se ha eliminado un jugador. Ahora, ingresa el siguiente jugador.`);
            this.usernameInput.value = '';
            this.passwordInput.value = '';
            this.currentPlayer = 1; // Reiniciar la numeración de jugadores
        }
   
        // Restaurar la visibilidad de los botones después de eliminar un jugador
        this.submitButton.style.display = 'block';  // Muestra el botón de aceptar
        this.deleteActionButton.style.display = 'none'; // Oculta el botón de eliminar
        this.isDeleteMode = false;  // Desactiva el modo de eliminación
    }
   
    
    async handleLogin(username, password) {
        try {
            const body = {
                username: username,
                password: password
            };
            const response = await fetch("/api/users/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            this.mostrarErrorConexionServidor(response.status);

            //addPlayer devuelve el usuario entero porque si no es imposible acceder a las id para obtener la lista de usuarios mas adelante
            const user = await response.json();
            localStorage.setItem('user', JSON.stringify(user));
            this.addPlayer(user);

        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
            alert('Error en el inicio de sesión.');
        }
    }

    async handleRegister(username, password) {
        try {
            const body = {
                username: username,
                password: password
            };
            const response = await fetch("/api/users", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            this.mostrarErrorConexionServidor(response.status);

            const user = await response.json();
            console.log(user);
            this.addPlayer(user); 
            //this.addPlayer(username);
        } catch (error) {
            console.error('Error al registrar usuario:', error.message);
            alert('Error al registrar usuario.');
        }
    }

    addPlayer(user) {
        this.players.push(user);
        this.playersText.setText(`Jugadores: ${this.players.length}/2`);
    
        // Evitar mostrar el botón "Jugar" si ya hay 2 jugadores
        if (this.players.length === 2 && !this.isDeleteMode) {
            this.showPlayButton(); // Mostrar el botón "Jugar" solo si hay 2 jugadores y no estamos en modo eliminación
        } else {
            // Si no hay 2 jugadores, limpia el formulario para el siguiente jugador
            this.usernameInput.value = '';
            this.passwordInput.value = '';
            this.currentPlayer++;
        }
    }
    
    showPlayButton() {
        // Verifica que solo se muestre el botón de "Jugar" si hay 2 jugadores y no estamos en modo eliminación
        if (this.playButton || this.players.length !== 2 || this.isDeleteMode) return; // Evita crear múltiples botones
    
        this.playButton = document.createElement('button');
        this.playButton.innerText = 'Jugar';
        this.playButton.classList.add('submit-button');
        this.playButton.style.marginTop = '10px';
        this.playButton.onclick = () => this.startGame();
    
        this.form.appendChild(this.playButton);
    }
    
    startGame() {
        this.form.remove();
        this.registry.set('players', this.players);
        this.scene.start('Mapas'); // Cambia a la escena de mapas
    }

    shutdown() {
        if (this.form) {
            this.form.remove();
        }
    }

    mostrarErrorConexionServidor(status) {
        const httpErrors = [
            500, // Internal Server Error
            501, // Not Implemented
            502, // Bad Gateway
            503, // Service Unavailable
            504  // Gateway Timeout
        ];
        if (httpErrors.includes(status)) {
            alert("Se ha perdido la conexión con el servidor");
            // Redirige a una página HTML que tiene tu menú
            this.scene.start('MenuPrincipal');
        }
    }
}
