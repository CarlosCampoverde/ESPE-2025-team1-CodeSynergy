const menuController = require("../../controllers/menuController");

const deleteMenu = (req, res) => {
  // Llamar al controlador para eliminar un menú por su ID
  menuController.deleteMenu(req, res);
};

module.exports = deleteMenu;