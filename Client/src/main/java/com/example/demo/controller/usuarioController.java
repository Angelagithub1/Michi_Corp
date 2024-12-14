package com.example.demo.controller;

import com.example.demo.model.usuarios;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/usuario")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
//@CrossOrigin(origins = "http://127.0.0.1:8080")

public class usuarioController {

    // Almacenamos los usuarios en un HashMap (esto es temporal)
    private Map<String, usuarios> users = new HashMap<>();

    @Autowired
private BCryptPasswordEncoder passwordEncoder;

@PostMapping("/register")
public ResponseEntity<Map<String, String>> registerUser(@RequestBody usuarios user) {
    if (users.containsKey(user.getUsername())) {
        throw new RuntimeException("El usuario ya existe.");
    }
    user.setPassword(passwordEncoder.encode(user.getPassword())); // Usar la instancia inyectada
    users.put(user.getUsername(), user);

    Map<String, String> response = new HashMap<>();
    response.put("message", "Usuario registrado correctamente");
    response.put("username", user.getUsername());
    return ResponseEntity.ok(response);
}
/* *

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
*/
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