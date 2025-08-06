const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Operations related to clients
 */

/**
 * @swagger
 * /quickquote/webresources/Clients:
 *   get:
 *     summary: Get all clients
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of clients retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", clientController.getAllClients);

/**
 * @swagger
 * /quickquote/webresources/Clients/custom-quote:
 *   post:
 *     summary: Customize a quotation
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Data to customize the quotation
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client_id:
 *                 type: string
 *                 example: "12345"
 *               product:
 *                 type: string
 *                 example: "Product X"
 *               quantity:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Customized quotation created successfully
 *       400:
 *         description: Invalid data sent
 *       401:
 *         description: Unauthorized
 */
router.post("/custom-quote", clientController.customQuote);

/**
 * @swagger
 * /quickquote/webresources/Clients/send-quote:
 *   post:
 *     summary: Send or download a quotation
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Data to send or download the quotation
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quote_id:
 *                 type: string
 *                 example: "quote123"
 *               email:
 *                 type: string
 *                 example: "client@example.com"
 *     responses:
 *       200:
 *         description: Quotation sent or downloaded successfully
 *       400:
 *         description: Invalid data sent
 *       401:
 *         description: Unauthorized
 */
router.post("/send-quote", clientController.sendQuote);

/**
 * @swagger
 * /quickquote/webresources/Clients/{id_client}:
 *   get:
 *     summary: Get a client by ID
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_client
 *         required: true
 *         schema:
 *           type: string
 *         description: Client ID to retrieve
 *     responses:
 *       200:
 *         description: Client retrieved successfully
 *       404:
 *         description: Client not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id_client", clientController.getClient);

/**
 * @swagger
 * /quickquote/webresources/Clients/createClient:
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Data for the new client
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_client:
 *                 type: string
 *                 example: "client001"
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *         description: Invalid data sent
 *       401:
 *         description: Unauthorized
 */
router.post("/createClient", clientController.createClient);

/**
 * @swagger
 * /quickquote/webresources/Clients/updateClient:
 *   put:
 *     summary: Update an existing client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Data to update the client
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_client:
 *                 type: string
 *                 example: "abc123"
 *               name:
 *                 type: string
 *                 example: "John Doe Updated"
 *               email:
 *                 type: string
 *                 example: "john.updated@example.com"
 *               phone:
 *                 type: string
 *                 example: "987654321"
 *     responses:
 *       200:
 *         description: Client updated successfully
 *       400:
 *         description: Invalid data sent
 *       401:
 *         description: Unauthorized
 */
router.put("/updateClient", clientController.updateClient);

/**
 * @swagger
 * /quickquote/webresources/Clients/deleteClient/{id_client}:
 *   delete:
 *     summary: Delete a client by ID
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_client
 *         required: true
 *         schema:
 *           type: string
 *         description: Client ID to delete
 *     responses:
 *       200:
 *         description: Client deleted successfully
 *       404:
 *         description: Client not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/deleteClient/:id_client", clientController.deleteClient);

module.exports = router;
