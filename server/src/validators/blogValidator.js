const validateBlog = (req, res, next) => {
  const {
    title,
    content,
    category
  } = req.body;

  if (!title || !content || !category) {
    return res.status(400).json({
      success: false,
      message: "Title, category and content are required."
    });
  }

  if (title.trim().length < 3) {
    return res.status(400).json({
      success: false,
      message: "Blog title must be at least 3 characters long."
    });
  }

  if (content.trim().length < 10) {
    return res.status(400).json({
      success: false,
      message: "Blog content is too short."
    });
  }

  next();
};

module.exports = {
  validateBlog
};