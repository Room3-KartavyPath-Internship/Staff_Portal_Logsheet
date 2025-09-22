import axios from "axios";
import { config } from "./config";

const API_URL = `${config.serverBaseUrl}/api/course-types`;

export const getAllCourseTypes = () => axios.get(API_URL);

export const getCourseTypeById = (id) => axios.get(`${API_URL}/${id}`);

export const addCourseType = (data) => axios.post(API_URL, data);

export const updateCourseType = (id, data) => axios.put(`${API_URL}/${id}`, data);

export const deleteCourseType = (id) => axios.delete(`${API_URL}/${id}`);
