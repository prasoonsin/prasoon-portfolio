import { useEffect, useState } from "react";

import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../../services/api";

import "./Skills.css";

function Skills() {
  const [skills, setSkills] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    proficiency: "",
  });

  // =====================================================
  // LOAD SKILLS
  // =====================================================

  const loadSkills = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getSkills();

      setSkills(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Load Skills Error:", err);

      setError(
        err.message || "Failed to load skills."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      proficiency: "",
    });

    setEditingId(null);
    setError("");
  };

  // =====================================================
  // EDIT SKILL
  // =====================================================

  const handleEdit = (skill) => {
    setEditingId(skill.id);

    setFormData({
      name: skill.name || "",
      category: skill.category || "",
      proficiency:
        skill.proficiency !== null &&
        skill.proficiency !== undefined
          ? String(skill.proficiency)
          : "",
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

    // ---------------------------------------------------
    // VALIDATION
    // ---------------------------------------------------

    if (!formData.name.trim()) {
      setError("Skill name is required.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        name: formData.name.trim(),

        category:
          formData.category.trim() || null,

        proficiency:
          formData.proficiency !== ""
            ? Number(formData.proficiency)
            : null,
      };

      // -------------------------------------------------
      // UPDATE
      // -------------------------------------------------

      if (editingId) {
        await updateSkill(
          editingId,
          payload
        );

        setSuccess(
          "Skill updated successfully."
        );
      }

      // -------------------------------------------------
      // CREATE
      // -------------------------------------------------

      else {
        await createSkill(payload);

        setSuccess(
          "Skill created successfully."
        );
      }

      resetForm();

      await loadSkills();
    } catch (err) {
      console.error(
        "Save Skill Error:",
        err
      );

      setError(
        err.message ||
          "Failed to save skill."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE SKILL
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this skill?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await deleteSkill(id);

      setSuccess(
        "Skill deleted successfully."
      );

      if (editingId === id) {
        resetForm();
      }

      await loadSkills();
    } catch (err) {
      console.error(
        "Delete Skill Error:",
        err
      );

      setError(
        err.message ||
          "Failed to delete skill."
      );
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="admin-skills-page">

      {/* =================================================
          HEADER
          ================================================= */}

      <div className="admin-skills-header">

        <div>

          <span className="admin-page-label">
            PORTFOLIO MANAGEMENT
          </span>

          <h1>Skills</h1>

          <p>
            Manage the technical skills shown
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
          SUCCESS MESSAGE
          ================================================= */}

      {success && (
        <div className="admin-alert admin-alert-success">
          {success}
        </div>
      )}


      {/* =================================================
          ERROR MESSAGE
          ================================================= */}

      {error && (
        <div className="admin-alert admin-alert-error">
          {error}
        </div>
      )}


      {/* =================================================
          ADD / EDIT FORM
          ================================================= */}

      <section className="admin-skills-form-card">

        <div className="admin-form-header">

          <div>

            <h2>
              {editingId
                ? "Edit Skill"
                : "Add Skill"}
            </h2>

            <p>
              {editingId
                ? "Update your skill details."
                : "Add a new technical skill."}
            </p>

          </div>

        </div>


        <form
          className="admin-skills-form"
          onSubmit={handleSubmit}
        >

          {/* =================================================
              SKILL NAME
              ================================================= */}

          <div className="admin-form-group">

            <label htmlFor="name">
              Skill Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Java"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>


          {/* =================================================
              CATEGORY
              ================================================= */}

          <div className="admin-form-group">

            <label htmlFor="category">
              Category
            </label>

            <input
              id="category"
              name="category"
              type="text"
              placeholder="Programming Language"
              value={formData.category}
              onChange={handleChange}
            />

          </div>


          {/* =================================================
              PROFICIENCY
              ================================================= */}

          <div className="admin-form-group">

            <label htmlFor="proficiency">
              Proficiency
            </label>

            <input
              id="proficiency"
              name="proficiency"
              type="number"
              min="0"
              max="100"
              placeholder="80"
              value={formData.proficiency}
              onChange={handleChange}
            />

            <small>
              Enter a value between 0 and 100.
            </small>

          </div>


          {/* =================================================
              ACTIONS
              ================================================= */}

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
                ? "Update Skill"
                : "Add Skill"}
            </button>

          </div>

        </form>

      </section>


      {/* =================================================
          SKILLS LIST
          ================================================= */}

      <section className="admin-skills-list-section">

        <div className="admin-list-header">

          <div>

            <h2>
              Your Skills
            </h2>

            <p>
              {skills.length}{" "}
              {skills.length === 1
                ? "skill"
                : "skills"}
            </p>

          </div>

        </div>


        {/* =================================================
            LOADING
            ================================================= */}

        {loading ? (

          <div className="admin-empty-state">

            <div className="admin-spinner"></div>

            <p>
              Loading skills...
            </p>

          </div>

        ) : skills.length === 0 ? (

          /* =================================================
             EMPTY
             ================================================= */

          <div className="admin-empty-state">

            <div className="admin-empty-icon">
              💻
            </div>

            <h3>
              No skills added yet
            </h3>

            <p>
              Add your first skill using
              the form above.
            </p>

          </div>

        ) : (

          /* =================================================
             SKILL GRID
             ================================================= */

          <div className="admin-skills-grid">

            {skills.map((skill) => (

              <article
                className="admin-skill-card"
                key={skill.id}
              >

                {/* CARD TOP */}

                <div className="admin-skill-card-top">

                  <div>

                    <h3>
                      {skill.name}
                    </h3>

                    {skill.category && (
                      <span className="admin-skill-category">
                        {skill.category}
                      </span>
                    )}

                  </div>

                </div>


                {/* PROFICIENCY */}

                {skill.proficiency !== null &&
                  skill.proficiency !==
                    undefined && (

                  <div className="admin-skill-proficiency">

                    <div className="admin-proficiency-header">

                      <span>
                        Proficiency
                      </span>

                      <span>
                        {skill.proficiency}%
                      </span>

                    </div>

                    <div className="admin-proficiency-bar">

                      <div
                        className="admin-proficiency-fill"
                        style={{
                          width: `${Math.min(
                            Math.max(
                              Number(
                                skill.proficiency
                              ),
                              0
                            ),
                            100
                          )}%`,
                        }}
                      />

                    </div>

                  </div>
                )}


                {/* ACTIONS */}

                <div className="admin-card-actions">

                  <button
                    type="button"
                    className="admin-edit-button"
                    onClick={() =>
                      handleEdit(skill)
                    }
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="admin-delete-button"
                    onClick={() =>
                      handleDelete(
                        skill.id
                      )
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

export default Skills;