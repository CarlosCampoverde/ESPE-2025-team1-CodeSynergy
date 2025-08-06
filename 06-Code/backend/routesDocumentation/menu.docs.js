const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

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
 *         description: List of all menus
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   menu_name:
 *                     type: string
 *               id:
 *                 type: number
 *                 example: 1
 *               menu_name:
 *                 type: string
 *                 example: "Vegetarian Menu"
 *               menu_description:
 *                 type: string
 *                 example: "A menu for vegetarians"
 *               menu_price:
 *                 type: number
 *                 example: 25
 *               event_type:
 *                 type: string
 *                 example: "wedding"
router.get("/", menuController.getAllMenus);

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
 *     responses:
 *       200:
 *         description: List of menus for the event type
 *       404:
 *         description: No menus found for the event type
 *       500:
 *         description: Error retrieving menus
 */
router.get("/type/:event_type", menuController.getMenusByEventType);

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
 *         description: Menu found
 *       404:
 *         description: Menu not found
 *       500:
 *         description: Error retrieving menu
 */
router.get("/:id", menuController.getMenu);

/**
 * @swagger
 * /quickquote/webresources/Menus/createMenu:
 *   post:
 *     summary: Create a new menu
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Menu data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Vegetarian Menu"
 *               description:
 *                 type: string
 *                 example: "A menu for vegetarians"
 *               price:
 *                 type: number
 *                 example: 25
 *     responses:
 *       201:
 *         description: Menu created
 *       500:
 *         description: Error creating menu
 */
router.post("/createMenu", menuController.createMenu);

/**
 * @swagger
 * /quickquote/webresources/Menus/updateMenu:
 *   put:
 *     summary: Update a menu
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Menu data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "menu001"
 *               name:
 *                 type: string
 *                 example: "Vegetarian Menu Updated"
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *               price:
 *                 type: number
 *                 example: 30
 *     responses:
 *       200:
 *         description: Menu updated
 *       404:
 *         description: Menu not found
 *       500:
 *         description: Error updating menu
 */
router.put("/updateMenu", menuController.updateMenu);

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
 *         description: Menu deleted
 *       404:
 *         description: Menu not found
 *       500:
 *         description: Error deleting menu
 */
router.delete("/deleteMenu/:id", menuController.deleteMenu);

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
 *         name: min
 *         required: false
 *         schema:
 *           type: number
 *         description: Minimum price
 *       - in: query
 *         name: max
 *         required: false
 *         schema:
 *           type: number
 *         description: Maximum price
 *     responses:
 *       200:
 *         description: List of menus within the price range
 *       404:
 *         description: No menus found in the price range
 *       400:
 *         description: Invalid parameters
 *       500:
 *         description: Error searching menus by price
 */
router.get("/searchByPrice", menuController.searchMenusByPrice);

module.exports = router;
