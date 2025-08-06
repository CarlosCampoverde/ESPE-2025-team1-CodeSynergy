/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Operations related to reservations
 */

/**
 * @swagger
 * /quickquote/webresources/Reservations:
 *   get:
 *     summary: Get all reservations
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all reservations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *       500:
 *         description: Error retrieving reservations
 */

/**
 * @swagger
 * /quickquote/webresources/Reservations/{id}:
 *   get:
 *     summary: Get a reservation by ID
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *     responses:
 *       200:
 *         description: Reservación encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Reservación no encontrada
 *       500:
 *         description: Error al obtener la reservación
 */
router.get("/:id", reservationController.getReservation);

/**
 * @swagger
 * /quickquote/webresources/Reservations/createReservation:
 *   post:
 *     summary: Crear una nueva reservación
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReservationInput'
 *           example:
 *             id: 1
 *             id_client: "5"
 *             reservation_date: "2023-12-15T18:00:00Z"
 *             reservation_time: "18:00"
 *             number_of_guests: 4
 *             menu_id: "2"
 *     responses:
 *       201:
 *         description: Reservación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       500:
 *         description: Error al crear la reservación
 */
router.post("/createReservation", reservationController.createReservation);

/**
 * @swagger
 * /quickquote/webresources/Reservations/updateReservation:
 *   put:
 *     summary: Actualizar una reservación
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReservationInput'
 *           example:
 *             id: 1
 *             id_client: "5"
 *             reservation_date: "2023-12-16T19:30:00Z"
 *             reservation_time: "19:30"
 *             number_of_guests: 2
 *             menu_id: "2"
 *     responses:
 *       200:
 *         description: Reservación actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Reservación no encontrada
 *       500:
 *         description: Error al actualizar la reservación
 */
router.put("/updateReservation", reservationController.updateReservation);

/**
 * @swagger
 * /quickquote/webresources/Reservations/deleteReservation/{id}:
 *   delete:
 *     summary: Eliminar una reservación por ID
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reservación
 *     responses:
 *       200:
 *         description: Reservación eliminada exitosamente
 *       404:
 *         description: Reservación no encontrada
 *       500:
 *         description: Error al eliminar la reservación
 */
router.delete("/deleteReservation/:id", reservationController.deleteReservation);

/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         id_client:
 *           type: string
 *           example: "5"
 *         reservation_date:
 *           type: string
 *           format: date-time
 *           example: "2023-12-15T18:00:00Z"
 *         reservation_time:
 *           type: string
 *           example: "18:00"
 *         number_of_guests:
 *           type: number
 *           example: 4
 *         menu_id:
 *           type: string
 *           example: "2"
 *     ReservationInput:
 *       type: object
 *       required:
 *         - id_client
 *         - reservation_time
 *         - number_of_guests
 *       properties:
 *         id_client:
 *           type: string
 *           example: "5"
 *         reservation_date:
 *           type: string
 *           format: date-time
 *           example: "2023-12-15T18:00:00Z"
 *         reservation_time:
 *           type: string
 *           example: "18:00"
 *         number_of_guests:
 *           type: number
 *           example: 4
 *         menu_id:
 *           type: string
 *           example: "2"
 */

module.exports = router;