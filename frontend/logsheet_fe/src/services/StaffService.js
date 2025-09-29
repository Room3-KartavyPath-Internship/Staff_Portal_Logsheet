import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:8080/api/staff",
  headers: {
    "Content-Type": "application/json",
  },
});


const roleApi = axios.create({
  baseURL: "http://localhost:8080/api/roles",
  headers: {
    "Content-Type": "application/json",
  },
});


const attachToken = (config) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
};

api.interceptors.request.use(attachToken, (error) => Promise.reject(error));
roleApi.interceptors.request.use(attachToken, (error) => Promise.reject(error));


export const getAllStaff = () => api.get("/all");
export const getStaffById = (id) => api.get(`/${id}`);
export const createStaff = (data) => api.post("/add", data);
export const updateStaff = (id, data) => api.put(`/update/${id}`, data);
export const deleteStaff = (id) => api.delete(`/delete/${id}`);


export const getAllRoles = () => roleApi.get("");
