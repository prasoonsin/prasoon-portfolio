const Skill = require("../models/Skill");

// =====================================================
// GET ALL SKILLS
// =====================================================

const getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.getAllSkills();

    res.status(200).json({
      success: true,
      data: skills
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// GET SKILL BY ID
// =====================================================

const getSkillById = async (req, res, next) => {
  try {
    const skill = await Skill.getSkillById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found"
      });
    }

    res.status(200).json({
      success: true,
      data: skill
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// CREATE SKILL
// =====================================================

const createSkill = async (req, res, next) => {
  try {
    const {
      name,
      category
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Skill name is required"
      });
    }

    if (!category || !category.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category is required"
      });
    }

    const skillId = await Skill.createSkill({
      name: name.trim(),
      category: category.trim()
    });

    const skill = await Skill.getSkillById(skillId);

    res.status(201).json({
      success: true,
      message: "Skill created successfully",
      data: skill
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// UPDATE SKILL
// =====================================================

const updateSkill = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      name,
      category
    } = req.body;

    const existingSkill = await Skill.getSkillById(id);

    if (!existingSkill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found"
      });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Skill name is required"
      });
    }

    if (!category || !category.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category is required"
      });
    }

    await Skill.updateSkill(id, {
      name: name.trim(),
      category: category.trim()
    });

    const updatedSkill = await Skill.getSkillById(id);

    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: updatedSkill
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// DELETE SKILL
// =====================================================

const deleteSkill = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingSkill = await Skill.getSkillById(id);

    if (!existingSkill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found"
      });
    }

    await Skill.deleteSkill(id);

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill
};