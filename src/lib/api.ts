import axios from 'axios';

const baseURL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');

const api = axios.create({
    baseURL,
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
export const createAccount = (data: any) => api.post('/accounts', data);

export default api;
