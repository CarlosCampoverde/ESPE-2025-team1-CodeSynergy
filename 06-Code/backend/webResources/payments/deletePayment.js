const paymentController = require("../../controllers/paymentController");

const deletePayment = (req, res) => {
  // Llamar al controlador para eliminar un pago por su ID
  paymentController.deletePayment(req, res);
};

module.exports = deletePayment;