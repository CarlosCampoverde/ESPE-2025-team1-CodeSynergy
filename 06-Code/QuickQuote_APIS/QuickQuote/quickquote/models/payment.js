const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    id: { type: Number},
     id_reservation: { type: String },
    payment_amount: { type: Number },
    payment_date: { type: Date }
  },
  { collection: "Payment" }  // Nombre explícito de la colección
);

module.exports = mongoose.model("Payment", paymentSchema);