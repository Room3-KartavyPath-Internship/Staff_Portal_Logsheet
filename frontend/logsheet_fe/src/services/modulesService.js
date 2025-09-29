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


export const getAllModules = () => axios.get(`${API_URL}/module`, { headers: getAuthHeader() });


 export const getModuleById = (id) => axios.get(`${API_URL}/module/${id}`, { headers: getAuthHeader() });


export const addModule = (module) => axios.post(`${API_URL}/module`, module, { headers: getAuthHeader() });


export const updateModule = (id, module) => axios.put(`${API_URL}/module/${id}`, module, { headers: getAuthHeader() });


export const deleteModule = (id) => axios.delete(`${API_URL}/module/${id}`, { headers: getAuthHeader() });

const SUBJECT_API = `${config.serverBaseUrl}/api/modules/subjects`;

export const getAllSubjects = async () => {
  const res = await axios.get(SUBJECT_API, { headers: getAuthHeader() });
  
  return res.data;
}


export const getAllStaff= async()=>{
  const res = await axios.get(`${config.serverBaseUrl}/api/staff/all`, { headers: getAuthHeader() });
  return res.data;
}