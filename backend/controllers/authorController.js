const Author = require('../models/Author');
const Post = require('../models/Post');

/**
 * @desc    Get all authors
 * @route   GET /api/authors
 * @access  Public
 */
exports.getAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find().sort({ name: 1 });

    const authorsWithCount = await Promise.all(
      authors.map(async (author) => {
        const count = await Post.countDocuments({
          author: author._id,
          status: 'published'
        });
        return {
          ...author.toObject(),
          postCount: count
        };
      })
    );

    res.status(200).json({
      success: true,
      count: authorsWithCount.length,
      data: authorsWithCount
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single author by ID
 * @route   GET /api/authors/:id
 * @access  Public
 */
exports.getAuthorById = async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id);

    if (!author) {
      return res.status(404).json({
        success: false,
        message: 'Author not found'
      });
    }

    const posts = await Post.find({
      author: author._id,
      status: 'published'
    })
      .select('title slug summary featuredImage publishedDate readingTime')
      .sort({ publishedDate: -1 });

    res.status(200).json({
      success: true,
      data: {
        ...author.toObject(),
        posts
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new author
 * @route   POST /api/authors
 * @access  Private/Admin
 */
exports.createAuthor = async (req, res, next) => {
  try {
    const { name, bio, avatar, socialLinks } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Please provide author name'
      });
    }

    const author = await Author.create({
      name: name.trim(),
      bio: bio || '',
      avatar:
        avatar ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      socialLinks: socialLinks || {}
    });

    res.status(201).json({
      success: true,
      message: 'Author created successfully',
      data: author
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update author
 * @route   PUT /api/authors/:id
 * @access  Private/Admin
 */
exports.updateAuthor = async (req, res, next) => {
  try {
    const { name, bio, avatar, socialLinks } = req.body;
    let author = await Author.findById(req.params.id);

    if (!author) {
      return res.status(404).json({
        success: false,
        message: 'Author not found'
      });
    }

    if (name) author.name = name.trim();
    if (bio !== undefined) author.bio = bio;
    if (avatar) author.avatar = avatar;
    if (socialLinks) author.socialLinks = { ...author.socialLinks, ...socialLinks };

    await author.save();

    res.status(200).json({
      success: true,
      message: 'Author updated successfully',
      data: author
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete author
 * @route   DELETE /api/authors/:id
 * @access  Private/Admin
 */
exports.deleteAuthor = async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id);

    if (!author) {
      return res.status(404).json({
        success: false,
        message: 'Author not found'
      });
    }

    // Check if author has posts
    const postsCount = await Post.countDocuments({ author: author._id });
    if (postsCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete author who has ${postsCount} published or draft posts. Reassign or delete those posts first.`
      });
    }

    await author.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Author deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
