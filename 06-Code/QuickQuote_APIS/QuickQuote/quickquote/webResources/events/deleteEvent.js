const eventController = require("../../controllers/eventController");

const deleteEvent = (req, res) => {
  // Llamar al controlador para eliminar un evento por su ID
  eventController.deleteEvent(req, res);
};

module.exports = deleteEvent;