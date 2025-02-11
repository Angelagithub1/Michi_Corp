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
		//System.out.println("SESION CON ID " + session.getId() + " CERRADA");
		//sessions.remove(session.getId());

		if(sessions.size() == 2)
		{
			System.out.println("SESION DE JUEGO CERRADA");
			sessions.clear();
			//session.sendMessage(new TextMessage("SESION CERRADA"));
			//sessions.remove(session.getId(), session);
		}
		else if (sessions.size()==1)
		{
			sessions.remove(session.getId(), session);
		}

		System.out.println("SESIONES ACTIVAS: " + sessions);
	}
	
	/*private void usuariosActivos(WebSocketSession session, JsonNode node) throws IOException {
		ObjectNode counterNode = mapper.createObjectNode();
        
		counterNode.put("usuariosActivos", node.get("usuariosActivos").asInt());     

        //System.out.println("NODO: " + newNode);
        
		for(WebSocketSession participant : sessions.values()) 
		{
			participant.sendMessage(new TextMessage(counterNode.toString()));
		}
	}*/
	
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
		newNode.put("xPez", node.get("xPez").asDouble());  // Posición X del pez
		newNode.put("yPez", node.get("yPez").asDouble());  // Posición Y del pez
		

		// Información sobre los peces globos
		newNode.put("pezGloboExplotando", node.get("pezGloboExplotando").asBoolean());  // Si el pez globo está a punto de explotar
		newNode.put("pezGloboCapturado", node.get("pezGloboCapturado").asBoolean());  // Si el pez globo ha sido capturado
   	 	newNode.put("pezGloboLanzado", node.get("pezGloboLanzado").asBoolean());  // Si el pez globo ha sido lanzado a otro jugador

		// Información sobre las angilas (que paralizan al jugador)
		newNode.put("jugadorParalizado", node.get("jugadorParalizado").asBoolean());  // Si el jugador está paralizado por la anguila
		newNode.put("jugadorExplosion", node.get("jugadorExplosion").asBoolean());  // Si el jugador está paralizado por la anguila

		// Estado del inventario (peces que han sido recolectados)
		newNode.put("inventario", node.get("inventario").asInt());  // numero sobre los peces globo en el inventario
		newNode.put("inventarioAbierto", node.get("inventarioAbierto").asBoolean()); 

		// Información de puntos
		newNode.put("puntos", node.get("puntos").asDouble());  // Puntos del jugador
		
		// Registro de la última colisión con un pez
		newNode.put("hasCollidedFish", node.get("hasCollidedFish").asBoolean());
		
		// Información sobre la victoria o derrota
		newNode.put("ganado", node.get("ganado").asBoolean());
		newNode.put("perdido", node.get("perdido").asBoolean());

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
