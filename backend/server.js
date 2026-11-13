const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// SEO Routes (Dynamic sitemap.xml and robots.txt)
const seoController = require('./controllers/seoController');
app.get('/sitemap.xml', seoController.getSitemap);
app.get('/robots.txt', seoController.getRobotsTxt);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date(),
    uptime: process.uptime()
  });
});

// Import route modules
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const tagRoutes = require('./routes/tagRoutes');
const authorRoutes = require('./routes/authorRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const { searchPosts } = require('./controllers/postController');

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/upload', uploadRoutes);

// Public search endpoint alias: /api/search?q=...
app.get('/api/search', searchPosts);

// Centralized Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 Technology Blog API running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`📡 Server listening on http://localhost:${PORT}`);
  console.log(`🔗 Sitemap available at: http://localhost:${PORT}/sitemap.xml`);
  console.log(`🤖 Robots.txt available at: http://localhost:${PORT}/robots.txt`);
  console.log(`===============================================`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
  // Keep server alive or close gracefully
});
