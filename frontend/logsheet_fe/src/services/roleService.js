import api from "../utils/api"; 


export const createRole = (data) => api.post("/roles", data);


export const updateRole = (id, data) => api.put(`/roles/${id}`, data);


export const deleteRole = (id) => api.delete(`/roles/${id}`);


export const getRoleById = (id) => api.get(`/roles/${id}`);


export const getAllRoles = () => api.get("/roles");
