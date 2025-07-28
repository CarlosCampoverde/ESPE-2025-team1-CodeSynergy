const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },  // ID único para la reseña
    id_client: { type: String },  // Referencia al cliente que hace la reseña
    id_venue: { type: String },  // Referencia al lugar que recibe la reseña
    review_rating: { type: Number, required: true, min: 1, max: 5 },  // Calificación de la reseña entre 1 y 5
    review_comments: { type: String, required: true }  // Comentarios adicionales de la reseña
  },
  { collection: "Review" }  // Nombre explícito de la colección
);

module.exports = mongoose.model("Review", reviewSchema);
