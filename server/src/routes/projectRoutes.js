const express = require("express");

const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} = require("../controllers/projectController");

const router = express.Router();

// Get all projects
router.get("/", getAllProjects);

// Get project by ID
router.get("/:id", getProjectById);

// Create project
router.post("/", createProject);

// Update project
router.put("/:id", updateProject);

// Delete project
router.delete("/:id", deleteProject);

module.exports = router;