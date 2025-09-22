import axios from "axios";

// ✅ Staff API base
const api = axios.create({
  baseURL: "http://localhost:8080/api/staff",
});

// ✅ Roles API base
const roleApi = axios.create({
  baseURL: "http://localhost:8080/api/roles",
});

// Staff APIs
export const getAllStaff = () => api.get("/all");
export const getStaffById = (id) => api.get(`/${id}`);
export const createStaff = (data) => api.post("/add", data);
export const updateStaff = (id, data) => api.put(`/update/${id}`, data);
export const deleteStaff = (id) => api.delete(`/delete/${id}`);

// Roles API
export const getAllRoles = () => roleApi.get("");
