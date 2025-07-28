const eventController = require("../../controllers/eventController");

const createEvent = (req, res) => {
  // Llamar al controlador de creación de evento
  eventController.createEvent(req, res);
};

module.exports = createEvent;