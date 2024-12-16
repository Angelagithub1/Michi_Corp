class Iniciarsesion extends Phaser.Scene {
    constructor() {
        super('Iniciarsesion');
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
        this.toggleButton = this.add.text(config.width / 2, 180, 'Switch to Register', { fontSize: '30px Arial Black', color: '#ff0' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => this.toggleForm());

        //Eliminar usuario
        this.deleteButton = this.add.text(config.width / 2, 220, 'Delete Usser', { fontSize: '30px Arial Black', color: '#ff0' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                const username = this.usernameInput.value;
                const password = this.passwordInput.value;
                this.handleDelete(username, password);
            });

        // Texto de jugadores conectados
        this.playersText = this.add.text(config.width / 2, 515, 'Players: 0/2', { fontSize: '30px Arial Black', color: '#000' }).setOrigin(0.5);

        // Crear formulario HTML
        this.createHTMLForms();
    }

    createHTMLForms() {
        this.form = document.createElement('form');
        this.form.id = 'login-form';

        // Input para nombre de usuario
        this.usernameInput = document.createElement('input');
        this.usernameInput.type = 'text';
        this.usernameInput.placeholder = 'User Name';
        this.usernameInput.classList.add('input-field');
        this.form.appendChild(this.usernameInput);

        // Input para contraseña
        this.passwordInput = document.createElement('input');
        this.passwordInput.type = 'password';
        this.passwordInput.placeholder = 'Password';
        this.passwordInput.classList.add('input-field');
        this.form.appendChild(this.passwordInput);

        // Botón de enviar
        this.submitButton = document.createElement('button');
        this.submitButton.type = 'button';
        this.submitButton.innerText = 'Submit';
        this.submitButton.classList.add('submit-button');
        this.submitButton.onclick = () => this.handleSubmit();
        this.form.appendChild(this.submitButton);

        // Añadir formulario al body
        document.body.appendChild(this.form);
    }

    toggleForm() {
        this.isLoginMode = !this.isLoginMode;
        this.submitButton.innerText = this.isLoginMode ? 'Login' : 'Register';
        this.toggleButton.setText(this.isLoginMode ? 'Switch to Register' : 'Switch to Login');
    }

    async handleSubmit() {
        const username = this.usernameInput.value;
        const password = this.passwordInput.value;

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

    async handleDelete(username,password){
        try {
            await this.UsserExist(username,password);
            const response = await fetch(`http://localhost:8080/api/users/${username}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) throw new Error('Error en al eliminar el usuario');

            alert(`Usuario ${username} eliminado con éxito.`);
            this.usernameInput.value = '';
            this.passwordInput.value = '';
        } catch (error) {
            console.error(`Error al eliminar el usuario ${username}:`, error.message);
            alert('Error al eliminar usuario.');
        }
    }

    async UsserExist(username,password){
        try {
            const response = await fetch(`http://localhost:8080/api/users/exist?username=${username}&password=${password}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) throw new Error('El usuario no existe');
        } catch (error) {
            console.error(`Error al buscar al usuario ${username}:`, error.message);
            alert('Error al buscar el usuario.');
            throw error;
        }
    }

    async handleLogin(username, password) {
        try {
            const response = await fetch("http://localhost:8080/api/users/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) throw new Error('Error en el inicio de sesión');

            //addPlayer devuelve el usuario entero porque si no es imposible acceder a las id para obtener la lista de usuarios mas adelante
            const user = await response.json(); 
            this.addPlayer(user); 
            //this.addPlayer(username);
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
            alert('Error en el inicio de sesión.');
        }
    }

    async handleRegister(username, password) {
        try {
            const response = await fetch("http://localhost:8080/api/users", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) throw new Error('Error al registrar el usuario');

            const user = await response.json(); 
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

        if (this.players.length === 2) {
            this.showPlayButton();
        } else {
            // Limpia el formulario para el siguiente jugador
            this.usernameInput.value = '';
            this.passwordInput.value = '';
            alert(`Jugador ${this.currentPlayer} registrado. Ahora, ingresa el siguiente jugador.`);
            this.currentPlayer++;
        }
    }

    showPlayButton() {
        if (this.playButton) return; // Evita crear múltiples botones

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
        this.scene.start('Mapa'); // Cambia a la escena de mapas
    }

    shutdown() {
        if (this.form) {
            this.form.remove();
        }
    }
}
