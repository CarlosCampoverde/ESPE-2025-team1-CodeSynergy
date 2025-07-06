const express = require("express");
const router = express.Router();
const venueController = require("../controllers/venueController");

// Crear un nuevo lugar
router.post("/createVenue", venueController.createVenue);

// Obtener un lugar por ID
router.get("/:id", venueController.getVenue);

// Obtener todos los lugares
router.get("/", venueController.getAllVenues);

// Actualizar un lugar
router.put("/updateVenue", venueController.updateVenue);

// Eliminar un lugar
router.delete("/deleteVenue/:id", venueController.deleteVenue);

// Buscar lugares por capacidad mínima
router.get("/by-capacity/:min_capacity", venueController.getVenuesByCapacity);

// Buscar lugares por rango de capacidad
router.get("/searchByCapacity/:min/:max", venueController.searchVenuesByCapacity);
module.exports = router;