const Event = require('../models/event');

// Crear un nuevo evento
exports.createEvent = async (req, res) => {
  const { id, event_name, event_date, event_location, event_type } = req.body;

  try {
    const newEvent = new Event({ id, event_name, event_date, event_location, event_type });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el evento', error: error.message });
  }
};

// Obtener un evento por ID
exports.getEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findOne({ id: id });

    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el evento", error: error.message });
  }
};

// Obtener todos los eventos
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();

    if (events.length === 0) {
      return res.status(404).json({ message: "No hay eventos registrados" });
    }

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los eventos", error: error.message });
  }
};

// Obtener eventos próximos
exports.getUpcomingEvents = async (req, res) => {
  try {
    const currentDate = new Date();
    const upcomingEvents = await Event.find(
      { event_date: { $gt: currentDate } },
      'event_name event_date event_location'
    );

    if (upcomingEvents.length === 0) {
      return res.status(404).json({ message: "No hay eventos próximos registrados" });
    }

    res.status(200).json(upcomingEvents);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los eventos próximos", error: error.message });
  }
};

// Actualizar los detalles de un evento
exports.updateEvent = async (req, res) => {
  const { id, event_name, event_date, event_location, event_type } = req.body;

  try {
    if (!id || !event_name || !event_date || !event_location || !event_type) {
      return res.status(400).json({ message: "Todos los campos son requeridos." });
    }

    const event = await Event.findOne({ id: id });

    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    event.event_name = event_name;
    event.event_date = event_date;
    event.event_location = event_location;
    event.event_type = event_type;

    await event.save();
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el evento", error: error.message });
  }
};

// Eliminar un evento
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findOne({ id });

    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    await Event.deleteOne({ id });
    res.status(200).json({ message: "Evento eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el evento", error: error.message });
  }
};