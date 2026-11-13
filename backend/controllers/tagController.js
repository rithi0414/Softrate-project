const Tag = require('../models/Tag');
const Post = require('../models/Post');
const { createSlug } = require('../utils/helpers');

/**
 * @desc    Get all tags with article counts
 * @route   GET /api/tags
 * @access  Public
 */
exports.getTags = async (req, res, next) => {
  try {
    const tags = await Tag.find().sort({ name: 1 });

    const tagsWithCount = await Promise.all(
      tags.map(async (tag) => {
        const count = await Post.countDocuments({
          tags: tag._id,
          status: 'published'
        });
        return {
          ...tag.toObject(),
          postCount: count
        };
      })
    );

    res.status(200).json({
      success: true,
      count: tagsWithCount.length,
      data: tagsWithCount
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single tag by slug
 * @route   GET /api/tags/:slug
 * @access  Public
 */
exports.getTagBySlug = async (req, res, next) => {
  try {
    const tag = await Tag.findOne({ slug: req.params.slug });

    if (!tag) {
      return res.status(404).json({
        success: false,
        message: 'Tag not found'
      });
    }

    const postCount = await Post.countDocuments({
      tags: tag._id,
      status: 'published'
    });

    res.status(200).json({
      success: true,
      data: {
        ...tag.toObject(),
        postCount
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new tag
 * @route   POST /api/tags
 * @access  Private/Admin
 */
exports.createTag = async (req, res, next) => {
  try {
    const { name, slug } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Please provide tag name'
      });
    }

    const finalSlug = slug ? createSlug(slug) : createSlug(name);

    const existing = await Tag.findOne({
      $or: [{ name: name.trim() }, { slug: finalSlug }]
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'A tag with this name or slug already exists'
      });
    }

    const tag = await Tag.create({
      name: name.trim(),
      slug: finalSlug
    });

    res.status(201).json({
      success: true,
      message: 'Tag created successfully',
      data: tag
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update tag
 * @route   PUT /api/tags/:id
 * @access  Private/Admin
 */
exports.updateTag = async (req, res, next) => {
  try {
    const { name, slug } = req.body;
    let tag = await Tag.findById(req.params.id);

    if (!tag) {
      return res.status(404).json({
        success: false,
        message: 'Tag not found'
      });
    }

    if (name) tag.name = name.trim();
    if (slug) {
      tag.slug = createSlug(slug);
    } else if (name) {
      tag.slug = createSlug(name);
    }

    await tag.save();

    res.status(200).json({
      success: true,
      message: 'Tag updated successfully',
      data: tag
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete tag
 * @route   DELETE /api/tags/:id
 * @access  Private/Admin
 */
exports.deleteTag = async (req, res, next) => {
  try {
    const tag = await Tag.findById(req.params.id);

    if (!tag) {
      return res.status(404).json({
        success: false,
        message: 'Tag not found'
      });
    }

    // Pull tag reference from posts
    await Post.updateMany({ tags: tag._id }, { $pull: { tags: tag._id } });

    await tag.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Tag deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
