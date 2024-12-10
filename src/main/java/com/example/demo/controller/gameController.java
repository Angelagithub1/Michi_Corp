package com.example.demo.controller;

import com.example.demo.model.game;
import com.example.demo.service.gameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
public class gameController {

    @Autowired
    private gameService gameService;

    @PostMapping
    public game createGame(@RequestBody game game) {
        return gameService.createGame(game);
    }

    @GetMapping("/{id}")
    public game getGame(@PathVariable Long id) {
        return gameService.getGameById(id);
    }

    @GetMapping
    public List<game> getAllGames() {
        return gameService.getAllGames();
    }

    @PutMapping("/{id}")
    public game updateGame(@PathVariable Long id, @RequestBody game updatedGame) {
        return gameService.updateGame(id, updatedGame);
    }

    @DeleteMapping("/{id}")
    public String deleteGame(@PathVariable Long id) {
        gameService.deleteGame(id);
        return "Game with ID " + id + " deleted successfully!";
    }
}
