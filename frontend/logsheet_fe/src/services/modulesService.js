import axios from "axios";
import { config } from "./config";

const API_URL = `${config.serverBaseUrl}/api/modules`;

// Get all modules
export const getAllModules = () => axios.get(`${API_URL}/module`);

// Get module by ID
 export const getModuleById = (id) => axios.get(`${API_URL}/module/${id}`);

// Add new module
export const addModule = (module) => axios.post(`${API_URL}/module`, module);

// Update module
export const updateModule = (id, module) => axios.put(`${API_URL}/module/${id}`, module);

// Delete module
export const deleteModule = (id) => axios.delete(`${API_URL}/module/${id}`);

const SUBJECT_API = `${config.serverBaseUrl}/api/modules/subjects`;

export const getAllSubjects = async () => {
  const res = await axios.get(SUBJECT_API);
  //console.log(res);
  return res.data;
}


export const getAllStaff= async()=>{
  const res = await axios.get(`${config.serverBaseUrl}/api/staff/all`);
  return res.data;
}