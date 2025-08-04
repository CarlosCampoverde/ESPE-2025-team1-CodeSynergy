const reservationController = require("../../controllers/reservationController");

const createReservation = (req, res) => {
  // Llamar al controlador de creación de reserva
  reservationController.createReservation(req, res);
};

module.exports = createReservation;