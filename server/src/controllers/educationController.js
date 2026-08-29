const Education = require("../models/Education");

// =====================================================
// GET ALL EDUCATION
// =====================================================

const getEducation = async (req, res, next) => {
  try {
    const education = await Education.getAllEducation();

    res.status(200).json({
      success: true,
      data: education
    });

  } catch (error) {
    next(error);
  }
};


// =====================================================
// GET EDUCATION BY ID
// =====================================================

const getEducationById = async (req, res, next) => {
  try {
    const education =
      await Education.getEducationById(req.params.id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education record not found"
      });
    }

    res.status(200).json({
      success: true,
      data: education
    });

  } catch (error) {
    next(error);
  }
};


// =====================================================
// CREATE EDUCATION
// =====================================================

const createEducation = async (req, res, next) => {
  try {

    const {
      degree,
      institution,
      location,
      start_year,
      end_year,
      description
    } = req.body;


    // Validation

    if (!degree || !degree.trim()) {
      return res.status(400).json({
        success: false,
        message: "Degree is required"
      });
    }

    if (!institution || !institution.trim()) {
      return res.status(400).json({
        success: false,
        message: "Institution is required"
      });
    }

    if (!start_year) {
      return res.status(400).json({
        success: false,
        message: "Start year is required"
      });
    }


    // Create

    const id = await Education.createEducation({

      degree: degree.trim(),

      institution: institution.trim(),

      location:
        location && location.trim()
          ? location.trim()
          : null,

      start_year:
        Number(start_year),

      end_year:
        end_year
          ? Number(end_year)
          : null,

      description:
        description && description.trim()
          ? description.trim()
          : null
    });


    // Get newly created record

    const education =
      await Education.getEducationById(id);


    res.status(201).json({
      success: true,
      message: "Education created successfully",
      data: education
    });

  } catch (error) {
    next(error);
  }
};


// =====================================================
// UPDATE EDUCATION
// =====================================================

const updateEducation = async (req, res, next) => {
  try {

    const { id } = req.params;

    const {
      degree,
      institution,
      location,
      start_year,
      end_year,
      description
    } = req.body;


    // =================================================
    // VALIDATION
    // =================================================

    if (!degree || !degree.trim()) {
      return res.status(400).json({
        success: false,
        message: "Degree is required"
      });
    }

    if (!institution || !institution.trim()) {
      return res.status(400).json({
        success: false,
        message: "Institution is required"
      });
    }

    if (!start_year) {
      return res.status(400).json({
        success: false,
        message: "Start year is required"
      });
    }


    // =================================================
    // CHECK RECORD EXISTS
    // =================================================

    const existingEducation =
      await Education.getEducationById(id);

    if (!existingEducation) {
      return res.status(404).json({
        success: false,
        message: "Education record not found"
      });
    }


    // =================================================
    // UPDATE
    // =================================================

    await Education.updateEducation(id, {

      degree:
        degree.trim(),

      institution:
        institution.trim(),

      location:
        location && location.trim()
          ? location.trim()
          : null,

      start_year:
        Number(start_year),

      end_year:
        end_year
          ? Number(end_year)
          : null,

      description:
        description && description.trim()
          ? description.trim()
          : null
    });


    // =================================================
    // GET UPDATED RECORD
    // =================================================

    const education =
      await Education.getEducationById(id);


    res.status(200).json({
      success: true,
      message: "Education updated successfully",
      data: education
    });

  } catch (error) {

    console.error(
      "Update Education Controller Error:",
      error
    );

    next(error);
  }
};


// =====================================================
// DELETE EDUCATION
// =====================================================

const deleteEducation = async (req, res, next) => {
  try {

    const { id } = req.params;


    // Check record exists

    const existingEducation =
      await Education.getEducationById(id);

    if (!existingEducation) {
      return res.status(404).json({
        success: false,
        message: "Education record not found"
      });
    }


    // Delete

    await Education.deleteEducation(id);


    res.status(200).json({
      success: true,
      message: "Education deleted successfully",
      data: null
    });

  } catch (error) {

    console.error(
      "Delete Education Error:",
      error
    );

    next(error);
  }
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation
};