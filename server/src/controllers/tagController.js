const Tag = require("../models/Tag");

// Get all tags
const getTags = async (req, res, next) => {
  try {
    const tags = await Tag.getAllTags();

    res.status(200).json({
      success: true,
      data: tags
    });
  } catch (error) {
    next(error);
  }
};

// Get tag by ID
const getTagById = async (req, res, next) => {
  try {
    const tag = await Tag.getTagById(req.params.id);

    if (!tag) {
      return res.status(404).json({
        success: false,
        message: "Tag not found"
      });
    }

    res.status(200).json({
      success: true,
      data: tag
    });
  } catch (error) {
    next(error);
  }
};

// Create tag
const createTag = async (req, res, next) => {
  try {
    const { name, slug } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Tag name is required"
      });
    }

    const tagId = await Tag.createTag({
      name,
      slug
    });

    const newTag = await Tag.getTagById(tagId);

    res.status(201).json({
      success: true,
      message: "Tag created successfully",
      data: newTag
    });
  } catch (error) {
    next(error);
  }
};

// Update tag
const updateTag = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;

    const existingTag = await Tag.getTagById(id);

    if (!existingTag) {
      return res.status(404).json({
        success: false,
        message: "Tag not found"
      });
    }

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Tag name is required"
      });
    }

    await Tag.updateTag(id, {
      name,
      slug
    });

    const updatedTag = await Tag.getTagById(id);

    res.status(200).json({
      success: true,
      message: "Tag updated successfully",
      data: updatedTag
    });
  } catch (error) {
    next(error);
  }
};

// Delete tag
const deleteTag = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingTag = await Tag.getTagById(id);

    if (!existingTag) {
      return res.status(404).json({
        success: false,
        message: "Tag not found"
      });
    }

    await Tag.deleteTag(id);

    res.status(200).json({
      success: true,
      message: "Tag deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag
};