import axios from "axios";
import { config } from "./config";

const API_URL = `${config.serverBaseUrl}/api/course-types`;


const getAuthHeader = () => {
  const user = JSON.parse(sessionStorage.getItem("user")); 
  if (user && user.token) {
    return {
      Authorization: `Bearer ${user.token}`,
    };
  }
  return {};
};


export const getAllCourseTypes = () => axios.get(API_URL, { headers: getAuthHeader() });

export const getCourseTypeById = (id) => axios.get(`${API_URL}/${id}`, { headers: getAuthHeader() });

export const addCourseType = (data) => axios.post(API_URL, data, { headers: getAuthHeader() });

export const updateCourseType = (id, data) => axios.put(`${API_URL}/${id}`, data, { headers: getAuthHeader() });

export const deleteCourseType = (id) => axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() });
