import axios from "axios";
import { config } from "./config";

const API_URL = `${config.serverBaseUrl}/api/logsheet-types`;


const getAuthHeader = () => {
  const user = JSON.parse(sessionStorage.getItem("user")); 
  if (user && user.token) {
    return {
      Authorization: `Bearer ${user.token}`,
    };
  }
  return {};
};


export const getAllLogsheetTypes = async () => {
  return axios.get(API_URL,{ headers: getAuthHeader() });
};


export const addLogsheetType = async (logsheetType) => {
  return axios.post(API_URL, logsheetType,{ headers: getAuthHeader() });
};


export const updateLogsheetType = async (id, logsheetType) => {
  return axios.put(`${API_URL}/${id}`, logsheetType,{ headers: getAuthHeader() });
};


export const deleteLogsheetType = async (id) => {
  return axios.delete(`${API_URL}/${id}`,{ headers: getAuthHeader() });
};


export const getLogsheetTypeById = async (id) => {
  return axios.get(`${API_URL}/${id}`,{ headers: getAuthHeader() });
};
