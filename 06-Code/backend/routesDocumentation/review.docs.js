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
 *                 type: string
 *                 example: "Excelente lugar, el servicio fue increíble. Definitivamente volveré."
 *         application/json:
 *           schema:
 *             type: object
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
router.post("/createReview", reviewController.createReview);

/**
 * @swagger
 * /quickquote/webresources/Reviews/updateReview:
 *   put:
 *     summary: Update a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Review data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "review001"
 *               rating:
 *                 type: integer
 *                 example: 4
 *               comment:
 *                 type: string
 *                 example: "Good service."
 *     responses:
 *       200:
 *         description: Review updated
 *       404:
 *         description: Review not found
 *       500:
 *         description: Error updating review
 */
router.put("/updateReview", reviewController.updateReview);

/**
 * @swagger
 * /quickquote/webresources/Reviews/deleteReview/{id}:
 *   delete:
 *     summary: Delete a review by ID
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
 *         description: Review deleted
 *       404:
 *         description: Review not found
 *       500:
 *         description: Error deleting review
 */
router.delete("/deleteReview/:id", reviewController.deleteReview);

/**
 * @swagger
 * /quickquote/webresources/Reviews/venue/{venue_id}:
 *   get:
 *     summary: Get reviews by venue ID
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venue_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Venue ID
 *     responses:
 *       200:
 *         description: List of reviews for the venue
 *       404:
 *         description: No reviews found for the venue
 *       500:
 *         description: Error retrieving reviews by venue
 */
router.get("/venue/:venue_id", reviewController.getReviewsByVenue);

/**
 * @swagger
 * /quickquote/webresources/Reviews/byRating/{rating}:
 *   get:
 *     summary: Get reviews by rating
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rating
 *         required: true
 *         schema:
 *           type: integer
 *         description: Rating value
 *     responses:
 *       200:
 *         description: List of reviews with the specified rating
 *       404:
 *         description: No reviews found with the specified rating
 *       500:
 *         description: Error retrieving reviews by rating
 */
router.get("/byRating/:rating", reviewController.getReviewsByRating);

module.exports = router;
