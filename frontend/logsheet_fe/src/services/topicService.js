// src/services/api.js
import axios from "axios";

const API_BASE = "http://localhost:8080/api/modules"; // backend path

const getAuthHeader = () => {
  const user = JSON.parse(sessionStorage.getItem("user")); 
  if (user && user.token) {
    return {
      Authorization: `Bearer ${user.token}`,
    };
  }
  return {};
};

// --- Topic APIs ---
export const fetchTopics = async () => {
  const res = await axios.get(`${API_BASE}/topics`,{ headers: getAuthHeader() });
  return res.data;
};

export const addTopic = async (topic) => {
  const res = await axios.post(`${API_BASE}/topic`, topic,{ headers: getAuthHeader() });
  return res.data;
};

export const updateTopic = async (id, topic) => {
  const res = await axios.put(`${API_BASE}/topic/${id}`, topic,{ headers: getAuthHeader() });
  return res.data;
};

export const deleteTopic = async (id) => {
  const res = await axios.delete(`${API_BASE}/topic/${id}`,{ headers: getAuthHeader() });
  return res.data;
};
