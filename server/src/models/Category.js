const pool = require("../config/database");

// Get all categories
const getAllCategories = async () => {
  const [rows] = await pool.query(
    `SELECT *
     FROM categories
     ORDER BY id DESC`
  );

  return rows;
};

// Get category by ID
const getCategoryById = async (id) => {
  const [rows] = await pool.query(
    `SELECT *
     FROM categories
     WHERE id = ?`,
    [id]
  );

  return rows[0];
};

// Create category
const createCategory = async (data) => {
  const { name, slug, description } = data;

  const [result] = await pool.query(
    `INSERT INTO categories
      (name, slug, description)
     VALUES (?, ?, ?)`,
    [name, slug, description]
  );

  return result.insertId;
};

// Update category
const updateCategory = async (id, data) => {
  const { name, slug, description } = data;

  const [result] = await pool.query(
    `UPDATE categories
     SET
       name = ?,
       slug = ?,
       description = ?
     WHERE id = ?`,
    [name, slug, description, id]
  );

  return result.affectedRows;
};

// Delete category
const deleteCategory = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM categories
     WHERE id = ?`,
    [id]
  );

  return result.affectedRows;
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};