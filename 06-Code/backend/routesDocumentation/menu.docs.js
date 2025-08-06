/**
 * @swagger
 * tags:
 *   name: Menus
 *   description: Operations related to menus
 */

/**
 * @swagger
 * /quickquote/webresources/Menus:
 *   get:
 *     summary: Get all menus
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all menus retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Menu'
 *       500:
 *         description: Error retrieving menus
 */

/**
 * @swagger
 * /quickquote/webresources/Menus/type/{event_type}:
 *   get:
 *     summary: Get menus by event type
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: event_type
 *         required: true
 *         schema:
 *           type: string
 *         description: Event type
 *         example: "wedding"
 *     responses:
 *       200:
 *         description: List of menus for the event type retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Menu'
 *       404:
 *         description: No menus found for the event type
 *       500:
 *         description: Error retrieving menus
 */

/**
 * @swagger
 * /quickquote/webresources/Menus/searchByPrice:
 *   get:
 *     summary: Search menus by price range
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price
 *         example: 10
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price
 *         example: 50
 *     responses:
 *       200:
 *         description: Menus found within price range
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Menu'
 *       404:
 *         description: No menus found in the price range
 *       500:
 *         description: Error searching menus
 */

/**
 * @swagger
 * /quickquote/webresources/Menus/{id}:
 *   get:
 *     summary: Get a menu by ID
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Menu ID
 *     responses:
 *       200:
 *         description: Menu retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 *       404:
 *         description: Menu not found
 *       500:
 *         description: Error retrieving menu
 */

/**
 * @swagger
 * /quickquote/webresources/Menus/createMenu:
 *   post:
 *     summary: Create a new menu
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuInput'
 *           example:
 *             menu_name: "Vegetarian Menu"
 *             menu_description: "A menu for vegetarians"
 *             menu_price: 25
 *             event_type: "wedding"
 *     responses:
 *       201:
 *         description: Menu created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 *       400:
 *         description: Invalid menu data
 *       500:
 *         description: Error creating menu
 */

/**
 * @swagger
 * /quickquote/webresources/Menus/updateMenu:
 *   put:
 *     summary: Update an existing menu
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuUpdate'
 *           example:
 *             id: 1
 *             menu_name: "Updated Vegetarian Menu"
 *             menu_description: "An updated menu for vegetarians"
 *             menu_price: 30
 *             event_type: "wedding"
 *     responses:
 *       200:
 *         description: Menu updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 *       400:
 *         description: Invalid menu data
 *       404:
 *         description: Menu not found
 *       500:
 *         description: Error updating menu
 */

/**
 * @swagger
 * /quickquote/webresources/Menus/deleteMenu/{id}:
 *   delete:
 *     summary: Delete a menu by ID
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Menu ID
 *     responses:
 *       200:
 *         description: Menu deleted successfully
 *       404:
 *         description: Menu not found
 *       500:
 *         description: Error deleting menu
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Menu:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         menu_name:
 *           type: string
 *           example: "Vegetarian Menu"
 *         menu_description:
 *           type: string
 *           example: "A menu for vegetarians"
 *         menu_price:
 *           type: number
 *           example: 25
 *         event_type:
 *           type: string
 *           example: "wedding"
 *     MenuInput:
 *       type: object
 *       required:
 *         - menu_name
 *         - menu_price
 *         - event_type
 *       properties:
 *         menu_name:
 *           type: string
 *           example: "Vegetarian Menu"
 *         menu_description:
 *           type: string
 *           example: "A menu for vegetarians"
 *         menu_price:
 *           type: number
 *           example: 25
 *         event_type:
 *           type: string
 *           example: "wedding"
 *     MenuUpdate:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         menu_name:
 *           type: string
 *           example: "Updated Vegetarian Menu"
 *         menu_description:
 *           type: string
 *           example: "An updated menu for vegetarians"
 *         menu_price:
 *           type: number
 *           example: 30
 *         event_type:
 *           type: string
 *           example: "wedding"
 */

module.exports = {};
