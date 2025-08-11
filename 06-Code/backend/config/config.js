module.exports = {
  PORT: process.env.PORT || 3000,  // Puerto para el servidor
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/QuickQuote', // URI de MongoDB
};