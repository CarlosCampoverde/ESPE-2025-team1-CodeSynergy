const Client = require('../models/client');
const Menu = require('../models/menu'); // Modelo Menu existente
const mongoose = require("mongoose");

// Crear un nuevo cliente
exports.createClient = async (req, res) => {
  const { id_client, first_name, last_name, email, phone, address } = req.body;

  try {
    const newClient = new Client({ id_client, first_name, last_name, email, phone, address });
    await newClient.save();
    res.status(201).json(newClient);  // Cliente creado exitosamente
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el cliente', error: error.message });
  }
};

// Obtener un cliente por ID
exports.getClient = async (req, res) => {
  const { id_client } = req.params;

  try {
    const client = await Client.findOne({ id_client: id_client });

    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el cliente", error: error.message });
  }
};

// Obtener todos los clientes
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();

    if (clients.length === 0) {
      return res.status(404).json({ message: "No hay clientes registrados" });
    }

    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los clientes", error: error.message });
  }
};

// Actualizar los detalles de un cliente
exports.updateClient = async (req, res) => {
  const { id_client, first_name, last_name, email, phone, address } = req.body;

  try {
    if (!id_client || !first_name || !last_name || !email || !phone || !address) {
      return res.status(400).json({ message: "Todos los campos son requeridos." });
    }

    const client = await Client.findOne({ id_client: id_client });

    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    client.first_name = first_name;
    client.last_name = last_name;
    client.email = email;
    client.phone = phone;
    client.address = address;

    await client.save();
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el cliente", error: error.message });
  }
};

// Eliminar un cliente
exports.deleteClient = async (req, res) => {
  const { id_client } = req.params;

  try {
    const client = await Client.findOne({ id_client: id_client });

    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    await Client.deleteOne({ id_client: id_client });
    res.status(200).json({ message: "Cliente eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el cliente", error: error.message });
  }
};

// Personalizar una cotización
exports.customQuote = async (req, res) => {
  const { event_type, number_of_guests, menu_id } = req.body;

  try {
    // Validar que los campos requeridos estén presentes
    if (!event_type || !number_of_guests || !menu_id) {
      return res.status(400).json({ message: "event_type, number_of_guests y menu_id son requeridos" });
    }

    // Buscar el menú por id (en lugar de menu_id)
    const menu = await Menu.findOne({ id: menu_id });

    if (!menu) {
      return res.status(404).json({ message: "Menú no encontrado" });
    }

    // Calcular el costo total estimado
    const estimated_total = menu.menu_price * number_of_guests;

    // Generar un quote_id único (simulado)
    const quote_id = Math.floor(Math.random() * 10000) + 1;

    res.status(201).json({
      quote_id,
      estimated_total,
      menu_name: menu.menu_name,
      price_per_person: menu.menu_price
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la cotización", error: error.message });
  }
};

// Enviar o descargar una cotización
exports.sendQuote = async (req, res) => {
  const { quote_id, email, send } = req.body;

  try {
    // Validar que los campos requeridos estén presentes
    if (!quote_id || !email || send === undefined) {
      return res.status(400).json({ message: "quote_id, email y send son requeridos" });
    }

    // Verificar que el cliente existe
    const client = await Client.findOne({ email });

    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    // Simular generación/envío de PDF
    if (send) {
      console.log(`Enviando cotización ${quote_id} al correo ${email}`);
    } else {
      console.log(`Generando PDF para la cotización ${quote_id}`);
    }

    res.status(200).json({
      message: `Cotización enviada exitosamente al correo ${email}.`
    });
  } catch (error) {
    res.status(500).json({ message: "Error al enviar la cotización", error: error.message });
  }
};