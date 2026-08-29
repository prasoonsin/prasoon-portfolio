const Comment = require("../models/Comment");

// =====================================================
// GET ALL COMMENTS
// =====================================================

const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.getAllComments();

    res.status(200).json({
      success: true,
      data: comments
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// GET COMMENTS BY BLOG ID
// =====================================================

const getCommentsByBlogId = async (req, res, next) => {
  try {
    const comments = await Comment.getCommentsByBlogId(
      req.params.blogId
    );

    res.status(200).json({
      success: true,
      data: comments
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// GET COMMENT BY ID
// =====================================================

const getCommentById = async (req, res, next) => {
  try {
    const comment = await Comment.getCommentById(
      req.params.id
    );

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found"
      });
    }

    res.status(200).json({
      success: true,
      data: comment
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// CREATE COMMENT
// =====================================================

const createComment = async (req, res, next) => {
  try {
    const {
      blog_id,
      name,
      email,
      comment
    } = req.body;

    // Validate required fields
    if (
      !blog_id ||
      !name ||
      !email ||
      !comment
    ) {
      return res.status(400).json({
        success: false,
        message: "Blog ID, name, email and comment are required"
      });
    }

    // Create comment
    const commentId = await Comment.createComment({
      blog_id,
      name,
      email,
      comment
    });

    // Get newly created comment
    const newComment = await Comment.getCommentById(
      commentId
    );

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: newComment
    });

  } catch (error) {
    next(error);
  }
};


// =====================================================
// UPDATE COMMENT
// =====================================================

const updateComment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingComment =
      await Comment.getCommentById(id);

    if (!existingComment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found"
      });
    }

    const {
      name,
      email,
      comment
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !comment
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, email and comment are required"
      });
    }

    // Update comment
    await Comment.updateComment(id, {
      name,
      email,
      comment
    });

    // Get updated comment
    const updatedComment =
      await Comment.getCommentById(id);

    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      data: updatedComment
    });

  } catch (error) {
    next(error);
  }
};


// =====================================================
// DELETE COMMENT
// =====================================================

const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingComment =
      await Comment.getCommentById(id);

    if (!existingComment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found"
      });
    }

    await Comment.deleteComment(id);

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getAllComments,
  getCommentsByBlogId,
  getCommentById,
  createComment,
  updateComment,
  deleteComment
};