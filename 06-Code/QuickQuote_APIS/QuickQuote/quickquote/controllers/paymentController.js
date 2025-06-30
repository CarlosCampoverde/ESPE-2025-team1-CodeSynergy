// paymentController.js

const Payment = require('../models/payment');

// Crear un nuevo pago
exports.createPayment = async (req, res) => {
  const { id, id_reservation, payment_amount, payment_date } = req.body;

  try {
    const newPayment = new Payment({ id, id_reservation, payment_amount, payment_date });
    await newPayment.save();
    res.status(201).json(newPayment);  // Pago creado exitosamente
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el pago', error: error.message });
  }
};

// Obtener un pago por ID
exports.getPayment = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findOne({ id });

    if (!payment) {
      return res.status(404).json({ message: "Pago no encontrado" });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el pago", error: error.message });
  }
};

// Actualizar los detalles de un pago
exports.updatePayment = async (req, res) => {
  const { id, id_reservation, payment_amount, payment_date } = req.body;

  try {
    const payment = await Payment.findOne({ id });

    if (!payment) {
      return res.status(404).json({ message: "Pago no encontrado" });
    }

    payment.id_reservation = id_reservation;
    payment.payment_amount = payment_amount;
    payment.payment_date = payment_date;

    await payment.save();
    res.status(200).json(payment);  // Pago actualizado
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el pago", error: error.message });
  }
};

// Eliminar un pago
exports.deletePayment = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findOne({ id });

    if (!payment) {
      return res.status(404).json({ message: "Pago no encontrado" });
    }

    await Payment.deleteOne({ id });
    res.status(200).json({ message: "Pago eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el pago", error: error.message });
  }
};
