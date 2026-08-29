const Blog = require("../models/Blog");

// =====================================================
// GET ALL BLOGS
// =====================================================

const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.getAllBlogs();

    res.status(200).json({
      success: true,
      data: blogs
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// GET BLOG BY ID
// =====================================================

const getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.getBlogById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    res.status(200).json({
      success: true,
      data: blog
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// CREATE BLOG
// =====================================================

const createBlog = async (req, res, next) => {
  try {
    const {
      title,
      category,
      content,
      excerpt,
      image_url,
      published,
      published_at,
      slug
    } = req.body;

    // Required fields
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required"
      });
    }

    const blogId = await Blog.createBlog({
      title,
      category,
      content,
      excerpt,
      image_url,
      published,
      published_at,
      slug
    });

    const blog = await Blog.getBlogById(blogId);

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// UPDATE BLOG
// =====================================================

const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if blog exists
    const existingBlog = await Blog.getBlogById(id);

    if (!existingBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    const {
      title,
      category,
      content,
      excerpt,
      image_url,
      published,
      published_at,
      slug
    } = req.body;

    await Blog.updateBlog(id, {
      title,
      category,
      content,
      excerpt,
      image_url,
      published,
      published_at,
      slug
    });

    const updatedBlog = await Blog.getBlogById(id);

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// DELETE BLOG
// =====================================================

const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if blog exists
    const existingBlog = await Blog.getBlogById(id);

    if (!existingBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    await Blog.deleteBlog(id);

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  getBlogs: getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
};