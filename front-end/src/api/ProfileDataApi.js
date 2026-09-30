import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

export const fetchAbout = () => api.get('/about');
export const fetchProjects = () => api.get('/projects');
export const fetchSkills = () => api.get('/skills');
export const sendContactMessage = (data) => api.post('/contact', data);

export default api;