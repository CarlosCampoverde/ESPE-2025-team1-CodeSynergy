const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

// Obtener todos los menús (getAll)
router.get("/", menuController.getAllMenus);

// Obtener menús por tipo de evento
router.get("/type/:event_type", menuController.getMenusByEventType);

// Obtener un menú por ID
router.get("/:id", menuController.getMenu);

// Crear un nuevo menú
router.post("/createMenu", menuController.createMenu);

// Actualizar un menú
router.put("/updateMenu", menuController.updateMenu);

// Eliminar un menú
router.delete("/deleteMenu/:id", menuController.deleteMenu);

// Nueva ruta para buscar menús por rango de precio
router.get("/searchByPrice", menuController.searchMenusByPrice);
module.exports = router;