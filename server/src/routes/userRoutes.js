const express = require("express");

const router = express.Router();

// Test user route
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "User API is working"
  });
});

module.exports = router;