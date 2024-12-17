package com.example.demo.service;

import com.example.demo.model.*;
import com.example.demo.controller.*;
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
    public User createUser(LoginInput input) {
    	User user = new User();
    	user.setPassword(input.getPassword());
    	user.setUsername(input.getUsername());
        user.setId(idCounter++);
        user.setScore(0);
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
    public void deleteUser(String username, String password) {
    users.removeIf(user -> 
        user.getUsername().toUpperCase().equals(username.toUpperCase()) && 
        user.getPassword().toUpperCase().equals(password.toUpperCase())
    );
}

}