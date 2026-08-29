const express = require("express");

const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
} = require("../controllers/blogController");

const router = express.Router();


// GET all blogs
router.get("/", getBlogs);


// GET blog by ID
router.get("/:id", getBlogById);


// CREATE blog
router.post("/", createBlog);


// UPDATE blog
router.put("/:id", updateBlog);


// DELETE blog
router.delete("/:id", deleteBlog);


module.exports = router;