import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createEducation } from "../../services/api";

import "./AdminPages.css";
import "./Education.css";

function CreateEducation() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    degree: "",
    institution: "",
    start_date: "",
    end_date: "",
    description: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (!form.degree.trim()) {
      setError("Degree is required.");
      return;
    }

    if (!form.institution.trim()) {
      setError("Institution is required.");
      return;
    }

    try {

      setLoading(true);

      await createEducation({
        degree: form.degree,
        institution: form.institution,
        start_date:
          form.start_date || null,
        end_date:
          form.end_date || null,
        description:
          form.description || null
      });

      navigate("/admin/education");

    } catch (err) {

      console.error(
        "Create Education Error:",
        err
      );

      setError(
        err.message ||
        "Failed to create education."
      );

    } finally {
      setLoading(false);
    }
  };


  return (

    <div className="admin-page education-form-page">

      {/* HEADER */}

      <div className="admin-page-header">

        <div>

          <span>
            PORTFOLIO
          </span>

          <h2>
            Add Education
          </h2>

          <p className="admin-page-description">
            Add a new education record.
          </p>

        </div>


        <button
          className="admin-secondary-button"
          onClick={() =>
            navigate("/admin/education")
          }
        >
          ← Back
        </button>

      </div>


      {/* FORM CARD */}

      <div className="education-form-card">

        {error && (

          <div className="education-form-error">
            {error}
          </div>

        )}


        <form onSubmit={handleSubmit}>

          {/* DEGREE */}

          <div className="education-form-group">

            <label>
              Degree <span>*</span>
            </label>

            <input
              type="text"
              name="degree"
              value={form.degree}
              onChange={handleChange}
              placeholder="e.g. B.Tech in Computer Science"
              required
            />

          </div>


          {/* INSTITUTION */}

          <div className="education-form-group">

            <label>
              Institution <span>*</span>
            </label>

            <input
              type="text"
              name="institution"
              value={form.institution}
              onChange={handleChange}
              placeholder="e.g. Galgotias University"
              required
            />

          </div>


          {/* DATES */}

          <div className="education-form-grid">

            <div className="education-form-group">

              <label>
                Start Date
              </label>

              <input
                type="date"
                name="start_date"
                value={form.start_date}
                onChange={handleChange}
              />

            </div>


            <div className="education-form-group">

              <label>
                End Date
              </label>

              <input
                type="date"
                name="end_date"
                value={form.end_date}
                onChange={handleChange}
              />

              <small>
                Leave empty if currently studying.
              </small>

            </div>

          </div>


          {/* DESCRIPTION */}

          <div className="education-form-group">

            <label>
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your education..."
              rows="6"
            />

          </div>


          {/* BUTTONS */}

          <div className="education-form-actions">

            <button
              type="button"
              className="admin-secondary-button"
              onClick={() =>
                navigate("/admin/education")
              }
            >
              Cancel
            </button>


            <button
              type="submit"
              className="admin-primary-button"
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Create Education"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateEducation;