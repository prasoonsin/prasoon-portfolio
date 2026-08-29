const pool = require("../config/database");

// =====================================================
// GET ALL SKILLS
// =====================================================

const getAllSkills = async () => {
  const [rows] = await pool.query(
    `SELECT *
     FROM skills
     ORDER BY id DESC`
  );

  return rows;
};


// =====================================================
// GET SKILL BY ID
// =====================================================

const getSkillById = async (id) => {
  const [rows] = await pool.query(
    `SELECT *
     FROM skills
     WHERE id = ?`,
    [id]
  );

  return rows[0];
};


// =====================================================
// CREATE SKILL
// =====================================================

const createSkill = async (data) => {
  const {
    name,
    category
  } = data;

  const [result] = await pool.query(
    `INSERT INTO skills
      (name, category)
     VALUES (?, ?)`,
    [
      name,
      category
    ]
  );

  return result.insertId;
};


// =====================================================
// UPDATE SKILL
// =====================================================

const updateSkill = async (id, data) => {
  const {
    name,
    category
  } = data;

  const [result] = await pool.query(
    `UPDATE skills
     SET
       name = ?,
       category = ?
     WHERE id = ?`,
    [
      name,
      category,
      id
    ]
  );

  return result.affectedRows;
};


// =====================================================
// DELETE SKILL
// =====================================================

const deleteSkill = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM skills
     WHERE id = ?`,
    [id]
  );

  return result.affectedRows;
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill
};