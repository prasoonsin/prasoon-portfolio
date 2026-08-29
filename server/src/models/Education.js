const pool = require("../config/database");

// =====================================================
// GET ALL EDUCATION
// =====================================================

const getAllEducation = async () => {
  const [rows] = await pool.query(
    `SELECT *
     FROM education
     ORDER BY id DESC`
  );

  return rows;
};


// =====================================================
// GET EDUCATION BY ID
// =====================================================

const getEducationById = async (id) => {
  const [rows] = await pool.query(
    `SELECT *
     FROM education
     WHERE id = ?`,
    [id]
  );

  return rows[0];
};


// =====================================================
// CREATE EDUCATION
// =====================================================

const createEducation = async (data) => {
  const {
    degree,
    institution,
    location,
    start_year,
    end_year,
    description
  } = data;

  const [result] = await pool.query(
    `INSERT INTO education
      (
        degree,
        institution,
        location,
        start_year,
        end_year,
        description
      )
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      degree,
      institution,
      location,
      start_year,
      end_year,
      description
    ]
  );

  return result.insertId;
};


// =====================================================
// UPDATE EDUCATION
// =====================================================

const updateEducation = async (id, data) => {
  const {
    degree,
    institution,
    location,
    start_year,
    end_year,
    description
  } = data;

  const [result] = await pool.query(
    `UPDATE education
     SET
       degree = ?,
       institution = ?,
       location = ?,
       start_year = ?,
       end_year = ?,
       description = ?
     WHERE id = ?`,
    [
      degree,
      institution,
      location,
      start_year,
      end_year,
      description,
      id
    ]
  );

  return result.affectedRows;
};


// =====================================================
// DELETE EDUCATION
// =====================================================

const deleteEducation = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM education
     WHERE id = ?`,
    [id]
  );

  return result.affectedRows;
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getAllEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation
};