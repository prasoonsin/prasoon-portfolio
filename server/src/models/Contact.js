const pool = require("../config/database");

// Get all contact messages
const getAllContacts = async () => {
  const [rows] = await pool.query(
    `SELECT *
     FROM contact_messages
     ORDER BY id DESC`
  );

  return rows;
};

// Get contact message by ID
const getContactById = async (id) => {
  const [rows] = await pool.query(
    `SELECT *
     FROM contact_messages
     WHERE id = ?`,
    [id]
  );

  return rows[0];
};

// Create contact message
const createContact = async (data) => {
  const {
    name,
    email,
    subject,
    message
  } = data;

  const [result] = await pool.query(
    `INSERT INTO contact_messages
      (name, email, subject, message)
     VALUES (?, ?, ?, ?)`,
    [
      name,
      email,
      subject,
      message
    ]
  );

  return result.insertId;
};

// Update contact message
const updateContact = async (id, data) => {
  const {
    name,
    email,
    subject,
    message
  } = data;

  const [result] = await pool.query(
    `UPDATE contact_messages
     SET
       name = ?,
       email = ?,
       subject = ?,
       message = ?
     WHERE id = ?`,
    [
      name,
      email,
      subject,
      message,
      id
    ]
  );

  return result.affectedRows;
};

// Delete contact message
const deleteContact = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM contact_messages
     WHERE id = ?`,
    [id]
  );

  return result.affectedRows;
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};