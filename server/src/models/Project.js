const pool = require("../config/database");

// Get all projects
const getAllProjects = async () => {
  const [rows] = await pool.query(
    `SELECT *
     FROM projects
     ORDER BY id DESC`
  );

  return rows;
};

// Get project by ID
const getProjectById = async (id) => {
  const [rows] = await pool.query(
    `SELECT *
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
      (title, type, description, image, technologies, github_url, live_url)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      title,
      type,
      description,
      image,
      technologies,
      github_url,
      live_url
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
       image = ?,
       technologies = ?,
       github_url = ?,
       live_url = ?
     WHERE id = ?`,
    [
      title,
      type,
      description,
      image,
      technologies,
      github_url,
      live_url,
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