// src/services/api.js
import axios from 'axios';

const BASE_URL = 'https://espe-2025-team1-codesynergy.onrender.com/quickquote/webresources';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Clients API
export const clientsAPI = {
  getAll: () => api.get('/Clients/'),
  getById: (id) => api.get(`/Clients/${id}`),
  create: (data) => api.post('/Clients/createClient', data),
  update: (data) => api.put('/Clients/updateClient', data),
  delete: (id) => api.delete(`/Clients/deleteClient/${id}`),
};

// Reservations API
export const reservationsAPI = {
  getAll: () => api.get('/Reservations/'),
  getById: (id) => api.get(`/Reservations/${id}`),
  create: (data) => api.post('/Reservations/createReservation', data),
  update: (data) => api.put('/Reservations/updateReservation', data),
  delete: (id) => api.delete(`/Reservations/deleteReservation/${id}`),
};

// Menus API
export const menusAPI = {
  getAll: () => api.get('/Menus/'),
  getById: (id) => api.get(`/Menus/${id}`),
  create: (data) => api.post('/Menus/createMenu', data),
  update: (data) => api.put('/Menus/updateMenu', data),
  delete: (id) => api.delete(`/Menus/deleteMenu/${id}`),
};

// Payments API
export const paymentsAPI = {
  getAll: () => api.get('/Payments/'),
  getById: (id) => api.get(`/Payments/${id}`),
  create: (data) => api.post('/Payments/createPayment', data),
  update: (data) => api.put('/Payments/updatePayment', data),
  delete: (id) => api.delete(`/Payments/deletePayment/${id}`),
};

// Catering Services API
export const cateringAPI = {
  getAll: () => api.get('/CateringService/'),
  getById: (id) => api.get(`/CateringService/${id}`),
  create: (data) => api.post('/CateringService/createCateringService', data),
  update: (data) => api.put('/CateringService/updateCateringService', data),
  delete: (id) => api.delete(`/CateringService/deleteCateringService/${id}`),
};

// Events API
export const eventsAPI = {
  getAll: () => api.get('/Events/'),
  getById: (id) => api.get(`/Events/${id}`),
  create: (data) => api.post('/Events/createEvent', data),
  update: (data) => api.put('/Events/updateEvent', data),
  delete: (id) => api.delete(`/Events/deleteEvent/${id}`),
};

// Staff API
export const staffAPI = {
  getAll: () => api.get('/Staff/'),
  getById: (id) => api.get(`/Staff/${id}`),
  create: (data) => api.post('/Staff/createStaff', data),
  update: (data) => api.put('/Staff/updateStaff', data),
  delete: (id) => api.delete(`/Staff/deleteStaff/${id}`),
};

// Venues API
export const venuesAPI = {
  getAll: () => api.get('/Venues/'),
  getById: (id) => api.get(`/Venues/${id}`),
  create: (data) => api.post('/Venues/createVenue', data),
  update: (data) => api.put('/Venues/updateVenue', data),
  delete: (id) => api.delete(`/Venues/deleteVenue/${id}`),
};

// Reviews API
export const reviewsAPI = {
  getAll: () => api.get('/Reviews/'),
  getById: (id) => api.get(`/Reviews/${id}`),
  create: (data) => api.post('/Reviews/createReview', data),
  update: (data) => api.put('/Reviews/updateReview', data),
  delete: (id) => api.delete(`/Reviews/deleteReview/${id}`),
};

// Authentication API
const AUTH_URL = 'https://espe-2025-team1-codesynergy.onrender.com/auth';

const authApi = axios.create({
  baseURL: AUTH_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token a las requests
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  // Gestión de usuarios (solo superadmin)
  getAllUsers: () => authApi.get('/users'),
  searchUsers: (query) => authApi.get(`/users/search?q=${query}`),
  updateUserRole: (userId, role) => authApi.put(`/users/${userId}/role`, { role }),
  
  // Google OAuth
  registerGoogleUser: (data) => authApi.post('/google/register', data),
};

export default api;