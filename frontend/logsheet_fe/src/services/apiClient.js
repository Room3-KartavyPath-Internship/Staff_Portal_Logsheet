// src/services/apiClient.js
import axios from "axios";
import { config } from "../config";

const api = axios.create({
  baseURL: config.serverBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
