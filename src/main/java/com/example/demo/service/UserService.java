package com.example.demo.service;

import com.example.demo.model.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
public class UserService {

    private final List<User> users = new ArrayList<>();
    private Long idCounter = 1L;

    // Obtener todos los usuarios
    public List<User> getAllUsers() {
        return users;
    }

    // Crear un nuevo usuario
    public User createUser(User user) {
    	user.setPassword(user.getPassword());
        user.setId(idCounter++);
        users.add(user);
        return user;
    }

    // Actualizar un usuario existente
    public User updateUser(Long id, User updatedUser) {
        Optional<User> userOptional = users.stream()
                .filter(user -> user.getId().equals(id))
                .findFirst();

        if (userOptional.isPresent()) {
            User existingUser = userOptional.get();
            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setPassword(updatedUser.getPassword());
            existingUser.setScore(updatedUser.getScore());
            return existingUser;
        } else {
            throw new RuntimeException("User not found");
        }
    }
    
    public User getUserByLogin(String userName, String password) {
    	Optional<User> matchingUser = users.stream()
                .filter(user -> user.getUsername().equals(userName) && user.getPassword().equals(password))
                .findFirst();
    	if(matchingUser.isPresent()) {
    		return matchingUser.get();
    	}else {
    		throw new RuntimeException("User not found");
    	}
    }
    // Eliminar un usuario
    public void deleteUser(Long id) {
        users.removeIf(user -> user.getId().equals(id));
    }
}