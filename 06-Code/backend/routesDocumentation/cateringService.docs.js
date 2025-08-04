const express = require("express");
const router = express.Router();
const cateringServiceController = require("../controllers/cateringServiceController");

/**
 * @swagger
 * tags:
 *   name: CateringServices
 *   description: Operations related to catering services
 */

/**
 * @swagger
 * /quickquote/webresources/CateringServices:
 *   get:
 *     summary: Get all catering services
 *     tags: [CateringServices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all catering services
 *       500:
 *         description: Error retrieving catering services
 */
router.get("/", cateringServiceController.getAllCateringServices);

/**
 * @swagger
 * /quickquote/webresources/CateringServices/public:
 *   get:
 *     summary: Get all public catering services
 *     tags: [CateringServices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of public catering services
 *       500:
 *         description: Error retrieving public catering services
 */
router.get("/public", cateringServiceController.getPublicCateringServices);

/**
 * @swagger
 * /quickquote/webresources/CateringServices/{id}:
 *   get:
 *     summary: Get a catering service by ID
 *     tags: [CateringServices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Catering service ID
 *     responses:
 *       200:
 *         description: Catering service found
 *       404:
 *         description: Catering service not found
 *       500:
 *         description: Error retrieving catering service
 */
router.get("/:id", cateringServiceController.getCateringService);

/**
 * @swagger
 * /quickquote/webresources/CateringServices/createCateringService:
 *   post:
 *     summary: Create a new catering service
 *     tags: [CateringServices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Catering service data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Buffet Premium"
 *               description:
 *                 type: string
 *                 example: "Premium buffet for events"
 *               price:
 *                 type: number
 *                 example: 1500
 *     responses:
 *       201:
 *         description: Catering service created
 *       500:
 *         description: Error creating catering service
 */
router.post("/createCateringService", cateringServiceController.createCateringService);

/**
 * @swagger
 * /quickquote/webresources/CateringServices/updateCateringService:
 *   put:
 *     summary: Update a catering service
 *     tags: [CateringServices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Catering service data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "service001"
 *               name:
 *                 type: string
 *                 example: "Buffet Premium Updated"
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *               price:
 *                 type: number
 *                 example: 1700
 *     responses:
 *       200:
 *         description: Catering service updated
 *       404:
 *         description: Catering service not found
 *       500:
 *         description: Error updating catering service
 */
router.put("/updateCateringService", cateringServiceController.updateCateringService);

/**
 * @swagger
 * /quickquote/webresources/CateringServices/deleteCateringService/{id}:
 *   delete:
 *     summary: Delete a catering service by ID
 *     tags: [CateringServices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Catering service ID
 *     responses:
 *       200:
 *         description: Catering service deleted
 *       404:
 *         description: Catering service not found
 *       500:
 *         description: Error deleting catering service
 */
router.delete("/deleteCateringService/:id", cateringServiceController.deleteCateringService);

/**
 * @swagger
 * /quickquote/webresources/CateringServices/report:
 *   get:
 *     summary: Generate a basic catering services report
 *     tags: [CateringServices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Catering services report generated
 *       500:
 *         description: Error generating report
 */
router.get('/report', cateringServiceController.generateServiceReport);

/**
 * @swagger
 * /quickquote/webresources/CateringServices/quote:
 *   post:
 *     summary: Generate a catering quote
 *     tags: [CateringServices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Data for quote generation
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client_id:
 *                 type: string
 *                 example: "client001"
 *               service_id:
 *                 type: string
 *                 example: "service001"
 *     responses:
 *       200:
 *         description: Quote generated successfully
 *       400:
 *         description: Invalid data
 *       500:
 *         description: Error generating quote
 */
router.post("/quote/", cateringServiceController.generateCateringQuote);

/**
 * @swagger
 * /quickquote/webresources/CateringServices/fullQuote/{id}:
 *   post:
 *     summary: Generate a full catering quote with client
 *     tags: [CateringServices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service ID
 *     requestBody:
 *       description: Data for full quote generation
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client_id:
 *                 type: string
 *                 example: "client001"
 *     responses:
 *       200:
 *         description: Full quote generated successfully
 *       400:
 *         description: Invalid data
 *       500:
 *         description: Error generating full quote
 */
router.post('/fullQuote/:id', cateringServiceController.generateFullCateringQuoteWithClient);

module.exports = router;
