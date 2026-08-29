const Contact = require("../models/Contact");

// Get all contact messages
const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.getAllContacts();

    res.status(200).json({
      success: true,
      data: contacts
    });
  } catch (error) {
    next(error);
  }
};

// Get contact message by ID
const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.getContactById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found"
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

// Create contact message
const createContact = async (req, res, next) => {
  try {
    const {
      name,
      email,
      subject,
      message
    } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required"
      });
    }

    const contactId = await Contact.createContact({
      name,
      email,
      subject,
      message
    });

    const newContact = await Contact.getContactById(contactId);

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newContact
    });
  } catch (error) {
    next(error);
  }
};

// Update contact message
const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingContact = await Contact.getContactById(id);

    if (!existingContact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found"
      });
    }

    const {
      name,
      email,
      subject,
      message
    } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required"
      });
    }

    await Contact.updateContact(id, {
      name,
      email,
      subject,
      message
    });

    const updatedContact = await Contact.getContactById(id);

    res.status(200).json({
      success: true,
      message: "Contact message updated successfully",
      data: updatedContact
    });
  } catch (error) {
    next(error);
  }
};

// Delete contact message
const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingContact = await Contact.getContactById(id);

    if (!existingContact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found"
      });
    }

    await Contact.deleteContact(id);

    res.status(200).json({
      success: true,
      message: "Contact message deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};