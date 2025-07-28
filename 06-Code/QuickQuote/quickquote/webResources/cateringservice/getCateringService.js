const cateringserviceController = require("../../controllers/cateringServiceController");

const getCateringService = (req, res) => {
  // Llamar al controlador de creación de cateringservicee
  cateringserviceController.getCateringService(req, res);
};

module.exports = getCateringService;