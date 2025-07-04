const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffController");

// Crear un nuevo personal
router.post("/createStaff", staffController.createStaff);

// Obtener un personal por ID
router.get("/:id", staffController.getStaff);

// Obtener todos los personal (getAll)
router.get("/", staffController.getAllStaff);

// Actualizar un personal
router.put("/updateStaff", staffController.updateStaff);

// Eliminar un personal
router.delete("/deleteStaff/:id", staffController.deleteStaff);

module.exports = router;