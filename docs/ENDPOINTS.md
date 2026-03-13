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
