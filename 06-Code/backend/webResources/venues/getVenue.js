const venueController = require("../../controllers/venueController");

const getVenue = (req, res) => {
  // Llamar al controlador para obtener un lugar por su ID
  venueController.getVenue(req, res);
};

module.exports = getVenue;