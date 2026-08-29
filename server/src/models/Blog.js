const pool = require("../config/database");

// =====================================================
// GET ALL BLOGS
// =====================================================

const getAllBlogs = async () => {
  const [rows] = await pool.query(
    `SELECT *
     FROM blog_posts
     ORDER BY id DESC`
  );

  return rows;
};


// =====================================================
// GET BLOG BY ID
// =====================================================

const getBlogById = async (id) => {
  const [rows] = await pool.query(
    `SELECT *
     FROM blog_posts
     WHERE id = ?`,
    [id]
  );

  return rows[0];
};


// =====================================================
// CREATE BLOG
// =====================================================

const createBlog = async (data) => {
  const {
    title,
    category,
    content,
    excerpt,
    image_url,
    published,
    published_at,
    slug
  } = data;

  const [result] = await pool.query(
    `INSERT INTO blog_posts
      (
        title,
        category,
        content,
        excerpt,
        image_url,
        published,
        published_at,
        slug
      )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      title,
      category || null,
      content,
      excerpt || null,
      image_url || null,
      published ?? 0,
      published_at || null,
      slug || null
    ]
  );

  return result.insertId;
};


// =====================================================
// UPDATE BLOG
// =====================================================

const updateBlog = async (id, data) => {
  const {
    title,
    category,
    content,
    excerpt,
    image_url,
    published,
    published_at,
    slug
  } = data;

  const [result] = await pool.query(
    `UPDATE blog_posts
     SET
       title = ?,
       category = ?,
       content = ?,
       excerpt = ?,
       image_url = ?,
       published = ?,
       published_at = ?,
       slug = ?
     WHERE id = ?`,
    [
      title,
      category || null,
      content,
      excerpt || null,
      image_url || null,
      published ?? 0,
      published_at || null,
      slug || null,
      id
    ]
  );

  return result.affectedRows;
};


// =====================================================
// DELETE BLOG
// =====================================================

const deleteBlog = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM blog_posts
     WHERE id = ?`,
    [id]
  );

  return result.affectedRows;
};


// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
};