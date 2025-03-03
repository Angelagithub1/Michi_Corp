package com.example.demo;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;


public class WebsocketHandler extends TextWebSocketHandler {
    private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private ObjectMapper mapper = new ObjectMapper();
	ObjectNode host = mapper.createObjectNode();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("NUEVO JUGADOR CON ID " + session.getId() + " CONECTADO");
		host.put("EsHost", "0");
		
		if(sessions.isEmpty()) {
			sessions.put(session.getId(), session);
            host.put("EsHost", "1");
		}
		else 
		{ 
			sessions.put(session.getId(), session); 
		}
		

		String numUsers = "" + sessions.size();
		host.put("SesionesActivas", numUsers);
		
		System.out.println("HOST: " + host);
		System.out.println("SESIONES ACTIVAS: " + sessions);
		
		session.sendMessage(new TextMessage(host.toString()));
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {

		if(sessions.size() == 2)
		{
			System.out.println("SESION DE JUEGO CERRADA");
			sessions.clear();
		}
		else if (sessions.size()==1)
		{
			sessions.remove(session.getId(), session);
		}

		System.out.println("SESIONES ACTIVAS: " + sessions);
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException
	{
		JsonNode node = mapper.readTree(message.getPayload());

		System.out.println("📥 Mensaje recibido del cliente: " + node.toString());
		
		enviarInfo(session, node);
	}
	
	private void enviarInfo(WebSocketSession session, JsonNode node) throws IOException {
		ObjectNode newNode = mapper.createObjectNode();

       // Información del jugador (posición, acción, etc.)
		newNode.put("ready", node.get("ready").asBoolean());
		newNode.put("x", node.get("x").asDouble());  // Posición X del jugador
		newNode.put("y", node.get("y").asDouble());  // Posición Y del jugador
		newNode.put("pescar", node.get("pescar").asBoolean());  // Si el jugador está pescando
		newNode.put("Time",node.get("Time").asDouble());

		// Información de los peces
		newNode.put("xPez", node.get("xPez"));  // Posición X del pez
		newNode.put("yPez", node.get("yPez"));  // Posición Y del pez
		newNode.put("pezTipo", node.get("pezTipo"));//.asText());
	
		newNode.put("LanzamientoDir",node.get("LanzamientoDir").asText());
		
		// Control de juego
		newNode.put("pause", node.get("pause").asBoolean());  // Si el juego está pausado
		newNode.put("desconectado", node.get("desconectado").asBoolean());  // Si el jugador se ha desconectado
		newNode.put("map", node.get("map").asInt());

		// Información sobre boton pulsado
		newNode.put("continuar", node.get("continuar").asBoolean());

		System.out.println("📤 Enviando datos al otro jugador: " + newNode.toString());
		

        for(WebSocketSession participant : sessions.values()) {
            if(!participant.getId().equals(session.getId())) {
                participant.sendMessage(new TextMessage(newNode.toString()));
            }
        }
	}

}
