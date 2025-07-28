const venueController = require("../../controllers/venueController");

const deleteVenue = (req, res) => {
  // Llamar al controlador para eliminar un lugar por su ID
  venueController.deleteVenue(req, res);
};

module.exports = deleteVenue;