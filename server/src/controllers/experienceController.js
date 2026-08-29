const Experience = require("../models/Experience");

// =====================================================
// GET ALL EXPERIENCE
// =====================================================

const getExperience = async (req, res, next) => {
  try {
    const experience =
      await Experience.getAllExperience();

    return res.status(200).json({
      success: true,
      data: experience
    });

  } catch (error) {
    console.error(
      "GET EXPERIENCE ERROR:",
      error
    );

    next(error);
  }
};


// =====================================================
// GET EXPERIENCE BY ID
// =====================================================

const getExperienceById = async (req, res, next) => {
  try {
    const experience =
      await Experience.getExperienceById(
        req.params.id
      );

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience record not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: experience
    });

  } catch (error) {
    console.error(
      "GET EXPERIENCE BY ID ERROR:",
      error
    );

    next(error);
  }
};


// =====================================================
// CREATE EXPERIENCE
// =====================================================

const createExperience = async (req, res, next) => {
  try {
    const {
      position,
      company,
      start_date,
      end_date,
      is_current,
      description
    } = req.body;

    // -------------------------------------------------
    // VALIDATION
    // -------------------------------------------------

    if (!position || !position.trim()) {
      return res.status(400).json({
        success: false,
        message: "Position is required"
      });
    }

    if (!company || !company.trim()) {
      return res.status(400).json({
        success: false,
        message: "Company is required"
      });
    }

    // -------------------------------------------------
    // CREATE
    // -------------------------------------------------

    const id =
      await Experience.createExperience({
        position: position.trim(),

        company: company.trim(),

        start_date:
          start_date || null,

        end_date:
          is_current
            ? null
            : end_date || null,

        is_current:
          Boolean(is_current),

        description:
          description && description.trim()
            ? description.trim()
            : null
      });

    // -------------------------------------------------
    // GET CREATED RECORD
    // -------------------------------------------------

    const experience =
      await Experience.getExperienceById(id);

    return res.status(201).json({
      success: true,
      message: "Experience created successfully",
      data: experience
    });

  } catch (error) {
    console.error(
      "CREATE EXPERIENCE ERROR:",
      error
    );

    next(error);
  }
};


// =====================================================
// UPDATE EXPERIENCE
// =====================================================

const updateExperience = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      position,
      company,
      start_date,
      end_date,
      is_current,
      description
    } = req.body;

    // -------------------------------------------------
    // VALIDATION
    // -------------------------------------------------

    if (!position || !position.trim()) {
      return res.status(400).json({
        success: false,
        message: "Position is required"
      });
    }

    if (!company || !company.trim()) {
      return res.status(400).json({
        success: false,
        message: "Company is required"
      });
    }

    // -------------------------------------------------
    // CHECK EXISTS
    // -------------------------------------------------

    const existingExperience =
      await Experience.getExperienceById(id);

    if (!existingExperience) {
      return res.status(404).json({
        success: false,
        message: "Experience record not found"
      });
    }

    // -------------------------------------------------
    // UPDATE
    // -------------------------------------------------

    await Experience.updateExperience(id, {
      position: position.trim(),

      company: company.trim(),

      start_date:
        start_date || null,

      end_date:
        is_current
          ? null
          : end_date || null,

      is_current:
        Boolean(is_current),

      description:
        description && description.trim()
          ? description.trim()
          : null
    });

    // -------------------------------------------------
    // GET UPDATED RECORD
    // -------------------------------------------------

    const experience =
      await Experience.getExperienceById(id);

    return res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      data: experience
    });

  } catch (error) {
    console.error(
      "UPDATE EXPERIENCE ERROR:",
      error
    );

    next(error);
  }
};


// =====================================================
// DELETE EXPERIENCE
// =====================================================

const deleteExperience = async (req, res, next) => {
  try {
    const { id } = req.params;

    // -------------------------------------------------
    // CHECK EXISTS
    // -------------------------------------------------

    const existingExperience =
      await Experience.getExperienceById(id);

    if (!existingExperience) {
      return res.status(404).json({
        success: false,
        message: "Experience record not found"
      });
    }

    // -------------------------------------------------
    // DELETE
    // -------------------------------------------------

    await Experience.deleteExperience(id);

    return res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
      data: null
    });

  } catch (error) {
    console.error(
      "DELETE EXPERIENCE ERROR:",
      error
    );

    next(error);
  }
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getExperience,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience
};