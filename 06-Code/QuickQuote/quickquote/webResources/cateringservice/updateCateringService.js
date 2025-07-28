const cateringserviceController = require("../../controllers/cateringServiceController");

const updateCateringService = (req, res) => {
  // Llamar al controlador de creación de cateringservicee
  cateringserviceController.updateCateringService(req, res);
};

module.exports = updateCateringService;