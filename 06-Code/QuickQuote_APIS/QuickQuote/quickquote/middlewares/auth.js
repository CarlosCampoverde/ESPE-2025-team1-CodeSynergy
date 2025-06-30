const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  // Verificar si el token está presente en los encabezados de la solicitud
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado. No se proporcionó token." });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Añadir el usuario decodificado a la solicitud
    req.user = decoded;
    next();  // Continuar con la siguiente función de middleware o controlador
  } catch (error) {
    res.status(400).json({ message: "Token no válido" });
  }
};

module.exports = authenticate;