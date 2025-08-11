const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },  // ID único para el personal
    staff_name: { type: String },
    staff_role: { type: String },
    staff_contact: { type: String }
  },
  { collection: "Staff" }  // Nombre explícito de la colección
);

module.exports = mongoose.model("Staff", staffSchema);