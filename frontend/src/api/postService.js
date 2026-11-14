import axiosClient from './axiosClient';
import { mockDataStore } from './mockData';

export const postService = {
  // Public: get posts with filters & pagination
  getPosts: async (params = {}) => {
    try {
      const response = await axiosClient.get('/posts', { params });
      if (response.data && response.data.success) {
        return response.data;
      }
    } catch (err) {
      // Gracefully fall back to local mock data on Vercel / offline
    }
    return mockDataStore.getPosts(params);
  },

  // Public: get single post by slug
  getPostBySlug: async (slug) => {
    try {
      const response = await axiosClient.get(`/posts/${slug}`);
      if (response.data && response.data.success) {
        return response.data;
      }
    } catch (err) {
      // Fallback
    }
    return mockDataStore.getPostBySlug(slug);
  },

  // Public: search posts
  searchPosts: async (query, limit = 8) => {
    try {
      const response = await axiosClient.get('/search', {
        params: { q: query, limit }
      });
      if (response.data && response.data.success) {
        return response.data;
      }
    } catch (err) {
      // Fallback
    }
    return mockDataStore.searchPosts(query, limit);
  },

  // Admin: get dashboard stats
  getDashboardStats: async () => {
    try {
      const response = await axiosClient.get('/posts/admin/stats');
      if (response.data && response.data.success) {
        return response.data;
      }
    } catch (err) {
      // Fallback
    }
    return mockDataStore.getDashboardStats();
  },

  // Admin: create post
  createPost: async (postData) => {
    try {
      const response = await axiosClient.post('/posts', postData);
      if (response.data && response.data.success) {
        return response.data;
      }
    } catch (err) {
      // Fallback
    }
    return mockDataStore.createPost(postData);
  },

  // Admin: update post
  updatePost: async (id, postData) => {
    try {
      const response = await axiosClient.put(`/posts/${id}`, postData);
      if (response.data && response.data.success) {
        return response.data;
      }
    } catch (err) {
      // Fallback
    }
    return mockDataStore.updatePost(id, postData);
  },

  // Admin: delete post
  deletePost: async (id) => {
    try {
      const response = await axiosClient.delete(`/posts/${id}`);
      if (response.data && response.data.success) {
        return response.data;
      }
    } catch (err) {
      // Fallback
    }
    return mockDataStore.deletePost(id);
  }
};
