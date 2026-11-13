const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide article title'],
      trim: true,
      maxlength: [250, 'Title cannot exceed 250 characters']
    },
    slug: {
      type: String,
      required: [true, 'Please provide article slug'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    content: {
      type: String,
      required: [true, 'Please provide article content']
    },
    summary: {
      type: String,
      required: [true, 'Please provide a short summary/description'],
      trim: true,
      maxlength: [500, 'Summary cannot exceed 500 characters']
    },
    featuredImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80'
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
      required: [true, 'Please assign an author']
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
      }
    ],
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
      }
    ],
    publishedDate: {
      type: Date,
      default: Date.now
    },
    scheduledFor: {
      type: Date,
      default: null
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'scheduled'],
      default: 'published'
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    readingTime: {
      type: String,
      default: '5 min read'
    },
    seoTitle: {
      type: String,
      trim: true,
      maxlength: [100, 'SEO title cannot exceed 100 characters']
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: [200, 'Meta description cannot exceed 200 characters']
    },
    viewsCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Text index for search functionality
PostSchema.index({
  title: 'text',
  summary: 'text',
  content: 'text'
});

// Indexes for common queries
PostSchema.index({ status: 1, publishedDate: -1 });
PostSchema.index({ isFeatured: 1 });
PostSchema.index({ viewsCount: -1 });

module.exports = mongoose.model('Post', PostSchema);
