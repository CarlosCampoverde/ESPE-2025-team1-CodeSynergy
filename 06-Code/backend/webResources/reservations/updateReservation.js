const reservationController = require("../../controllers/reservationController");

const updateReservation = (req, res) => {
  // Llamar al controlador para actualizar los detalles de una reserva
  reservationController.updateReservation(req, res);
};

module.exports = updateReservation;