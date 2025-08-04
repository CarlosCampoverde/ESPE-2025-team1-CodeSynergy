const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Operations related to reservations
 */

/**
 * @swagger
 * /quickquote/webresources/Reservations/createReservation:
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Reservation data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client_id:
 *                 type: string
 *                 example: "client001"
 *               event_id:
 *                 type: string
 *                 example: "event001"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-08-04"
 *     responses:
 *       201:
 *         description: Reservation created
 *       500:
 *         description: Error creating reservation
 */
router.post("/createReservation", reservationController.createReservation);

/**
 * @swagger
 * /quickquote/webresources/Reservations/{id}:
 *   get:
 *     summary: Get a reservation by ID
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *     responses:
 *       200:
 *         description: Reservation found
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Error retrieving reservation
 */
router.get("/:id", reservationController.getReservation);

/**
 * @swagger
 * /quickquote/webresources/Reservations:
 *   get:
 *     summary: Get all reservations
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all reservations
 *       500:
 *         description: Error retrieving reservations
 */
router.get("/", reservationController.getAllReservations);

/**
 * @swagger
 * /quickquote/webresources/Reservations/updateReservation:
 *   put:
 *     summary: Update a reservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Reservation data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "reservation001"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-08-05"
 *     responses:
 *       200:
 *         description: Reservation updated
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Error updating reservation
 */
router.put("/updateReservation", reservationController.updateReservation);

/**
 * @swagger
 * /quickquote/webresources/Reservations/deleteReservation/{id}:
 *   delete:
 *     summary: Delete a reservation by ID
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *     responses:
 *       200:
 *         description: Reservation deleted
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Error deleting reservation
 */
router.delete("/deleteReservation/:id", reservationController.deleteReservation);

/**
 * @swagger
 * /quickquote/webresources/Reservations/history/{client_id}:
 *   get:
 *     summary: Get reservation history by client ID
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: client_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Client ID
 *     responses:
 *       200:
 *         description: List of reservations for the client
 *       404:
 *         description: No reservations found for the client
 *       500:
 *         description: Error retrieving reservations by client
 */
router.get("/history/:client_id", reservationController.getReservationsByClient);

/**
 * @swagger
 * /quickquote/webresources/Reservations/byDate/{yyyy_mm_dd}:
 *   get:
 *     summary: Get reservations by date
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: yyyy_mm_dd
 *         required: true
 *         schema:
 *           type: string
 *         description: Date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: List of reservations for the date
 *       404:
 *         description: No reservations found for the date
 *       500:
 *         description: Error retrieving reservations by date
 */
router.get("/byDate/:yyyy_mm_dd", reservationController.getReservationsByDate);

/**
 * @swagger
 * /quickquote/webresources/Reservations/byDate/{startDate}/{endDate}:
 *   get:
 *     summary: Get reservations by date range
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *         description: Start date (YYYY-MM-DD)
 *       - in: path
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *         description: End date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: List of reservations in the date range
 *       404:
 *         description: No reservations found in the date range
 *       500:
 *         description: Error retrieving reservations by date range
 */
router.get("/byDate/:startDate/:endDate", reservationController.getReservationsByDateRange);

/**
 * @swagger
 * /quickquote/webresources/Reservations/fromDate/{startDate}:
 *   get:
 *     summary: Get reservations from a start date
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *         description: Start date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: List of reservations from the start date
 *       404:
 *         description: No reservations found from the start date
 *       500:
 *         description: Error retrieving reservations from date
 */
router.get("/fromDate/:startDate", reservationController.getReservationsFromDate);

module.exports = router;
