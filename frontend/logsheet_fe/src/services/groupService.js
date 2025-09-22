import axios from "axios";
import { config } from "./config";

const GROUPS_API = `${config.serverBaseUrl}/groups`;
const COURSES_API = `${config.serverBaseUrl}/api/courses`;


export const getAllGroups = async () => {
  const res = await axios.get(GROUPS_API);
  return res.data; 
};

export const getGroupById = async (id) => {
  const res = await axios.get(`${GROUPS_API}/${id}`);
  return res.data; 
};

export const addGroup = async (group) => {
  const res = await axios.post(GROUPS_API, group);
  return res.data; 
};

export const updateGroup = async (id, group) => {
  const res = await axios.put(`${GROUPS_API}/${id}`, group);
  return res.data; 
};

export const deleteGroup = async (id) => {
  const res = await axios.delete(`${GROUPS_API}/${id}`);
  return res.data; 
};


export const getAllCourses = async () => {
  const res = await axios.get(COURSES_API);
  return res.data; 
};
