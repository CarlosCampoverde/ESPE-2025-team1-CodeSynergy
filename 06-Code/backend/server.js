// quickquote/server.js
require('dotenv').config();
const { swaggerUi, swaggerSpec } = require('./swagger');
const swaggerAuth = require('./middleware/authSwagger');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');

// Importar rutas
const cateringServiceRoutes = require('./routes/cateringServiceRoutes');
const clientRoutes = require('./routes/clientRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const menuRoutes = require('./routes/menuRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const eventRoutes = require('./routes/eventRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const staffRoutes = require('./routes/staffRoutes');
const venueRoutes = require('./routes/venueRoutes');
const authRoutes = require('./routes/authRoutes');

// Importar middleware
const { authMiddleware, adminMiddleware } = require('./middleware/auth');

const app = express();

// Configurar CORS (permite todos los orígenes por ahora, ajustar luego)
app.use(cors({ origin: '*' }));

// Middleware para manejar JSON
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Rutas públicas
app.use('/quickquote/webresources/Auth', authRoutes);
app.use('/quickquote/webresources/Menus', menuRoutes);
app.use('/quickquote/webresources/CateringService/public', cateringServiceRoutes);
app.use('/quickquote/webresources/Events', eventRoutes);
app.use('/quickquote/webresources/Venues', venueRoutes);
app.use('/quickquote/webresources/Reviews', reviewRoutes);

// Rutas protegidas (requieren autenticación)
app.use('/quickquote/webresources/Clients', authMiddleware, clientRoutes);
app.use('/quickquote/webresources/Reservations', authMiddleware, reservationRoutes);
app.use('/quickquote/webresources/Payments', authMiddleware, paymentRoutes);

// Rutas solo para administradores
app.use('/quickquote/webresources/Staff', authMiddleware, adminMiddleware, staffRoutes);
app.use('/quickquote/webresources/CateringService', authMiddleware, adminMiddleware, cateringServiceRoutes);


// Middleware de autenticación para Swagger
app.use('/api-docs', swaggerAuth, swaggerUi.serve, swaggerUi.setup(swaggerSpec));



// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});