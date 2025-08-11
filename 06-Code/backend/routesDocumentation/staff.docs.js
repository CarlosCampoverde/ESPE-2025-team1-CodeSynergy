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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Staff'
 *       500:
 *         description: Error retrieving staff members
 */
router.get("/", staffController.getAllStaff);

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
 *           type: number
 *         description: Staff member ID
 *     responses:
 *       200:
 *         description: Staff member found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Staff'
 *       404:
 *         description: Staff member not found
 *       500:
 *         description: Error retrieving staff member
 */
router.get("/:id", staffController.getStaff);

/**
 * @swagger
 * /quickquote/webresources/Staff/createStaff:
 *   post:
 *     summary: Create a new staff member
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Staff member data. Por defecto, use 'Mesero' en staff_role para crear.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Staff'
 *           example:
 *             id: 10
 *             staff_name: "Juan Perez"
 *             staff_role: "Mesero"
 *             staff_contact: "juanperez@email.com"
 *     responses:
 *       201:
 *         description: Staff member created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Staff'
 *       500:
 *         description: Error creating staff member
 */
router.post("/createStaff", staffController.createStaff);

/**
 * @swagger
 * /quickquote/webresources/Staff/Cheff:
 *   get:
 *     summary: Get all admin staff members
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of admin staff members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Staff'
 *       404:
 *         description: No admin staff found
 *       500:
 *         description: Error retrieving admin staff
 */
router.get("/admins", staffController.getAdminStaff);


/**
 * @swagger
 * /quickquote/webresources/Staff/updateStaff:
 *   put:
 *     summary: Update a staff member
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Staff member data to update. Use 'Cheff' en staff_role para pruebas/actualización. La actualización se realiza por el campo 'id' en el body, no por parámetro en la ruta.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Staff'
 *           example:
 *             id: 8
 *             staff_name: "John Doe"
 *             staff_role: "Cheff"
 *             staff_contact: "john@example.com"
 *     responses:
 *       200:
 *         description: Staff member updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Staff'
 *       403:
 *         description: Only staff with role 'Cheff' can be updated
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
 *           type: number
 *         description: Staff member ID
 *     requestBody:
 *       description: Role data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               new_role:
 *                 type: string
 *                 example: "Cheff"
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
 *     summary: Eliminar un miembro del staff por ID
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del miembro del staff
 *     responses:
 *       200:
 *         description: Staff eliminado exitosamente
 *       404:
 *         description: Staff no encontrado
 *       500:
 *         description: Error al eliminar staff
 */
router.delete("/deleteStaff/:id", staffController.deleteStaff);

module.exports = router;
