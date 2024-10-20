# Purrfect Catch - Game Design Document (GDD)

## 1. Introducción
**Purrfect Catch** es un videojuego competitivo para dos jugadores en el que cada uno asume el rol de un gato pescador. El objetivo es obtener el mayor puntaje posible capturando peces en un tiempo limitado. La pesca se desarrolla en la misma pantalla, donde cada jugador compite por espacio y puntos.

### 1.1. Concepto del juego
Juego competitivo, donde los jugadores pescan en pantalla compartida, evitando peces malos y aprovechando las mecánicas para ganar.

### 1.2. Características principales
- Juego para 2 jugadores en local.
- Diferentes tipos de peces, con efectos variados.
- 3 niveles de dificultad creciente.
- Estilo visual cartoon en 2D.

### 1.3. Género
Party game y competitivo.

### 1.4. Propósito y público objetivo
Fomentar la competencia amistosa, accesible para todo público, desde niños hasta jugadores casuales.

### 1.5. Jugabilidad
- El jugador controla un gato pescador, moviéndose libremente en todas direcciones.
- Se pesca tocando los peces, sumando o restando puntos según el tipo de pez.
- Partidas rápidas de entre 1:00 a 1:30 minutos por nivel.

### 1.6. Estilo visual
- Estilo visual cartoon en 2D con colores vivos.
- Inspiración en juegos como *Mario Party* y *Wii Party*.

### 1.7. Alcance
Enfocado en PC, pero con posibilidad de expansión a otras plataformas.

### 1.8. Plataforma
Juego desarrollado inicialmente para ordenador, con multijugador local.

### 1.9. Categoría
Competitivo, casual y accesible.

## 2. Niveles
### 2.1. Objetivo
Obtener más puntos que el jugador rival pescando más peces buenos y evitando los malos.

### 2.2. Fin de Nivel
Gana el jugador con más puntos al finalizar el tiempo. Si ambos jugadores tienen 0 puntos o están empatados, el juego termina en empate.

### 2.3. Nivel 1 – Descampado
Los jugadores cruzan puentes para recoger peces que saltan del río.

### 2.4. Nivel 2 – Juego de Mesa
Los peces saltan de una mesa inundada y los jugadores se mueven por las plataformas.

### 2.5. Nivel 3 – Galaxia
Los peces nadan en una galaxia giratoria, saltando hacia los pasillos de una estación espacial.

## 3. Personajes – Ítems
### 3.1. Personajes
- **Menta**: Gato naranja con ojos verdes y traje de pescador.
- **Chocolate**: Gato blanco con manchas negras y traje oscuro.

### 3.2. Ítems
- **Pez Común**: +1 punto.
- **Piraña**: -3 puntos.
- **Pez Globo**: +2 puntos si no está inflado, -2 puntos si lo está, y ralentiza al personaje.
- **Anguila**: Inmoviliza al personaje durante 5 segundos.

## 4. Mecánicas
### 4.1. Jugabilidad
Los jugadores se mueven libremente por el escenario, recogiendo peces buenos y esquivando los malos.

### 4.2. Flujo del Juego
Cada partida dura entre 1:00 y 1:30 minutos. Se elige un nivel y se inicia la competencia.

### 4.3. Movimientos y Físicas
- Movimiento libre en todas las direcciones.
- Los peces malos desaparecen tras un tiempo si no son capturados.
- Dificultad progresiva con más peces malos y mayor velocidad en niveles superiores.

## 5. Estados e Interfaces
- **Pantalla de Inicio**: Opción de jugar o configurar.
- **Pantalla de Selección de Niveles**: Desbloqueo progresivo de niveles.
- **Pantalla de Configuración**: Personalización del juego.
- **Pantalla de Pausa**: Regreso a configuración, selección de nivel o pantalla de inicio.
- **Pantalla de Victoria/Derrota**: Muestra el ganador al final de la partida.

## 6. Comunicación en Red
- El juego se ejecuta en una red local bajo una arquitectura cliente-servidor.
- Los datos transmitidos incluyen las posiciones de los personajes, acciones de los jugadores y eventos del juego.

## 7. Análisis DAFO
### Fortalezas
- Accesibilidad, temática amigable, competitividad local, partidas cortas, progresión y aumento de dificultad.
  
### Oportunidades
- Expansión de contenido, multijugador en línea, merchandising, compatibilidad multiplataforma, eventos y torneos.

### Debilidades
- Falta de profundidad a largo plazo, limitado a multijugador local, rejugabilidad condicionada.

### Amenazas
- Competencia con otros party games, saturación del mercado de juegos casuales, desinterés de jugadores hardcore, dependencia de interacciones locales.

## Enlaces
- [Repositorio del Proyecto](https://github.com/Angelagithub1)
