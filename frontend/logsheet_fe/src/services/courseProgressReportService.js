
import axios from "axios";
import { config } from "./config";

const API_URL = `${config.serverBaseUrl}/api/reports`; 

const getAuthHeader = () => {
  const user = JSON.parse(sessionStorage.getItem("user")); 
  if (user && user.token) {
    return {
      Authorization: `Bearer ${user.token}`,
    };
  }
  return {};
};


export const getCourseProgressReport = (courseName) =>  axios.get(`${API_URL}/course-progress/${courseName}`,{ headers: getAuthHeader() });


export const getAllCourses= async()=>{
  const res = await axios.get(`${config.serverBaseUrl}/api/courses`,{ headers: getAuthHeader() });
  return res.data;
}