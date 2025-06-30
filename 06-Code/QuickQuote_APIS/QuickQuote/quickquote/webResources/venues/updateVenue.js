const venueController = require("../../controllers/venueController");

const updateVenue = (req, res) => {
  // Llamar al controlador para actualizar los detalles de un lugar
  venueController.updateVenue(req, res);
};

module.exports = updateVenue;