const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffController");

// Obtener todos los personal (getAll)
router.get("/", staffController.getAllStaff);

// Obtener todos los administradores
router.get("/admins", staffController.getAdminStaff);

// Obtener un personal por ID
router.get("/:id", staffController.getStaff);

// Crear un nuevo personal
router.post("/createStaff", staffController.createStaff);

// Actualizar un personal
router.put("/updateStaff", staffController.updateStaff);

// Asignar o actualizar el rol de un miembro del staff
router.patch("/assign-role/:id", staffController.assignStaffRole);

// Eliminar un personal
router.delete("/deleteStaff/:id", staffController.deleteStaff);

module.exports = router;