const validateProject = (req, res, next) => {
  const {
    title,
    description
  } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: "Title and description are required."
    });
  }

  if (title.trim().length < 3) {
    return res.status(400).json({
      success: false,
      message: "Project title must be at least 3 characters long."
    });
  }

  if (description.trim().length < 10) {
    return res.status(400).json({
      success: false,
      message: "Project description is too short."
    });
  }

  next();
};

module.exports = {
  validateProject
};