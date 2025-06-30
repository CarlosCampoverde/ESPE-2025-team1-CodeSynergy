const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

// Crear un nuevo menú
router.post("/createMenu", menuController.createMenu);

// Obtener un menú por ID
router.get("/:id", menuController.getMenu);

// Actualizar un menú
router.put("/updateMenu", menuController.updateMenu);

// Eliminar un menú
router.delete("/deleteMenu/:id", menuController.deleteMenu);

module.exports = router;