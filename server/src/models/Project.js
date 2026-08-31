const pool = require("../config/database");

// =====================================================
// GET ALL PROJECTS
// =====================================================

const getAllProjects = async () => {
  const [rows] = await pool.query(`
    SELECT
      id,
      title,
      type,
      description,
      technologies,
      github_url,
      live_url,
      image_url AS image,
      created_at
    FROM projects
    ORDER BY id DESC
  `);

  return rows;
};

// =====================================================
// GET PROJECT BY ID
// =====================================================

const getProjectById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT
      id,
      title,
      type,
      description,
      technologies,
      github_url,
      live_url,
      image_url AS image,
      created_at
    FROM projects
    WHERE id = ?
    `,
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

  const [result] = await pool.execute(
    `
    INSERT INTO projects
    (
      title,
      type,
      description,
      technologies,
      github_url,
      live_url,
      image_url
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      title || null,
      type || null,
      description || null,
      technologies || null,
      github_url || null,
      live_url || null,
      image || null
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

  const [result] = await pool.execute(
    `
    UPDATE projects
    SET
      title = ?,
      type = ?,
      description = ?,
      technologies = ?,
      github_url = ?,
      live_url = ?,
      image_url = ?
    WHERE id = ?
    `,
    [
      title || null,
      type || null,
      description || null,
      technologies || null,
      github_url || null,
      live_url || null,
      image || null,
      id
    ]
  );

  return result.affectedRows;
};

// =====================================================
// DELETE PROJECT
// =====================================================

const deleteProject = async (id) => {
  const [result] = await pool.execute(
    `
    DELETE FROM projects
    WHERE id = ?
    `,
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