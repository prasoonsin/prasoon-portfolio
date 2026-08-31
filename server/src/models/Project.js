const pool = require("../config/database");

// Get all projects
const getAllProjects = async () => {
  const [rows] = await pool.query(
    `SELECT
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
     ORDER BY id DESC`
  );

  return rows;
};

// Get project by ID
const getProjectById = async (id) => {
  const [rows] = await pool.query(
    `SELECT
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
     WHERE id = ?`,
    [id]
  );

  return rows[0];
};

// Create project
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

  const [result] = await pool.query(
    `INSERT INTO projects
      (
        title,
        type,
        description,
        technologies,
        github_url,
        live_url,
        image_url
      )
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      title,
      type,
      description,
      technologies,
      github_url,
      live_url,
      image
    ]
  );

  return result.insertId;
};

// Update project
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

  const [result] = await pool.query(
    `UPDATE projects
     SET
       title = ?,
       type = ?,
       description = ?,
       technologies = ?,
       github_url = ?,
       live_url = ?,
       image_url = ?
     WHERE id = ?`,
    [
      title,
      type,
      description,
      technologies,
      github_url,
      live_url,
      image,
      id
    ]
  );

  return result.affectedRows;
};

// Delete project
const deleteProject = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM projects
     WHERE id = ?`,
    [id]
  );

  return result.affectedRows;
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};