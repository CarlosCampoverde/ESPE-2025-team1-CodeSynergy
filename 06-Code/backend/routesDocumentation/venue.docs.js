const express = require("express");
const router = express.Router();
const venueController = require("../controllers/venueController");

/**
 * @swagger
 * tags:
 *   name: Venues
 *   description: Operations related to venues
 */

/**
 * @swagger
 * /quickquote/webresources/Venues/createVenue:
 *   post:
 *     summary: Create a new venue
 *     tags: [Venues]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Data for the venue to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 example: 1
 *               venue_name:
 *                 type: string
 *                 example: "Main Hall"
 *               venue_location:
 *                 type: string
 *                 example: "Quito"
 *               venue_capacity:
 *                 type: number
 *                 example: 100
 *     responses:
 *       201:
 *         description: Venue created successfully
 *       500:
 *         description: Error creating the venue
 */
router.post("/createVenue", venueController.createVenue);

/**
 * @swagger
 * /quickquote/webresources/Venues/{id}:
 *   get:
 *     summary: Get a venue by ID
 *     tags: [Venues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the venue to get
 *     responses:
 *       200:
 *         description: Venue retrieved successfully
 *       404:
 *         description: Venue not found
 *       500:
 *         description: Error retrieving the venue
 */
router.get("/:id", venueController.getVenue);

/**
 * @swagger
 * /quickquote/webresources/Venues:
 *   get:
 *     summary: Get all venues
 *     tags: [Venues]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of venues retrieved successfully
 *       404:
 *         description: No venues registered
 *       500:
 *         description: Error retrieving venues
 */
router.get("/", venueController.getAllVenues);

/**
 * @swagger
 * /quickquote/webresources/Venues/updateVenue:
 *   put:
 *     summary: Update a venue
 *     tags: [Venues]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Data for the venue to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "venue001"
 *               venue_name:
 *                 type: string
 *                 example: "Renovated Main Hall"
 *               venue_location:
 *                 type: string
 *                 example: "Quito"
 *               venue_capacity:
 *                 type: integer
 *                 example: 120
 *     responses:
 *       200:
 *         description: Venue updated successfully
 *       404:
 *         description: Venue not found
 *       500:
 *         description: Error updating the venue
 */
router.put("/updateVenue", venueController.updateVenue);

/**
 * @swagger
 * /quickquote/webresources/Venues/deleteVenue/{id}:
 *   delete:
 *     summary: Delete a venue by ID
 *     tags: [Venues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the venue to delete
 *     responses:
 *       200:
 *         description: Venue deleted successfully
 *       404:
 *         description: Venue not found
 *       500:
 *         description: Error deleting the venue
 */
router.delete("/deleteVenue/:id", venueController.deleteVenue);

/**
 * @swagger
 * /quickquote/webresources/Venues/by-capacity/{min_capacity}:
 *   get:
 *     summary: Search venues by minimum capacity
 *     tags: [Venues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: min_capacity
 *         required: true
 *         schema:
 *           type: integer
 *         description: Minimum required capacity
 *     responses:
 *       200:
 *         description: List of venues with the specified minimum capacity
 *       404:
 *         description: No venues found with the specified minimum capacity
 *       500:
 *         description: Error retrieving venues by capacity
 */
router.get("/by-capacity/:min_capacity", venueController.getVenuesByCapacity);

/**
 * @swagger
 * /quickquote/webresources/Venues/searchByCapacity/{min}/{max}:
 *   get:
 *     summary: Search venues by capacity range
 *     tags: [Venues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: min
 *         required: true
 *         schema:
 *           type: integer
 *         description: Minimum capacity
 *       - in: path
 *         name: max
 *         required: true
 *         schema:
 *           type: integer
 *         description: Maximum capacity
 *     responses:
 *       200:
 *         description: List of venues within the capacity range
 *       404:
 *         description: No venues found with capacity in that range
 *       400:
 *         description: Invalid min and max parameters
 *       500:
 *         description: Error searching venues by capacity
 */
router.get("/searchByCapacity/:min/:max", venueController.searchVenuesByCapacity);

module.exports = router;
