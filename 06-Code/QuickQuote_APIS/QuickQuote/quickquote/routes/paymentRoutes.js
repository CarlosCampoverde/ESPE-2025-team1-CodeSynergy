const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Crear un nuevo pago
router.post("/createPayment", paymentController.createPayment);

// Obtener un pago por ID
router.get("/:id", paymentController.getPayment);

// Actualizar un pago
router.put("/updatePayment", paymentController.updatePayment);

// Eliminar un pago
router.delete("/deletePayment/:id", paymentController.deletePayment);

module.exports = router;