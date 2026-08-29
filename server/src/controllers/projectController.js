const Project = require("../models/Project");

const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.getAllProjects();

    res.status(200).json({
      success: true,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.getProjectById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const {
      title,
      type,
      description,
      image,
      technologies,
      github_url,
      live_url
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required"
      });
    }

    const projectId = await Project.createProject({
      title,
      type,
      description,
      image,
      technologies,
      github_url,
      live_url
    });

    const project = await Project.getProjectById(projectId);

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project
    });
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingProject = await Project.getProjectById(id);

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    const {
      title,
      type,
      description,
      image,
      technologies,
      github_url,
      live_url
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required"
      });
    }

    await Project.updateProject(id, {
      title,
      type,
      description,
      image,
      technologies,
      github_url,
      live_url
    });

    const updatedProject = await Project.getProjectById(id);

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject
    });
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingProject = await Project.getProjectById(id);

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    await Project.deleteProject(id);

    res.status(200).json({
      success: true,
      message: "Project deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
}; 