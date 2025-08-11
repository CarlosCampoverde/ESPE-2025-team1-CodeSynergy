/**
 * @swagger
 * /quickquote/webresources/users:
 *   get:
 *     summary: Get all users (superadmin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserResponse'
 *       403:
 *         description: Access denied - Superadmin only
 *       500:
 *         description: Error retrieving users
 */

/**
 * @swagger
 * /quickquote/webresources/users/{id}/role:
 *   put:
 *     summary: Update user role (superadmin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRoleUpdate'
 *           example:
 *             role: "admin"
 *     responses:
 *       200:
 *         description: Role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Role updated"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid role
 *       403:
 *         description: Access denied - Superadmin only
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating role
 */

/**
 * @swagger
 * /quickquote/webresources/users/search:
 *   get:
 *     summary: Search users by username, email, or role (superadmin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search term
 *         example: "admin"
 *     responses:
 *       200:
 *         description: Users found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserResponse'
 *       403:
 *         description: Access denied - Superadmin only
 *       500:
 *         description: Error searching users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64a1b5c3d4e5f6789abc1234"
 *         username:
 *           type: string
 *           example: "johndoe"
 *         email:
 *           type: string
 *           format: email
 *           example: "john.doe@example.com"
 *         role:
 *           type: string
 *           enum: [client, admin, superadmin]
 *           example: "client"
 *         termsAccepted:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-12-15T10:30:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-12-15T15:45:00Z"
 *     UserResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64a1b5c3d4e5f6789abc1234"
 *         username:
 *           type: string
 *           example: "johndoe"
 *         email:
 *           type: string
 *           format: email
 *           example: "john.doe@example.com"
 *         role:
 *           type: string
 *           enum: [client, admin, superadmin]
 *           example: "client"
 *         termsAccepted:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-12-15T10:30:00Z"
 *     UserRoleUpdate:
 *       type: object
 *       required:
 *         - role
 *       properties:
 *         role:
 *           type: string
 *           enum: [client, admin, superadmin]
 *           example: "admin"
 */

module.exports = {};
