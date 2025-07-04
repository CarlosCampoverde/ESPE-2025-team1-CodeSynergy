const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

// Obtener todos los eventos (getAll)
router.get("/", eventController.getAllEvents);

// Obtener eventos próximos
router.get("/upcoming", eventController.getUpcomingEvents);

// Obtener un evento por ID
router.get("/:id", eventController.getEvent);

// Crear un nuevo evento
router.post("/createEvent", eventController.createEvent);

// Actualizar un evento
router.put("/updateEvent", eventController.updateEvent);

// Eliminar un evento
router.delete("/deleteEvent/:id", eventController.deleteEvent);

module.exports = router;