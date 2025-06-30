const menuController = require("../../controllers/menuController");

const getMenu = (req, res) => {
  // Llamar al controlador para obtener un menú por su ID
  menuController.getMenu(req, res);
};

module.exports = getMenu;