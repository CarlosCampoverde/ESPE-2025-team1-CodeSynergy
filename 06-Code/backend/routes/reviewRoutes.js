const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { roleMiddleware } = require("../middleware/auth");

// Obtener todas las reseñas (público)
router.get("/", reviewController.getAllReviews);

// Obtener una reseña por ID (público)
router.get("/:id", reviewController.getReview);

// Crear una nueva reseña (clientes autenticados)
router.post("/createReview", reviewController.createReview);

// Actualizar una reseña (solo admin y superadmin)
router.put("/updateReview", roleMiddleware('admin', 'superadmin'), reviewController.updateReview);

// Eliminar una reseña (solo admin y superadmin)
router.delete("/deleteReview/:id", roleMiddleware('admin', 'superadmin'), reviewController.deleteReview);

// Obtener calificaciones de un lugar (público)
router.get("/venue/:venue_id", reviewController.getReviewsByVenue);

// Obtener reseñas por calificación (público)
router.get("/byRating/:rating", reviewController.getReviewsByRating);

module.exports = router;