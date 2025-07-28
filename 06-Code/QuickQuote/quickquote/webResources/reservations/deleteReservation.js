const reservationController = require("../../controllers/reservationController");

const deleteReservation = (req, res) => {
  // Llamar al controlador para eliminar una reserva por su ID
  reservationController.deleteReservation(req, res);
};

module.exports = deleteReservation;