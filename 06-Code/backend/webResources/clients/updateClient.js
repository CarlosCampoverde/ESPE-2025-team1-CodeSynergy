const clientController = require("../../controllers/clientController");

const updateClient = (req, res) => {
  // Llamar al controlador para actualizar los detalles de un cliente
  clientController.updateClient(req, res);
};

module.exports = updateClient;