// src/services/courseProgressReportService.js
import axios from "axios";
import { config } from "./config";

const API_URL =    `${config.serverBaseUrl}/api/reports`; // adjust if backend port is different

// Fetch progress report by course name
export const getCourseProgressReport = (courseName) =>  axios.get(`${API_URL}/course-progress/${courseName}`);
