import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../services/api";

import "./AdminPages.css";

function Projects() {
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    title: "",
    description: "",
    type: "",
    technologies: "",
    github_url: "",
    live_url: "",
  };

  const [form, setForm] = useState(emptyForm);

  // =====================================================
  // LOAD PROJECTS
  // =====================================================

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProjects();

      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);

      setError(
        err.message || "Failed to load projects."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // =====================================================
  // CREATE
  // =====================================================

  const handleCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (project) => {
    setEditingId(project.id);

    setForm({
      title: project.title || "",
      description: project.description || "",
      type: project.type || "",

      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(", ")
        : project.technologies || "",

      github_url: project.github_url || "",
      live_url: project.live_url || "",
    });

    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // =====================================================
  // CANCEL
  // =====================================================

  const handleCancel = () => {
    if (saving) return;

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  // =====================================================
  // SAVE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const projectData = {
        title: form.title.trim(),
        description: form.description.trim(),
        type: form.type.trim(),

        technologies: form.technologies
          .split(",")
          .map((technology) => technology.trim())
          .filter(Boolean),

        github_url: form.github_url.trim(),
        live_url: form.live_url.trim(),
      };

      // UPDATE
      if (editingId) {
        const updatedProject = await updateProject(
          editingId,
          projectData
        );

        setProjects((current) =>
          current.map((project) =>
            project.id === editingId
              ? {
                  ...project,
                  ...(updatedProject || projectData),
                }
              : project
          )
        );

        setSuccess(
          "Project updated successfully."
        );
      }

      // CREATE
      else {
        const newProject =
          await createProject(projectData);

        if (newProject) {
          setProjects((current) => [
            newProject,
            ...current,
          ]);
        } else {
          await loadProjects();
        }

        setSuccess(
          "Project created successfully."
        );
      }

      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
    } catch (err) {
      console.error(err);

      setError(
        err.message || "Failed to save project."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await deleteProject(id);

      setProjects((current) =>
        current.filter(
          (project) => project.id !== id
        )
      );

      setSuccess(
        "Project deleted successfully."
      );
    } catch (err) {
      console.error(err);

      setError(
        err.message || "Failed to delete project."
      );
    }
  };

  // =====================================================
  // TECHNOLOGIES
  // =====================================================

  const getTechnologies = (technologies) => {
    if (Array.isArray(technologies)) {
      return technologies;
    }

    if (typeof technologies === "string") {
      return technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [];
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="admin-page">

      {/* PAGE HEADER */}

      <div className="admin-page-header">

        <div>
          <span>PORTFOLIO</span>

          <h2>Projects</h2>

          <p>
            Manage the projects displayed on your
            portfolio website.
          </p>
        </div>

        <button
          className="admin-primary-button"
          onClick={handleCreate}
        >
          <span>+</span>
          Add Project
        </button>

      </div>


      {/* ALERTS */}

      {success && (
        <div className="admin-alert admin-alert-success">
          <span>✓</span>
          {success}
        </div>
      )}

      {error && (
        <div className="admin-alert admin-alert-error">
          <span>!</span>
          {error}
        </div>
      )}


      {/* FORM */}

      {showForm && (
        <div className="admin-form-card">

          <div className="admin-form-header">

            <div>
              <span>
                {editingId
                  ? "EDIT PROJECT"
                  : "NEW PROJECT"}
              </span>

              <h3>
                {editingId
                  ? "Edit Project"
                  : "Add New Project"}
              </h3>
            </div>

            <button
              type="button"
              className="admin-close-button"
              onClick={handleCancel}
              disabled={saving}
            >
              ×
            </button>

          </div>


          <form
            className="admin-form"
            onSubmit={handleSubmit}
          >

            {/* TITLE */}

            <div className="admin-form-group">

              <label htmlFor="project-title">
                Project Title
              </label>

              <input
                id="project-title"
                name="title"
                type="text"
                placeholder="e.g. Portfolio Website"
                value={form.title}
                onChange={handleChange}
                required
              />

            </div>


            {/* TYPE */}

            <div className="admin-form-group">

              <label htmlFor="project-type">
                Project Type
              </label>

              <input
                id="project-type"
                name="type"
                type="text"
                placeholder="e.g. Full Stack Project"
                value={form.type}
                onChange={handleChange}
              />

            </div>


            {/* DESCRIPTION */}

            <div className="admin-form-group">

              <label htmlFor="project-description">
                Description
              </label>

              <textarea
                id="project-description"
                name="description"
                rows="5"
                placeholder="Describe your project..."
                value={form.description}
                onChange={handleChange}
                required
              />

            </div>


            {/* TECHNOLOGIES */}

            <div className="admin-form-group">

              <label htmlFor="project-technologies">
                Technologies
              </label>

              <input
                id="project-technologies"
                name="technologies"
                type="text"
                placeholder="React, Node.js, MySQL"
                value={form.technologies}
                onChange={handleChange}
              />

              <small>
                Separate technologies with commas.
              </small>

            </div>


            {/* URLS */}

            <div className="admin-form-row">

              <div className="admin-form-group">

                <label htmlFor="project-github">
                  GitHub URL
                </label>

                <input
                  id="project-github"
                  name="github_url"
                  type="url"
                  placeholder="https://github.com/..."
                  value={form.github_url}
                  onChange={handleChange}
                />

              </div>


              <div className="admin-form-group">

                <label htmlFor="project-live">
                  Live URL
                </label>

                <input
                  id="project-live"
                  name="live_url"
                  type="url"
                  placeholder="https://..."
                  value={form.live_url}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* ACTIONS */}

            <div className="admin-form-actions">

              <button
                type="button"
                className="admin-secondary-button"
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="admin-primary-button"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Save Changes"
                  : "Create Project"}
              </button>

            </div>

          </form>

        </div>
      )}


      {/* LOADING */}

      {loading && (
        <div className="admin-empty-state">

          <div className="admin-spinner"></div>

          <p>Loading projects...</p>

        </div>
      )}


      {/* EMPTY */}

      {!loading && projects.length === 0 && (
        <div className="admin-empty-state">

          <div className="admin-empty-icon">
            ◇
          </div>

          <h3>No Projects Yet</h3>

          <p>
            Add your first project to display it
            on your portfolio.
          </p>

          <button
            className="admin-primary-button"
            onClick={handleCreate}
          >
            + Add Your First Project
          </button>

        </div>
      )}


      {/* PROJECT CARDS */}

      {!loading && projects.length > 0 && (

        <div className="admin-project-grid">

          {projects.map((project) => {

            const technologies =
              getTechnologies(
                project.technologies
              );

            return (
              <article
                className="admin-project-card"
                key={project.id}
              >

                <div className="admin-project-card-top">

                  <div className="admin-project-icon">
                    &lt;/&gt;
                  </div>

                  <div className="admin-project-actions">

                    <button
                      className="admin-icon-button"
                      onClick={() =>
                        handleEdit(project)
                      }
                      title="Edit project"
                    >
                      ✎
                    </button>

                    <button
                      className="admin-icon-button admin-delete-button"
                      onClick={() =>
                        handleDelete(project.id)
                      }
                      title="Delete project"
                    >
                      🗑
                    </button>

                  </div>

                </div>


                <div className="admin-project-card-content">

                  <span className="admin-project-type">
                    {project.type || "Project"}
                  </span>

                  <h3>
                    {project.title}
                  </h3>

                  <p>
                    {project.description ||
                      "No description available."}
                  </p>


                  {technologies.length > 0 && (

                    <div className="admin-project-technologies">

                      {technologies.map(
                        (technology) => (
                          <span
                            key={`${project.id}-${technology}`}
                          >
                            {technology}
                          </span>
                        )
                      )}

                    </div>

                  )}

                </div>


                <div className="admin-project-footer">

                  {project.github_url ? (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub ↗
                    </a>
                  ) : (
                    <span className="admin-link-disabled">
                      GitHub —
                    </span>
                  )}


                  {project.live_url ? (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo ↗
                    </a>
                  ) : (
                    <span className="admin-link-disabled">
                      Live Demo —
                    </span>
                  )}

                </div>

              </article>
            );
          })}

        </div>

      )}

    </div>
  );
}

export default Projects;