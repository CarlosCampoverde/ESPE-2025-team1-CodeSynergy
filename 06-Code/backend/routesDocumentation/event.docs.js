const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");


/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Endpoints para gestionar eventos
 */

/**
 * @swagger
 * /quickquote/webresources/Events:
 *   get:
 *     summary: Obtener todos los eventos
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos los eventos
 *       500:
 *         description: Error al obtener los eventos
 */

/**
 * @swagger
 * /quickquote/webresources/Events/upcoming:
 *   get:
 *     summary: Obtener eventos próximos
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de eventos próximos
 *       404:
 *         description: No hay eventos próximos
 *       500:
 *         description: Error al obtener eventos próximos
 */

/**
 * @swagger
 * /quickquote/webresources/Events/{id}:
 *   get:
 *     summary: Obtener un evento por ID
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Evento encontrado
 *       404:
 *         description: Evento no encontrado
 *       500:
 *         description: Error al obtener el evento
 */

/**
 * @swagger
 * /quickquote/webresources/Events/createEvent:
 *   post:
 *     summary: Crear un nuevo evento
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventInput'
 *           example:
 *             id: 1
 *             event_name: "Concierto de Rock"
 *             event_date: "2023-12-15T20:00:00Z"
 *             event_location: "Auditorio Nacional"
 *             event_type: "Concierto"
 *     responses:
 *       201:
 *         description: Evento creado exitosamente
 *       500:
 *         description: Error al crear el evento
 */

/**
 * @swagger
 * /quickquote/webresources/Events/updateEvent:
 *   put:
 *     summary: Actualizar un evento
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventInput'
 *           example:
 *             id: 1
 *             event_name: "Concierto de Rock Actualizado"
 *             event_date: "2023-12-16T20:00:00Z"
 *             event_location: "Auditorio Nacional"
 *             event_type: "Concierto"
 *     responses:
 *       200:
 *         description: Evento actualizado
 *       404:
 *         description: Evento no encontrado
 *       500:
 *         description: Error al actualizar el evento
 */

/**
 * @swagger
 * /quickquote/webresources/Events/deleteEvent/{id}:
 *   delete:
 *     summary: Eliminar un evento por ID
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Evento eliminado exitosamente
 *       404:
 *         description: Evento no encontrado
 *       500:
 *         description: Error al eliminar el evento
 */

/**
 * @swagger
 * /quickquote/webresources/Events/byClient/{id_client}:
 *   get:
 *     summary: Obtener eventos por ID de cliente
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_client
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Lista de eventos para el cliente
 *       404:
 *         description: No se encontraron eventos para el cliente
 *       500:
 *         description: Error al obtener eventos por cliente
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     EventInput:
 *       type: object
 *       required:
 *         - id
 *         - event_name
 *         - event_date
 *         - event_location
 *         - event_type
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         event_name:
 *           type: string
 *           example: "Concierto de Rock"
 *         event_date:
 *           type: string
 *           format: date-time
 *           example: "2023-12-15T20:00:00Z"
 *         event_location:
 *           type: string
 *           example: "Auditorio Nacional"
 *         event_type:
 *           type: string
 *           example: "Concierto"
 */

module.exports = router;
