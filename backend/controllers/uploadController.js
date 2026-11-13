/**
 * @desc    Upload single image (Featured or in-content)
 * @route   POST /api/upload
 * @access  Private/Admin
 */
exports.uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image file'
      });
    }

    const host = req.get('host');
    const protocol = req.protocol;
    const filePath = `/uploads/${req.file.filename}`;
    const fullUrl = `${protocol}://${host}${filePath}`;

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      url: filePath, // Relative path useful for front-end proxy/static serving
      fullUrl,
      filename: req.file.filename,
      size: req.file.size
    });
  } catch (error) {
    next(error);
  }
};
