import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8061',
    withCredentials: true,
});

export const authApi = {
    register: (userData: any) => {
        return api.post('/auth/register', userData);
    },

    login: (credentials: any) => {
        return api.post('/auth/login', credentials);
    }
};

export const userApi = {
    getUserData: () => {
        return api.get('/auth/user');
    },
    updateUserData: (formData: FormData) => {
        return api.patch('/auth/user', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
};

// Интерцепторы
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/auth/signIn';
        }
        return Promise.reject(error);
    }
);

export default api;
