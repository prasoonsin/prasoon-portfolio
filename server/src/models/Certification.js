const pool = require("../config/database");

// Get all certifications
const getAllCertifications = async () => {
  const [rows] = await pool.query(
    `SELECT *
     FROM certifications
     ORDER BY id DESC`
  );

  return rows;
};

// Get certification by ID
const getCertificationById = async (id) => {
  const [rows] = await pool.query(
    `SELECT *
     FROM certifications
     WHERE id = ?`,
    [id]
  );

  return rows[0];
};

// Create certification
const createCertification = async (data) => {
  const {
    title,
    organization,
    issue_date,
    description,
    credential_url
  } = data;

  const [result] = await pool.query(
    `INSERT INTO certifications
      (title, organization, issue_date, description, credential_url)
     VALUES (?, ?, ?, ?, ?)`,
    [
      title,
      organization,
      issue_date,
      description,
      credential_url
    ]
  );

  return result.insertId;
};

// Update certification
const updateCertification = async (id, data) => {
  const {
    title,
    organization,
    issue_date,
    description,
    credential_url
  } = data;

  const [result] = await pool.query(
    `UPDATE certifications
     SET
       title = ?,
       organization = ?,
       issue_date = ?,
       description = ?,
       credential_url = ?
     WHERE id = ?`,
    [
      title,
      organization,
      issue_date,
      description,
      credential_url,
      id
    ]
  );

  return result.affectedRows;
};

// Delete certification
const deleteCertification = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM certifications
     WHERE id = ?`,
    [id]
  );

  return result.affectedRows;
};

module.exports = {
  getAllCertifications,
  getCertificationById,
  createCertification,
  updateCertification,
  deleteCertification
};