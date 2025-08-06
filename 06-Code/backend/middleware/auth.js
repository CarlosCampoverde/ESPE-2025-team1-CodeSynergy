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
  if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
    return res.status(403).json({ error: 'Access denied, admin role required' });
  }
  next();
};

// Middleware para verificar rol de superadmin
const superAdminMiddleware = (req, res, next) => {
  if (req.user.role !== 'superadmin') {
    return res.status(403).json({ error: 'Access denied, superadmin role required' });
  }
  next();
};

// Middleware para verificar si el usuario tiene uno de los roles permitidos
const roleMiddleware = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Access denied, insufficient role' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware, superAdminMiddleware, roleMiddleware };