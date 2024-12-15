package com.example.demo.model;

import java.time.LocalDateTime;
import java.util.*;

public class game {
    private Long id;
    private String mapType;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String winner;  // El nombre del ganador
    private String loser;   // El nombre del perdedor
    private List<usuarios> listUsuarios; //Lista de usuarios

    // Constructor
    public game(Long id, String mapType, LocalDateTime startTime, LocalDateTime endTime, String winner, String loser, int duration,  List<usuarios> listUsuarios) {
        this.id = id;
        this.mapType = mapType;
        this.startTime = startTime;
        this.endTime = endTime;
        this.winner = winner;
        this.loser = loser;
        this.listUsuarios=listUsuarios;
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
    public List<usuarios> getListUsuarios(){
    	return listUsuarios;
    }
    public void setListUsuarios(List<usuarios> listUsuarios){
    	this.listUsuarios=listUsuarios;
    }
}
