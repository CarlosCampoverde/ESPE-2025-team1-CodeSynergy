const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

// Crear un nuevo evento
router.post("/createEvent", eventController.createEvent);

// Obtener un evento por ID
router.get("/:id", eventController.getEvent);

// Actualizar un evento
router.put("/updateEvent", eventController.updateEvent);

// Eliminar un evento
router.delete("/deleteEvent/:id", eventController.deleteEvent);

module.exports = router;