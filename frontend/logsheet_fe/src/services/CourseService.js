import axios from "axios";

const API_URL = "http://localhost:8080/api";

// Courses
export const getAllCourses = () => axios.get(`${API_URL}/courses`);
export const getCourseById = (id) => axios.get(`${API_URL}/courses/${id}`);
export const addCourse = (course) => axios.post(`${API_URL}/courses`, course);
export const updateCourse = (id, course) => axios.put(`${API_URL}/courses/${id}`, course);
export const deleteCourse = (id) => axios.delete(`${API_URL}/courses/${id}`);

// Dropdowns
export const getBatchCycles = () => axios.get(`${API_URL}/batch-cycles`);   // corrected
export const getPremises = () => axios.get(`${API_URL}/premises/all`);       // corrected
export const getCourseTypes = () => axios.get(`${API_URL}/course-types`);    // corrected
