class Iniciarsesion extends Phaser.Scene {
    constructor() {
        super('Iniciarsesion');
    }
  
    preload() {
      // Cargar recursos como imágenes y sonidos aquí
      this.load.image("Mapa_fondo","assets/Mapas/fondo.png")
    }
  
    create() {
      //this.add.text(300, 200, 'Iniciar Sesión', { fontSize: '32px', color: '#fff' });
      const background = this.add.image(config.width / 2, config.height / 2, 'Mapa_fondo');
      background.setScale(config.width / background.width, config.height / background.height); // Escalar fondo
      
      this.createHTMLForms();

      this.toggleButton = this.add.text(config.width / 2, 180, 'Cambiar a Registro', { fontSize: '24px', color: '#ff0' })
            .setInteractive()
            .on('pointerdown', () => this.toggleForm());
    }
    createHTMLForms() {
        // Botones y espacios para escribir
        this.form = document.createElement('form');
        this.form.style.position = 'absolute';
        this.form.style.top = `630px`;
        this.form.style.left = `${config.width / 1.5}px`;
        this.form.style.transform = 'translate(-50%, -50%)';
        this.form.style.textAlign = 'center';

        this.usernameInput = document.createElement('input');
        this.usernameInput.type = 'text';
        this.usernameInput.placeholder = 'Nombre de usuario';
        this.usernameInput.style.margin = '10px';
        this.usernameInput.style.padding = '10px';
        this.form.appendChild(this.usernameInput);

        this.passwordInput = document.createElement('input');
        this.passwordInput.type = 'password';
        this.passwordInput.placeholder = 'Contraseña';
        this.passwordInput.style.margin = '10px';
        this.passwordInput.style.padding = '10px';
        this.form.appendChild(this.passwordInput);

        this.submitButton = document.createElement('button');
        this.submitButton.type = 'button';
        this.submitButton.innerText = 'Iniciar Sesión';
        this.submitButton.style.padding = '10px 20px';
        this.submitButton.style.marginTop = '10px';
        this.submitButton.onclick = () => this.handleSubmit();
        this.form.appendChild(this.submitButton);

        document.body.appendChild(this.form);
        this.isLoginMode = true;
        
    }

    toggleForm() {
        this.isLoginMode = !this.isLoginMode;
        if (this.isLoginMode) {
            this.submitButton.innerText = 'Iniciar Sesión';
            this.toggleButton.setText('Cambiar a Registro');
        } else {
            this.submitButton.innerText = 'Registrar';
            this.toggleButton.setText('Cambiar a Inicio de Sesión');
        }
    }

    async handleSubmit() {
        const username = this.usernameInput.value;
        const password = this.passwordInput.value;

        if (this.isLoginMode) {
            // Lógica para iniciar sesión
            await this.handleLogin(username, password);
        } else {
            // Lógica para registrarse
            await this.handleRegister(username, password);
        }
    }
    //Para iniciar sesion
    async handleLogin(username, password) {
        try {
            const response = await fetch("http://localhost:8080/api/usuario/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) throw new Error('Error en el inicio de sesión');

            const result = await response.text();
            console.log(result);

            // Cambiar a la siguiente escena si el inicio de sesión es exitoso
            this.scene.start('Nivel1');
            this.form.remove();
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
        }
    }
    //Para registrar usuarios
    async handleRegister(username, password) {
    // Crear un objeto con los datos del formulario
    const userData = {
        username: username,
        password: password
    };

    try {
        const response = await fetch("http://localhost:8080/api/usuario/register", { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            // Si el servidor responde con un error, lanzar excepción
            throw new Error('Error al registrar usuario -> el response no va');
        }

        const data = await response.json(); // Ahora esto debe funcionar
        console.log('Usuario registrado correctamente:', data);

        // Cambiar a la escena del juego u otra acción
        this.scene.start('Nivel1');
        this.form.remove();
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        alert('Hubo un problema al registrar el usuario, por favor inténtalo de nuevo.');
    }
}


    shutdown() {
        if (this.form) {
            this.form.remove();
        }
    }
}