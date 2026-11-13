const slugify = require('slugify');

/**
 * Creates an SEO-friendly slug from a string
 * @param {string} text - Input text
 * @returns {string} Clean URL slug
 */
const createSlug = (text) => {
  return slugify(text, {
    lower: true,
    strict: true,
    trim: true,
    remove: /[*+~.()'"!:@]/g
  });
};

/**
 * Calculates estimated reading time based on words count
 * @param {string} content - HTML or plain text content
 * @returns {string} e.g. "4 min read"
 */
const calculateReadingTime = (content) => {
  if (!content) return '1 min read';
  // Strip HTML tags
  const plainText = content.replace(/<\/?[^>]+(>|$)/g, ' ');
  const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = 200;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} min read`;
};

/**
 * Generate a short excerpt if summary is omitted
 * @param {string} content
 * @param {number} length
 * @returns {string}
 */
const generateExcerpt = (content, length = 160) => {
  if (!content) return '';
  const plainText = content.replace(/<\/?[^>]+(>|$)/g, ' ').replace(/\s+/g, ' ').trim();
  if (plainText.length <= length) return plainText;
  return plainText.substring(0, length).trim() + '...';
};

module.exports = {
  createSlug,
  calculateReadingTime,
  generateExcerpt
};
