package com.example.demo.service;

import com.example.demo.model.game;
import com.example.demo.model.usuarios;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class gameService {

    private Map<Long, game> games = new ConcurrentHashMap<>();
    private long gameIdCounter = 1;

    public game createGame(game game) {
        game.setId(gameIdCounter++);
        game.setStartTime(LocalDateTime.now());
        //game.setListUsuarios(game.getListUsuarios());
        games.put(game.getId(), game);
        return game;
    }

    public game getGameById(Long id) {
        return games.get(id);
    }

    public List<game> getAllGames() {
        return new ArrayList<>(games.values());
    }

    public game updateGame(Long id, game updatedGame) {
        game game = games.get(id);
        if (game != null) {
            game.setMapType(updatedGame.getMapType());
            game.setWinner(updatedGame.getWinner());
            game.setLoser(updatedGame.getLoser());
            game.setEndTime(updatedGame.getEndTime());
            game.setListUsuarios(updatedGame.getListUsuarios());
        }
        return game;
    }

    public void deleteGame(Long id) {
        games.remove(id);
    }
    
    public List<usuarios> getPlayersByGameId(Long id){
    	game game = games.get(id);
    	return game.getListUsuarios();
    }
}
