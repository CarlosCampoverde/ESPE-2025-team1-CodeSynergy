const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Obtener todas las reseñas
router.get("/", reviewController.getAllReviews);

// Obtener una reseña por ID
router.get("/:id", reviewController.getReview);

// Crear una nueva reseña
router.post("/createReview", reviewController.createReview);

// Actualizar una reseña
router.put("/updateReview", reviewController.updateReview);

// Eliminar una reseña
router.delete("/deleteReview/:id", reviewController.deleteReview);

// Obtener calificaciones de un lugar
router.get("/venue/:venue_id", reviewController.getReviewsByVenue);

router.get("/byRating/:rating", reviewController.getReviewsByRating);

module.exports = router;