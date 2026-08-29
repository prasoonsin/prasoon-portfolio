const pool = require("../config/database");

// Get all users
const getAllUsers = async () => {
  const [rows] = await pool.query(
    `SELECT
       id,
       name,
       email,
       role,
       created_at
     FROM users
     ORDER BY id DESC`
  );

  return rows;
};

// Get user by ID
const getUserById = async (id) => {
  const [rows] = await pool.query(
    `SELECT
       id,
       name,
       email,
       role,
       created_at
     FROM users
     WHERE id = ?`,
    [id]
  );

  return rows[0];
};

// Get user by email
// Password is included because authentication needs it
const getUserByEmail = async (email) => {
  const [rows] = await pool.query(
    `SELECT *
     FROM users
     WHERE email = ?`,
    [email]
  );

  return rows[0];
};

// Create user
const createUser = async (data) => {
  const {
    name,
    email,
    password,
    role
  } = data;

  const [result] = await pool.query(
    `INSERT INTO users
      (name, email, password, role)
     VALUES (?, ?, ?, ?)`,
    [
      name,
      email,
      password,
      role || "user"
    ]
  );

  return result.insertId;
};

// Update user
const updateUser = async (id, data) => {
  const {
    name,
    email,
    role
  } = data;

  const [result] = await pool.query(
    `UPDATE users
     SET
       name = ?,
       email = ?,
       role = ?
     WHERE id = ?`,
    [
      name,
      email,
      role,
      id
    ]
  );

  return result.affectedRows;
};

// Update user password
const updateUserPassword = async (id, password) => {
  const [result] = await pool.query(
    `UPDATE users
     SET password = ?
     WHERE id = ?`,
    [
      password,
      id
    ]
  );

  return result.affectedRows;
};

// Delete user
const deleteUser = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM users
     WHERE id = ?`,
    [id]
  );

  return result.affectedRows;
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  updateUserPassword,
  deleteUser
};