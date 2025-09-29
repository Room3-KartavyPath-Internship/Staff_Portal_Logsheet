
import axios from "axios";
import { config } from "../config";

const api = axios.create({
  baseURL: config.serverBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use((config) => {
  const user = JSON.parse(sessionStorage.getItem("user")); 
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
