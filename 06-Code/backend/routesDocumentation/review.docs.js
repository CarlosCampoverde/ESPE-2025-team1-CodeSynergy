const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Operations related to reviews
 */

/**
 * @swagger
 * /quickquote/webresources/Reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all reviews
 *       500:
 *         description: Error retrieving reviews
 */
router.get("/", reviewController.getAllReviews);

/**
 * @swagger
 * /quickquote/webresources/Reviews/{id}:
 *   get:
 *     summary: Get a review by ID
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Review found
 *       404:
 *         description: Review not found
 *       500:
 *         description: Error retrieving review
 */
router.get("/:id", reviewController.getReview);

/**
 * @swagger
 * /quickquote/webresources/Reviews/createReview:
 *               id:
 *                 type: number
 *                 example: 1
 *               id_client:
 *                 type: string
 *                 example: "2"
 *               id_venue:
 *                 type: string
 *                 example: "3"
 *               review_rating:
 *                 type: number
 *                 example: 5
 *               review_comments:
/**
 *                 type: string
 *                 example: "Excelente lugar, el servicio fue increíble. Definitivamente volveré."
 *         application/json:
 *           schema:
 *             type: object
module.exports = router;
 *             properties:
 *               rating:
 *                 type: integer
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: "Excellent service!"
 *               venue_id:
 *                 type: string
 *                 example: "venue001"
 *     responses:
 *       201:
 *         description: Review created
 *       500:
 *         description: Error creating review
 */

/**
 * @swagger
/**
 * tags:
 *   name: Reviews
 *   description: Endpoints para gestionar reseñas de lugares
 */

/**
 * @swagger
 * /quickquote/webresources/Reviews:
 *   get:
 *     summary: Obtener todas las reseñas
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas las reseñas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       404:
 *         description: No hay reseñas registradas
 *       500:
 *         description: Error al obtener las reseñas
 */
router.get("/", reviewController.getAllReviews);

module.exports = router;
/**
 * @swagger
 * /quickquote/webresources/Reviews/{id}:
 *   get:
 *     summary: Obtener una reseña por ID
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único de la reseña
 *     responses:
 *       200:
 *         description: Reseña encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Reseña no encontrada
 *       500:
 *         description: Error al obtener la reseña
 */
router.get("/:id", reviewController.getReview);

/**
 * @swagger
 * /quickquote/webresources/Reviews:
 *   post:
 *     summary: Crear una nueva reseña
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewInput'
 *           example:
 *             id: 42
 *             id_client: "42"
 *             id_venue: "2"
 *             review_rating: 4
 *             review_comments: "Alex actualizo esto :p"
 *     responses:
 *       201:
 *         description: Reseña creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       500:
 *         description: Error al crear la reseña
 */
router.post("/", reviewController.createReview);

/**
 * @swagger
 * /quickquote/webresources/Reviews:
 *   put:
 *     summary: Actualizar una reseña existente
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewInput'
 *           example:
 *             id: 42
 *             id_client: "42"
 *             id_venue: "2"
 *             review_rating: 4
 *             review_comments: "Alex actualizo esto :p"
 *     responses:
 *       200:
 *         description: Reseña actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Reseña no encontrada
 *       500:
 *         description: Error al actualizar la reseña
 */
router.put("/", reviewController.updateReview);

/**
 * @swagger
 * /quickquote/webresources/Reviews/{id}:
 *   delete:
 *     summary: Eliminar una reseña por ID
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único de la reseña
 *     responses:
 *       200:
 *         description: Reseña eliminada exitosamente
 *       404:
 *         description: Reseña no encontrada
 *       500:
 *         description: Error al eliminar la reseña
 */
router.delete("/:id", reviewController.deleteReview);

/**
 * @swagger
 * /quickquote/webresources/Reviews/venue/{venue_id}:
 *   get:
 *     summary: Obtener reseñas por ID de lugar
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venue_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del lugar
 *     responses:
 *       200:
 *         description: Lista de reseñas para el lugar
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ReviewVenueResponse'
 *       404:
 *         description: No se encontraron reseñas para este lugar
 *       500:
 *         description: Error al obtener las reseñas del lugar
 */
router.get("/venue/:venue_id", reviewController.getReviewsByVenue);

/**
 * @swagger
 * /quickquote/webresources/Reviews/byRating/{rating}:
 *   get:
 *     summary: Obtener reseñas por calificación mínima
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rating
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *         description: Calificación mínima (1-5)
 *     responses:
 *       200:
 *         description: Lista de reseñas con la calificación mínima indicada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       404:
 *         description: No se encontraron reseñas con la calificación indicada
 *       500:
 *         description: Error al obtener las reseñas por calificación
 */
router.get("/byRating/:rating", reviewController.getReviewsByRating);


module.exports = router;
