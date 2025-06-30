const paymentController = require("../../controllers/paymentController");

const updatePayment = (req, res) => {
  // Llamar al controlador para actualizar los detalles de un pago
  paymentController.updatePayment(req, res);
};

module.exports = updatePayment;