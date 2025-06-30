const express = require("express");
const router = express.Router();
const venueController = require("../controllers/venueController");

// Crear un nuevo lugar
router.post("/createVenue", venueController.createVenue);

// Obtener un lugar por ID
router.get("/:id", venueController.getVenue);

//actualizar un lugar
router.put("/updateVenue", venueController.updateVenue);

// Eliminar un lugar
router.delete("/deleteVenue/:id", venueController.deleteVenue);

module.exports = router;