const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    id_client: { type: Number, required: true },
    reservation_date: { type: Date, required: true },
    reservation_time: { type: String, required: true },
    number_of_guests: { type: Number, required: true },
    menu_id: { type: Number, required: true },
  },
  { collection: "Reservation" }
);

module.exports = mongoose.model("Reservation", reservationSchema);