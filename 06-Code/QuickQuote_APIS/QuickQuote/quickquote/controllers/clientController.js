const Client = require('../models/client');
const mongoose = require("mongoose");

// Crear un nuevo cliente
exports.createClient = async (req, res) => {
  const { id_client, first_name, last_name, email, phone, address } = req.body;

  try {
    const newClient = new Client({ id_client,first_name, last_name, email, phone, address });
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
    // Buscar cliente usando el campo id_client directamente
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
    const clients = await Client.find();  // Obtener todos los clientes

    if (clients.length === 0) {
      return res.status(404).json({ message: "No hay clientes registrados" });
    }

    res.status(200).json(clients);  // Retornar los clientes encontrados
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los clientes", error: error.message });
  }
};

// Actualizar los detalles de un cliente
exports.updateClient = async (req, res) => {
  const { id_client, first_name, last_name, email, phone, address } = req.body;

  try {
    // Verificar que todos los campos necesarios estén presentes
    if (!id_client || !first_name || !last_name || !email || !phone || !address) {
      return res.status(400).json({ message: "Todos los campos son requeridos." });
    }

    // Buscar el cliente por id_client (no por _id)
    const client = await Client.findOne({ id_client: id_client });

    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    // Actualizar los campos del cliente
    client.first_name = first_name;
    client.last_name = last_name;
    client.email = email;
    client.phone = phone;
    client.address = address;

    // Guardar el cliente actualizado
    await client.save();

    res.status(200).json(client);  // Retornar el cliente actualizado
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el cliente", error: error.message });
  }
};

// Eliminar un cliente
exports.deleteClient = async (req, res) => {
  const { id_client } = req.params;

  try {
    // Verificar si el id_client existe
    const client = await Client.findOne({ id_client: id_client });

    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    // Eliminar el cliente
    await Client.deleteOne({ id_client: id_client });

    res.status(200).json({ message: "Cliente eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el cliente", error: error.message });
  }
};