const express = require('express');
const router = express.Router();
const cateringServiceController = require('../controllers/cateringServiceController');

// Obtener todos los servicios de catering
router.get("/", cateringServiceController.getAllCateringServices);

// Obtener un servicio de catering por ID
router.get("/:id", cateringServiceController.getCateringService);

// Obtener todos los servicios de catering públicos
router.get("/public", cateringServiceController.getPublicCateringServices);

// Crear un nuevo servicio de catering
router.post("/createCateringService", cateringServiceController.createCateringService);

// Actualizar un servicio de catering
router.put("/updateCateringService", cateringServiceController.updateCateringService);

// Eliminar un servicio de catering
router.delete("/deleteCateringService/:id", cateringServiceController.deleteCateringService);

module.exports = router;