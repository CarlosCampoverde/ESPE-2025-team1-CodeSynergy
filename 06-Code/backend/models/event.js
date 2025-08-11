const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true }, // Añadido unique: true para garantizar IDs únicos
    event_name: { type: String },
    event_date: { type: Date },
    event_location: { type: String },
    event_type: { type: String }
  },
  { collection: "Event" }  // Nombre explícito de la colección
);

module.exports = mongoose.model("Event", eventSchema);