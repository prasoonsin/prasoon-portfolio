const pool = require("../config/database");

// =====================================================
// GET ALL EXPERIENCE
// =====================================================

const getAllExperience = async () => {
  const [rows] = await pool.query(
    `SELECT *
     FROM experience
     ORDER BY id DESC`
  );

  return rows;
};


// =====================================================
// GET EXPERIENCE BY ID
// =====================================================

const getExperienceById = async (id) => {
  const [rows] = await pool.query(
    `SELECT *
     FROM experience
     WHERE id = ?`,
    [id]
  );

  return rows[0];
};


// =====================================================
// CREATE EXPERIENCE
// =====================================================

const createExperience = async (data) => {
  const {
    position,
    company,
    start_date,
    end_date,
    is_current,
    description
  } = data;

  const [result] = await pool.query(
    `INSERT INTO experience
      (
        position,
        company,
        start_date,
        end_date,
        is_current,
        description
      )
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      position,
      company,
      start_date || null,
      end_date || null,
      is_current ? 1 : 0,
      description || null
    ]
  );

  return result.insertId;
};


// =====================================================
// UPDATE EXPERIENCE
// =====================================================

const updateExperience = async (id, data) => {
  const {
    position,
    company,
    start_date,
    end_date,
    is_current,
    description
  } = data;

  const [result] = await pool.query(
    `UPDATE experience
     SET
       position = ?,
       company = ?,
       start_date = ?,
       end_date = ?,
       is_current = ?,
       description = ?
     WHERE id = ?`,
    [
      position,
      company,
      start_date || null,
      end_date || null,
      is_current ? 1 : 0,
      description || null,
      id
    ]
  );

  return result.affectedRows;
};


// =====================================================
// DELETE EXPERIENCE
// =====================================================

const deleteExperience = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM experience
     WHERE id = ?`,
    [id]
  );

  return result.affectedRows;
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getAllExperience,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience
};