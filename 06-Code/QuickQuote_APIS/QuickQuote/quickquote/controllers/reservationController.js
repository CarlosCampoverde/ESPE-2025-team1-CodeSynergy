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

// Obtener historial de reservas por cliente
exports.getReservationsByClient = async (req, res) => {
  const { client_id } = req.params;

  try {
    const reservations = await Reservation.find({ id_client: client_id }).select('id menu_id number_of_guests reservation_date');

    if (reservations.length === 0) {
      return res.status(404).json({ message: "No se encontraron reservas para este cliente" });
    }

    // Formatear la respuesta según el esquema especificado
    const formattedReservations = reservations.map(reservation => ({
      reservation_id: reservation.id,
      menu_id: reservation.menu_id,
      number_of_guests: reservation.number_of_guests,
      reservation_date: reservation.reservation_date.toISOString().split('T')[0]
    }));

    res.status(200).json(formattedReservations);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el historial de reservas", error: error.message });
  }
};

// Obtener reservas por fecha
exports.getReservationsByDate = async (req, res) => {
  const { yyyy_mm_dd } = req.params; // Fecha en formato yyyy-mm-dd

  try {
    // Convertir la fecha de string a objeto Date (solo fecha, sin hora)
    const date = new Date(yyyy_mm_dd);
    date.setHours(0, 0, 0, 0); // Establecer inicio del día
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1); // Fin del día

    // Filtrar reservas por fecha
    const reservations = await Reservation.find({
      reservation_date: { $gte: date, $lt: nextDay },
    }).select('id reservation_date reservation_time number_of_guests menu_id');

    if (reservations.length === 0) {
      return res.status(404).json({ message: `No hay reservas registradas para el ${yyyy_mm_dd}` });
    }

    // Formatear la respuesta según el JSON del documento
    const formattedReservations = reservations.map(reservation => ({
      id: reservation.id,
      reservation_date: reservation.reservation_date.toISOString().split('T')[0],
      reservation_time: reservation.time,
      number_of_guests: reservation.number_of_guests,
      menu_id: reservation.menu_id,
    }));

    res.status(200).json(formattedReservations);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las reservas por fecha", error: error.message });
  }
};

// Obtener reservas por rango de fechas
exports.getReservationsByDateRange = async (req, res) => {
  const { startDate, endDate } = req.params; // Fechas en formato yyyy-mm-dd

  try {
    // Convertir las fechas a objetos Date en la zona horaria local del servidor
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0); // Inicio del día en zona local
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Fin del día en zona local

    // Validar que las fechas sean válidas
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: "Formato de fecha inválido. Use yyyy-mm-dd" });
    }

    // Validar que startDate sea menor o igual a endDate
    if (start > end) {
      return res.status(400).json({ message: "La fecha de inicio debe ser menor o igual a la fecha de fin" });
    }

    // Filtrar reservas por rango de fechas
    const reservations = await Reservation.find({
      reservation_date: { $gte: start, $lte: end },
    }).select('id reservation_date reservation_time number_of_guests menu_id');


    if (reservations.length === 0) {
      return res.status(404).json({ message: `No hay reservas registradas entre ${startDate} y ${endDate}` });
    }

    // Formatear la respuesta
    const formattedReservations = reservations.map(reservation => ({
      id: reservation.id,
      reservation_date: reservation.reservation_date.toISOString().split('T')[0],
      reservation_time: reservation.reservation_time,
      number_of_guests: reservation.number_of_guests,
      menu_id: reservation.menu_id,
    }));

    res.status(200).json(formattedReservations);
  } catch (error) {
    console.error("Error en getReservationsByDateRange:", error);
    res.status(500).json({ message: "Error al obtener las reservas por rango de fechas", error: error.message });
  }
};

exports.getReservationsFromDate = async (req, res) => {
  const { startDate } = req.params; // Fecha en formato yyyy-mm-dd

  try {
    // Convertir la fecha de string a objeto Date en la zona horaria local del servidor
    const start = new Date(startDate); // Usa la zona horaria local (-05:00)
    start.setHours(0, 0, 0, 0); // Establecer al inicio del día en la zona horaria local

    // Validar que la fecha sea válida
    if (isNaN(start.getTime())) {
      return res.status(400).json({ message: "Formato de fecha inválido. Use yyyy-mm-dd" });
    }


    // Filtrar reservas por fecha igual o posterior a start
    const reservations = await Reservation.find({
      reservation_date: { $gte: start },
    }).select('id reservation_date reservation_time number_of_guests menu_id');


    if (reservations.length === 0) {
      return res.status(404).json({ message: `No hay reservas registradas a partir del ${startDate}` });
    }

    // Formatear la respuesta
    const formattedReservations = reservations.map(reservation => ({
      id: reservation.id,
      reservation_date: reservation.reservation_date.toISOString().split('T')[0],
      reservation_time: reservation.reservation_time,
      number_of_guests: reservation.number_of_guests,
      menu_id: reservation.menu_id,
    }));

    res.status(200).json(formattedReservations);
  } catch (error) {
    console.error("Error en getReservationsFromDate:", error);
    res.status(500).json({ message: "Error al obtener las reservas a partir de la fecha", error: error.message });
  }
};