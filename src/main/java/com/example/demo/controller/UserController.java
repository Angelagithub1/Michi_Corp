package com.example.demo.controller;

import com.example.demo.model.*;
import com.example.demo.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/users")
public class UserController {
	@Autowired
	 private UserService usuarioService;
   @PostMapping
   public User createUser(@RequestBody User user) {
	   return usuarioService.createUser(user); 
   }
   @PutMapping("/{id}")
   public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
       return usuarioService.updateUser(id,updatedUser);
   }
   @DeleteMapping("/{username}")
   public String deleteUser(@PathVariable Long id) {
       usuarioService.deleteUser(id);
       return "User with username " + id + " deleted successfully!";
   }
   @GetMapping("/login")
   public User getUserByLogin(@RequestBody LoginInput input) {
   	return usuarioService.getUserByLogin(input.getUsername(),input.getPassword());
   }
}