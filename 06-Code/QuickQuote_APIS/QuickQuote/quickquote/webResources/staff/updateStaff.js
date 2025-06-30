const staffController = require("../../controllers/staffController");

const updateStaff = (req, res) => {
  // Llamar al controlador para actualizar los detalles de un miembro del personal
  staffController.updateStaff(req, res);
};

module.exports = updateStaff;