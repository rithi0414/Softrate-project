import axiosClient from './axiosClient';

export const tagService = {
  getTags: async () => {
    const response = await axiosClient.get('/tags');
    return response.data;
  },

  getTagBySlug: async (slug) => {
    const response = await axiosClient.get(`/tags/${slug}`);
    return response.data;
  },

  createTag: async (data) => {
    const response = await axiosClient.post('/tags', data);
    return response.data;
  },

  updateTag: async (id, data) => {
    const response = await axiosClient.put(`/tags/${id}`, data);
    return response.data;
  },

  deleteTag: async (id) => {
    const response = await axiosClient.delete(`/tags/${id}`);
    return response.data;
  }
};
