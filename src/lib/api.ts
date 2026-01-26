import axios from 'axios';

// Use relative /api in production, fallback to localhost only in development
const isDevelopment = process.env.NODE_ENV === 'development';

const baseURL = isDevelopment
    ? 'http://localhost:5000/api'
    : '/api';  // Critical: relative path → uses current domain

// Remove trailing slash if any
const cleanBaseURL = baseURL.replace(/\/$/, '');

const api = axios.create({
    baseURL: cleanBaseURL,
});

api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export const getAccounts = () => api.get('/accounts');
export const getDashboardStats = () => api.get('/dashboard/stats');
export const getAccountById = (id: string) => api.get(`/accounts/${id}`);
export const createAccount = (data: Record<string, unknown>) => api.post('/accounts', data);
export const updateAccount = (accountId: string, data: Record<string, unknown>) => api.patch(`/accounts/update-account/${accountId}`, data);

export default api;