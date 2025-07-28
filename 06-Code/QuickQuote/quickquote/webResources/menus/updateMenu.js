const menuController = require("../../controllers/menuController");

const updateMenu = (req, res) => {
  // Llamar al controlador para actualizar los detalles de un menú
  menuController.updateMenu(req, res);
};

module.exports = updateMenu;