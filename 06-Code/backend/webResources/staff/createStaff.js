const staffController = require("../../controllers/staffController");

const createStaff = (req, res) => {
  // Llamar al controlador de creación de personal
  staffController.createStaff(req, res);
};

module.exports = createStaff;