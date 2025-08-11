const clientController = require("../../controllers/clientController");

const getClient = (req, res) => {
  // Llamar al controlador para obtener un cliente por su ID
  clientController.getClient(req, res);
};

module.exports = getClient;