const Venue = require('../models/venue');

// Crear un nuevo lugar
exports.createVenue = async (req, res) => {
  const { id, venue_name, venue_location, venue_capacity } = req.body;

  try {
    const newVenue = new Venue({ id, venue_name, venue_location, venue_capacity });
    await newVenue.save();
    res.status(201).json(newVenue);  // Lugar creado exitosamente
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el lugar', error: error.message });
  }
};

// Obtener un lugar por ID
exports.getVenue = async (req, res) => {
  const { id } = req.params;

  try {
    const venue = await Venue.findOne({ id });

    if (!venue) {
      return res.status(404).json({ message: "Lugar no encontrado" });
    }

    res.status(200).json(venue);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el lugar", error: error.message });
  }
};

// Obtener todos los lugares
exports.getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.find();  // Obtener todos los lugares

    if (venues.length === 0) {
      return res.status(404).json({ message: "No hay lugares registrados" });
    }

    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los lugares", error: error.message });
  }
};

// Actualizar los detalles de un lugar
exports.updateVenue = async (req, res) => {
  const { id, venue_name, venue_location, venue_capacity } = req.body;

  try {
    const venue = await Venue.findOne({ id });

    if (!venue) {
      return res.status(404).json({ message: "Lugar no encontrado" });
    }

    venue.venue_name = venue_name;
    venue.venue_location = venue_location;
    venue.venue_capacity = venue_capacity;

    await venue.save();
    res.status(200).json(venue);  // Lugar actualizado
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el lugar", error: error.message });
  }
};

// Eliminar un lugar
exports.deleteVenue = async (req, res) => {
  const { id } = req.params;

  try {
    const venue = await Venue.findOne({ id });

    if (!venue) {
      return res.status(404).json({ message: "Lugar no encontrado" });
    }

    await Venue.deleteOne({ id });
    res.status(200).json({ message: "Lugar eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el lugar", error: error.message });
  }
};

// Buscar lugares por capacidad mínima
exports.getVenuesByCapacity = async (req, res) => {
  const { min_capacity } = req.params;

  try {
    const venues = await Venue.find({ venue_capacity: { $gte: parseInt(min_capacity) } }).select('venue_name venue_capacity venue_location');

    if (venues.length === 0) {
      return res.status(404).json({ message: "No se encontraron lugares con la capacidad mínima especificada" });
    }

    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los lugares por capacidad", error: error.message });
  }
};

// Buscar lugares por rango de capacidad
exports.searchVenuesByCapacity = async (req, res) => {
  const { min, max } = req.query;

  try {
    if (!min || !max || isNaN(min) || isNaN(max) || parseInt(min) > parseInt(max)) {
      return res.status(400).json({ message: "Parámetros min y max son requeridos y min debe ser menor o igual a max" });
    }

    const venues = await Venue.find({
      venue_capacity: { $gte: parseInt(min), $lte: parseInt(max) },
    }).select('id venue_name venue_capacity venue_location');

    if (venues.length === 0) {
      return res.status(404).json({ message: `No se encontraron lugares con capacidad entre ${min} y ${max}` });
    }

    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar lugares por capacidad", error: error.message });
  }
};