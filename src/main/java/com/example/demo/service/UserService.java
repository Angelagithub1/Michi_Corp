package com.example.demo.service;

import com.example.demo.model.*;
import com.example.demo.controller.*;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.io.File;

@Service
public class UserService {

    private final List<User> users = new ArrayList<>();
    private Long idCounter = 1L;
    private static final String FILE_PATH = "users.txt";


    public UserService() {
        loadUsersFromFile();
    }
    
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
        saveUsersToFile(); // Guarda los cambios en el archivo
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
            saveUsersToFile(); // Guarda los cambios en el archivo
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
            user.getUsername().equalsIgnoreCase(username) &&
            user.getPassword().equalsIgnoreCase(password)
        );
        saveUsersToFile(); // Guarda los cambios en el archivo
    }
    

    private void saveUsersToFile() {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(FILE_PATH))) {
            for (User user : users) {
                writer.write(user.getId() + "," + user.getUsername() + "," + user.getPassword() + "," + user.getScore());
                writer.newLine();
            }
        } catch (IOException e) {
            throw new RuntimeException("Error saving users to file", e);
        }
    }
    
    private void loadUsersFromFile() {
        File file = new File(FILE_PATH);
        if (!file.exists()) {
            return;
        }
    
        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",");
                if (parts.length == 4) {
                    Long id = Long.parseLong(parts[0]);
                    String username = parts[1];
                    String password = parts[2];
                    int score = Integer.parseInt(parts[3]);
    
                    User user = new User(id, username, password, score);
                    users.add(user);
    
                    if (id >= idCounter) {
                        idCounter = id + 1;
                    }
                }
            }
        } catch (IOException e) {
            throw new RuntimeException("Error loading users from file", e);
        }
    }
    

}