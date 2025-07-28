const paymentController = require("../../controllers/paymentController");

const getPayment = (req, res) => {
  // Llamar al controlador para obtener un pago por su ID
  paymentController.getPayment(req, res);
};

module.exports = getPayment;