import api from "../utils/api"; // make sure this points to your axios instance

// Create a new role
export const createRole = (data) => api.post("/roles", data);

// Update existing role
export const updateRole = (id, data) => api.put(`/roles/${id}`, data);

// Delete role
export const deleteRole = (id) => api.delete(`/roles/${id}`);

// Get role by ID
export const getRoleById = (id) => api.get(`/roles/${id}`);

// Get all roles
export const getAllRoles = () => api.get("/roles");
