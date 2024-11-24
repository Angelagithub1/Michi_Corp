# Purrfect Catch - Game Design Document (GDD)

## 1. Introducción
Este documento, acerca del videojuego Purrfect Catch, contiene todas las características y especificaciones del videojuego ideado para la asignatura de Juegos en Red y preparado para PC.

### 1.1. Concepto del juego
**Purrfect Catch**  es un videojuego competitivo para dos jugadores en el que cada uno asume el rol de un gato pescador. El objetivo es obtener el mayor puntaje posible capturando peces en un tiempo limitado. La pesca se desarrolla en la misma pantalla, donde cada jugador debe competir por su espacio, luchando simultáneamente por la victoria.

### 1.2. Características principales
Dentro de Purrfect Catch, los jugadores se encuentran con diferentes tipos de peces, cada uno con un valor de puntaje único y características que ofrecen ventajas o desventajas. A medida que los jugadores avanzan de un nivel a otro, la dificultad incrementa progresivamente, con la aparición de más peces perjudiciales que penalizan al jugador. Sin embargo, el tiempo de juego se mantiene constante en todos los niveles.

Para sacar peces del agua se usa la mecánica de pescar, basta con pulsar la Q (Jugador 1) o la P (Jugador 2) para ello. Al tocar el pez correcto, automáticamente se sumará la puntuación correspondiente al marcador del jugador. 
El personaje tiene libertad de movimiento en todas direcciones, lo que permite esquivar fácilmente los peces malos. Estos peces, si no son capturados, desaparecen de la pantalla automáticamente después de unos segundos, evitando la acumulación de obstáculos en la escena y el consumo innecesario de recursos.

Hay un pez especial que si es capturado puede ser lanzado al jugador contrario para atacarle. Esta mecánica equilibra el desafío, permitiendo a los jugadores concentrarse tanto en la recolección de peces buenos como en atacar al jugador contrario, mientras se evitan los malos.

### 1.3. Género
El género del juego se clasifica como party game y competitivo.

### 1.4. Propósito y público objetivo
El propósito principal del juego es ofrecer una experiencia divertida, accesible y competitiva para dos jugadores. A través de mecánicas simples con diferentes puntajes. Fomenta la competencia amistosa entre los jugadores.
Está pensado para todos los públicos, desde niños y familias hasta jugadores casuales y grupos de amigos.

### 1.5. Jugabilidad
Como ya se ha mencionado anteriormente, Purrfect Catch se compone de diferentes niveles donde el jugador debe pescar el mayor número de peces posible. El juego se divide en tres niveles, y cada partida tiene una duración un minuto y medio.
Sin embargo, cada pez presenta características únicas que afectan de diferentes formas al jugador:
- Pez Común: Este es el pez más básico y suma 1 punto al marcador del jugador cada vez que es atrapado.
- Piraña: Es un pez peligroso. Si el jugador lo captura por accidente, se le restan 3 puntos del marcador.
- Pez Globo: Este pez tiene dos posibles efectos, dependiendo de su estado:
  - Si el jugador lo captura antes de que se infle, obtiene 2 puntos. Además de poder usarlo para atacar al jugador contrario.
  - Si el pez ya está inflado cuando es atrapado, el jugador pierde 2 puntos al igual si es atacado por un pez globo.
- Anguila: Al capturarla, la anguila tiene un efecto negativo, ya que detiene al personaje durante 5 segundos.

### 1.6. Estilo visual
Se ha optado por un estilo en 2D cartoon-estilizado con colores vivos y sombras planas. En cuanto a los personajes, estos son mezclas de gatos humanizados, es decir, son gatos con una movilidad bípeda y con vestimenta de pescador. El fondo va cambiando, dependiendo del nivel. Visto desde fuera con una perspectiva cenital. Las referencias que hemos escogido para el estilo son: Mario Party, Talking Tom y Wii Party . Hemos optado por este estilo visual porque resulta más atractivo para nuestro público objetivo. Además, el estilo cartoon 2D nos permite mayor libertad y facilidad a la hora de crear los personajes y fondos.

### 1.7. Alcance
En un principio será un único juego, pero no se descarta crear una segunda parte o ampliar el juego a otras plataformas como por ejemplo la Nintendo Switch.

### 1.8. Plataforma
El juego está desarrollado para ordenador siguiendo nuestro objetivo de que se pueda jugar con amigos desde cualquier lugar.

### 1.9. Categoría
Competitivo, casual y accesible.

### 1.10. Licencia
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
- [Repositorio del Proyecto](https://github.com/nachogonvi/Pawtastic-Studios)
