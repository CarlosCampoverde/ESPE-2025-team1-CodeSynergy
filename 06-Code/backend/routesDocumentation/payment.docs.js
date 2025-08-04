const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Operations related to payments
 */

/**
 * @swagger
 * /quickquote/webresources/Payments/createPayment:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Payment data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 100.5
 *               method:
 *                 type: string
 *                 example: "Credit Card"
 *               reservation_id:
 *                 type: string
 *                 example: "reservation001"
 *     responses:
 *       201:
 *         description: Payment created
 *       500:
 *         description: Error creating payment
 */
router.post("/createPayment", paymentController.createPayment);

/**
 * @swagger
 * /quickquote/webresources/Payments/{id}:
 *   get:
 *     summary: Get a payment by ID
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment found
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Error retrieving payment
 */
router.get("/:id", paymentController.getPayment);

/**
 * @swagger
 * /quickquote/webresources/Payments:
 *   get:
 *     summary: Get all payments
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all payments
 *       500:
 *         description: Error retrieving payments
 */
router.get("/", paymentController.getAllPayments);

/**
 * @swagger
 * /quickquote/webresources/Payments/updatePayment:
 *   put:
 *     summary: Update a payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Payment data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "payment001"
 *               amount:
 *                 type: number
 *                 example: 120.0
 *               method:
 *                 type: string
 *                 example: "Debit Card"
 *     responses:
 *       200:
 *         description: Payment updated
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Error updating payment
 */
router.put("/updatePayment", paymentController.updatePayment);

/**
 * @swagger
 * /quickquote/webresources/Payments/deletePayment/{id}:
 *   delete:
 *     summary: Delete a payment by ID
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment deleted
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Error deleting payment
 */
router.delete("/deletePayment/:id", paymentController.deletePayment);

/**
 * @swagger
 * /quickquote/webresources/Payments/verify:
 *   post:
 *     summary: Verify payment against quotation
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Data for payment verification
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               payment_id:
 *                 type: string
 *                 example: "payment001"
 *               quotation_id:
 *                 type: string
 *                 example: "quotation001"
 *     responses:
 *       200:
 *         description: Payment verified
 *       400:
 *         description: Invalid data
 *       500:
 *         description: Error verifying payment
 */
router.post("/verify", paymentController.verifyPayment);

/**
 * @swagger
 * /quickquote/webresources/Payments/totalByDate/{date}:
 *   get:
 *     summary: Get total payments by date
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Total payments for the date
 *       404:
 *         description: No payments found for the date
 *       500:
 *         description: Error retrieving total payments
 */
router.get("/totalByDate/:date", paymentController.getTotalPaymentsByDate);

module.exports = router;
