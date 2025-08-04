const jwt = require('jsonwebtoken');

// Middleware de autenticación (temporalmente deshabilitado para pruebas)
const authMiddleware = (req, res, next) => {
  // Para pruebas, asignamos un usuario ficticio sin validar el token
  req.user = {
    id: 'test-user-id',
    role: 'admin' // Cambia a 'client' si necesitas probar con un rol diferente
  };
  next();
};

// Middleware para verificar rol de administrador
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado, requiere rol de administrador' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };