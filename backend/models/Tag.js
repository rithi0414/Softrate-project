const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide tag name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Tag name cannot exceed 50 characters']
    },
    slug: {
      type: String,
      required: [true, 'Please provide tag slug'],
      unique: true,
      lowercase: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Tag', TagSchema);
