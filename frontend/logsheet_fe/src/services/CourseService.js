import axios from "axios";

const API_URL = "http://localhost:8080/api";

const getAuthHeader = () => {
  const user = JSON.parse(sessionStorage.getItem("user")); 
  if (user && user.token) {
    return {
      Authorization: `Bearer ${user.token}`,
    };
  }
  return {};
};


export const getAllCourses = () => axios.get(`${API_URL}/courses`,{ headers: getAuthHeader() });
export const getCourseById = (id) => axios.get(`${API_URL}/courses/${id}`,{ headers: getAuthHeader() });
export const addCourse = (course) => axios.post(`${API_URL}/courses`, course,{ headers: getAuthHeader() });
export const updateCourse = (id, course) => axios.put(`${API_URL}/courses/${id}`, course,{ headers: getAuthHeader() });
export const deleteCourse = (id) => axios.delete(`${API_URL}/courses/${id}`,{ headers: getAuthHeader() });


export const getBatchCycles = () => axios.get(`${API_URL}/batch-cycles`,{ headers: getAuthHeader() });   // corrected
export const getPremises = () => axios.get(`${API_URL}/premises/all`,{ headers: getAuthHeader() });       // corrected
export const getCourseTypes = () => axios.get(`${API_URL}/course-types`,{ headers: getAuthHeader() });    // corrected
