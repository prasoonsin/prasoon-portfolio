const express = require("express");

const {
  getCodingStats,
  getCodingStatsById
} = require("../controllers/codingStatsController");

const router = express.Router();

router.get("/", getCodingStats);
router.get("/:id", getCodingStatsById);

module.exports = router;