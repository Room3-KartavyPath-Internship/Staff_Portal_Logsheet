import axios from "axios";
import { config } from "./config";

const API_URL = `${config.serverBaseUrl}/api/modules`;

const getAuthHeader = () => {
  const user = JSON.parse(sessionStorage.getItem("user")); 
  if (user && user.token) {
    return {
      Authorization: `Bearer ${user.token}`,
    };
  }
  return {};
};

// Get all modules
export const getAllModules = () => axios.get(`${API_URL}/module`, { headers: getAuthHeader() });

// Get module by ID
 export const getModuleById = (id) => axios.get(`${API_URL}/module/${id}`, { headers: getAuthHeader() });

// Add new module
export const addModule = (module) => axios.post(`${API_URL}/module`, module, { headers: getAuthHeader() });

// Update module
export const updateModule = (id, module) => axios.put(`${API_URL}/module/${id}`, modulev);

// Delete module
export const deleteModule = (id) => axios.delete(`${API_URL}/module/${id}`, { headers: getAuthHeader() });

const SUBJECT_API = `${config.serverBaseUrl}/api/modules/subjects`;

export const getAllSubjects = async () => {
  const res = await axios.get(SUBJECT_API, { headers: getAuthHeader() });
  //console.log(res);
  return res.data;
}


export const getAllStaff= async()=>{
  const res = await axios.get(`${config.serverBaseUrl}/api/staff/all`, { headers: getAuthHeader() });
  return res.data;
}