// menuController.js

const Menu = require('../models/menu');

// Crear un nuevo menú
exports.createMenu = async (req, res) => {
  const { id, menu_name, menu_description, menu_price } = req.body;

  try {
    const newMenu = new Menu({ id, menu_name, menu_description, menu_price });
    await newMenu.save();
    res.status(201).json(newMenu);  // Menú creado exitosamente
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el menú', error: error.message });
  }
};

// Obtener un menú por ID
exports.getMenu = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar Menuo usando el campo id directamente
    const menu = await Menu.findOne({ id: id });  // Cambié 'menu' a 'Menu'

    if (!menu) {
      return res.status(404).json({ message: "Menu no encontrado" });
    }

    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el Menuo", error: error.message });
  }
};

// Actualizar los detalles de un menú
exports.updateMenu = async (req, res) => {
  const { id, menu_name, menu_description, menu_price } = req.body;

  try {
    const menu = await Menu.findOne({ id });

    if (!menu) {
      return res.status(404).json({ message: "Menú no encontrado" });
    }

    menu.menu_name = menu_name;
    menu.menu_description = menu_description;
    menu.menu_price = menu_price;

    await menu.save();
    res.status(200).json(menu);  // Menú actualizado
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el menú", error: error.message });
  }
};

// Eliminar un menú
exports.deleteMenu = async (req, res) => {
  const { id } = req.params;

  try {
    const menu = await Menu.findOne({ id });

    if (!menu) {
      return res.status(404).json({ message: "Menú no encontrado" });
    }

    await Menu.deleteOne({ id });
    res.status(200).json({ message: "Menú eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el menú", error: error.message });
  }
};
