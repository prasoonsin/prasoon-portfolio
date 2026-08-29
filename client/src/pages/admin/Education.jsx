import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getEducation,
  deleteEducation
} from "../../services/api";

import "./AdminPages.css";
import "./Education.css";

function Education() {
  const navigate = useNavigate();

  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // LOAD EDUCATION
  // =====================================================

  const loadEducation = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getEducation();

      setEducation(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (err) {
      console.error("Education Error:", err);

      setError(
        err.message ||
        "Failed to load education."
      );
    } finally {
      setLoading(false);
    }
  };


  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this education record?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteEducation(id);

      setEducation((prev) =>
        prev.filter(
          (item) => item.id !== id
        )
      );

    } catch (err) {
      alert(
        err.message ||
        "Failed to delete education."
      );
    }
  };


  // =====================================================
  // LOAD ON PAGE OPEN
  // =====================================================

  useEffect(() => {
    loadEducation();
  }, []);


  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString(
      "en-IN"
    );
  };


  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="admin-page education-admin-page">

      {/* =================================================
          HEADER
          ================================================= */}

      <div className="admin-page-header">

        <div>

          <span>PORTFOLIO</span>

          <h2>
            Education
          </h2>

          <p className="admin-page-description">
            Manage your education details.
          </p>

        </div>


        <div className="education-header-actions">

          <button
            className="admin-secondary-button"
            onClick={loadEducation}
            disabled={loading}
          >
            ↻ Refresh
          </button>


          <button
            className="admin-primary-button"
            onClick={() =>
              navigate("/admin/education/create")
            }
          >
            + Add Education
          </button>

        </div>

      </div>


      {/* =================================================
          STATS
          ================================================= */}

      {!loading && !error && (

        <div className="admin-stats-row">

          <div className="admin-mini-card">

            <span>
              Total Education
            </span>

            <strong>
              {education.length}
            </strong>

          </div>


          <div className="admin-mini-card">

            <span>
              Status
            </span>

            <strong>
              Active
            </strong>

          </div>

        </div>

      )}


      {/* =================================================
          LOADING
          ================================================= */}

      {loading && (

        <div className="admin-state-card">

          <div className="admin-loader"></div>

          <p>
            Loading education...
          </p>

        </div>

      )}


      {/* =================================================
          ERROR
          ================================================= */}

      {!loading && error && (

        <div className="admin-state-card admin-error-card">

          <strong>
            Something went wrong
          </strong>

          <p>
            {error}
          </p>

          <button
            className="admin-primary-button"
            onClick={loadEducation}
          >
            Try Again
          </button>

        </div>

      )}


      {/* =================================================
          EMPTY
          ================================================= */}

      {!loading &&
        !error &&
        education.length === 0 && (

          <div className="admin-state-card">

            <div className="admin-empty-icon">
              🎓
            </div>

            <h3>
              No education records
            </h3>

            <p>
              Add your first education record.
            </p>

            <button
              className="admin-primary-button"
              onClick={() =>
                navigate(
                  "/admin/education/create"
                )
              }
            >
              + Add Education
            </button>

          </div>

        )}


      {/* =================================================
          TABLE
          ================================================= */}

      {!loading &&
        !error &&
        education.length > 0 && (

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>

                <tr>

                  <th>
                    Degree
                  </th>

                  <th>
                    Institution
                  </th>

                  <th>
                    Start Date
                  </th>

                  <th>
                    End Date
                  </th>

                  <th>
                    Description
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {education.map((item) => (

                  <tr key={item.id}>

                    <td>
                      <strong>
                        {item.degree || "—"}
                      </strong>
                    </td>


                    <td>
                      {item.institution || "—"}
                    </td>


                    <td>
                      {formatDate(
                        item.start_date
                      )}
                    </td>


                    <td>
                      {item.end_date
                        ? formatDate(
                            item.end_date
                          )
                        : "Present"}
                    </td>


                    <td>

                      <div className="admin-comment-text">
                        {item.description || "—"}
                      </div>

                    </td>


                    <td>

                      <div className="education-actions">

                        <button
                          className="education-edit-button"
                          onClick={() =>
                            navigate(
                              `/admin/education/edit/${item.id}`
                            )
                          }
                        >
                          Edit
                        </button>


                        <button
                          className="education-delete-button"
                          onClick={() =>
                            handleDelete(item.id)
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

    </div>
  );
}

export default Education;