package com.example.demo.service;

import com.example.demo.model.*;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class GameService {

    private Map<Long, Game> games = new ConcurrentHashMap<>();
    private long gameIdCounter = 1;

    public Game createGame(Game game) {
        game.setId(gameIdCounter++);
        game.setStartTime(LocalDateTime.now());
        //game.setListUsuarios(game.getListUsuarios());
        games.put(game.getId(), game);
        return game;
    }

    public Game getGameById(Long id) {
        return games.get(id);
    }

    public List<Game> getAllGames() {
        return new ArrayList<>(games.values());
    }

    public Game updateGame(Long id, Game updatedGame) {
        Game game = games.get(id);
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
    
    public List<User> getPlayersByGameId(Long id){
    	Game game = games.get(id);
    	return game.getListUsuarios();
    }
}