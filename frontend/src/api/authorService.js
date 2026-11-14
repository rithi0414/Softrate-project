import axiosClient from './axiosClient';
import { mockDataStore } from './mockData';

export const authorService = {
  getAuthors: async () => {
    try {
      const response = await axiosClient.get('/authors');
      if (response.data && response.data.success) {
        return response.data;
      }
    } catch (err) {
      // Fallback
    }
    return mockDataStore.getAuthors();
  },

  getAuthorById: async (id) => {
    try {
      const response = await axiosClient.get(`/authors/${id}`);
      if (response.data && response.data.success) {
        return response.data;
      }
    } catch (err) {
      // Fallback
    }
    return mockDataStore.getAuthorById(id);
  },

  createAuthor: async (data) => {
    try {
      const response = await axiosClient.post('/authors', data);
      if (response.data && response.data.success) {
        return response.data;
      }
    } catch (err) {
      // Fallback
    }
    return mockDataStore.createAuthor(data);
  },

  updateAuthor: async (id, data) => {
    try {
      const response = await axiosClient.put(`/authors/${id}`, data);
      if (response.data && response.data.success) {
        return response.data;
      }
    } catch (err) {
      // Fallback
    }
    return mockDataStore.updateAuthor(id, data);
  },

  deleteAuthor: async (id) => {
    try {
      const response = await axiosClient.delete(`/authors/${id}`);
      if (response.data && response.data.success) {
        return response.data;
      }
    } catch (err) {
      // Fallback
    }
    return mockDataStore.deleteAuthor(id);
  }
};
