import axios from "axios";
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: API_URL,
});
api.interceptors.request.use((config) => {
  const token = Cookies.get('authToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;