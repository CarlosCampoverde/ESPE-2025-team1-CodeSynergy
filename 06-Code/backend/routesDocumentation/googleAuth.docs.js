/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Start Google OAuth login flow
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to Google for authentication
 *
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth callback endpoint
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         required: false
 *         description: Google OAuth code
 *     responses:
 *       302:
 *         description: Redirects to frontend with token or registration prompt
 *
 * /auth/google/register:
 *   post:
 *     summary: Register a user with Google after accepting terms
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - termsAccepted
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               termsAccepted:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User registered and token generated
 *       400:
 *         description: Missing data, terms not accepted, or user already registered
 *       500:
 *         description: Error registering Google user
 */
