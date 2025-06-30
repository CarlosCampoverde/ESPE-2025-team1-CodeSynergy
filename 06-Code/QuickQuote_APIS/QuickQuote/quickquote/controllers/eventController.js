// eventController.js

const Event = require('../models/event');

// Crear un nuevo evento
exports.createEvent = async (req, res) => {
  const { id, event_name, event_date, event_location, event_type } = req.body;

  try {
    const newEvent = new Event({ id, event_name, event_date, event_location, event_type });
    await newEvent.save();
    res.status(201).json(newEvent);  // Evento creado exitosamente
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el evento', error: error.message });
  }
};

// Obtener un evento por ID
exports.getEvent = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar Evento usando el campo id directamente
    const event = await Event.findOne({ id: id });  // Cambié 'event' a 'Event'

    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el Evento", error: error.message });
  }
};

// Actualizar los detalles de un evento
exports.updateEvent = async (req, res) => {
  const { id, event_name, event_date, event_location, event_type } = req.body;

  try {
    // Verificar que todos los campos necesarios estén presentes
    if (!id || !event_name || !event_date || !event_location || !event_type) {
      return res.status(400).json({ message: "Todos los campos son requeridos." });
    }

    // Buscar el evente por id (no por _id)
    const event = await Event.findOne({ id: id });

    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    // Actualizar los campos del evente
    event.event_name = event_name;
    event.event_date = event_date;
    event.event_location = event_location;
    event.event_type = event_type;

    // Guardar el evente actualizado
    await event.save();

    res.status(200).json(event);  // Retornar el evente actualizado
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el evente", error: error.message });
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
