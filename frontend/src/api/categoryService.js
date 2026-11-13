import axiosClient from './axiosClient';

export const categoryService = {
  getCategories: async () => {
    const response = await axiosClient.get('/categories');
    return response.data;
  },

  getCategoryBySlug: async (slug) => {
    const response = await axiosClient.get(`/categories/${slug}`);
    return response.data;
  },

  createCategory: async (data) => {
    const response = await axiosClient.post('/categories', data);
    return response.data;
  },

  updateCategory: async (id, data) => {
    const response = await axiosClient.put(`/categories/${id}`, data);
    return response.data;
  },

  deleteCategory: async (id) => {
    const response = await axiosClient.delete(`/categories/${id}`);
    return response.data;
  }
};
