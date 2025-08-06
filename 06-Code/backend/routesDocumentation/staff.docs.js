const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffController");

/**
 * @swagger
 * tags:
 *   name: Staff
 *   description: Operations related to staff members
 */

/**
 * @swagger
 * /quickquote/webresources/Staff:
 *   get:
 *     summary: Get all staff members
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all staff members
 *       500:
 *         description: Error retrieving staff members
 */
router.get("/", staffController.getAllStaff);

/**
 * @swagger
 * /quickquote/webresources/Staff/admins:
 *   get:
 *     summary: Get all admin staff members
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of admin staff members
 *       404:
 *         description: No admin staff found
 *       500:
 *         description: Error retrieving admin staff
 */
router.get("/admins", staffController.getAdminStaff);

/**
 * @swagger
 * /quickquote/webresources/Staff/{id}:
 *   get:
 *     summary: Get a staff member by ID
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Staff member ID
 *     responses:
 *       200:
 *         description: Staff member found
 *       404:
 *         description: Staff member not found
 *       500:
 *         description: Error retrieving staff member
 */
router.get("/:id", staffController.getStaff);

/**
 * @swagger
 * /quickquote/webresources/Staff/createStaff:
 *               id:
 *                 type: number
 *                 example: 1
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Staff member data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               role:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       201:
 *         description: Staff member created
 *       500:
 *         description: Error creating staff member
 */
router.post("/createStaff", staffController.createStaff);

/**
 * @swagger
 * /quickquote/webresources/Staff/updateStaff:
 *   put:
 *     summary: Update a staff member
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Staff member data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "staff001"
 *               name:
 *                 type: string
 *               id:
 *                 type: number
 *                 example: 1
 *                 example: "staff"
 *     responses:
 *       200:
 *         description: Staff member updated
 *       404:
 *         description: Staff member not found
 *       500:
 *         description: Error updating staff member
 */
router.put("/updateStaff", staffController.updateStaff);

/**
 * @swagger
 * /quickquote/webresources/Staff/assign-role/{id}:
 *   patch:
 *     summary: Assign or update a staff member's role
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Staff member ID
 *     requestBody:
 *       description: Role data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: Staff role assigned/updated
 *       404:
 *         description: Staff member not found
 *       500:
 *         description: Error assigning role
 */
router.patch("/assign-role/:id", staffController.assignStaffRole);

/**
 * @swagger
 * /quickquote/webresources/Staff/deleteStaff/{id}:
 *   delete:
 *     summary: Delete a staff member by ID
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Staff member ID
 *     responses:
 *       200:
 *         description: Staff member deleted
 *       404:
 *         description: Staff member not found
 *       500:
 *         description: Error deleting staff member
 */
router.delete("/deleteStaff/:id", staffController.deleteStaff);

module.exports = router;
