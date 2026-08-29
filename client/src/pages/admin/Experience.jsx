import { useEffect, useState } from "react";
import {
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../../services/api";

import "./ExperienceForm.css";

function Experience() {
  const [experience, setExperience] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    position: "",
    company: "",
    start_date: "",
    end_date: "",
    description: "",
    is_current: false,
  });

  // =====================================================
  // LOAD EXPERIENCE
  // =====================================================

  const loadExperience = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getExperience();

      setExperience(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Load Experience Error:", err);
      setError(err.message || "Failed to load experience.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExperience();
  }, []);

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {
    setFormData({
      position: "",
      company: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    });

    setEditingId(null);
    setError("");
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      position: item.position || "",
      company: item.company || "",
      start_date: item.start_date
        ? String(item.start_date).substring(0, 10)
        : "",
      end_date: item.end_date
        ? String(item.end_date).substring(0, 10)
        : "",
      description: item.description || "",
      is_current: Boolean(item.is_current),
    });

    setSuccess("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.position.trim()) {
      setError("Position is required.");
      return;
    }

    if (!formData.company.trim()) {
      setError("Company is required.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        position: formData.position.trim(),
        company: formData.company.trim(),

        start_date: formData.start_date || null,

        end_date: formData.is_current
          ? null
          : formData.end_date || null,

        description: formData.description.trim() || null,

        is_current: formData.is_current,
      };

      if (editingId) {
        await updateExperience(editingId, payload);

        setSuccess("Experience updated successfully.");
      } else {
        await createExperience(payload);

        setSuccess("Experience created successfully.");
      }

      resetForm();

      await loadExperience();
    } catch (err) {
      console.error("Save Experience Error:", err);

      setError(
        err.message || "Failed to save experience."
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
      "Are you sure you want to delete this experience?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await deleteExperience(id);

      setSuccess("Experience deleted successfully.");

      if (editingId === id) {
        resetForm();
      }

      await loadExperience();
    } catch (err) {
      console.error("Delete Experience Error:", err);

      setError(
        err.message || "Failed to delete experience."
      );
    }
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="admin-experience-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="admin-experience-header">

        <div>
          <span className="admin-page-label">
            PORTFOLIO MANAGEMENT
          </span>

          <h1>Experience</h1>

          <p>
            Manage your professional experience shown
            on your portfolio.
          </p>
        </div>

        {editingId && (
          <button
            type="button"
            className="admin-secondary-button"
            onClick={resetForm}
          >
            + Add New
          </button>
        )}

      </div>

      {/* =================================================
          SUCCESS
      ================================================= */}

      {success && (
        <div className="admin-alert admin-alert-success">
          {success}
        </div>
      )}

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="admin-alert admin-alert-error">
          {error}
        </div>
      )}

      {/* =================================================
          FORM
      ================================================= */}

      <section className="admin-experience-form-card">

        <div className="admin-form-header">

          <div>
            <h2>
              {editingId
                ? "Edit Experience"
                : "Add Experience"}
            </h2>

            <p>
              {editingId
                ? "Update your experience details."
                : "Add a new professional experience."}
            </p>
          </div>

        </div>

        <form
          className="admin-experience-form"
          onSubmit={handleSubmit}
        >

          {/* POSITION */}

          <div className="admin-form-group">

            <label htmlFor="position">
              Position
            </label>

            <input
              id="position"
              name="position"
              type="text"
              placeholder="Software Engineer"
              value={formData.position}
              onChange={handleChange}
              required
            />

          </div>

          {/* COMPANY */}

          <div className="admin-form-group">

            <label htmlFor="company">
              Company
            </label>

            <input
              id="company"
              name="company"
              type="text"
              placeholder="Google"
              value={formData.company}
              onChange={handleChange}
              required
            />

          </div>

          {/* DATES */}

          <div className="admin-form-row">

            <div className="admin-form-group">

              <label htmlFor="start_date">
                Start Date
              </label>

              <input
                id="start_date"
                name="start_date"
                type="date"
                value={formData.start_date}
                onChange={handleChange}
              />

            </div>

            <div className="admin-form-group">

              <label htmlFor="end_date">
                End Date
              </label>

              <input
                id="end_date"
                name="end_date"
                type="date"
                value={formData.end_date}
                onChange={handleChange}
                disabled={formData.is_current}
              />

            </div>

          </div>

          {/* CURRENT JOB */}

          <label className="admin-checkbox">

            <input
              type="checkbox"
              name="is_current"
              checked={formData.is_current}
              onChange={handleChange}
            />

            <span>
              I currently work here
            </span>

          </label>

          {/* DESCRIPTION */}

          <div className="admin-form-group">

            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows="6"
              placeholder="Describe your responsibilities, achievements, technologies used..."
              value={formData.description}
              onChange={handleChange}
            />

          </div>

          {/* ACTIONS */}

          <div className="admin-form-actions">

            {editingId && (
              <button
                type="button"
                className="admin-cancel-button"
                onClick={resetForm}
                disabled={saving}
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              className="admin-primary-button"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : editingId
                ? "Update Experience"
                : "Add Experience"}
            </button>

          </div>

        </form>

      </section>

      {/* =================================================
          EXPERIENCE LIST
      ================================================= */}

      <section className="admin-experience-list-section">

        <div className="admin-list-header">

          <div>
            <h2>Your Experience</h2>

            <p>
              {experience.length}{" "}
              {experience.length === 1
                ? "experience"
                : "experiences"}
            </p>
          </div>

        </div>

        {loading ? (
          <div className="admin-empty-state">
            <div className="admin-spinner"></div>
            <p>Loading experience...</p>
          </div>
        ) : experience.length === 0 ? (
          <div className="admin-empty-state">

            <div className="admin-empty-icon">
              💼
            </div>

            <h3>No experience added yet</h3>

            <p>
              Add your first professional experience
              using the form above.
            </p>

          </div>
        ) : (
          <div className="admin-experience-grid">

            {experience.map((item) => (

              <article
                className="admin-experience-card"
                key={item.id}
              >

                <div className="admin-experience-card-top">

                  <div>

                    <span className="admin-experience-company">
                      {item.company}
                    </span>

                    <h3>
                      {item.position}
                    </h3>

                  </div>

                  {item.is_current && (
                    <span className="admin-current-badge">
                      Current
                    </span>
                  )}

                </div>

                <div className="admin-experience-date">

                  {formatDate(item.start_date)}

                  <span>→</span>

                  {item.is_current
                    ? "Present"
                    : formatDate(item.end_date)}

                </div>

                {item.description && (
                  <p className="admin-experience-description">
                    {item.description}
                  </p>
                )}

                <div className="admin-card-actions">

                  <button
                    type="button"
                    className="admin-edit-button"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="admin-delete-button"
                    onClick={() =>
                      handleDelete(item.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </article>

            ))}

          </div>
        )}

      </section>

    </div>
  );
}

export default Experience;