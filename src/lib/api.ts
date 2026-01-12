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

export const getTransactions = () => api.get('/transactions');
export const createTransaction = (data: any) => api.post('/transactions', data);
export const deleteTransaction = (id: string) => api.delete(`/transactions/${id}`);

export const getAccounts = () => api.get('/accounts');
export const getAccountById = (id: string) => api.get(`/accounts/${id}`);
export const createAccount = (data: any) => api.post('/accounts', data);

export default api;