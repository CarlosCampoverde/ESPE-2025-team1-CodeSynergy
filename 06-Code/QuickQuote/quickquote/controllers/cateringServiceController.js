const CateringService = require('../models/cateringservice');
const Menu = require('../models/menu');
const Client = require('../models/client'); // Agregar el modelo de Cliente
const Quotation = require('../models/quotation'); // Agregar el modelo de Quotation
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

// Generar una cotización completa con menú y servicios adicionales
// Generar una cotización completa con menú y servicios adicionales
exports.generateFullCateringQuote = async (req, res) => {
  const { menu_id, number_of_guests, service_ids, event_type } = req.body;

  try {
    // Validar campos requeridos
    if (!menu_id || !number_of_guests) {
      return res.status(400).json({ message: "menu_id y number_of_guests son requeridos" });
    }

    // Validar que number_of_guests sea un número positivo
    const guests = parseInt(number_of_guests);
    if (isNaN(guests) || guests <= 0) {
      return res.status(400).json({ message: "number_of_guests debe ser un número positivo" });
    }

    // Buscar el menú por id
    const menu = await Menu.findOne({ id: menu_id });
    if (!menu) {
      return res.status(404).json({ message: "Menú no encontrado" });
    }

    // CÁLCULO 1: Subtotal del menú seleccionado = precio del menú * cantidad personas
    const menu_subtotal = menu.menu_price * guests;

    // Inicializar subtotal de servicios adicionales
    let services_subtotal = 0;
    let services_details = [];

    // Si se proporcionan service_ids, calcular subtotal de servicios
    if (service_ids && Array.isArray(service_ids) && service_ids.length > 0) {
      const services = await CateringService.find({ 
        id: { $in: service_ids },
        $or: [{ is_public: true }, { is_public: { $exists: false } }]
      });

      if (services.length !== service_ids.length) {
        return res.status(404).json({ message: "Uno o más servicios de catering no encontrados o no públicos" });
      }

      // CÁLCULO 2: Subtotal servicios adicionales = precio unitario * cantidad
      // Nota: Asumiendo que cada servicio se cobra una sola vez (cantidad = 1)
      // Si necesitas especificar cantidades diferentes, deberías incluir un campo 'quantity' en el request
      services_subtotal = services.reduce((total, service) => {
        const service_quantity = 1; // Cantidad por defecto, puedes modificar esto
        const service_total = service.service_price * service_quantity;
        
        services_details.push({
          service_id: service.id,
          service_name: service.service_name,
          price_per_unit: service.service_price,
          quantity: service_quantity,
          service_total
        });
        return total + service_total;
      }, 0);
    }

    // CÁLCULO 3: Cotización total = Subtotal del menú seleccionado + Subtotal servicios adicionales
    const total_quote = menu_subtotal + services_subtotal;

    // Generar un quote_id único (simulado)
    const quote_id = Math.floor(Math.random() * 10000) + 1;

    // Preparar la respuesta con los cálculos explícitos
    const quote = {
      quote_id,
      menu_id,
      menu_name: menu.menu_name,
      menu_price_per_person: menu.menu_price,
      number_of_guests: guests,
      
      // Cálculos detallados
      calculations: {
        menu_subtotal: {
          description: "Subtotal del menú seleccionado",
          formula: "precio del menú × cantidad personas",
          calculation: `${menu.menu_price} × ${guests}`,
          amount: menu_subtotal
        },
        services_subtotal: {
          description: "Subtotal servicios adicionales",
          formula: "precio unitario × cantidad",
          amount: services_subtotal
        },
        total_quote: {
          description: "Cotización total",
          formula: "Subtotal del menú + Subtotal servicios adicionales",
          calculation: `${menu_subtotal} + ${services_subtotal}`,
          amount: total_quote
        }
      },
      
      // Resumen
      menu_subtotal,
      services_subtotal,
      services: services_details,
      total_quote,
      event_type: event_type || "General"
    };

    res.status(201).json(quote);
  } catch (error) {
    res.status(500).json({ message: "Error al generar la cotización completa", error: error.message });
  }
};

