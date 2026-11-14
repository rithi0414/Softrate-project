import axiosClient from './axiosClient';
import { mockDataStore } from './mockData';

export const categoryService = {
  getCategories: async () => {
    try {
      const response = await axiosClient.get('/categories');
      if (response.data && response.data.success) {
        return response.data;
      }
    } catch (err) {
      // Fallback
    }
    return mockDataStore.getCategories();
  },

  getCategoryBySlug: async (slug) => {
    try {
      const response = await axiosClient.get(`/categories/${slug}`);
      if (response.data && response.data.success) {
        return response.data;
      }
    } catch (err) {
      // Fallback
    }
    return mockDataStore.getCategoryBySlug(slug);
  },

  createCategory: async (data) => {
    try {
      const response = await axiosClient.post('/categories', data);
      if (response.data && response.data.success) {
        return response.data;
      }
    } catch (err) {
      // Fallback
    }
    return mockDataStore.createCategory(data);
  },

  updateCategory: async (id, data) => {
    try {
      const response = await axiosClient.put(`/categories/${id}`, data);
      if (response.data && response.data.success) {
        return response.data;
      }
    } catch (err) {
      // Fallback
    }
    return mockDataStore.updateCategory(id, data);
  },

  deleteCategory: async (id) => {
    try {
      const response = await axiosClient.delete(`/categories/${id}`);
      if (response.data && response.data.success) {
        return response.data;
      }
    } catch (err) {
      // Fallback
    }
    return mockDataStore.deleteCategory(id);
  }
};
