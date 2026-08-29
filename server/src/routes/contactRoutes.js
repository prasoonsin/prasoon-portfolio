const express = require("express");

const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
} = require("../controllers/contactController");

const router = express.Router();

// Get all contact messages
router.get("/", getContacts);

// Get contact message by ID
router.get("/:id", getContactById);

// Create contact message
router.post("/", createContact);

// Update contact message
router.put("/:id", updateContact);

// Delete contact message
router.delete("/:id", deleteContact);

module.exports = router;