// NUEVA FUNCIÓN: Generar cotización completa con cliente y guardar en Quotation
exports.generateFullCateringQuoteWithClient = async (req, res) => {
  const { menu_id, number_of_guests, service_ids, event_type } = req.body;
  const client_id = req.params.id; // ObjectId del cliente desde la URL

  try {
    // Validar campos requeridos
    if (!menu_id || !number_of_guests) {
      return res.status(400).json({ message: "menu_id y number_of_guests son requeridos" });
    }

    // Validar que el client_id sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(client_id)) {
      return res.status(400).json({ message: "client_id debe ser un ObjectId válido" });
    }

    // Validar que number_of_guests sea un número positivo
    const guests = parseInt(number_of_guests);
    if (isNaN(guests) || guests <= 0) {
      return res.status(400).json({ message: "number_of_guests debe ser un número positivo" });
    }

    // Buscar el cliente por ObjectId
    const client = await Client.findById(client_id);
    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    // Buscar el menú por id
    const menu = await Menu.findOne({ id: menu_id });
    if (!menu) {
      return res.status(404).json({ message: "Menú no encontrado" });
    }

    // CÁLCULO 1: Subtotal del menú seleccionado = precio del menú * cantidad personas
    const menu_subtotal = menu.menu_price * guests;

    // Inicializar subtotal de servicios adicionales
    let services_subtotal = 0;
    let services_details = [];

    // Si se proporcionan service_ids, calcular subtotal de servicios
    if (service_ids && Array.isArray(service_ids) && service_ids.length > 0) {
      const services = await CateringService.find({ 
        id: { $in: service_ids },
        $or: [{ is_public: true }, { is_public: { $exists: false } }]
      });

      if (services.length !== service_ids.length) {
        return res.status(404).json({ message: "Uno o más servicios de catering no encontrados o no públicos" });
      }

      // CÁLCULO 2: Subtotal servicios adicionales = precio unitario * cantidad
      services_subtotal = services.reduce((total, service) => {
        const service_quantity = 1; // Cantidad por defecto
        const service_total = service.service_price * service_quantity;
        
        services_details.push({
          service_id: service.id,
          service_name: service.service_name,
          price_per_unit: service.service_price,
          quantity: service_quantity,
          service_total
        });
        return total + service_total;
      }, 0);
    }

    // CÁLCULO 3: Cotización total = Subtotal del menú seleccionado + Subtotal servicios adicionales
    const total_quote = menu_subtotal + services_subtotal;

    // Generar un quote_id único (simulado)
    const quote_id = Math.floor(Math.random() * 10000) + 1;

    // Preparar los datos de la cotización
    const quotationData = {
      quote_id,
      client_id: client._id,
      client_info: {
        id_client: client.id_client,
        first_name: client.first_name,
        last_name: client.last_name,
        full_name: `${client.first_name || ''} ${client.last_name || ''}`.trim(),
        email: client.email,
        phone: client.phone,
        address: client.address,
      },
      menu_id,
      menu_name: menu.menu_name,
      menu_price_per_person: menu.menu_price,
      number_of_guests: guests,
      menu_subtotal,
      services_subtotal,
      services: services_details,
      total_quote,
      event_type: event_type || "General",
      status: "pending",
      created_at: new Date(),
      updated_at: new Date()
    };

    // Guardar la cotización en la base de datos
    const newQuotation = new Quotation(quotationData);
    const savedQuotation = await newQuotation.save();

    // Preparar la respuesta incluyendo la información del cliente y cálculos detallados
    const response = {
      quotation_id: savedQuotation._id,
      quote_id,
      client_info: {
        client_id: client._id,
        id_client: client.id_client,
        first_name: client.first_name,
        last_name: client.last_name,
        full_name: `${client.first_name || ''} ${client.last_name || ''}`.trim(),
        email: client.email,
        phone: client.phone,
        address: client.address,
      },
      menu_details: {
        menu_id,
        menu_name: menu.menu_name,
        menu_price_per_person: menu.menu_price,
        menu_subtotal
      },
      event_details: {
        event_type: event_type || "General",
        number_of_guests: guests
      },
      services_details: {
        services_subtotal,
        services: services_details
      },
      
      // Cálculos detallados
      calculations: {
        menu_subtotal: {
          description: "Subtotal del menú seleccionado",
          formula: "precio del menú × cantidad personas",
          calculation: `${menu.menu_price} × ${guests}`,
          amount: menu_subtotal
        },
        services_subtotal: {
          description: "Subtotal servicios adicionales",
          formula: "precio unitario × cantidad",
          amount: services_subtotal
        },
        total_quote: {
          description: "Cotización total",
          formula: "Subtotal del menú + Subtotal servicios adicionales",
          calculation: `${menu_subtotal} + ${services_subtotal}`,
          amount: total_quote
        }
      },
      
      pricing: {
        menu_subtotal,
        services_subtotal,
        total_quote
      },
      status: "pending",
      created_at: savedQuotation.created_at,
      message: "Cotización generada y guardada exitosamente"
    };

    res.status(201).json(response);
  } catch (error) {
    console.error("Error al generar cotización con cliente:", error);
    res.status(500).json({ message: "Error al generar la cotización completa con cliente", error: error.message });
  }
};