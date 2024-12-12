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
      
      this.createHTMLForm();

      const loginButton = this.add.text(config.width / 3, 130, 'Iniciar Sesión', { fontSize: '36px', color: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => this.handleLogin())
        .on('pointerup', () => {this.scene.start('Nivel1');});
    }
    createHTMLForm() {
        // Crear un contenedor de formulario con HTML
        const form = document.createElement('form');
        form.style.position = 'absolute';
        form.style.top = `630px`; // Ajustar posición
        form.style.left = `${config.width / 1.5}px`;
        form.style.transform = 'translate(-50%, -50%)';
        form.style.textAlign = 'center';

        // Campo de nombre de usuario
        const usernameInput = document.createElement('input');
        usernameInput.type = 'text';
        usernameInput.placeholder = 'Nombre de usuario';
        usernameInput.style.margin = '10px';
        usernameInput.style.padding = '10px';
        form.appendChild(usernameInput);

        // Campo de contraseña
        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.placeholder = 'Contraseña';
        passwordInput.style.margin = '10px';
        passwordInput.style.padding = '10px';
        form.appendChild(passwordInput);

        // Botón de envío del formulario
        const submitButton = document.createElement('button');
        submitButton.type = 'button';
        submitButton.innerText = 'Iniciar Sesión';
        submitButton.style.padding = '10px 20px';
        submitButton.style.marginTop = '10px';
        submitButton.onclick = () => this.handleLogin(usernameInput.value, passwordInput.value);
        form.appendChild(submitButton);

        // Agregar formulario al DOM
        document.body.appendChild(form);

        // Guardar referencia para eliminarlo más tarde
        this.form = form;
    }
    handleLogin(username, password) {
        /*
        console.log(`Usuario: ${username}, Contraseña: ${password}`);

        // Ejemplo: Enviar datos al servidor (con api.js)
        import('../src/main/java/com/example/demo/controller/usuarioController.java').then(api => {
            api.login({ username, password }).then(response => {
                console.log(response);

                // Cambiar a la escena del juego
                this.scene.start('GameScene');

                // Eliminar el formulario del DOM
                this.form.remove();
            }).catch(err => {
                console.error('Login fallido:', err);
            });
        });*/
    }
    shutdown() {
        // Asegurarse de que el formulario se elimine al salir de la escena
        if (this.form) {
            this.form.remove();
        }
    }
  }
