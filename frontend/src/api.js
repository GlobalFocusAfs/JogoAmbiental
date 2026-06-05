import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({ baseURL: API_URL });

export const initUser = (name) => api.post('/user/init', { name });
export const updateMood = (name, mood) => api.post('/user/mood', { name, mood });
export const sendAction = (name, actionType, extra = {}) => api.post('/user/action', { name, actionType, ...extra });
export const getRanking = () => api.get('/ranking');
