

import api from "../utils/api";

const BASE = "/role-menu-permissions";


export const createPermission = (dto) => api.post(BASE, dto);


export const updatePermission = (roleId, menuItemId, allowed) =>
  api.put(`${BASE}/${roleId}/${menuItemId}`, null, { params: { allowed } });


export const deletePermission = (roleId, menuItemId) =>
  api.delete(`${BASE}/${roleId}/${menuItemId}`);


export const getPermission = (roleId, menuItemId) =>
  api.get(`${BASE}/${roleId}/${menuItemId}`);


export const getAllPermissions = () => api.get(BASE);
