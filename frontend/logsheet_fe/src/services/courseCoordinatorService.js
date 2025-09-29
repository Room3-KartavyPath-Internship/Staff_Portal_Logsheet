// src/services/courseCoordinatorService.js
import axios from "axios";
import { config } from "./config";

const API_URL = `${config.serverBaseUrl}/api/course-coordinator`;

const getAuthHeader = () => {
  const user = JSON.parse(sessionStorage.getItem("user")); 
  if (user && user.token) {
    return {
      Authorization: `Bearer ${user.token}`,
    };
  }
  return {};
};


export const getAllCoordinators = () => axios.get(`${API_URL}/all`,{ headers: getAuthHeader() });


export const getCoordinatorById = (id) => axios.get(`${API_URL}/${id}`,{ headers: getAuthHeader() });


export const addCoordinator = (coordinator) =>
  axios.post(`${API_URL}/add`, coordinator,{ headers: getAuthHeader() });


export const updateCoordinator = (id, coordinator) =>
  axios.put(`${API_URL}/update/${id}`, coordinator,{ headers: getAuthHeader() });


export const deleteCoordinator = (id) =>
  axios.delete(`${API_URL}/delete/${id}`,{ headers: getAuthHeader() });

export const getAllCourses= async()=>{
  const res = await axios.get(`${config.serverBaseUrl}/api/courses`,{ headers: getAuthHeader() });
  return res.data;
}

export const getAllStaff= async()=>{
  const res = await axios.get(`${config.serverBaseUrl}/api/staff/all`,{ headers: getAuthHeader() });
  return res.data;
}