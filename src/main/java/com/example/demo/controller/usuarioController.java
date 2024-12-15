package com.example.demo.controller;

import com.example.demo.model.usuarios;
import com.example.demo.service.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/users")
public class usuarioController {

	 @Autowired
	 private usuarioService usuarioService;
    @PostMapping
    public usuarios createUser(@RequestBody usuarios user) {
       return usuarioService.createUser(user); 
    }

    @PutMapping("/{id}")
    public usuarios updateUser(@PathVariable Long id, @RequestBody usuarios updatedUser) {
        return usuarioService.updateUser(id,updatedUser);
    }

    @DeleteMapping("/{username}")
    public String deleteUser(@PathVariable Long id) {
        usuarioService.deleteUser(id);
        return "User with username " + id + " deleted successfully!";
    }
    
    @GetMapping("/login")
    public usuarios getUserByLogin(@RequestBody loginInput input) {
    	return usuarioService.getUserByLogin(input.getUsername(),input.getPassword());
    }
}