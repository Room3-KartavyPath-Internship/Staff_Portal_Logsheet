import axios from "axios";
import { config } from "./config";

const API_URL = `${config.serverBaseUrl}/api/premises`;

export const getAllPremises = () => axios.get(`${API_URL}/all`);

export const getPremisesById = (id) => axios.get(`${API_URL}/${id}`);

export const addPremises = (data) => axios.post(API_URL, data);

export const updatePremises = (id, data) => axios.put(`${API_URL}/${id}`, data);

export const deletePremises = (id) => axios.delete(`${API_URL}/${id}`);
