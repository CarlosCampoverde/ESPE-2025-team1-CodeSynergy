const Payment = require('../models/payment');
const Reservation = require('../models/reservation');
const Menu = require('../models/menu'); // Assumed Menu model

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

// Obtener todos los pagos
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();  // Obtener todos los pagos

    if (payments.length === 0) {
      return res.status(404).json({ message: "No hay pagos registrados" });
    }

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los pagos", error: error.message });
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

// Verificar pago vs cotización
exports.verifyPayment = async (req, res) => {
  const { reservation_id, payment_amount } = req.body;

  try {
    // Buscar la reserva por id_reservation
    const reservation = await Reservation.findOne({ id: reservation_id });

    if (!reservation) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    // Buscar el menú asociado a la reserva
    const menu = await Menu.findOne({ id: reservation.menu_id });

    if (!menu) {
      return res.status(404).json({ message: "Menú no encontrado" });
    }

    // Calcular el monto esperado (número de invitados * precio del menú)
    const expected_amount = reservation.number_of_guests * menu.menu_price;

    // Comparar el monto pagado con el esperado
    const is_complete = payment_amount >= expected_amount;
    const difference = expected_amount - payment_amount;

    // Devolver la respuesta según el formato especificado
    res.status(200).json({
      is_complete,
      expected_amount,
      difference: difference > 0 ? difference : 0
    });
  } catch (error) {
    res.status(500).json({ message: "Error al verificar el pago", error: error.message });
  }
};

// Obtener el total pagado por fecha
exports.getTotalPaymentsByDate = async (req, res) => {
  const { date } = req.params;

  try {
    // Validate date format (yyyy-mm-dd)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({ message: "Formato de fecha inválido. Use yyyy-mm-dd" });
    }

    // Convert the input date to a Date object
    const startDate = new Date(date);
    if (isNaN(startDate)) {
      return res.status(400).json({ message: "Fecha inválida" });
    }

    // Set the start and end of the day for the query
    const startOfDay = new Date(startDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(startDate.setHours(23, 59, 59, 999));

    // Aggregate payments to sum payment_amount for the specified date
    const totalPayments = await Payment.aggregate([
      {
        $match: {
          payment_date: {
            $gte: startOfDay,
            $lte: endOfDay
          }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$payment_amount" }
        }
      }
    ]);

    // If no payments are found, return 0 as total
    const total = totalPayments.length > 0 ? totalPayments[0].total : 0;

    res.status(200).json({ date, total });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el total de pagos por fecha", error: error.message });
  }
};