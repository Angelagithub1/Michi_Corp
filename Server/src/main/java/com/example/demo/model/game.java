package com.example.demo.model;

import java.time.LocalDateTime;

public class game {
    private Long id;
    private String mapType;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String winner;  // El nombre del ganador
    private String loser;   // El nombre del perdedor
    private int duration;   // Duración en segundos

    // Constructor
    public game(Long id, String mapType, LocalDateTime startTime, LocalDateTime endTime, String winner, String loser, int duration) {
        this.id = id;
        this.mapType = mapType;
        this.startTime = startTime;
        this.endTime = endTime;
        this.winner = winner;
        this.loser = loser;
        this.duration = duration;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMapType() {
        return mapType;
    }

    public void setMapType(String mapType) {
        this.mapType = mapType;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public String getWinner() {
        return winner;
    }

    public void setWinner(String winner) {
        this.winner = winner;
    }

    public String getLoser() {
        return loser;
    }

    public void setLoser(String loser) {
        this.loser = loser;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }
}
