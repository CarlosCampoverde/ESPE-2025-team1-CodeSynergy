import axios from 'axios';

const API_URL = 'https://espe-2025-team1-codesynergy.onrender.com/quickquote/webresources';

export const getAllMenus = async () => {
  const response = await axios.get(`${API_URL}/Menus`);
  return response.data;
};

export const getPublicCateringServices = async () => {
  const response = await axios.get(`${API_URL}/CateringService/public`);
  return response.data;
};

export const createClient = async (data) => {
  const response = await axios.post(`${API_URL}/Clients/createClient`, data);
  return response.data;
};

export const createEvent = async (data) => {
  const response = await axios.post(`${API_URL}/Events/createEvent`, data);
  return response.data;
};

export const createFullQuote = async (eventId, data) => {
  const response = await axios.post(`${API_URL}/CateringService/fullQuote/${eventId}`, data);
  return response.data;
};