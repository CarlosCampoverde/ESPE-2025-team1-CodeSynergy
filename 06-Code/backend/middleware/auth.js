const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware de autenticación real
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied, no token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = { id: user._id, role: user.role, username: user.username };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
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