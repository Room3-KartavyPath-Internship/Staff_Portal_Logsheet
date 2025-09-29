

import api from "../utils/api";


export const getAllMenuItems = () => api.get("/menu-items");
export const getMenuItemById = (id) => api.get(`/menu-items/${id}`);
export const createMenuItem = (data) => api.post("/menu-items", data);
export const updateMenuItem = (id, data) => api.put(`/menu-items/${id}`, data);
export const deleteMenuItem = (id) => api.delete(`/menu-items/${id}`);
