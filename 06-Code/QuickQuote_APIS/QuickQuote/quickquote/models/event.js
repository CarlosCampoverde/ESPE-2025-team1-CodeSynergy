const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    id: { type: Number},
    event_name: { type: String },
    event_date: { type: Date },
    event_location: { type: String },
    event_type: { type: String }
  },
  { collection: "Event" }  // Nombre explícito de la colección
);

module.exports = mongoose.model("Event", eventSchema);