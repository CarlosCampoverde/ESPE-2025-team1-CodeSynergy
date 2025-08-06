const express = require("express");
const router = express.Router();
const cateringServiceController = require("../controllers/cateringServiceController");

/**
 * @swagger
 * tags:
 *   name: CateringServices
 *   description: Operations related to catering services
 */

/**
 * @swagger
 * /quickquote/webresources/CateringService:
 *   get:
 *     summary: Get all catering services
 *     tags: [CateringServices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all catering services
 *       500:
 *         description: Error retrieving catering services
 */
router.get("/", cateringServiceController.getAllCateringServices);

/**
 * @swagger
 * /quickquote/webresources/CateringService/public:
 *   get:
 *     summary: Get all public catering services
 *     tags: [CateringServices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of public catering services
 *       500:
 *         description: Error retrieving public catering services
 */
router.get("/public", cateringServiceController.getPublicCateringServices);

/**
 * @swagger
 * /quickquote/webresources/CateringService/{id}:
 *   get:
 *     summary: Get a catering service by ID
 *     tags: [CateringServices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Catering service ID
 *     responses:
 *       200:
 *         description: Catering service found
 *       404:
 *         description: Catering service not found

/**
 * @swagger
 * tags:
 *   name: CateringServices
 *   description: Endpoints para gestionar servicios de catering
 */

/**
 * @swagger
 * /quickquote/webresources/CateringService:
 *   get:
 *     summary: Obtener todos los servicios de catering
 *     tags: [CateringServices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos los servicios de catering
 *       500:
 *         description: Error al obtener los servicios
 */

/**
 * @swagger
 * /quickquote/webresources/CateringService/public:
 *   get:
 *     summary: Obtener todos los servicios de catering públicos
 *     tags: [CateringServices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de servicios públicos
 *       500:
 *         description: Error al obtener los servicios públicos
 */

/**
 * @swagger
 * /quickquote/webresources/CateringService/{id}:
 *   get:
 *     summary: Obtener un servicio de catering por ID
 *     tags: [CateringServices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del servicio de catering
 *     responses:
 *       200:
 *         description: Servicio encontrado
 *       404:
 *         description: Servicio no encontrado
 *       500:
 *         description: Error al obtener el servicio
 */

/**
 * @swagger
 * /quickquote/webresources/CateringService/createCateringService:
 *   post:
 *     summary: Crear un nuevo servicio de catering
 *     tags: [CateringServices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CateringServiceInput'
 *           example:
 *             id: 2
 *             service_name: "Catering Gourmet"
 *             service_description: "Servicio de catering de alta gama con platillos gourmet para eventos exclusivos."
 *             service_price: 500
 *             is_public: true
 *     responses:
 *       201:
 *         description: Servicio de catering creado exitosamente
 *       500:
 *         description: Error al crear el servicio
 */

/**
 * @swagger
 * /quickquote/webresources/CateringService/updateCateringService:
 *   put:
 *     summary: Actualizar un servicio de catering
 *     tags: [CateringServices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CateringServiceInput'
 *           example:
 *             id: 2
 *             service_name: "Catering Gourmet Actualizado"
 *             service_description: "Descripción actualizada"
 *             service_price: 600
 *             is_public: false
 *     responses:
 *       200:
 *         description: Servicio actualizado
 *       404:
 *         description: Servicio no encontrado
 *       500:
 *         description: Error al actualizar el servicio
 */

/**
 * @swagger
 * /quickquote/webresources/CateringService/deleteCateringService/{id}:
 *   delete:
 *     summary: Eliminar un servicio de catering por ID
 *     tags: [CateringServices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del servicio de catering
 *     responses:
 *       200:
 *         description: Servicio eliminado exitosamente
 *       404:
 *         description: Servicio no encontrado
 *       500:
 *         description: Error al eliminar el servicio
 */

/**
 * @swagger
 * /quickquote/webresources/CateringService/report:
 *   get:
 *     summary: Generar reporte básico de servicios de catering
 *     tags: [CateringServices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reporte generado
 *       500:
 *         description: Error al generar el reporte
 */

/**
 * @swagger
 * /quickquote/webresources/CateringService/quote:
 *   post:
 *     summary: Generar cotización de catering
 *     tags: [CateringServices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client_id:
 *                 type: string
 *                 example: "client001"
 *               service_id:
 *                 type: string
 *                 example: "service001"
 *     responses:
 *       200:
 *         description: Cotización generada exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error al generar cotización
 */

/**
 * @swagger
 * /quickquote/webresources/CateringService/fullQuote/{id}:
 *   post:
 *     summary: Generar cotización completa con cliente
 *     tags: [CateringServices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del servicio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client_id:
 *                 type: string
 *                 example: "client001"
 *     responses:
 *       200:
 *         description: Cotización completa generada exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error al generar cotización completa
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CateringServiceInput:
 *       type: object
 *       required:
 *         - id
 *         - service_name
 *         - service_description
 *         - service_price
 *       properties:
 *         id:
 *           type: number
 *           example: 2
 *         service_name:
 *           type: string
 *           example: "Catering Gourmet"
 *         service_description:
 *           type: string
 *           example: "Servicio de catering de alta gama con platillos gourmet para eventos exclusivos."
 *         service_price:
 *           type: number
 *           example: 500
 *         is_public:
 *           type: boolean
 *           example: true
 */
router.post('/fullQuote/:id', cateringServiceController.generateFullCateringQuoteWithClient);

module.exports = router;
