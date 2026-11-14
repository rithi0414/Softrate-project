import axiosClient from './axiosClient';
import { mockDataStore } from './mockData';

export const tagService = {
  getTags: async () => {
    try {
      const response = await axiosClient.get('/tags');
      if (response.data && response.data.success) {
        return response.data;
      }
    } catch (err) {
      // Fallback
    }
    return mockDataStore.getTags();
  },

  getTagBySlug: async (slug) => {
    try {
      const response = await axiosClient.get(`/tags/${slug}`);
      if (response.data && response.data.success) {
        return response.data;
      }
    } catch (err) {
      // Fallback
    }
    return mockDataStore.getTagBySlug(slug);
  },

  createTag: async (data) => {
    try {
      const response = await axiosClient.post('/tags', data);
      if (response.data && response.data.success) {
        return response.data;
      }
    } catch (err) {
      // Fallback
    }
    return mockDataStore.createTag(data);
  },

  updateTag: async (id, data) => {
    try {
      const response = await axiosClient.put(`/tags/${id}`, data);
      if (response.data && response.data.success) {
        return response.data;
      }
    } catch (err) {
      // Fallback
    }
    return mockDataStore.updateTag(id, data);
  },

  deleteTag: async (id) => {
    try {
      const response = await axiosClient.delete(`/tags/${id}`);
      if (response.data && response.data.success) {
        return response.data;
      }
    } catch (err) {
      // Fallback
    }
    return mockDataStore.deleteTag(id);
  }
};
