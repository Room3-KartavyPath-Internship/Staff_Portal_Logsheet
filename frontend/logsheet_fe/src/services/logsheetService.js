import axios from "axios";
import { config } from "./config";

const BASE_URL = config.serverBaseUrl;

const LOGSHEET_API = `${BASE_URL}/api/logsheets`;

const getAuthHeader = () => {
  const user = JSON.parse(sessionStorage.getItem("user")); 
  if (user && user.token) {
    return {
      Authorization: `Bearer ${user.token}`,
    };
  }
  return {};
};

export const getAllLogsheets = async () => {
  const res = await axios.get(LOGSHEET_API,{ headers: getAuthHeader() });
 // console.log(res.data)
  return res.data;
};

export const getLogsheetById = async (id) => {
  const res = await axios.get(`${LOGSHEET_API}/${id}`,{ headers: getAuthHeader() });
  return res.data;
};

export const addLogsheet = async (logsheet) => {
  const res = await axios.post(LOGSHEET_API, logsheet,{ headers: getAuthHeader() });
  return res.data;
};


export const updateLogsheet = async (id, logsheet) => {
  const res = await axios.put(`${LOGSHEET_API}/${id}`, logsheet,{ headers: getAuthHeader() });
  return res.data;
};

export const deleteLogsheet = async (id) => {
  const res = await axios.delete(`${LOGSHEET_API}/${id}`,{ headers: getAuthHeader() });
  return res.data;
};


const COURSE_API = `${BASE_URL}/api/courses`;

export const getAllCourses = async () => {
  const res = await axios.get(COURSE_API,{ headers: getAuthHeader() });
  return res.data;
};


const MODULE_API = `${BASE_URL}/api/modules/module`;

export const getAllModules = async () => {
  const res = await axios.get(MODULE_API,{ headers: getAuthHeader() });
  return res.data;
};


const TOPIC_API = `${BASE_URL}/api/modules/topics`;

export const getAllTopics = async () => {
  const res = await axios.get(TOPIC_API,{ headers: getAuthHeader() });
 // console.log(res.data)
  return res.data;
};


const STAFF_API = `${BASE_URL}/api/staff/all`;

export const getAllStaffs = async () => {
  const res = await axios.get(STAFF_API,{ headers: getAuthHeader() });
  //console.log(res.data)
  return res.data;
};


const LOGSHEET_TYPE_API = `${BASE_URL}/api/logsheet-types`;

export const getAllLogsheetTypes = async () => {
  const res = await axios.get(LOGSHEET_TYPE_API,{ headers: getAuthHeader() });
  return res.data;
};


const Group_API = `${BASE_URL}/groups`;

export const getAllGroups = async () =>{
  const res = await axios.get(Group_API,{ headers: getAuthHeader() });
  return res.data;
}


export const verifyLogsheet = async (id, payload) => {
  const res = await axios.put(`${LOGSHEET_API}/${id}/verify`, payload,{ headers: getAuthHeader() });
  return res.data;
};


export const approveLogsheet = async (id, payload) => {
  const res = await axios.put(`${LOGSHEET_API}/${id}/approve`, payload,{ headers: getAuthHeader() });
  return res.data;
};
