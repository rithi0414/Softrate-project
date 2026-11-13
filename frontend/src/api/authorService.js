import axiosClient from './axiosClient';

export const authorService = {
  getAuthors: async () => {
    const response = await axiosClient.get('/authors');
    return response.data;
  },

  getAuthorById: async (id) => {
    const response = await axiosClient.get(`/authors/${id}`);
    return response.data;
  },

  createAuthor: async (data) => {
    const response = await axiosClient.post('/authors', data);
    return response.data;
  },

  updateAuthor: async (id, data) => {
    const response = await axiosClient.put(`/authors/${id}`, data);
    return response.data;
  },

  deleteAuthor: async (id) => {
    const response = await axiosClient.delete(`/authors/${id}`);
    return response.data;
  }
};
