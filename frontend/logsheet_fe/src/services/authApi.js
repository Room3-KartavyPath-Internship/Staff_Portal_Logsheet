import axios from "axios";

const API = "https://staffportallogsheet-production.up.railway.app/auth"; 

export const login = (data) => axios.post(`${API}/login`, data);
export const adminLogin = (data) => axios.post(`${API}/admin/login`, data);
export const register = (data) => axios.post(`${API}/register`, data);
export const forgotPassword = (data) => axios.post(`${API}/forgot-password`, data);
export const resetPassword = (data) => axios.post(`${API}/reset-password`, data);
