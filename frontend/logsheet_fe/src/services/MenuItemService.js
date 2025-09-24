// import axios from "axios";

// // Base API
// const api = axios.create({
//   baseURL: "http://localhost:8080/api/menu-items",
// });

// // Named exports
// export const getAllMenuItems = () => api.get(""); // GET /api/menu-items
// export const getMenuItemById = (id) => api.get(`/${id}`); // GET /api/menu-items/{id}
// export const createMenuItem = (data) => api.post("", data); // POST /api/menu-items
// export const updateMenuItem = (id, data) => api.put(`/${id}`, data); // PUT /api/menu-items/{id}
// export const deleteMenuItem = (id) => api.delete(`/${id}`); // DELETE /api/menu-items/{id}



// src/services/MenuItemService.js
import api from "../utils/api";

// base: http://localhost:8080/api (utils/api.js मध्ये आहे)
export const getAllMenuItems = () => api.get("/menu-items");
export const getMenuItemById = (id) => api.get(`/menu-items/${id}`);
export const createMenuItem = (data) => api.post("/menu-items", data);
export const updateMenuItem = (id, data) => api.put(`/menu-items/${id}`, data);
export const deleteMenuItem = (id) => api.delete(`/menu-items/${id}`);
