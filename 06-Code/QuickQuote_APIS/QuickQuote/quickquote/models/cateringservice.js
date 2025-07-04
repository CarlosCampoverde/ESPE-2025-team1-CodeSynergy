const mongoose = require("mongoose");

const cateringServiceSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },  // ID único para el servicio
    service_name: { type: String, required: true },  // Nombre del servicio
    service_description: { type: String },  // Descripción del servicio
    service_price: { type: Number, required: true }  // Precio del servicio
  },
  { collection: "CateringService" }  // Nombre explícito de la colección
);

module.exports = mongoose.model("CateringService", cateringServiceSchema);
