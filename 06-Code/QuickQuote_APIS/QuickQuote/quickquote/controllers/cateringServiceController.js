const CateringService = require('../models/cateringservice');
const mongoose = require("mongoose");

// Obtener todos los servicios de catering
exports.getAllCateringServices = async (req, res) => {
  try {
    const cateringServices = await CateringService.find();  // Obtener todos los servicios

    if (cateringServices.length === 0) {
      return res.status(404).json({ message: "No hay servicios de catering registrados" });
    }

    res.status(200).json(cateringServices);  // Retornar los servicios encontrados
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los servicios de catering", error: error.message });
  }
};

// Obtener un servicio de catering por ID
exports.getCateringService = async (req, res) => {
  const { id } = req.params;

  try {
    const cateringService = await CateringService.findOne({ id: id });

    if (!cateringService) {
      return res.status(404).json({ message: "Servicio de catering no encontrado" });
    }

    res.status(200).json(cateringService);  // Retornar el servicio de catering encontrado
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el servicio de catering", error: error.message });
  }
};

// Obtener todos los servicios de catering públicos
exports.getPublicCateringServices = async (req, res) => {
  try {
    const publicServices = await CateringService.find({ is_public: true }, 'service_name service_description service_price');

    if (publicServices.length === 0) {
      return res.status(404).json({ message: "No hay servicios de catering públicos disponibles" });
    }

    res.status(200).json(publicServices);  // Retornar los servicios públicos
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
    res.status(201).json(newService);  // Servicio creado exitosamente
  } catch (error) {
    res.status(500).json({ message: "Error al crear el servicio de catering", error: error.message });
  }
};

// Actualizar un servicio de catering existente
exports.updateCateringService = async (req, res) => {
  const { id, service_name, service_description, service_price, is_public } = req.body;

  try {
    const service = await CateringService.findOne({ id: id });

    if (!service) {
      return res.status(404).json({ message: "Servicio de catering no encontrado" });
    }

    // Actualizar los campos del servicio
    service.service_name = service_name;
    service.service_description = service_description;
    service.service_price = service_price;
    service.is_public = is_public !== undefined ? is_public : service.is_public;

    await service.save();
    res.status(200).json(service);  // Servicio actualizado
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el servicio de catering", error: error.message });
  }
};

// Eliminar un servicio de catering
exports.deleteCateringService = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await CateringService.findOne({ id: id });

    if (!service) {
      return res.status(404).json({ message: "Servicio de catering no encontrado" });
    }

    await CateringService.deleteOne({ id: id });
    res.status(200).json({ message: "Servicio de catering eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el servicio de catering", error: error.message });
  }
};