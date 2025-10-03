import axios from "axios";

const api = axios.create({
  baseURL: "https://staffportallogsheet-production.up.railway.app/api", 
  headers: {
    "Content-Type": "application/json",
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
