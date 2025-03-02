package com.example.demo.controller;

import com.example.demo.model.*;
import com.example.demo.service.*;

import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/api/users")
public class UserController {
	@Autowired
	 private UserService usuarioService;

   @GetMapping
   public List<User> getAllUsers() {
       return usuarioService.getAllUsers();
   }
   @GetMapping("/{username}")
   public User getUserByName(@PathVariable String username) {
    try{
       return usuarioService.getUserByName(username);
    }catch(Exception e){
        throw new RuntimeException(e.getMessage());
    }
   }
   @PostMapping
   public User createUser(@RequestBody LoginInput user) {
	   return usuarioService.createUser(user); 
   }
   @PutMapping("/{username}")
   public User updateUser(@PathVariable String username, @RequestBody User updatedUser) {
       return usuarioService.updateUser(username,updatedUser);
   }
   @DeleteMapping("/{username}/{password}")
   public String deleteUser(@PathVariable String username, @PathVariable String password) {
       usuarioService.deleteUser(username,password);
       return "User with username '" + username + "'' deleted successfully!";
   }

   /* 
   @PostMapping("/login")
   public User getUserByLogin(@RequestBody LoginInput input) {
    try{
        return usuarioService.getUserByLogin(input.getUsername(),input.getPassword());
    }catch(Exception e){
        throw new RuntimeException(e.getMessage());
    }
   }*/
   @PostMapping("/login")
   public ResponseEntity<User> getUserByLogin(@RequestBody LoginInput input, HttpServletRequest request) {
       try {
           User user = usuarioService.getUserByLogin(input.getUsername(), input.getPassword());
           request.getSession().setAttribute("username", user.getUsername()); // Guarda en sesión
           return ResponseEntity.ok(user);
       } catch (Exception e) {
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
       }
   }
   
   
   // Endpoint para registrar que un usuario ha sido visto
   @PostMapping("/seen")
   public void updateLastSeen(@RequestBody String username) {
    usuarioService.hasSeen(username);
   }

   @PostMapping("/disconnect")
   public void disconnectedUser(@RequestBody String username){
    usuarioService.disconnectUser(username);
   }
   // Endpoint para obtener usuarios conectados desde un umbral de tiempo
   @GetMapping("/connected-since/{threshold}")
   public List<String> getConnectedUsers(@PathVariable long threshold) {
       return usuarioService.connectedUsersSince(threshold);
   }
   
   // Endpoint para verificar si el servidor está activo
   @GetMapping("/status")
   public ResponseEntity<String> serverStatus() {
       return ResponseEntity.ok("active");
   }
   
   @GetMapping("/current")
        public ResponseEntity<User> getCurrentUser(HttpServletRequest request) {
        String username = (String) request.getSession().getAttribute("username");
        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        User user = usuarioService.getUserByName(username);
        return ResponseEntity.ok(user);
    }

}