import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080", 
  // update if your backend runs on another port
});

// Login API
export const login = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

// Register API
export const register = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

// Forgot Password API
export const forgotPassword = async (data) => {
  const res = await API.post("/auth/forgot-password", data);
  return res.data;
};
