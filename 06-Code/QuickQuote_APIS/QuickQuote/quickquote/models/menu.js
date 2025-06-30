const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    id: { type: Number}, 
    menu_name: { type: String },
    menu_description: { type: String },
    menu_price: { type: Number }
  },
  { collection: "Menu" }  // Nombre explícito de la colección
);

module.exports = mongoose.model("Menu", menuSchema);