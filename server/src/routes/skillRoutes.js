const express = require("express");

const {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
} = require("../controllers/skillController");

const router = express.Router();

// ========================================
// GET ALL SKILLS
// GET /api/skills
// ========================================

router.get("/", getSkills);

// ========================================
// GET SKILL BY ID
// GET /api/skills/:id
// ========================================

router.get("/:id", getSkillById);

// ========================================
// CREATE SKILL
// POST /api/skills
// ========================================

router.post("/", createSkill);

// ========================================
// UPDATE SKILL
// PUT /api/skills/:id
// ========================================

router.put("/:id", updateSkill);

// ========================================
// DELETE SKILL
// DELETE /api/skills/:id
// ========================================

router.delete("/:id", deleteSkill);

module.exports = router;