const staffController = require("../../controllers/staffController");

const deleteStaff = (req, res) => {
  // Llamar al controlador para eliminar un miembro del personal por su ID
  staffController.deleteStaff(req, res);
};

module.exports = deleteStaff;