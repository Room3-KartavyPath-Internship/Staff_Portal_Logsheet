import api from "./apiClient";

// Create
export const createBatchCycle = async (payload) => {
  // expects { message, success, data: { id, title, ... } }
  const res = await api.post("/batch-cycles", payload);
  return res.data;
};

// Read all
export const getAllBatchCycles = async () => {
  const res = await api.get("/batch-cycles");
  return res.data; // array of BatchCycle
};

// Read one
export const getBatchCycleById = async (id) => {
  const res = await api.get(`/batch-cycles/${id}`);
  return res.data; // single BatchCycle
};

// Update
export const updateBatchCycle = async (id, payload) => {
  const res = await api.put(`/batch-cycles/${id}`, payload);
  return res.data; // ApiResponse
};

// Delete
export const deleteBatchCycle = async (id) => {
  const res = await api.delete(`/batch-cycles/${id}`);
  return res.data; // ApiResponse
};
