const express = require("express");
const router = express.Router();

const Education = require("../models/Education");


// =====================================================
// TEST ROUTE
// GET /api/education/test
// =====================================================

router.get("/test", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Education route is working",
  });
});


// =====================================================
// GET ALL EDUCATION
// GET /api/education
// =====================================================

router.get("/", async (req, res) => {
  try {
    const education = await Education.getAllEducation();

    return res.status(200).json({
      success: true,
      data: education,
    });

  } catch (error) {
    console.error("GET EDUCATION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get education",
      error: error.message,
    });
  }
});


// =====================================================
// GET EDUCATION BY ID
// GET /api/education/:id
// =====================================================

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log("GET EDUCATION BY ID:", id);

    const education = await Education.getEducationById(id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: education,
    });

  } catch (error) {
    console.error("GET EDUCATION BY ID ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get education",
      error: error.message,
    });
  }
});


// =====================================================
// CREATE EDUCATION
// POST /api/education
// =====================================================

router.post("/", async (req, res) => {
  try {
    console.log("CREATE EDUCATION:", req.body);

    const insertId = await Education.createEducation(req.body);

    const education = await Education.getEducationById(insertId);

    return res.status(201).json({
      success: true,
      data: education,
      message: "Education created successfully",
    });

  } catch (error) {
    console.error("CREATE EDUCATION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create education",
      error: error.message,
    });
  }
});


// =====================================================
// UPDATE EDUCATION
// PUT /api/education/:id
// =====================================================

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log("=================================");
    console.log("UPDATE EDUCATION");
    console.log("ID:", id);
    console.log("BODY:", req.body);
    console.log("=================================");

    const affectedRows = await Education.updateEducation(
      id,
      req.body
    );

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Education not found",
      });
    }

    const education = await Education.getEducationById(id);

    return res.status(200).json({
      success: true,
      data: education,
      message: "Education updated successfully",
    });

  } catch (error) {
    console.error("UPDATE EDUCATION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update education",
      error: error.message,
    });
  }
});


// =====================================================
// DELETE EDUCATION
// DELETE /api/education/:id
// =====================================================

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log("DELETE EDUCATION:", id);

    const affectedRows = await Education.deleteEducation(id);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Education not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: null,
      message: "Education deleted successfully",
    });

  } catch (error) {
    console.error("DELETE EDUCATION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete education",
      error: error.message,
    });
  }
});


module.exports = router;