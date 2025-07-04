const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    menu_name: { type: String },
    menu_description: { type: String },
    menu_price: { type: Number },
    event_type: { type: String } // Campo para asociar el menú con un tipo de evento
  },
  { collection: "Menu" }
);

module.exports = mongoose.model("Menu", menuSchema);