const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema(
  {
    id: { type: Number},
    venue_name: { type: String },
    venue_location: { type: String },
    venue_capacity: { type: Number }
  },
  { collection: "Venue" }  // Nombre explícito de la colección
);

module.exports = mongoose.model("Venue", venueSchema);