const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");

// Crear un nuevo cliente
router.post("/createClient", clientController.createClient);

// Obtener un cliente por ID
router.get("/:id_client", clientController.getClient);

// Actualizar un cliente
router.put("/updateClient", clientController.updateClient);

// Eliminar un cliente
router.delete("/deleteClient/:id_client", clientController.deleteClient);

module.exports = router;