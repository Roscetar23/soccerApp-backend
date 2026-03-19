# Documentación de Endpoints - API Partidos

Esta es una guía rápida sobre los endpoints disponibles en tu backend (NestJS) para el recurso de `Partidos`. Todas las peticiones asumen que el servidor está corriendo en `http://localhost:3000`.

---

## 1. Crear un Partido Nuevo (`POST`)
Guarda un nuevo partido en la base de datos de MongoDB.

**URL:** `POST http://localhost:3000/partidos`
**Body JSON:**
```json
{
  "equipoLocal": "Real Madrid",
  "equipoVisitante": "Barcelona",
  "competicion": "Champions League",
  "fechaPartido": "2026-04-15T20:00:00.000Z",
  "estadio": "Santiago Bernabeu"
}
```

**Ejemplo en Frontend (`fetch`):**
```javascript
fetch("http://localhost:3000/partidos", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    equipoLocal: "Real Madrid",
    equipoVisitante: "Barcelona",
    competicion: "Champions League",
    fechaPartido: "2026-04-15T20:00:00.000Z",
    estadio: "Santiago Bernabeu"
  })
})
```

---

## 2. Obtener los Próximos Partidos (`GET`) ⏳ (El principal para tu reloj contador)
Devuelve los partidos, empezando desde hoy en adelante, ordenados del más próximo al más lejano.

**URL:** `GET http://localhost:3000/partidos/proximos`

**Ejemplo en Frontend (`fetch`):**
```javascript
fetch("http://localhost:3000/partidos/proximos")
  .then(response => response.json())
  .then(data => {
    console.log(data); // Aquí recibes el arreglo de datos JSON para tu reloj
  });
```

---

## 3. Obtener TODOS los partidos (`GET`)
Devuelve todos los partidos que existan en la base de datos, incluyendo los partidos antiguos.

**URL:** `GET http://localhost:3000/partidos`

**Ejemplo en Frontend (`fetch`):**
```javascript
fetch("http://localhost:3000/partidos")
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## 4. Obtener un partido específico por su ID (`GET`)
Ideal para cuando el usuario presiona en ver "detalles" de un único partido. Reemplaza `:id` por el `_id` que devuelve MongoDB.

**URL:** `GET http://localhost:3000/partidos/:id`

**Ejemplo de URL real:** `http://localhost:3000/partidos/69b45ac0248123741db6b2ac`

---

## 5. Editar / Actualizar un partido (`PATCH`)
Sirve por si quieres cambiar un estadio, la fecha de un evento o el equipo. Solo envía el campo que quieres cambiar de ese `:id`.

**URL:** `PATCH http://localhost:3000/partidos/:id`
**Body JSON:**
```json
{
  "estadio": "Nuevo Estadio Remodelado",
  "estado": "En Juego"
}
```

**Ejemplo en Frontend (`fetch`):**
```javascript
fetch("http://localhost:3000/partidos/69b45ac0248123741db6b2ac", {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ estado: "Finalizado" })
})
```

---

## 6. Eliminar / Borrar un partido (`DELETE`)
Ideal si se cancela algún evento que creaste por error.

**URL:** `DELETE http://localhost:3000/partidos/:id`

**Ejemplo en Frontend (`fetch`):**
```javascript
fetch("http://localhost:3000/partidos/69b45ac0248123741db6b2ac", {
  method: "DELETE"
})
```

---

# Documentación de Endpoints - API Equipos

Esta sección detalla los endpoints disponibles para el recurso de `Equipos`, enfocándose en las ligas colombiana, española e inglesa.

---

## 7. Crear un Equipo Nuevo (`POST`)
Guarda un nuevo equipo en la base de datos de MongoDB.

**URL:** `POST http://localhost:3000/equipos`
**Body JSON:**
```json
{
  "nombre": "Real Madrid",
  "escudo": "https://url-del-escudo.com/realmadrid.png",
  "fechaCreacion": "1902-03-06T00:00:00.000Z",
  "liga": "española"
}
```

**Ejemplo en Frontend (`fetch`):**
```javascript
fetch("http://localhost:3000/equipos", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    nombre: "Real Madrid",
    escudo: "https://url-del-escudo.com/realmadrid.png",
    fechaCreacion: "1902-03-06T00:00:00.000Z",
    liga: "española"
  })
})
```

---

## 8. Obtener Equipos (`GET`)
Devuelve todos los equipos que existan en la base de datos. Puedes filtrar los equipos por liga usando una query en la ruta.

**URL:** `GET http://localhost:3000/equipos` (Para todos los equipos)
**URL (filtrada por liga):** `GET http://localhost:3000/equipos?liga=colombiana`

**Ejemplo en Frontend (`fetch`):**
```javascript
fetch("http://localhost:3000/equipos?liga=española")
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## 9. Actualizar o Crear Estadísticas de un Equipo (`POST`)
Permite guardar o actualizar las estadísticas de un equipo específico usando su ID.

**URL:** `POST http://localhost:3000/equipos/:id/estadisticas`
**Body JSON:**
```json
{
  "ultimosPartidos": ["G", "P", "E", "G", "G"],
  "porcentajeVictorias": 65.5,
  "promedioPases": 450,
  "promedioTirosAlArco": 5,
  "promedioFaltas": 12
}
```

**Ejemplo en Frontend (`fetch`):**
```javascript
fetch("http://localhost:3000/equipos/69b45ac0248123741db6b2ac/estadisticas", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    ultimosPartidos: ["G", "P", "E", "G", "G"],
    porcentajeVictorias: 65.5,
    promedioPases: 450,
    promedioTirosAlArco: 5,
    promedioFaltas: 12
  })
})
```

---

## 10. Obtener Estadísticas de un Equipo (`GET`)
Si quieres consultar **únicamente** las estadísticas de un equipo en particular sin cargar el resto de la información del equipo, puedes usar este endpoint. *(Nota: De todos modos al hacer un `GET /equipos` o `GET /equipos/:id` general, las estadísticas ya te llegarán incluidas en la respuesta)*.

**URL:** `GET http://localhost:3000/equipos/:id/estadisticas`

**Ejemplo en Frontend (`fetch`):**
```javascript
fetch("http://localhost:3000/equipos/69b45ac0248123741db6b2ac/estadisticas")
  .then(res => res.json())
  .then(data => {
    console.log("Estadísticas del equipo:", data);
  });
```

---

## 11. Otros Endpoints (Equipos)
También dispones de los siguientes endpoints (similares a los de partidos):
- **Obtener por ID:** `GET /equipos/:id`
- **Actualizar:** `PATCH /equipos/:id`
- **Eliminar:** `DELETE /equipos/:id`

---

# Documentación de Endpoints - API Favoritos

Esta sección detalla los endpoints disponibles para guardar y obtener la selección de liga y equipo favorito ligado al usuario.

---

## 12. Guardar la Selección de Favoritos (`POST`)
Guarda la selección de la liga y el equipo favorito vinculado al ID de un usuario registrado.

**URL:** `POST http://localhost:3000/favoritos`
**Body JSON:**
```json
{
  "liga": "colombiana",
  "equipo": "Atlético Nacional",
  "userId": "64bf6d0f81d89b14f8a0a8e1"
}
```
*(Nota: Asegúrate de enviar el `userId` que te devolvió el Login para poder consultar sus favoritos luego).*

**Ejemplo en Frontend (`fetch`):**
```javascript
fetch("http://localhost:3000/favoritos", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    liga: "colombiana",
    equipo: "Atlético Nacional",
    userId: localStorage.getItem("userId") // Tomando el ID guardado
  })
})
```

---

## 13. Obtener Favoritos por Usuario (`GET`)
Devuelve todas las selecciones de favoritos asociadas a un `userId` específico.

**URL:** `GET http://localhost:3000/favoritos/usuario/:userId`

**Ejemplo en Frontend (`fetch`):**
```javascript
const userId = localStorage.getItem("userId");

fetch(`http://localhost:3000/favoritos/usuario/${userId}`)
  .then(res => res.json())
  .then(data => {
    console.log("Favoritos de este usuario:", data); 
  });
```

*(Nota: También sigue existiendo `GET /favoritos` para obtener todos los favoritos generales y `GET /favoritos/:id` para buscar un favorito por su propio ID).*
```

---

# Documentación de Endpoints - API Autenticación (Auth)

Esta sección detalla los endpoints para el registro y login de usuarios.

---

## 14. Registrar un Usuario (`POST`)
Crea un nuevo usuario en la base de datos de MongoDB, encriptando su contraseña.

**URL:** `POST http://localhost:3000/auth/register`
**Body JSON:**
```json
{
  "username": "usuario_ejemplo",
  "password": "mi_password_seguro"
}
```

**Ejemplo en Frontend (`fetch`):**
```javascript
fetch("http://localhost:3000/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    username: "usuario_ejemplo",
    password: "mi_password_seguro"
  })
})
```

---

## 15. Iniciar Sesión / Login (`POST`)
Inicia sesión validando el usuario y la contraseña. Si son correctos, devuelve el `id` del usuario.

**URL:** `POST http://localhost:3000/auth/login`
**Body JSON:**
```json
{
  "username": "usuario_ejemplo",
  "password": "mi_password_seguro"
}
```

**Respuesta Exitosa (Devuelve el ID):**
```json
{
  "id": "64bf6d0f81d89b14f8a0a8e1"
}
```

**Ejemplo en Frontend (`fetch`):**
```javascript
fetch("http://localhost:3000/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    username: "usuario_ejemplo",
    password: "mi_password_seguro"
  })
})
  .then(res => res.json())
  .then(data => {
    console.log("ID del usuario:", data.id);
  });
```

---

## 16. Cerrar Sesión / Logout (`POST`)
Este endpoint sirve para cerrar la sesión actual en el backend. 
**Nota importante**: En este modelo de autenticación simple, la verdadera forma de "cerrar sesión" ocurre en el **frontend**, borrando el `id` (por ejemplo usando `localStorage.removeItem('userId')`). Puedes llamar a este endpoint para tener consistencia en tu código.

**URL:** `POST http://localhost:3000/auth/logout`

**Ejemplo en Frontend (`fetch`):**
```javascript
fetch("http://localhost:3000/auth/logout", {
  method: "POST"
})
  .then(res => res.json())
  .then(data => {
    console.log(data.message); // "Sesión cerrada correctamente"
    // AQUÍ borras el ID de tu frontend
    // localStorage.removeItem('userId'); 
  });
```
