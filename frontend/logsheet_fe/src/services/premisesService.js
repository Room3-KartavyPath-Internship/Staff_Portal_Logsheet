import axios from "axios";
import { config } from "./config";

const API_URL = `${config.serverBaseUrl}/api/premises`;

const getAuthHeader = () => {
  const user = JSON.parse(sessionStorage.getItem("user")); 
  if (user && user.token) {
    return {
      Authorization: `Bearer ${user.token}`,
    };
  }
  return {};
};

export const getAllPremises = () => axios.get(`${API_URL}/all`, { headers: getAuthHeader() });

export const getPremisesById = (id) => axios.get(`${API_URL}/${id}`, { headers: getAuthHeader() });

export const addPremises = (data) => axios.post(API_URL, data, { headers: getAuthHeader() });

export const updatePremises = (id, data) => axios.put(`${API_URL}/${id}`, data, { headers: getAuthHeader() });

export const deletePremises = (id) => axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() });
