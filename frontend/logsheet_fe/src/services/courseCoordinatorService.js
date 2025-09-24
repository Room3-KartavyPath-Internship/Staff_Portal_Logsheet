// src/services/courseCoordinatorService.js
import axios from "axios";
import { config } from "./config";

const API_URL = `${config.serverBaseUrl}/api/course-coordinator`; // adjust if backend runs on other port

// Get all coordinators
export const getAllCoordinators = () => axios.get(`${API_URL}/all`);

// Get coordinator by id
export const getCoordinatorById = (id) => axios.get(`${API_URL}/${id}`);

// Add new coordinator
export const addCoordinator = (coordinator) =>
  axios.post(`${API_URL}/add`, coordinator);

// Update coordinator
export const updateCoordinator = (id, coordinator) =>
  axios.put(`${API_URL}/update/${id}`, coordinator);

// Delete coordinator
export const deleteCoordinator = (id) =>
  axios.delete(`${API_URL}/delete/${id}`);

export const getAllCourses= async()=>{
  const res = await axios.get(`${config.serverBaseUrl}/api/courses`);
  return res.data;
}

export const getAllStaff= async()=>{
  const res = await axios.get(`${config.serverBaseUrl}/api/staff/all`);
  return res.data;
}