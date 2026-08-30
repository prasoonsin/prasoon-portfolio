const pool = require("../config/database");

// =====================================================
// GET ALL CODING STATISTICS
// =====================================================

const getAllCodingStats = async () => {
  const [rows] = await pool.query(
    `SELECT *
     FROM coding_stats
     ORDER BY id DESC`
  );

  return rows;
};


// =====================================================
// GET CODING STATISTICS BY ID
// =====================================================

const getCodingStatsById = async (id) => {
  const [rows] = await pool.query(
    `SELECT *
     FROM coding_stats
     WHERE id = ?`,
    [id]
  );

  return rows[0];
};


// =====================================================
// CREATE CODING STATISTICS
// =====================================================

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


// =====================================================
// UPDATE CODING STATISTICS
// =====================================================

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


// =====================================================
// DELETE CODING STATISTICS
// =====================================================

const deleteCodingStats = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM coding_stats
     WHERE id = ?`,
    [id]
  );

  return result.affectedRows;
};


// =====================================================
// FETCH LIVE LEETCODE STATS
// =====================================================

const getLiveLeetCodeStats = async (username) => {

  const query = `
    query userProblemsSolved($username: String!) {
      matchedUser(username: $username) {
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `;

  const response = await fetch(
    "https://leetcode.com/graphql",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0"
      },

      body: JSON.stringify({
        query,
        variables: {
          username
        }
      })
    }
  );


  // ===================================================
  // CHECK LEETCODE RESPONSE
  // ===================================================

  if (!response.ok) {
    throw new Error(
      `LeetCode request failed: ${response.status}`
    );
  }


  const result = await response.json();


  // ===================================================
  // GET SUBMISSION DATA
  // ===================================================

  const submissions =
    result?.data?.matchedUser?.submitStatsGlobal
      ?.acSubmissionNum;


  if (!submissions) {
    throw new Error(
      "Unable to retrieve LeetCode statistics"
    );
  }


  // ===================================================
  // GET TOTAL SOLVED
  // ===================================================

  const allSolved = submissions.find(
    (item) => item.difficulty === "All"
  );


  return allSolved?.count ?? 0;
};


// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  getAllCodingStats,
  getCodingStatsById,
  createCodingStats,
  updateCodingStats,
  deleteCodingStats,
  getLiveLeetCodeStats
};