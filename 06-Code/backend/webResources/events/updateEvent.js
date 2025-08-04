const eventController = require("../../controllers/eventController");

const updateEvent = (req, res) => {
  // Llamar al controlador para actualizar los detalles de un evento
  eventController.updateEvent(req, res);
};

module.exports = updateEvent;