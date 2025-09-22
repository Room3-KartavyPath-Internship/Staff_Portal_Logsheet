import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/modules', // Adjust backend URL if needed
});

export const getSubjects = () => api.get('/subjects');
export const addSubject = (data) => api.post('/subject', data);
export const updateSubject = (id, data) => api.put(`/subject/${id}`, data);
export const deleteSubject = (id) => api.delete(`/subject/${id}`);
