const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Operaciones relacionadas con clientes
 */

/**
 * @swagger
 * /quickquote/webresources/Clients:
 *   get:
 *     summary: Obtener todos los clientes
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida exitosamente
 *       401:
 *         description: No autorizado
 */
router.get("/", clientController.getAllClients);

/**
 * @swagger
 * /quickquote/webresources/Clients/custom-quote:
 *   post:
 *     summary: Personalizar una cotización
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos para personalizar la cotización
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
 *                 example: "Producto X"
 *               quantity:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Cotización personalizada creada correctamente
 *       400:
 *         description: Error en los datos enviados
 *       401:
 *         description: No autorizado
 */
router.post("/custom-quote", clientController.customQuote);

/**
 * @swagger
 * /quickquote/webresources/Clients/send-quote:
 *   post:
 *     summary: Enviar o descargar una cotización
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos para enviar o descargar la cotización
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
 *                 example: "cliente@example.com"
 *     responses:
 *       200:
 *         description: Cotización enviada o descargada correctamente
 *       400:
 *         description: Error en los datos enviados
 *       401:
 *         description: No autorizado
 */
router.post("/send-quote", clientController.sendQuote);

/**
 * @swagger
 * /quickquote/webresources/Clients/{id_client}:
 *   get:
 *     summary: Obtener un cliente por ID
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_client
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cliente a obtener
 *     responses:
 *       200:
 *         description: Cliente obtenido correctamente
 *       404:
 *         description: Cliente no encontrado
 *       401:
 *         description: No autorizado
 */
router.get("/:id_client", clientController.getClient);

/**
 * @swagger
 * /quickquote/webresources/Clients/createClient:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos del cliente a crear
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Juan Pérez"
 *               email:
 *                 type: string
 *                 example: "juan@example.com"
 *               phone:
 *                 type: string
 *                 example: "123456789"
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       401:
 *         description: No autorizado
 */
router.post("/createClient", clientController.createClient);

/**
 * @swagger
 * /quickquote/webresources/Clients/updateClient:
 *   put:
 *     summary: Actualizar un cliente existente
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos del cliente a actualizar
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
 *                 example: "Juan Pérez Actualizado"
 *               email:
 *                 type: string
 *                 example: "juan.actualizado@example.com"
 *               phone:
 *                 type: string
 *                 example: "987654321"
 *     responses:
 *       200:
 *         description: Cliente actualizado correctamente
 *       400:
 *         description: Error en los datos enviados
 *       401:
 *         description: No autorizado
 */
router.put("/updateClient", clientController.updateClient);

/**
 * @swagger
 * /quickquote/webresources/Clients/deleteClient/{id_client}:
 *   delete:
 *     summary: Eliminar un cliente por ID
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_client
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cliente a eliminar
 *     responses:
 *       200:
 *         description: Cliente eliminado correctamente
 *       404:
 *         description: Cliente no encontrado
 *       401:
 *         description: No autorizado
 */
router.delete("/deleteClient/:id_client", clientController.deleteClient);

module.exports = router;
