const paymentController = require("../../controllers/paymentController");

const createPayment = (req, res) => {
  // Llamar al controlador de creación de pago
  paymentController.createPayment(req, res);
};

module.exports = createPayment;