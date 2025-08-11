const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and user management
 */

/**
 * @swagger
 * /quickquote/webresources/Auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       description: User registration data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               role:
 *                 type: string
 *                 example: "client"
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *       400:
 *         description: Faltan campos requeridos o error
 */

/**
 * @swagger
 * /quickquote/webresources/Auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       description: User login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 role:
 *                   type: string
 *                 username:
 *                   type: string
 *       400:
 *         description: Faltan credenciales o error
 *       401:
 *         description: Credenciales inválidas
 */

/**
 * @swagger
 * /quickquote/webresources/Auth/users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Error retrieving users
 */

module.exports = router;

module.exports = router;
