import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:8080/api/modules', // Adjust backend URL if needed
});

export const getSections = () => api.get('/sections');
export const addSection = (data) => api.post('/section', data);
export const updateSection = (id, data) => api.put(`/section/${id}`, data);
export const deleteSection = (id) => api.delete(`/section/${id}`);
