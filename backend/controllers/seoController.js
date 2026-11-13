const Post = require('../models/Post');
const Category = require('../models/Category');

/**
 * @desc    Generate dynamic sitemap.xml
 * @route   GET /sitemap.xml
 * @access  Public
 */
exports.getSitemap = async (req, res, next) => {
  try {
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const posts = await Post.find({ status: 'published' })
      .select('slug updatedAt publishedDate')
      .sort({ publishedDate: -1 });

    const categories = await Category.find().select('slug updatedAt');

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
  <url>
    <loc>${clientUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${clientUrl}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
`;

    // Add Categories
    categories.forEach((cat) => {
      xml += `  <url>
    <loc>${clientUrl}/category/${cat.slug}</loc>
    <lastmod>${new Date(cat.updatedAt || Date.now()).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
    });

    // Add Blog Posts
    posts.forEach((post) => {
      const date = new Date(post.updatedAt || post.publishedDate).toISOString().split('T')[0];
      xml += `  <url>
    <loc>${clientUrl}/blog/${post.slug}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    });

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.status(200).send(xml);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Serve robots.txt
 * @route   GET /robots.txt
 * @access  Public
 */
exports.getRobotsTxt = (req, res) => {
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/*
Disallow: /api/*

Sitemap: ${clientUrl}/sitemap.xml
`;
  res.header('Content-Type', 'text/plain');
  res.status(200).send(robots);
};
