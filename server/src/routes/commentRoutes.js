const express = require("express");

const {
  getAllComments,
  getCommentsByBlogId,
  getCommentById,
  createComment,
  updateComment,
  deleteComment
} = require("../controllers/commentController");

const router = express.Router();

// Get all comments
router.get("/", getAllComments);

// Get comments for a specific blog
router.get("/blog/:blogId", getCommentsByBlogId);

// Get comment by ID
router.get("/:id", getCommentById);

// Create comment
router.post("/", createComment);

// Update comment
router.put("/:id", updateComment);

// Delete comment
router.delete("/:id", deleteComment);

module.exports = router;