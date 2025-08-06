// src/utils/auth.js
import { jwtDecode } from 'jwt-decode';

export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    localStorage.removeItem('token');
    return null;
  }
};

export const hasRole = (requiredRoles) => {
  const user = getCurrentUser();
  if (!user) return false;
  
  const userRole = user.role;
  if (Array.isArray(requiredRoles)) {
    return requiredRoles.includes(userRole);
  }
  return userRole === requiredRoles;
};

export const isClient = () => hasRole('client');
export const isAdmin = () => hasRole(['admin', 'superadmin']);
export const isSuperAdmin = () => hasRole('superadmin');

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/auth';
};
