const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Crear un nuevo pago
router.post("/createPayment", paymentController.createPayment);

// Obtener un pago por ID
router.get("/:id", paymentController.getPayment);

// Obtener todos los pagos
router.get("/", paymentController.getAllPayments);

// Actualizar un pago
router.put("/updatePayment", paymentController.updatePayment);

// Eliminar un pago
router.delete("/deletePayment/:id", paymentController.deletePayment);

// Verificar pago vs cotización
router.post("/verify", paymentController.verifyPayment);

module.exports = router;