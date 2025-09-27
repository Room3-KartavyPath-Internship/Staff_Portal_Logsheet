import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:8080/api/modules', 
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

export const getSections = () => api.get('/sections');
export const addSection = (data) => api.post('/section', data);
export const updateSection = (id, data) => api.put(`/section/${id}`, data);
export const deleteSection = (id) => api.delete(`/section/${id}`);
