const cateringserviceController = require("../../controllers/cateringServiceController");

const createCateringService = (req, res) => {
  // Llamar al controlador de creación de cateringservicee
  cateringserviceController.createCateringService(req, res);
};

module.exports = createCateringService;