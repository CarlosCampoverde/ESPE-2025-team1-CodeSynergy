const reservationController = require("../../controllers/reservationController");

const getReservation = (req, res) => {
  // Llamar al controlador para obtener una reserva por su ID
  reservationController.getReservation(req, res);
};

module.exports = getReservation;