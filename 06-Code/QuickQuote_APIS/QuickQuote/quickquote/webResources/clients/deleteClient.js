const clientController = require("../../controllers/clientController");

const deleteClient = (req, res) => {
  // Llamar al controlador para eliminar un cliente por su ID
  clientController.deleteClient(req, res);
};

module.exports = deleteClient;