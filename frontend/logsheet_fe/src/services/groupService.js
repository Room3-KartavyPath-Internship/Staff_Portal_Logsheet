import axios from "axios";
import { config } from "./config";

const GROUPS_API = `${config.serverBaseUrl}/groups`;
const COURSES_API = `${config.serverBaseUrl}/api/courses`;


const getAuthHeader = () => {
  const user = JSON.parse(sessionStorage.getItem("user")); 
  if (user && user.token) {
    return {
      Authorization: `Bearer ${user.token}`,
    };
  }
  return {};
};


export const getAllGroups = async () => {
  const res = await axios.get(GROUPS_API,{ headers: getAuthHeader() });
  return res.data; 
};

export const getGroupById = async (id) => {
  const res = await axios.get(`${GROUPS_API}/${id}`,{ headers: getAuthHeader() });
  return res.data; 
};

export const addGroup = async (group) => {
  const res = await axios.post(GROUPS_API, group,{ headers: getAuthHeader() });
  return res.data; 
};

export const updateGroup = async (id, group) => {
  const res = await axios.put(`${GROUPS_API}/${id}`, group,{ headers: getAuthHeader() });
  return res.data; 
};

export const deleteGroup = async (id) => {
  const res = await axios.delete(`${GROUPS_API}/${id}`,{ headers: getAuthHeader() });
  return res.data; 
};


export const getAllCourses = async () => {
  const res = await axios.get(COURSES_API,{ headers: getAuthHeader() });
  return res.data; 
};
