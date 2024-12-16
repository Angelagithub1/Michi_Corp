package com.example.demo.model;

public record ChatMessage(int id, String text) {
    
    public int getId() {
        return id;
    }

    public String getText() {
        return text;
    }
}
