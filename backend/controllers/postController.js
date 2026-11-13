const Post = require('../models/Post');
const Category = require('../models/Category');
const Tag = require('../models/Tag');
const Author = require('../models/Author');
const { createSlug, calculateReadingTime } = require('../utils/helpers');

/**
 * @desc    Get all posts (Public with pagination, category, tag, search filters)
 * @route   GET /api/posts
 * @access  Public
 */
exports.getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 9;
    const skip = (page - 1) * limit;

    const {
      category,
      tag,
      search,
      featured,
      sort = '-publishedDate',
      status = 'published'
    } = req.query;

    const query = {};

    // For public requests, ensure only published posts are shown
    if (status === 'published') {
      const now = new Date();
      query.$or = [
        { status: 'published' },
        { status: 'scheduled', scheduledFor: { $lte: now } }
      ];
    } else if (status === 'all') {
      // Used by admin
    } else {
      query.status = status;
    }

    // Filter by featured
    if (featured === 'true') {
      query.isFeatured = true;
    }

    // Filter by category slug or ObjectId
    if (category) {
      let catDoc;
      if (category.match(/^[0-9a-fA-F]{24}$/)) {
        catDoc = await Category.findById(category);
      } else {
        catDoc = await Category.findOne({ slug: category.toLowerCase() });
      }
      if (catDoc) {
        query.categories = catDoc._id;
      } else {
        return res.status(200).json({
          success: true,
          count: 0,
          total: 0,
          page,
          totalPages: 0,
          data: []
        });
      }
    }

    // Filter by tag slug or ObjectId
    if (tag) {
      let tagDoc;
      if (tag.match(/^[0-9a-fA-F]{24}$/)) {
        tagDoc = await Tag.findById(tag);
      } else {
        tagDoc = await Tag.findOne({ slug: tag.toLowerCase() });
      }
      if (tagDoc) {
        query.tags = tagDoc._id;
      } else {
        return res.status(200).json({
          success: true,
          count: 0,
          total: 0,
          page,
          totalPages: 0,
          data: []
        });
      }
    }

    // Keyword search
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$and = query.$and || [];
      query.$and.push({
        $or: [
          { title: searchRegex },
          { summary: searchRegex },
          { content: searchRegex }
        ]
      });
    }

    const total = await Post.countDocuments(query);

    const posts = await Post.find(query)
      .populate('author', 'name avatar bio')
      .populate('categories', 'name slug')
      .populate('tags', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: posts.length,
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
      data: posts
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single post by slug, increment view count, get related & prev/next
 * @route   GET /api/posts/:slug
 * @access  Public
 */
exports.getPostBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    // Find and atomically increment viewsCount
    const post = await Post.findOneAndUpdate(
      { slug },
      { $inc: { viewsCount: 1 } },
      { new: true }
    )
      .populate('author', 'name bio avatar socialLinks')
      .populate('categories', 'name slug description')
      .populate('tags', 'name slug');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    // Fetch related articles (sharing same category or tags, excluding current post)
    const categoryIds = post.categories.map((c) => c._id);
    const relatedPosts = await Post.find({
      _id: { $ne: post._id },
      categories: { $in: categoryIds },
      status: 'published'
    })
      .select('title slug summary featuredImage publishedDate readingTime author')
      .populate('author', 'name avatar')
      .populate('categories', 'name slug')
      .limit(3);

    // Fetch previous and next articles based on publishedDate
    const previousPost = await Post.findOne({
      publishedDate: { $lt: post.publishedDate },
      status: 'published'
    })
      .select('title slug publishedDate featuredImage')
      .sort({ publishedDate: -1 });

    const nextPost = await Post.findOne({
      publishedDate: { $gt: post.publishedDate },
      status: 'published'
    })
      .select('title slug publishedDate featuredImage')
      .sort({ publishedDate: 1 });

    res.status(200).json({
      success: true,
      data: post,
      relatedPosts,
      navigation: {
        previous: previousPost,
        next: nextPost
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Search posts by keywords
 * @route   GET /api/search
 * @access  Public
 */
exports.searchPosts = async (req, res, next) => {
  try {
    const { q, limit = 10 } = req.query;

    if (!q || q.trim() === '') {
      return res.status(200).json({
        success: true,
        count: 0,
        data: []
      });
    }

    const regex = new RegExp(q.trim(), 'i');

    const posts = await Post.find({
      status: 'published',
      $or: [{ title: regex }, { summary: regex }, { content: regex }]
    })
      .select('title slug summary featuredImage publishedDate readingTime categories author')
      .populate('author', 'name avatar')
      .populate('categories', 'name slug')
      .limit(parseInt(limit, 10));

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new post
 * @route   POST /api/posts
 * @access  Private/Admin
 */
exports.createPost = async (req, res, next) => {
  try {
    const {
      title,
      slug: customSlug,
      content,
      summary,
      featuredImage,
      author,
      categories,
      tags,
      publishedDate,
      scheduledFor,
      status = 'published',
      isFeatured = false,
      seoTitle,
      metaDescription
    } = req.body;

    // Validate required fields
    if (!title || !content || !author || !categories || categories.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, content, author, and at least one category'
      });
    }

    // Generate unique slug
    let finalSlug = customSlug ? createSlug(customSlug) : createSlug(title);
    const existingPostWithSlug = await Post.findOne({ slug: finalSlug });
    if (existingPostWithSlug) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-5)}`;
    }

    // Auto-calculate reading time if not provided
    const readingTime = calculateReadingTime(content);

    // Auto-create summary from content if missing
    let finalSummary = summary;
    if (!finalSummary) {
      const plain = content.replace(/<\/?[^>]+(>|$)/g, ' ').trim();
      finalSummary = plain.substring(0, 160) + '...';
    }

    // Handle scheduled status
    let finalStatus = status;
    let finalPublishDate = publishedDate || new Date();
    if (status === 'scheduled') {
      if (!scheduledFor) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a scheduled date & time for scheduled posts'
        });
      }
      finalPublishDate = new Date(scheduledFor);
    }

    const post = await Post.create({
      title,
      slug: finalSlug,
      content,
      summary: finalSummary,
      featuredImage:
        featuredImage ||
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      author,
      categories,
      tags: tags || [],
      publishedDate: finalPublishDate,
      scheduledFor: status === 'scheduled' ? scheduledFor : null,
      status: finalStatus,
      isFeatured: Boolean(isFeatured),
      readingTime,
      seoTitle: seoTitle || title,
      metaDescription: metaDescription || finalSummary
    });

    const populatedPost = await Post.findById(post._id)
      .populate('author', 'name avatar bio')
      .populate('categories', 'name slug')
      .populate('tags', 'name slug');

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: populatedPost
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update post
 * @route   PUT /api/posts/:id
 * @access  Private/Admin
 */
exports.updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    let post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Check slug uniqueness if updated
    if (req.body.slug && req.body.slug !== post.slug) {
      const cleanSlug = createSlug(req.body.slug);
      const existingSlug = await Post.findOne({ slug: cleanSlug, _id: { $ne: id } });
      if (existingSlug) {
        return res.status(400).json({
          success: false,
          message: 'A post with that URL slug already exists'
        });
      }
      req.body.slug = cleanSlug;
    }

    // Recalculate reading time if content changed
    if (req.body.content && req.body.content !== post.content) {
      req.body.readingTime = calculateReadingTime(req.body.content);
    }

    // Handle scheduled status changes
    if (req.body.status === 'scheduled' && req.body.scheduledFor) {
      req.body.publishedDate = new Date(req.body.scheduledFor);
    }

    post = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    })
      .populate('author', 'name avatar bio')
      .populate('categories', 'name slug')
      .populate('tags', 'name slug');

    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: post
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete post
 * @route   DELETE /api/posts/:id
 * @access  Private/Admin
 */
exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get dashboard statistics for Admin
 * @route   GET /api/posts/admin/stats
 * @access  Private/Admin
 */
exports.getDashboardStats = async (req, res, next) => {
  try {
    const totalPosts = await Post.countDocuments();
    const publishedPosts = await Post.countDocuments({ status: 'published' });
    const draftPosts = await Post.countDocuments({ status: 'draft' });
    const scheduledPosts = await Post.countDocuments({ status: 'scheduled' });

    // Sum of viewsCount
    const viewsAggregate = await Post.aggregate([
      { $group: { _id: null, totalViews: { $sum: '$viewsCount' } } }
    ]);
    const totalViews = viewsAggregate[0] ? viewsAggregate[0].totalViews : 0;

    // Total categories and tags
    const totalCategories = await Category.countDocuments();
    const totalTags = await Tag.countDocuments();
    const totalAuthors = await Author.countDocuments();

    // Recent 5 posts
    const recentPosts = await Post.find()
      .populate('author', 'name avatar')
      .populate('categories', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    // Top 5 most viewed posts
    const topPosts = await Post.find({ status: 'published' })
      .select('title slug viewsCount publishedDate featuredImage')
      .sort({ viewsCount: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        totalPosts,
        publishedPosts,
        draftPosts,
        scheduledPosts,
        totalViews,
        totalCategories,
        totalTags,
        totalAuthors,
        recentPosts,
        topPosts
      }
    });
  } catch (error) {
    next(error);
  }
};
