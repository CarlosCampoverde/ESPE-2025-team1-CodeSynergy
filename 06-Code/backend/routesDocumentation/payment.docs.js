/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Operations related to payments
 */

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
 *         description: List of all payments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 *       500:
 *         description: Error retrieving payments
 */

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
 *         description: Payment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Error retrieving payment
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
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentInput'
 *           example:
 *             payment_amount: 150.00
 *             payment_date: "2023-12-05"
 *             payment_method: "Credit Card"
 *     responses:
 *       201:
 *         description: Payment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Invalid payment data
 *       500:
 *         description: Error creating payment
 */

/**
 * @swagger
 * /quickquote/webresources/Payments/updatePayment:
 *   put:
 *     summary: Update an existing payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentUpdate'
 *           example:
 *             id: 1
 *             payment_amount: 175.00
 *             payment_date: "2023-12-06"
 *             payment_method: "Bank Transfer"
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Invalid payment data
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Error updating payment
 */

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
 *         description: Payment deleted successfully
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Error deleting payment
 */

/**
 * @swagger
 * /quickquote/webresources/Payments/verify:
 *   post:
 *     summary: Verify payment against quotation
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               payment_id:
 *                 type: string
 *                 example: "1"
 *               quotation_id:
 *                 type: string
 *                 example: "5"
 *     responses:
 *       200:
 *         description: Payment verification result
 *       400:
 *         description: Invalid verification data
 *       404:
 *         description: Payment or quotation not found
 *       500:
 *         description: Error verifying payment
 */

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
 *         description: Date in YYYY-MM-DD format
 *         example: "2023-12-05"
 *     responses:
 *       200:
 *         description: Total payments for the date
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 date:
 *                   type: string
 *                   format: date
 *                 total:
 *                   type: number
 *       500:
 *         description: Error calculating total payments
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         payment_amount:
 *           type: number
 *           format: float
 *           example: 150.00
 *         payment_date:
 *           type: string
 *           format: date
 *           example: "2023-12-05"
 *         payment_method:
 *           type: string
 *           example: "Credit Card"
 *     PaymentInput:
 *       type: object
 *       required:
 *         - payment_amount
 *         - payment_date
 *         - payment_method
 *       properties:
 *         payment_amount:
 *           type: number
 *           format: float
 *           example: 150.00
 *         payment_date:
 *           type: string
 *           format: date
 *           example: "2023-12-05"
 *         payment_method:
 *           type: string
 *           example: "Credit Card"
 *     PaymentUpdate:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         payment_amount:
 *           type: number
 *           format: float
 *           example: 175.00
 *         payment_date:
 *           type: string
 *           format: date
 *           example: "2023-12-06"
 *         payment_method:
 *           type: string
 *           example: "Bank Transfer"
 */

module.exports = {};