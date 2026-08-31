const pool = require("../config/database");

// =====================================================
// HELPER
// =====================================================

// Convert technologies into a safe value for MySQL
const normalizeTechnologies = (technologies) => {
  if (technologies === undefined || technologies === null) {
    return null;
  }

  // If frontend sends an array
  if (Array.isArray(technologies)) {
    return JSON.stringify(technologies);
  }

  // If frontend sends an object
  if (typeof technologies === "object") {
    return JSON.stringify(technologies);
  }

  // If frontend sends a string
  return String(technologies);
};

// =====================================================
// GET ALL PROJECTS
// =====================================================

const getAllProjects = async () => {
  const [rows] = await pool.query(
    `SELECT *
     FROM projects
     ORDER BY id DESC`
  );

  return rows;
};

// =====================================================
// GET PROJECT BY ID
// =====================================================

const getProjectById = async (id) => {
  const [rows] = await pool.query(
    `SELECT *
     FROM projects
     WHERE id = ?`,
    [id]
  );

  return rows[0];
};

// =====================================================
// CREATE PROJECT
// =====================================================

const createProject = async (data) => {
  const {
    title,
    type,
    description,
    image,
    technologies,
    github_url,
    live_url
  } = data;

  const safeTechnologies =
    normalizeTechnologies(technologies);

  const [result] = await pool.query(
    `INSERT INTO projects
      (
        title,
        type,
        description,
        image,
        technologies,
        github_url,
        live_url
      )
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      title,
      type,
      description,
      image || null,
      safeTechnologies,
      github_url || null,
      live_url || null
    ]
  );

  return result.insertId;
};

// =====================================================
// UPDATE PROJECT
// =====================================================

const updateProject = async (id, data) => {
  const {
    title,
    type,
    description,
    image,
    technologies,
    github_url,
    live_url
  } = data;

  const safeTechnologies =
    normalizeTechnologies(technologies);

  const [result] = await pool.query(
    `UPDATE projects
     SET
       title = ?,
       type = ?,
       description = ?,
       image = ?,
       technologies = ?,
       github_url = ?,
       live_url = ?
     WHERE id = ?`,
    [
      title,
      type,
      description,
      image || null,
      safeTechnologies,
      github_url || null,
      live_url || null,
      id
    ]
  );

  return result.affectedRows;
};

// =====================================================
// DELETE PROJECT
// =====================================================

const deleteProject = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM projects
     WHERE id = ?`,
    [id]
  );

  return result.affectedRows;
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};