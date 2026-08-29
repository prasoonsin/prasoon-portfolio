import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  getEducationById,
  updateEducation
} from "../../services/api";

import "./AdminPages.css";
import "./Education.css";

function EditEducation() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    degree: "",
    institution: "",
    location: "",
    start_year: "",
    end_year: "",
    description: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");


  // =====================================================
  // LOAD EDUCATION
  // =====================================================

  const loadEducation = async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getEducationById(id);

      console.log("Education loaded:", data);

      if (!data) {
        throw new Error("Education record not found.");
      }

      setForm({
        degree: data.degree || "",
        institution: data.institution || "",
        location: data.location || "",
        start_year: data.start_year || "",
        end_year: data.end_year || "",
        description: data.description || ""
      });

    } catch (err) {

      console.error(
        "Edit Education Error:",
        err
      );

      setError(
        err.message ||
        "Failed to load education."
      );

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // LOAD WHEN ID CHANGES
  // =====================================================

  useEffect(() => {

    if (id) {
      loadEducation();
    }

  }, [id]);


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
  // UPDATE EDUCATION
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    // -----------------------------------------------------
    // VALIDATION
    // -----------------------------------------------------

    if (!form.degree.trim()) {

      setError("Degree is required.");

      return;
    }

    if (!form.institution.trim()) {

      setError("Institution is required.");

      return;
    }

    if (!form.start_year) {

      setError("Start year is required.");

      return;
    }

    // -----------------------------------------------------
    // YEAR VALIDATION
    // -----------------------------------------------------

    const startYear = Number(form.start_year);

    const endYear = form.end_year
      ? Number(form.end_year)
      : null;

    if (
      startYear < 1900 ||
      startYear > 2100
    ) {

      setError(
        "Please enter a valid start year."
      );

      return;
    }

    if (
      endYear !== null &&
      (endYear < 1900 || endYear > 2100)
    ) {

      setError(
        "Please enter a valid end year."
      );

      return;
    }

    if (
      endYear !== null &&
      endYear < startYear
    ) {

      setError(
        "End year cannot be earlier than start year."
      );

      return;
    }

    // -----------------------------------------------------
    // UPDATE
    // -----------------------------------------------------

    try {

      setSaving(true);

      console.log("Updating education:", {
        id,
        degree: form.degree.trim(),
        institution: form.institution.trim(),
        location: form.location.trim() || null,
        start_year: startYear,
        end_year: endYear,
        description:
          form.description.trim() || null
      });

      await updateEducation(id, {

        degree:
          form.degree.trim(),

        institution:
          form.institution.trim(),

        location:
          form.location.trim() || null,

        start_year:
          startYear,

        end_year:
          endYear,

        description:
          form.description.trim() || null

      });

      console.log(
        "Education updated successfully"
      );

      // -----------------------------------------------------
      // GO BACK TO EDUCATION LIST
      // -----------------------------------------------------

      navigate("/admin/education");

    } catch (err) {

      console.error(
        "Update Education Error:",
        err
      );

      setError(
        err.message ||
        "Failed to update education."
      );

    } finally {

      setSaving(false);

    }

  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="admin-page education-form-page">

        <div className="admin-state-card">

          <div className="admin-loader"></div>

          <p>
            Loading education...
          </p>

        </div>

      </div>

    );

  }


  // =====================================================
  // PAGE
  // =====================================================

  return (

    <div className="admin-page education-form-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="admin-page-header">

        <div>

          <span>
            PORTFOLIO
          </span>

          <h2>
            Edit Education
          </h2>

          <p className="admin-page-description">
            Update your education details.
          </p>

        </div>


        <button
          type="button"
          className="admin-secondary-button"
          onClick={() =>
            navigate("/admin/education")
          }
          disabled={saving}
        >
          ← Back
        </button>

      </div>


      {/* =================================================
          FORM CARD
      ================================================= */}

      <div className="education-form-card">

        {/* ERROR */}

        {error && (

          <div className="education-form-error">
            {error}
          </div>

        )}


        <form onSubmit={handleSubmit}>

          {/* =================================================
              DEGREE
          ================================================= */}

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
              disabled={saving}
            />

          </div>


          {/* =================================================
              INSTITUTION
          ================================================= */}

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
              disabled={saving}
            />

          </div>


          {/* =================================================
              LOCATION
          ================================================= */}

          <div className="education-form-group">

            <label>
              Location
            </label>

            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Greater Noida, Uttar Pradesh"
              disabled={saving}
            />

          </div>


          {/* =================================================
              YEARS
          ================================================= */}

          <div className="education-form-grid">

            {/* START YEAR */}

            <div className="education-form-group">

              <label>
                Start Year <span>*</span>
              </label>

              <input
                type="number"
                name="start_year"
                value={form.start_year}
                onChange={handleChange}
                placeholder="2023"
                min="1900"
                max="2100"
                required
                disabled={saving}
              />

            </div>


            {/* END YEAR */}

            <div className="education-form-group">

              <label>
                End Year
              </label>

              <input
                type="number"
                name="end_year"
                value={form.end_year}
                onChange={handleChange}
                placeholder="2027"
                min="1900"
                max="2100"
                disabled={saving}
              />

              <small>
                Leave empty if currently studying.
              </small>

            </div>

          </div>


          {/* =================================================
              DESCRIPTION
          ================================================= */}

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
              disabled={saving}
            />

          </div>


          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="education-form-actions">

            <button
              type="button"
              className="admin-secondary-button"
              onClick={() =>
                navigate("/admin/education")
              }
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
                : "Save Changes"}

            </button>

          </div>

        </form>

      </div>

    </div>

  );
}

export default EditEducation;