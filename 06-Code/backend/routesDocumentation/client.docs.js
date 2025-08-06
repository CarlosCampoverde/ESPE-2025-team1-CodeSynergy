const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");



/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Endpoints para gestionar clientes
 */

/**
 * @swagger
 * /quickquote/webresources/Clients:
 *   get:
 *     summary: Obtener todos los clientes
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 *       500:
 *         description: Error al obtener los clientes
 */

/**
 * @swagger
 * /quickquote/webresources/Clients/custom-quote:
 *   post:
 *     summary: Personalizar una cotización
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_client:
 *                 type: string
 *                 example: "client001"
 *               product:
 *                 type: string
 *                 example: "Servicio Premium"
 *               quantity:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Cotización personalizada creada
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error al personalizar cotización
 */

/**
 * @swagger
 * /quickquote/webresources/Clients/send-quote:
 *   post:
 *     summary: Enviar o descargar una cotización
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
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
 *         description: Cotización enviada o descargada
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error al enviar cotización
 */

/**
 * @swagger
 * /quickquote/webresources/Clients/{id_client}:
 *   get:
 *     summary: Obtener un cliente por ID
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_client
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error al obtener el cliente
 */

/**
 * @swagger
 * /quickquote/webresources/Clients/createClient:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClientInput'
 *           example:
 *             id_client: "client001"
 *             first_name: "Carlos"
 *             last_name: "Martínez"
 *             email: "carlosmartinez1@example.com"
 *             phone: "9876543210"
 *             address: "Calle Verdadera 456"
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       500:
 *         description: Error al crear el cliente
 */

/**
 * @swagger
 * /quickquote/webresources/Clients/updateClient:
 *   put:
 *     summary: Actualizar un cliente existente
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClientInput'
 *           example:
 *             id_client: "client001"
 *             first_name: "Carlos"
 *             last_name: "Martínez"
 *             email: "carlosmartinez1@example.com"
 *             phone: "9876543210"
 *             address: "Calle Verdadera 456"
 *     responses:
 *       200:
 *         description: Cliente actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error al actualizar el cliente
 */

/**
 * @swagger
 * /quickquote/webresources/Clients/deleteClient/{id_client}:
 *   delete:
 *     summary: Eliminar un cliente por ID
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_client
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del cliente
 *     responses:
 *       200:
 *         description: Cliente eliminado exitosamente
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error al eliminar el cliente
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       properties:
 *         id_client:
 *           type: string
 *           example: "client001"
 *         first_name:
 *           type: string
 *           example: "Carlos"
 *         last_name:
 *           type: string
 *           example: "Martínez"
 *         email:
 *           type: string
 *           example: "carlosmartinez1@example.com"
 *         phone:
 *           type: string
 *           example: "9876543210"
 *         address:
 *           type: string
 *           example: "Calle Verdadera 456"
 *     ClientInput:
 *       type: object
 *       required:
 *         - id_client
 *         - first_name
 *         - last_name
 *         - email
 *         - phone
 *         - address
 *       properties:
 *         id_client:
 *           type: string
 *           example: "client001"
 *         first_name:
 *           type: string
 *           example: "Carlos"
 *         last_name:
 *           type: string
 *           example: "Martínez"
 *         email:
 *           type: string
 *           example: "carlosmartinez1@example.com"
 *         phone:
 *           type: string
 *           example: "9876543210"
 *         address:
 *           type: string
 *           example: "Calle Verdadera 456"
 */

module.exports = router;
