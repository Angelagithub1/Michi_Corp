package com.example.demo.service;

import com.example.demo.model.*;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
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
        games.put(game.getId(), game);

        // Guardar los detalles de la nueva partida en un archivo
        saveGameToFile(game);

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

            // Guardar los detalles de la partida actualizada en el archivo
            saveGameToFile(game);
        }
        return game;
    }

    public void deleteGame(Long id) {
        games.remove(id);
    }

    public List<User> getPlayersByGameId(Long id) {
        Game game = games.get(id);
        return game.getListUsuarios();
    }

    // Método para guardar los detalles de la partida en un archivo de texto
    private void saveGameToFile(Game game) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("game_results.txt", true))) {
            String gameDetails = String.format("ID: %d, Mapa: %s, Inicio: %s, Fin: %s, Ganador: %s, Perdedor: %s, Jugadores: %s\n",
                    game.getId(),
                    game.getMapType(),
                    game.getStartTime(),
                    game.getEndTime(),
                    game.getWinner(),
                    game.getLoser(),
                    getUsernames(game.getListUsuarios()));

            writer.write(gameDetails);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Convertir la lista de usuarios a un formato de nombres
    private String getUsernames(List<User> users) {
        StringBuilder usernames = new StringBuilder();
        for (User user : users) {
            if (usernames.length() > 0) {
                usernames.append(", ");
            }
            usernames.append(user.getUsername());
        }
        return usernames.toString();
    }
}
