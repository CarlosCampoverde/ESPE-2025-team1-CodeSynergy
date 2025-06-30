const errorHandler = (err, req, res, next) => {
  console.error(err.stack);  // Imprimir el error en la consola

  // Enviar una respuesta de error estandarizada
  res.status(500).json({
    message: "Algo salió mal en el servidor.",
    error: err.message || err,
  });
};

module.exports = errorHandler;