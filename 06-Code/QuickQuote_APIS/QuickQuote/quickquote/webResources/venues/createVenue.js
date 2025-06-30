const venueController = require("../../controllers/venueController");

const createVenue = (req, res) => {
  // Llamar al controlador de creación de lugar
  venueController.createVenue(req, res);
};

module.exports = createVenue;