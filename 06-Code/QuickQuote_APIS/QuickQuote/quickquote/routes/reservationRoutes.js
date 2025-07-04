const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

// Crear una nueva reserva
router.post("/createReservation", reservationController.createReservation);

// Obtener una reserva por ID
router.get("/:id", reservationController.getReservation);

// Obtener todos las reservas (getAll)
router.get("/", reservationController.getAllReservations);

// Actualizar una reserva
router.put("/updateReservation", reservationController.updateReservation);

// Eliminar una reserva
router.delete("/deleteReservation/:id", reservationController.deleteReservation);

module.exports = router;