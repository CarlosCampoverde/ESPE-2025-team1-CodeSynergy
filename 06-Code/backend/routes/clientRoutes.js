const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const { roleMiddleware } = require("../middleware/auth");

// Obtener todos los clientes (solo admin y superadmin)
router.get("/", roleMiddleware('admin', 'superadmin'), clientController.getAllClients);

// Personalizar una cotización (clientes pueden personalizar sus propias cotizaciones)
router.post("/custom-quote", clientController.customQuote);

// Enviar o descargar una cotización (clientes pueden enviar sus cotizaciones)
router.post("/send-quote", clientController.sendQuote);

// Obtener un cliente por ID (clientes pueden ver su propio perfil)
router.get("/:id_client", clientController.getClient);

// Crear un nuevo cliente (solo admin y superadmin)
router.post("/createClient", roleMiddleware('admin', 'superadmin'), clientController.createClient);

// Actualizar un cliente (solo admin y superadmin)
router.put("/updateClient", roleMiddleware('admin', 'superadmin'), clientController.updateClient);

// Eliminar un cliente (solo admin y superadmin)
router.delete("/deleteClient/:id_client", roleMiddleware('admin', 'superadmin'), clientController.deleteClient);

module.exports = router;

