import axiosClient from './axiosClient';

export const postService = {
  // Public: get posts with filters & pagination
  getPosts: async (params = {}) => {
    const response = await axiosClient.get('/posts', { params });
    return response.data;
  },

  // Public: get single post by slug
  getPostBySlug: async (slug) => {
    const response = await axiosClient.get(`/posts/${slug}`);
    return response.data;
  },

  // Public: search posts
  searchPosts: async (query, limit = 8) => {
    const response = await axiosClient.get('/search', {
      params: { q: query, limit }
    });
    return response.data;
  },

  // Admin: get dashboard stats
  getDashboardStats: async () => {
    const response = await axiosClient.get('/posts/admin/stats');
    return response.data;
  },

  // Admin: create post
  createPost: async (postData) => {
    const response = await axiosClient.post('/posts', postData);
    return response.data;
  },

  // Admin: update post
  updatePost: async (id, postData) => {
    const response = await axiosClient.put(`/posts/${id}`, postData);
    return response.data;
  },

  // Admin: delete post
  deletePost: async (id) => {
    const response = await axiosClient.delete(`/posts/${id}`);
    return response.data;
  }
};
