import axios from "axios";
import { config } from "./config";

const BASE_URL = config.serverBaseUrl;


const LOGSHEET_API = `${BASE_URL}/api/logsheets`;

export const getAllLogsheets = async () => {
  const res = await axios.get(LOGSHEET_API);
 // console.log(res.data)
  return res.data;
};

export const getLogsheetById = async (id) => {
  const res = await axios.get(`${LOGSHEET_API}/${id}`);
  return res.data;
};

export const addLogsheet = async (logsheet) => {
  const res = await axios.post(LOGSHEET_API, logsheet);
  return res.data;
};


export const updateLogsheet = async (id, logsheet) => {
  const res = await axios.put(`${LOGSHEET_API}/${id}`, logsheet);
  return res.data;
};

export const deleteLogsheet = async (id) => {
  const res = await axios.delete(`${LOGSHEET_API}/${id}`);
  return res.data;
};


const COURSE_API = `${BASE_URL}/api/courses`;

export const getAllCourses = async () => {
  const res = await axios.get(COURSE_API);
  return res.data;
};


const MODULE_API = `${BASE_URL}/api/modules/modules`;

export const getAllModules = async () => {
  const res = await axios.get(MODULE_API);
  return res.data;
};


const TOPIC_API = `${BASE_URL}/api/modules/topics`;

export const getAllTopics = async () => {
  const res = await axios.get(TOPIC_API);
 // console.log(res.data)
  return res.data;
};


const STAFF_API = `${BASE_URL}/api/staff/all`;

export const getAllStaffs = async () => {
  const res = await axios.get(STAFF_API);
  //console.log(res.data)
  return res.data;
};


const LOGSHEET_TYPE_API = `${BASE_URL}/api/logsheet-types`;

export const getAllLogsheetTypes = async () => {
  const res = await axios.get(LOGSHEET_TYPE_API);
  return res.data;
};


const Group_API = `${BASE_URL}/groups`;

export const getAllGroups = async () =>{
  const res = await axios.get(Group_API);
  return res.data;
}


export const verifyLogsheet = async (id, payload) => {
  const res = await axios.put(`${LOGSHEET_API}/${id}/verify`, payload);
  return res.data;
};


export const approveLogsheet = async (id, payload) => {
  const res = await axios.put(`${LOGSHEET_API}/${id}/approve`, payload);
  return res.data;
};
