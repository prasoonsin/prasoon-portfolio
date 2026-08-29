const express = require("express");

const {
  getExperience,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience
} = require("../controllers/experienceController");

const router = express.Router();


// =====================================================
// EXPERIENCE ROUTES
// =====================================================

// GET all experience
router.get("/", getExperience);

// GET experience by ID
router.get("/:id", getExperienceById);

// CREATE experience
router.post("/", createExperience);

// UPDATE experience
router.put("/:id", updateExperience);

// DELETE experience
router.delete("/:id", deleteExperience);


module.exports = router;