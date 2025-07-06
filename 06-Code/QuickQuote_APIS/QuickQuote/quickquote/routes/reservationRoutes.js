const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

// Crear una nueva reserva
router.post("/createReservation", reservationController.createReservation);

// Obtener una reserva por ID
router.get("/:id", reservationController.getReservation);

// Obtener todas las reservas
router.get("/", reservationController.getAllReservations);

// Actualizar una reserva
router.put("/updateReservation", reservationController.updateReservation);

// Eliminar una reserva
router.delete("/deleteReservation/:id", reservationController.deleteReservation);

// Obtener historial de reservas por cliente
router.get("/history/:client_id", reservationController.getReservationsByClient);

// Obtener reservas por fecha
router.get("/byDate/:yyyy_mm_dd", reservationController.getReservationsByDate);

// Obtener reservas por rango de fechas
router.get("/byDate/:startDate/:endDate", reservationController.getReservationsByDateRange);

// Obtener reservas a partir de una fecha
router.get("/fromDate/:startDate", reservationController.getReservationsFromDate);

module.exports = router;