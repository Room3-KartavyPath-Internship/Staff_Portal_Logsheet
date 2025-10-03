import axios from 'axios';

const api = axios.create({
    baseURL: 'https://staffportallogsheet-production.up.railway.app/api/modules', 
    headers: {
        'Content-Type': 'application/json',
    },
});


api.interceptors.request.use((config) => {
    const user = JSON.parse(sessionStorage.getItem("user")); 
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const getSubjects = () => api.get('/subjects');
export const addSubject = (data) => api.post('/subject', data);
export const updateSubject = (id, data) => api.put(`/subject/${id}`, data);
export const deleteSubject = (id) => api.delete(`/subject/${id}`);
