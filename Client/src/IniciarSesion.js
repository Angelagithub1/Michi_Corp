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
            const response = await fetch('/api/api/usuarioController', {
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
    handleRegister(username, password) {
    // Crear un objeto con los datos del formulario
    const userData = {
        username: username,
        password: password
    };

    // Realizar la solicitud POST para registrar al usuario
    fetch('http://localhost:8080/api/usuarioController', {
        method: 'POST', // Asegúrate de usar POST
        headers: {
            'Content-Type': 'application/json' // Indicamos que enviamos datos en formato JSON
        },
        body: JSON.stringify(userData) // Convertimos el objeto a una cadena JSON
    })
    .then(response=>response.json())
    .then(response => {
        if (!response.ok) {
            // Si la respuesta no es exitosa (status no 2xx), lanzar error
            throw new Error('Error al registrar usuario');
        }
        return response.json(); // Parseamos la respuesta JSON
    })
    .then(data => {
        console.log('Usuario registrado correctamente:', data);

        // Aquí puedes hacer lo que necesites después de registrar al usuario exitosamente,
        // como mostrar un mensaje o redirigir a otra escena
        this.scene.start('GameScene'); // Cambiar a la escena del juego, si es necesario
    })
    .catch(error => {
        console.error('Error al registrar usuario:', error); // Mostrar error si la solicitud falla
        alert('Hubo un problema al registrar el usuario, por favor inténtalo de nuevo.');
    });
}


    shutdown() {
        if (this.form) {
            this.form.remove();
        }
    }
}