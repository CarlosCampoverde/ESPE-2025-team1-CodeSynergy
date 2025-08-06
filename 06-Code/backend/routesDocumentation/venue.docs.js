
/**
 * @swagger
 * tags:
 *   name: Venues
 *   description: Endpoints para gestionar lugares (venues)
 */

/**
 * @swagger
 * /quickquote/webresources/Venues:
 *   get:
 *     summary: Obtener todos los lugares
 *     tags: [Venues]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos los lugares
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Venue'
 *       500:
 *         description: Error al obtener los lugares
 */

/**
 * @swagger
 * /quickquote/webresources/Venues/{id}:
 *   get:
 *     summary: Obtener un lugar por ID
 *     tags: [Venues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID único del lugar
 *     responses:
 *       200:
 *         description: Lugar encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venue'
 *       404:
 *         description: Lugar no encontrado
 *       500:
 *         description: Error al obtener el lugar
 */

/**
 * @swagger
 * /quickquote/webresources/Venues:
 *   post:
 *     summary: Crear un nuevo lugar
 *     tags: [Venues]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VenueInput'
 *           example:
 *             id: 6
 *             venue_name: "Centro de Convenciones Internacional"
 *             venue_location: "Zona Norte"
 *             venue_capacity: 2400
 *     responses:
 *       201:
 *         description: Lugar creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venue'
 *       500:
 *         description: Error al crear el lugar
 */

/**
 * @swagger
 * /quickquote/webresources/Venues:
 *   put:
 *     summary: Actualizar un lugar existente
 *     tags: [Venues]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VenueInput'
 *           example:
 *             id: 6
 *             venue_name: "Centro de Convenciones Internacional Renovado"
 *             venue_location: "Zona Sur"
 *             venue_capacity: 3000
 *     responses:
 *       200:
 *         description: Lugar actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venue'
 *       404:
 *         description: Lugar no encontrado
 *       500:
 *         description: Error al actualizar el lugar
 */

/**
 * @swagger
 * /quickquote/webresources/Venues/{id}:
 *   delete:
 *     summary: Eliminar un lugar por ID
 *     tags: [Venues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID único del lugar
 *     responses:
 *       200:
 *         description: Lugar eliminado exitosamente
 *       404:
 *         description: Lugar no encontrado
 *       500:
 *         description: Error al eliminar el lugar
 */

/**
 * @swagger
 * /quickquote/webresources/Venues/searchByName/{name}:
 *   get:
 *     summary: Buscar lugares por nombre
 *     tags: [Venues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del lugar (o parte)
 *     responses:
 *       200:
 *         description: Lista de lugares que coinciden con el nombre
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Venue'
 *       404:
 *         description: No se encontraron lugares con ese nombre
 *       500:
 *         description: Error al buscar lugares por nombre
 */

/**
 * @swagger
 * /quickquote/webresources/Venues/searchByCapacity/{capacity}:
 *   get:
 *     summary: Buscar lugares por capacidad mínima
 *     tags: [Venues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: capacity
 *         required: true
 *         schema:
 *           type: number
 *         description: Capacidad mínima del lugar
 *     responses:
 *       200:
 *         description: Lista de lugares con capacidad igual o mayor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Venue'
 *       404:
 *         description: No se encontraron lugares con esa capacidad
 *       500:
 *         description: Error al buscar lugares por capacidad
 */
