const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");

// Obtener todos los clientes (getAll)
router.get("/", clientController.getAllClients);

// Personalizar una cotización
router.post("/custom-quote", clientController.customQuote);

// Enviar o descargar una cotización
router.post("/send-quote", clientController.sendQuote);

// Obtener un cliente por ID
router.get("/:id_client", clientController.getClient);

// Crear un nuevo cliente
router.post("/createClient", clientController.createClient);

// Actualizar un cliente
router.put("/updateClient", clientController.updateClient);

// Eliminar un cliente
router.delete("/deleteClient/:id_client", clientController.deleteClient);

module.exports = router;