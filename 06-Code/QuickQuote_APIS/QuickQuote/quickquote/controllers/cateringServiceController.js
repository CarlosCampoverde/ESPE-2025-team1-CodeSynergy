const CateringService = require('../models/cateringservice');
const mongoose = require("mongoose");

// Obtener todos los servicios de catering
exports.getAllCateringServices = async (req, res) => {
  try {
    const cateringServices = await CateringService.find();

    if (cateringServices.length === 0) {
      return res.status(404).json({ message: "No hay servicios de catering registrados" });
    }

    res.status(200).json(cateringServices);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los servicios de catering", error: error.message });
  }
};

// Obtener un servicio de catering por ID
exports.getCateringService = async (req, res) => {
  const id = Number(req.params.id); // Convertir a número para consistencia

  try {
    const cateringService = await CateringService.findOne({ id });

    if (!cateringService) {
      return res.status(404).json({ message: "Servicio de catering no encontrado" });
    }

    res.status(200).json(cateringService);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el servicio de catering", error: error.message });
  }
};

// Obtener todos los servicios de catering públicos
exports.getPublicCateringServices = async (req, res) => {
  try {
    const publicServices = await CateringService.find(
      { $or: [{ is_public: true }, { is_public: { $exists: false } }] },
      'service_name service_description service_price'
    );

    if (publicServices.length === 0) {
      return res.status(404).json({ message: "No hay servicios de catering públicos disponibles" });
    }

    res.status(200).json(publicServices);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los servicios de catering públicos", error: error.message });
  }
};

// Crear un nuevo servicio de catering
exports.createCateringService = async (req, res) => {
  const { id, service_name, service_description, service_price, is_public } = req.body;

  try {
    const newService = new CateringService({ id, service_name, service_description, service_price, is_public });
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el servicio de catering", error: error.message });
  }
};

// Actualizar un servicio de catering existente
exports.updateCateringService = async (req, res) => {
  const { id, service_name, service_description, service_price, is_public } = req.body;

  try {
    const service = await CateringService.findOne({ id });

    if (!service) {
      return res.status(404).json({ message: "Servicio de catering no encontrado" });
    }

    service.service_name = service_name;
    service.service_description = service_description;
    service.service_price = service_price;
    service.is_public = is_public !== undefined ? is_public : service.is_public;

    await service.save();
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el servicio de catering", error: error.message });
  }
};

// Eliminar un servicio de catering
exports.deleteCateringService = async (req, res) => {
  const id = Number(req.params.id); // Convertir a número para consistencia

  try {
    const service = await CateringService.findOne({ id });

    if (!service) {
      return res.status(404).json({ message: "Servicio de catering no encontrado" });
    }

    await CateringService.deleteOne({ id });
    res.status(200).json({ message: "Servicio de catering eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el servicio de catering", error: error.message });
  }
};

// Generar reporte básico de servicios de catering
exports.generateServiceReport = async (req, res) => {
  try {
    console.log("Iniciando consulta a CateringService...");

    // Usar el modelo de Mongoose en lugar de la colección directa
    const rawServices = await CateringService.find().lean(); // .lean() para mejorar rendimiento

    // Validar y mapear los servicios
    const services = rawServices.map(service => {
      if (!service.id || !service.service_name || service.service_price === undefined) {
        console.warn(`Servicio con ID ${service.id} tiene datos incompletos`);
        return null;
      }
      return {
        id: service.id,
        service_name: service.service_name,
        service_price: service.service_price
      };
    }).filter(service => service !== null); // Filtrar servicios inválidos

    if (!services.length) {
      return res.status(404).json({ message: "No se encontraron servicios de catering válidos" });
    }

    const report = {
      total_services: services.length,
      services: services,
      generated_at: new Date().toISOString()
    };

    console.log("Reporte generado:", JSON.stringify(report, null, 2));
    res.status(200).json(report);
  } catch (error) {
    console.error("Error en generateServiceReport:", error.message, "Stack:", error.stack);
    res.status(500).json({ message: "Error al generar el reporte", error: error.message });
  }
};

// Generar una cotización para un servicio de catering
exports.generateCateringQuote = async (req, res) => {
  const { service_id, number_of_guests, event_type } = req.body;

  try {
    // Validar que los campos requeridos estén presentes
    if (!service_id || !number_of_guests) {
      return res.status(400).json({ message: "service_id y number_of_guests son requeridos" });
    }

    // Validar que number_of_guests sea un número positivo
    const guests = parseInt(number_of_guests);
    if (isNaN(guests) || guests <= 0) {
      return res.status(400).json({ message: "number_of_guests debe ser un número positivo" });
    }

    // Buscar el servicio de catering por id
    const service = await CateringService.findOne({ id: service_id });

    if (!service) {
      return res.status(404).json({ message: "Servicio de catering no encontrado" });
    }

    // Validar que el servicio sea público si es necesario
    if (service.is_public === false) {
      return res.status(403).json({ message: "El servicio de catering no está disponible para cotización pública" });
    }

    // Calcular el costo total estimado
    const estimated_total = service.service_price * guests;

    // Generar un quote_id único (simulado)
    const quote_id = Math.floor(Math.random() * 10000) + 1;

    // Preparar la respuesta
    const quote = {
      quote_id,
      service_id,
      service_name: service.service_name,
      price_per_person: service.service_price,
      number_of_guests: guests,
      estimated_total,
      event_type: event_type || "General"
    };

    res.status(201).json(quote);
  } catch (error) {
    res.status(500).json({ message: "Error al generar la cotización", error: error.message });
  }
};