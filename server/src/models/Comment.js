const pool = require("../config/database");

// Get all comments
const getAllComments = async () => {
  const [rows] = await pool.query(
    `SELECT *
     FROM comments
     ORDER BY id DESC`
  );

  return rows;
};

// Get comments by blog ID
const getCommentsByBlogId = async (blogId) => {
  const [rows] = await pool.query(
    `SELECT *
     FROM comments
     WHERE blog_id = ?
     ORDER BY id DESC`,
    [blogId]
  );

  return rows;
};

// Get comment by ID
const getCommentById = async (id) => {
  const [rows] = await pool.query(
    `SELECT *
     FROM comments
     WHERE id = ?`,
    [id]
  );

  return rows[0];
};

// Create comment
const createComment = async (data) => {
  const {
    blog_id,
    name,
    email,
    comment
  } = data;

  const [result] = await pool.query(
    `INSERT INTO comments
      (blog_id, name, email, comment)
     VALUES (?, ?, ?, ?)`,
    [
      blog_id,
      name,
      email,
      comment
    ]
  );

  return result.insertId;
};

// Update comment
const updateComment = async (id, data) => {
  const {
    name,
    email,
    comment
  } = data;

  const [result] = await pool.query(
    `UPDATE comments
     SET
       name = ?,
       email = ?,
       comment = ?
     WHERE id = ?`,
    [
      name,
      email,
      comment,
      id
    ]
  );

  return result.affectedRows;
};

// Delete comment
const deleteComment = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM comments
     WHERE id = ?`,
    [id]
  );

  return result.affectedRows;
};

module.exports = {
  getAllComments,
  getCommentsByBlogId,
  getCommentById,
  createComment,
  updateComment,
  deleteComment
};