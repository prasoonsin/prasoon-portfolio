const pool = require("../config/database");

// Get all coding statistics
const getAllCodingStats = async () => {
  const [rows] = await pool.query(
    `SELECT *
     FROM coding_stats
     ORDER BY id DESC`
  );

  return rows;
};

// Get coding statistics by ID
const getCodingStatsById = async (id) => {
  const [rows] = await pool.query(
    `SELECT *
     FROM coding_stats
     WHERE id = ?`,
    [id]
  );

  return rows[0];
};

// Create coding statistics
const createCodingStats = async (data) => {
  const {
    platform,
    username,
    profile_url,
    problems_solved,
    rating
  } = data;

  const [result] = await pool.query(
    `INSERT INTO coding_stats
      (platform, username, profile_url, problems_solved, rating)
     VALUES (?, ?, ?, ?, ?)`,
    [
      platform,
      username,
      profile_url,
      problems_solved || 0,
      rating || 0
    ]
  );

  return result.insertId;
};

// Update coding statistics
const updateCodingStats = async (id, data) => {
  const {
    platform,
    username,
    profile_url,
    problems_solved,
    rating
  } = data;

  const [result] = await pool.query(
    `UPDATE coding_stats
     SET
       platform = ?,
       username = ?,
       profile_url = ?,
       problems_solved = ?,
       rating = ?
     WHERE id = ?`,
    [
      platform,
      username,
      profile_url,
      problems_solved || 0,
      rating || 0,
      id
    ]
  );

  return result.affectedRows;
};

// Delete coding statistics
const deleteCodingStats = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM coding_stats
     WHERE id = ?`,
    [id]
  );

  return result.affectedRows;
};

module.exports = {
  getAllCodingStats,
  getCodingStatsById,
  createCodingStats,
  updateCodingStats,
  deleteCodingStats
};