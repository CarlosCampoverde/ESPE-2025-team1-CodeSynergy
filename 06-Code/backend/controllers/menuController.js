const Menu = require('../models/menu');

// Crear un nuevo menú
exports.createMenu = async (req, res) => {
  const { id, menu_name, menu_description, menu_price, event_type } = req.body;

  try {
    const newMenu = new Menu({ id, menu_name, menu_description, menu_price, event_type });
    await newMenu.save();
    res.status(201).json(newMenu);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el menú', error: error.message });
  }
};

// Obtener un menú por ID
exports.getMenu = async (req, res) => {
  const { id } = req.params;

  try {
    const menu = await Menu.findOne({ id });

    if (!menu) {
      return res.status(404).json({ message: "Menú no encontrado" });
    }

    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el menú", error: error.message });
  }
};

// Obtener todos los menús
exports.getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find();

    if (menus.length === 0) {
      return res.status(404).json({ message: "No hay menús registrados" });
    }

    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los menús", error: error.message });
  }
};

// Obtener menús por tipo de evento
exports.getMenusByEventType = async (req, res) => {
  const { event_type } = req.params;

  try {
    const query = event_type === "General" 
      ? { $or: [{ event_type }, { event_type: { $exists: false } }] }
      : { event_type };
    
    const menus = await Menu.find(query, 'menu_name menu_description menu_price');

    if (menus.length === 0) {
      return res.status(404).json({ message: `No hay menús para el tipo de evento ${event_type}` });
    }

    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los menús por tipo de evento", error: error.message });
  }
};

// Actualizar los detalles de un menú
exports.updateMenu = async (req, res) => {
  const { id, menu_name, menu_description, menu_price, event_type } = req.body;

  try {
    const menu = await Menu.findOne({ id });

    if (!menu) {
      return res.status(404).json({ message: "Menú no encontrado" });
    }

    menu.menu_name = menu_name;
    menu.menu_description = menu_description;
    menu.menu_price = menu_price;
    menu.event_type = event_type;

    await menu.save();
    res.status(200).json(menu);
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

// Buscar menús por rango de precio
exports.searchMenusByPrice = async (req, res) => {
  const { minPrice, maxPrice } = req.query;

  try {
    // Validar que minPrice y maxPrice sean números válidos
    const minPriceNum = parseFloat(minPrice);
    const maxPriceNum = parseFloat(maxPrice);

    if (isNaN(minPriceNum) || isNaN(maxPriceNum)) {
      return res.status(400).json({ message: "Los parámetros minPrice y maxPrice deben ser números válidos" });
    }

    if (minPriceNum > maxPriceNum) {
      return res.status(400).json({ message: "El precio mínimo no puede ser mayor que el precio máximo" });
    }

    // Buscar menús dentro del rango de precios
    const menus = await Menu.find({
      menu_price: { $gte: minPriceNum, $lte: maxPriceNum }
    }, 'menu_name menu_description menu_price event_type');

    if (menus.length === 0) {
      return res.status(404).json({ message: `No hay menús en el rango de precios de ${minPriceNum} a ${maxPriceNum}` });
    }

    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar menús por rango de precio", error: error.message });
  }
};