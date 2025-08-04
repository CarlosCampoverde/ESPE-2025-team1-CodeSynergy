const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();  // Cargar las variables de entorno desde .env

const connectDB = async () => {
  try {
    // Conexión a MongoDB usando variable de entorno
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1); // Salir si no se puede conectar
  }
};

module.exports = connectDB;
