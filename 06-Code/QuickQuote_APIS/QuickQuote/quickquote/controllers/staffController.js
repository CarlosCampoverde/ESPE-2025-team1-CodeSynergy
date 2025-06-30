// staffController.js

const Staff = require('../models/staff');

// Crear un nuevo personal
exports.createStaff = async (req, res) => {
  const { id, staff_name, staff_role, staff_contact } = req.body;

  try {
    const newStaff = new Staff({ id, staff_name, staff_role, staff_contact });
    await newStaff.save();
    res.status(201).json(newStaff);  // Personal creado exitosamente
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el personal', error: error.message });
  }
};

// Obtener un personal por ID
exports.getStaff = async (req, res) => {
  const { id } = req.params;

  try {
    const staff = await Staff.findOne({ id });

    if (!staff) {
      return res.status(404).json({ message: "Personal no encontrado" });
    }

    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el personal", error: error.message });
  }
};

// Actualizar los detalles de un personal
exports.updateStaff = async (req, res) => {
  const { id, staff_name, staff_role, staff_contact } = req.body;

  try {
    const staff = await Staff.findOne({ id });

    if (!staff) {
      return res.status(404).json({ message: "Personal no encontrado" });
    }

    staff.staff_name = staff_name;
    staff.staff_role = staff_role;
    staff.staff_contact = staff_contact;

    await staff.save();
    res.status(200).json(staff);  // Personal actualizado
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el personal", error: error.message });
  }
};

// Eliminar un personal
exports.deleteStaff = async (req, res) => {
  const { id } = req.params;

  try {
    const staff = await Staff.findOne({ id });

    if (!staff) {
      return res.status(404).json({ message: "Personal no encontrado" });
    }

    await Staff.deleteOne({ id });
    res.status(200).json({ message: "Personal eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el personal", error: error.message });
  }
};
