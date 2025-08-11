const express = require("express");
const router = express.Router();
const venueController = require("../controllers/venueController");
const { roleMiddleware } = require("../middleware/auth");

// Crear un nuevo lugar (solo admin y superadmin)
router.post("/createVenue", roleMiddleware('admin', 'superadmin'), venueController.createVenue);

// Obtener un lugar por ID (público)
router.get("/:id", venueController.getVenue);

// Obtener todos los lugares (público)
router.get("/", venueController.getAllVenues);

// Actualizar un lugar (solo admin y superadmin)
router.put("/updateVenue", roleMiddleware('admin', 'superadmin'), venueController.updateVenue);

// Eliminar un lugar (solo admin y superadmin)
router.delete("/deleteVenue/:id", roleMiddleware('admin', 'superadmin'), venueController.deleteVenue);

// Buscar lugares por capacidad mínima (público)
router.get("/by-capacity/:min_capacity", venueController.getVenuesByCapacity);

// Buscar lugares por rango de capacidad (público)
router.get("/searchByCapacity/:min/:max", venueController.searchVenuesByCapacity);
module.exports = router;