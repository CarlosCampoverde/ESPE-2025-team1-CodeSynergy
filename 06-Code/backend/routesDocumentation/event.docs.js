const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Operations related to events
 */

/**
 * @swagger
 * /quickquote/webresources/Events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all events
 *       500:
 *         description: Error retrieving events
 */
router.get("/", eventController.getAllEvents);

/**
 * @swagger
 * /quickquote/webresources/Events/upcoming:
 *   get:
 *     summary: Get upcoming events
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of upcoming events
 *       404:
 *         description: No upcoming events found
 *       500:
 *         description: Error retrieving upcoming events
 */
router.get("/upcoming", eventController.getUpcomingEvents);

/**
 * @swagger
 * /quickquote/webresources/Events/{id}:
 *   get:
 *     summary: Get an event by ID
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event found
 *       404:
 *         description: Event not found
 *       500:
 *         description: Error retrieving event
 */
router.get("/:id", eventController.getEvent);

/**
 * @swagger
 * /quickquote/webresources/Events/createEvent:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Event data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Birthday Party"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-08-04"
 *               location:
 *                 type: string
 *                 example: "Quito"
 *     responses:
 *       201:
 *         description: Event created
 *       500:
 *         description: Error creating event
 */
router.post("/createEvent", eventController.createEvent);

/**
 * @swagger
 * /quickquote/webresources/Events/updateEvent:
 *   put:
 *     summary: Update an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Event data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "event001"
 *               name:
 *                 type: string
 *                 example: "Birthday Party Updated"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-08-05"
 *               location:
 *                 type: string
 *                 example: "Quito"
 *     responses:
 *       200:
 *         description: Event updated
 *       404:
 *         description: Event not found
 *       500:
 *         description: Error updating event
 */
router.put("/updateEvent", eventController.updateEvent);

/**
 * @swagger
 * /quickquote/webresources/Events/deleteEvent/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event deleted
 *       404:
 *         description: Event not found
 *       500:
 *         description: Error deleting event
 */
router.delete("/deleteEvent/:id", eventController.deleteEvent);

/**
 * @swagger
 * /quickquote/webresources/Events/byClient/{id_client}:
 *   get:
 *     summary: Get events by client ID
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_client
 *         required: true
 *         schema:
 *           type: string
 *         description: Client ID
 *     responses:
 *       200:
 *         description: List of events for the client
 *       404:
 *         description: No events found for the client
 *       500:
 *         description: Error retrieving events by client
 */
router.get("/byClient/:id_client", eventController.getEventsByClient);

module.exports = router;
