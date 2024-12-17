# Funcionalidades con API REST
Este archivo describe los detalles de la API REST del proyecto.

---

### POST http://localhost:8080/api/games
Crea un nuevo registro de un juego con los detalles especificados (mapa, jugadores, duración, etc.).

```json
{
  "id": 1,
  "mapType": "Arena",
  "startTime": "2024-12-14T15:30:00",
  "endTime": "2024-12-14T15:50:00",
  "winner": "Player1",
  "loser": "Player2",
  "duration": 1200,
  "listUsuarios": []
}
```

---

### GET http://localhost:8080/api/games/1
Obtiene los detalles del juego con ID 1.

---

### PUT http://localhost:8080/api/games/1
Actualiza el registro del juego con ID 1 incluyendo información de usuarios y resultados.

```json
{
  "id": 1,
  "mapType": "Arena",
  "startTime": "2024-12-14T20:18:42.0967742",
  "endTime": "2024-12-14T15:50:00",
  "winner": "Player1",
  "loser": "Player2",
  "duration": 1200,
  "listUsuarios": [
    {
      "id": 101,
      "username": "GamerPro",
      "password": "securePass123",
      "score": 2500
    },
    {
      "id": 102,
      "username": "ShadowHunter",
      "password": "hunter2024",
      "score": 1800
    }
  ]
}
```

---

### POST http://localhost:8080/api/users
Crea un nuevo usuario con credenciales de acceso.

```json
{
  "username": "ShadowHunter",
  "password": "hunter2024"
}
```

---

### GET http://localhost:8080/api/games/players/game/1
Recupera la lista de jugadores asociados al juego con ID 1.

---

### GET http://localhost:8080/api/users/login
Autentica a un usuario mediante su nombre de usuario y contraseña.
```json
{
  "username": "ShadowHunter",
  "password": "hunter2024"
}
