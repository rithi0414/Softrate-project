import axiosClient from './axiosClient';
import { mockDataStore } from './mockData';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await axiosClient.post('/auth/login', { email, password });
      if (response.data && response.data.success) {
        return response.data;
      }
    } catch (err) {
      // Fallback
    }
    const mockRes = mockDataStore.login(email, password);
    if (mockRes.success) {
      return mockRes;
    }
    throw new Error(mockRes.message || 'Invalid credentials');
  },

  getMe: async () => {
    try {
      const response = await axiosClient.get('/auth/me');
      if (response.data && response.data.success) {
        return response.data;
      }
    } catch (err) {
      // Fallback
    }
    try {
      const userStr = localStorage.getItem('tech_blog_user');
      if (userStr) {
        return { success: true, user: JSON.parse(userStr) };
      }
    } catch (e) {}
    return { success: false, message: 'Not authenticated' };
  },

  register: async (userData) => {
    try {
      const response = await axiosClient.post('/auth/register', userData);
      if (response.data && response.data.success) {
        return response.data;
      }
    } catch (err) {
      // Fallback
    }
    return { success: true, message: 'User registered' };
  }
};
