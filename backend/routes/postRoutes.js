const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPostBySlug,
  searchPosts,
  createPost,
  updatePost,
  deletePost,
  getDashboardStats
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');

// Public search endpoint
router.get('/search', searchPosts);

// Admin dashboard statistics (must be before :slug)
router.get('/admin/stats', protect, getDashboardStats);

// Public posts listing (supports pagination, category, tag, search)
router.get('/', getPosts);

// Single post by slug (public)
router.get('/:slug', getPostBySlug);

// Protected routes (Admin / Editor)
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

module.exports = router;
