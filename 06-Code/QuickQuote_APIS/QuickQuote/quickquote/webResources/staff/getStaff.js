const staffController = require("../../controllers/staffController");

const getStaff = (req, res) => {
  // Llamar al controlador para obtener un miembro del personal por su ID
  staffController.getStaff(req, res);
};

module.exports = getStaff;