import axios from "axios";
import { config } from "./config";

const API_URL = `${config.serverBaseUrl}/api/logsheet-types`;


export const getAllLogsheetTypes = async () => {
  return axios.get(API_URL);
};


export const addLogsheetType = async (logsheetType) => {
  return axios.post(API_URL, logsheetType);
};


export const updateLogsheetType = async (id, logsheetType) => {
  return axios.put(`${API_URL}/${id}`, logsheetType);
};


export const deleteLogsheetType = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};


export const getLogsheetTypeById = async (id) => {
  return axios.get(`${API_URL}/${id}`);
};
