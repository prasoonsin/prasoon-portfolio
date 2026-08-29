const validateContact = (req, res, next) => {
  const {
    name,
    email,
    subject,
    message
  } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, email and message are required."
    });
  }

  if (!email.includes("@")) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address."
    });
  }

  if (message.trim().length < 5) {
    return res.status(400).json({
      success: false,
      message: "Message must be at least 5 characters long."
    });
  }

  next();
};

module.exports = {
  validateContact
};