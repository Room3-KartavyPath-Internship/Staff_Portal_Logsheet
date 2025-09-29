import api from "./apiClient";
import { config } from "./config";


export const createBatchCycle = async (payload) => {
  
  const res = await api.post("/batch-cycles", payload);
  return res.data;
};


export const getAllBatchCycles = async () => {
  const res = await api.get(`${config.serverBaseUrl}/batch-cycles`);
  return res.data; 
};

 
export const getBatchCycleById = async (id) => {
  const res = await api.get(`/batch-cycles/${id}`);
  return res.data; 
};


export const updateBatchCycle = async (id, payload) => {
  const res = await api.put(`/batch-cycles/${id}`, payload);
  return res.data; 
};


export const deleteBatchCycle = async (id) => {
  const res = await api.delete(`/batch-cycles/${id}`);
  return res.data;
};
