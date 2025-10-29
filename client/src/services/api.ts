import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  register: (data: any) => api.post('/auth/register', data)
};

export const soldierAPI = {
  getAll: (params?: any) => api.get('/soldiers', { params }),
  getById: (id: string) => api.get(`/soldiers/${id}`),
  create: (data: any) => api.post('/soldiers', data),
  update: (id: string, data: any) => api.put(`/soldiers/${id}`, data),
  delete: (id: string) => api.delete(`/soldiers/${id}`),
  getStats: () => api.get('/soldiers/stats')
};

export const unitAPI = {
  getAll: (params?: any) => api.get('/units', { params }),
  getById: (id: string) => api.get(`/units/${id}`),
  create: (data: any) => api.post('/units', data),
  update: (id: string, data: any) => api.put(`/units/${id}`, data),
  delete: (id: string) => api.delete(`/units/${id}`),
  getLocations: () => api.get('/units/locations')
};

export const notificationAPI = {
  getAll: () => api.get('/notifications'),
  create: (data: any) => api.post('/notifications', data),
  markAsRead: (id: string) => api.patch(`/notifications/${id}/read`),
  delete: (id: string) => api.delete(`/notifications/${id}`)
};

export const activityLogAPI = {
  getAll: (params?: any) => api.get('/activity-logs', { params }),
  create: (data: any) => api.post('/activity-logs', data)
};

export const userAPI = {
  getAll: () => api.get('/users'),
  getById: (id: string) => api.get(`/users/${id}`),
  create: (data: any) => api.post('/users', data),
  update: (id: string, data: any) => api.put(`/users/${id}`, data),
  delete: (id: string) => api.delete(`/users/${id}`),
  toggleStatus: (id: string) => api.patch(`/users/${id}/toggle-status`)
};

export default api;
