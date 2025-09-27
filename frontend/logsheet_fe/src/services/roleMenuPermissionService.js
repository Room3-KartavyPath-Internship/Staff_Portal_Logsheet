
// src/services/roleMenuPermissionService.js
import api from "../utils/api";

const BASE = "/role-menu-permissions";

// create permission
export const createPermission = (dto) => api.post(BASE, dto);

// update (PUT) - backend expects ?allowed=true/false
export const updatePermission = (roleId, menuItemId, allowed) =>
  api.put(`${BASE}/${roleId}/${menuItemId}`, null, { params: { allowed } });

// delete
export const deletePermission = (roleId, menuItemId) =>
  api.delete(`${BASE}/${roleId}/${menuItemId}`);

// get single permission (if exists)
export const getPermission = (roleId, menuItemId) =>
  api.get(`${BASE}/${roleId}/${menuItemId}`);

// (optional) get all (if needed)
export const getAllPermissions = () => api.get(BASE);
