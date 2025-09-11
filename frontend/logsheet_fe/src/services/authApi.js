// src/services/authApi.js
import api from "./apiClient";

export const login = async (credentials) => {
  const res = await api.post("/auth/login", credentials);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
    localStorage.setItem("isLoggedIn", "true");
  }
  return res.data;
};

export const register = async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};

export const forgotPassword = async (email) => {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
};

export const resetPassword = async (token, newPassword) => {
  const res = await api.post("/auth/reset-password", { token, newPassword });
  return res.data;
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("isLoggedIn");
};
