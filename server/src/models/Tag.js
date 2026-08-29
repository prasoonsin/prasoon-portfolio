const pool = require("../config/database");

// Get all tags
const getAllTags = async () => {
  const [rows] = await pool.query(
    `SELECT *
     FROM tags
     ORDER BY id DESC`
  );

  return rows;
};

// Get tag by ID
const getTagById = async (id) => {
  const [rows] = await pool.query(
    `SELECT *
     FROM tags
     WHERE id = ?`,
    [id]
  );

  return rows[0];
};

// Create tag
const createTag = async (data) => {
  const { name, slug } = data;

  const [result] = await pool.query(
    `INSERT INTO tags
      (name, slug)
     VALUES (?, ?)`,
    [name, slug]
  );

  return result.insertId;
};

// Update tag
const updateTag = async (id, data) => {
  const { name, slug } = data;

  const [result] = await pool.query(
    `UPDATE tags
     SET
       name = ?,
       slug = ?
     WHERE id = ?`,
    [name, slug, id]
  );

  return result.affectedRows;
};

// Delete tag
const deleteTag = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM tags
     WHERE id = ?`,
    [id]
  );

  return result.affectedRows;
};

module.exports = {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag
};