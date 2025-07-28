const clientController = require("../../controllers/clientController");

const createClient = (req, res) => {
  // Llamar al controlador de creación de cliente
  clientController.createClient(req, res);
};

module.exports = createClient;