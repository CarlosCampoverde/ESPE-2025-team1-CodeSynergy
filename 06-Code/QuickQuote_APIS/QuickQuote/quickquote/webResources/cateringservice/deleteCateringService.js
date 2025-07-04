const cateringserviceController = require("../../controllers/cateringServiceController");

const deleteCateringService = (req, res) => {
  // Llamar al controlador de creación de cateringservicee
  cateringserviceController.deleteCateringService(req, res);
};

module.exports = deleteCateringService;