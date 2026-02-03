import axios from 'axios';

// Base URL for the API Gateway
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor for adding auth tokens if needed
apiClient.interceptors.request.use(
  (config) => {
    // You can add authentication tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// User Service API
export const userService = {
  // Get all users
  getAllUsers: async () => {
    const response = await apiClient.get('/api/users');
    return response.data;
  },

  // Get user by ID
  getUserById: async (id) => {
    const response = await apiClient.get(`/api/users/${id}`);
    return response.data;
  },

  // Create new user
  createUser: async (userData) => {
    const response = await apiClient.post('/api/users', userData);
    return response.data;
  },

  // Update user
  updateUser: async (id, userData) => {
    const response = await apiClient.put(`/api/users/${id}`, userData);
    return response.data;
  },

  // Delete user
  deleteUser: async (id) => {
    const response = await apiClient.delete(`/api/users/${id}`);
    return response.data;
  },
};

// Order Service API
export const orderService = {
  // Get all orders
  getAllOrders: async () => {
    const response = await apiClient.get('/api/orders');
    return response.data;
  },

  // Get order by ID
  getOrderById: async (id) => {
    const response = await apiClient.get(`/api/orders/${id}`);
    return response.data;
  },

  // Create new order
  createOrder: async (orderData) => {
    const response = await apiClient.post('/api/orders', orderData);
    return response.data;
  },

  // Update order
  updateOrder: async (id, orderData) => {
    const response = await apiClient.put(`/api/orders/${id}`, orderData);
    return response.data;
  },

  // Delete order
  deleteOrder: async (id) => {
    const response = await apiClient.delete(`/api/orders/${id}`);
    return response.data;
  },
};

// Notification Service API
export const notificationService = {
  // Get all notifications
  getAllNotifications: async () => {
    const response = await apiClient.get('/api/notifications');
    return response.data;
  },

  // Get notification by ID
  getNotificationById: async (id) => {
    const response = await apiClient.get(`/api/notifications/${id}`);
    return response.data;
  },
};

export default apiClient;
