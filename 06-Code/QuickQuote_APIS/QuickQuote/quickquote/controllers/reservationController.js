const Reservation = require('../models/reservation');

// Crear una nueva reserva
exports.createReservation = async (req, res) => {
  const { id, id_client, reservation_date, reservation_time, number_of_guests, menu_id } = req.body;

  try {
    const newReservation = new Reservation({ id, id_client, reservation_date, reservation_time, number_of_guests, menu_id });
    await newReservation.save();
    res.status(201).json(newReservation);  // Reserva creada exitosamente
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la reserva', error: error.message });
  }
};

// Obtener una reserva por ID
exports.getReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findOne({ id });

    if (!reservation) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la reserva", error: error.message });
  }
};

// Obtener todas las reservas
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();  // Obtener todas las reservas

    if (reservations.length === 0) {
      return res.status(404).json({ message: "No hay reservas registradas" });
    }

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las reservas", error: error.message });
  }
};

// Actualizar los detalles de una reserva
exports.updateReservation = async (req, res) => {
  const { id, id_client, reservation_date, reservation_time, number_of_guests, menu_id } = req.body;

  try {
    const reservation = await Reservation.findOne({ id });

    if (!reservation) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    reservation.id_client = id_client;
    reservation.reservation_date = reservation_date;
    reservation.reservation_time = reservation_time;
    reservation.number_of_guests = number_of_guests;
    reservation.menu_id = menu_id;

    await reservation.save();
    res.status(200).json(reservation);  // Reserva actualizada
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la reserva", error: error.message });
  }
};

// Eliminar una reserva
exports.deleteReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findOne({ id });

    if (!reservation) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    await Reservation.deleteOne({ id });
    res.status(200).json({ message: "Reserva eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la reserva", error: error.message });
  }
};
