const eventController = require("../../controllers/eventController");

const getEvent = (req, res) => {
  // Llamar al controlador para obtener un evento por su ID
  eventController.getEvent(req, res);
};

module.exports = getEvent;