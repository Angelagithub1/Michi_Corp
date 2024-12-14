package com.example.demo.controller;

import com.example.demo.model.usuarios;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
public class usuarioController {

    // Almacenamos los usuarios en un HashMap (esto es temporal)
    private Map<String, usuarios> users = new HashMap<>();

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    /**@PostMapping
    
    public usuarios createUser(@RequestBody usuarios user) {
        users.put(user.getUsername(), user);  // Almacenamos el usuario en el mapa
        return user;
    }/* */

    // Para registrar usuario
    @PostMapping("/register")
    public usuarios registerUser(@RequestBody usuarios user) {
        if (users.containsKey(user.getUsername())) {
            throw new RuntimeException("El usuario ya existe.");
        }
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);
        user.setPassword(encoder.encode(user.getPassword())); // Hashear la contraseña
        users.put(user.getUsername(), user);
        return user;
    }

    // Inicio de sesión
    @PostMapping("/login")
    public Map<String, String> loginUser(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        // Buscar el usuario en el mapa (o la base de datos)
        usuarios user = users.get(username);
        if (user == null) {
            throw new RuntimeException("Usuario no encontrado.");
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);
        if (!encoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta.");
        }

        // Crear la respuesta con ID y username
        Map<String, String> response = new HashMap<>();
        response.put("id", user.getId().toString());
        response.put("username", user.getUsername());

        return response; // Esto será enviado como JSON al cliente
    }

    @GetMapping("/{username}")
    public usuarios getUser(@PathVariable String username) {
        return users.get(username);  // Recuperamos el usuario por su nombre
    }

    @PutMapping("/{username}")
    public usuarios updateUser(@PathVariable String username, @RequestBody usuarios updatedUser) {
        usuarios existingUser = users.get(username);
        if (existingUser != null) {
            existingUser.setPassword(updatedUser.getPassword());
            existingUser.setScore(updatedUser.getScore());
        }
        return existingUser;
    }

    @DeleteMapping("/{username}")
    public String deleteUser(@PathVariable String username) {
        users.remove(username);
        return "User with username " + username + " deleted successfully!";
    }

    @GetMapping
    public Map<String, usuarios> getAllUsers() {
        return users;  // Retorna todos los usuarios
    }


    //Para ver si funciona segun carlos
    @PostMapping
    /* *
public usuarios registerUser(@RequestBody usuarios user) {
    System.out.println("Intentando registrar usuario: " + user.getUsername());
    if (users.containsKey(user.getUsername())) {
        throw new RuntimeException("El usuario ya existe.");
    }
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);
    user.setPassword(encoder.encode(user.getPassword())); // Hashear la contraseña
    users.put(user.getUsername(), user);
    System.out.println("Usuario registrado: " + user.getUsername());
    return user;
}*/

@PostMapping("/login")
public String loginUser(@RequestBody Map<String, String> loginData) {
    String username = loginData.get("username");
    String password = loginData.get("password");
    System.out.println("Intentando iniciar sesión: " + username);

    usuarios user = users.get(username);
    if (user == null) {
        throw new RuntimeException("Usuario no encontrado.");
    }

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);
    if (!encoder.matches(password, user.getPassword())) {
        throw new RuntimeException("Contraseña incorrecta.");
    }

    System.out.println("Inicio de sesión exitoso para usuario: " + username);
    return "Inicio de sesión exitoso.";
}
@GetMapping("/all")
public Map<String, usuarios> getAllUsers() {
    return users;
}


}

/*
// Codigo sin modificaciones
    @PostMapping
    public usuarios createUser(@RequestBody usuarios user) {
        users.put(user.getUsername(), user);  // Almacenamos el usuario en el mapa
        return user;
    }

    @GetMapping("/{username}")
    public usuarios getUser(@PathVariable String username) {
        return users.get(username);  // Recuperamos el usuario por su nombre
    }

    @PutMapping("/{username}")
    public usuarios updateUser(@PathVariable String username, @RequestBody usuarios updatedUser) {
        usuarios existingUser = users.get(username);
        if (existingUser != null) {
            existingUser.setPassword(updatedUser.getPassword());
            existingUser.setScore(updatedUser.getScore());
        }
        return existingUser;
    }

    @DeleteMapping("/{username}")
    public String deleteUser(@PathVariable String username) {
        users.remove(username);
        return "User with username " + username + " deleted successfully!";
    }

    @GetMapping
    public Map<String, usuarios> getAllUsers() {
        return users;  // Retorna todos los usuarios
    }
}
 */