const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    id: { type: Number},
    id_client: { type: String },
    reservation_date: { type: Date },
    reservation_time: { type: String },
    number_of_guests: { type: Number },
    menu_id: { type: String }
  },
  { collection: "Reservation" }  // Nombre explícito de la colección
);

module.exports = mongoose.model("Reservation", reservationSchema);