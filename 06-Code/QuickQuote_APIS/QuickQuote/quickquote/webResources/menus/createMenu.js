const menuController = require("../../controllers/menuController");

const createMenu = (req, res) => {
  // Llamar al controlador de creación de menú
  menuController.createMenu(req, res);
};

module.exports = createMenu;