const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    id_client: { type: String, unique: true, required: true }, 
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String, unique: true },
    phone: { type: String },
    address: { type: String }
  },
  { collection: "Client" }  // Nombre explícito de la colección
);

module.exports = mongoose.model("Client", clientSchema);