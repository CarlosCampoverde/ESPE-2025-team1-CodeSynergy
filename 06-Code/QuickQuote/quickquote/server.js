const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Importar las rutas
const cateringServiceRoutes = require("./routes/cateringServiceRoutes");
const clientRoutes = require("./routes/clientRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const menuRoutes = require("./routes/menuRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const eventRoutes = require("./routes/eventRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const staffRoutes = require("./routes/staffRoutes");
const venueRoutes = require("./routes/venueRoutes");

dotenv.config();  // Cargar las variables de entorno desde .env

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para manejar JSON
app.use(express.json());
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000'  // Reemplaza con la URL de tu frontend desplegado
}));


// Usar las rutas para cada recurso
app.use("/quickquote/webresources/CateringService", cateringServiceRoutes);
app.use("/quickquote/webresources/Clients", clientRoutes);
app.use("/quickquote/webresources/Reservations", reservationRoutes);
app.use("/quickquote/webresources/Menus", menuRoutes);
app.use("/quickquote/webresources/Payments", paymentRoutes);
app.use("/quickquote/webresources/Events", eventRoutes);
app.use("/quickquote/webresources/Reviews", reviewRoutes);
app.use("/quickquote/webresources/Staff", staffRoutes);
app.use("/quickquote/webresources/Venues", venueRoutes);

// Iniciar el servidor en el puerto configurado en el archivo .env
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
