const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide author name'],
      trim: true,
      maxlength: [100, 'Author name cannot exceed 100 characters']
    },
    bio: {
      type: String,
      trim: true,
      default: ''
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
    },
    socialLinks: {
      twitter: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      github: { type: String, default: '' },
      website: { type: String, default: '' }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Author', AuthorSchema);
