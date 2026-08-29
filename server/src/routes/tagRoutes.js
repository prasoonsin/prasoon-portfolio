const express = require("express");

const {
  getTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag
} = require("../controllers/tagController");

const router = express.Router();

// Get all tags
router.get("/", getTags);

// Get tag by ID
router.get("/:id", getTagById);

// Create tag
router.post("/", createTag);

// Update tag
router.put("/:id", updateTag);

// Delete tag
router.delete("/:id", deleteTag);

module.exports = router;