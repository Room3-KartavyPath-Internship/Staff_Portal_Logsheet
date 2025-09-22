// src/services/api.js
import axios from "axios";

const API_BASE = "http://localhost:8080/api/modules"; // backend path

// --- Topic APIs ---
export const fetchTopics = async () => {
  const res = await axios.get(`${API_BASE}/topics`);
  return res.data;
};

export const addTopic = async (topic) => {
  const res = await axios.post(`${API_BASE}/topic`, topic);
  return res.data;
};

export const updateTopic = async (id, topic) => {
  const res = await axios.put(`${API_BASE}/topic/${id}`, topic);
  return res.data;
};

export const deleteTopic = async (id) => {
  const res = await axios.delete(`${API_BASE}/topic/${id}`);
  return res.data;
};
