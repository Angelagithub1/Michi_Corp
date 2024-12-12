package com.example.demo.controller;

import com.example.demo.model.usuarios;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class usuarioController {

    // Almacenamos los usuarios en un HashMap (esto es temporal)
    private Map<String, usuarios> users = new HashMap<>();

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