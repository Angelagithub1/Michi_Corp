package com.example.demo.controller;

import com.example.demo.model.*;
import com.example.demo.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
public class GameController {

    @Autowired
    private GameService gameService;

    @PostMapping
    public Game createGame(@RequestBody Game game) {
        return gameService.createGame(game);
    }

    @GetMapping("/{id}")
    public Game getGame(@PathVariable Long id) {
        return gameService.getGameById(id);
    }

    @GetMapping
    public List<Game> getAllGames() {
        return gameService.getAllGames();
    }
    
    @PutMapping("/{id}")
    public Game updateGame(@PathVariable Long id, @RequestBody Game updatedGame) {
        return gameService.updateGame(id, updatedGame);
    }

    @DeleteMapping("/{id}")
    public String deleteGame(@PathVariable Long id) {
        gameService.deleteGame(id);
        return "Game with ID " + id + " deleted successfully!";
    }
    
    @GetMapping("/players/game/{id}")
    public List<User> getPlayersByGame(@PathVariable Long id) {
        return gameService.getPlayersByGameId(id);
    }
}