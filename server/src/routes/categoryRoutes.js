const express = require("express");

const {
  getCategories,
  getCategoryById
} = require("../controllers/categoryController");

const router = express.Router();

// Get all categories
router.get("/", getCategories);

// Get category by ID
router.get("/:id", getCategoryById);

module.exports = router;