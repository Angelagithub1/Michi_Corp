package com.example.demo.controller;

import com.example.demo.model.*;
import com.example.demo.service.*;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5500")
@RequestMapping("/api/users")
public class UserController {
	@Autowired
	 private UserService usuarioService;

   @GetMapping
   public List<User> getAllUsers() {
       return usuarioService.getAllUsers();
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
   @PostMapping("/login")
   public User getUserByLogin(@RequestBody LoginInput input) {
   	return usuarioService.getUserByLogin(input.getUsername(),input.getPassword());
   }
   
}