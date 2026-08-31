import { useEffect, useState } from "react";

import {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from "../../services/api";

import "./Certifications.css";

function Certifications() {
  const [certifications, setCertifications] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    issue_date: "",
    expiry_date: "",
    credential_id: "",
    credential_url: "",
    description: "",
  });

  // =====================================================
  // LOAD CERTIFICATIONS
  // =====================================================

  const loadCertifications = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getCertifications();

      setCertifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading certifications:", err);

      setError(
        "Unable to load certifications. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    loadCertifications();
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
      title: "",
      organization: "",
      issue_date: "",
      expiry_date: "",
      credential_id: "",
      credential_url: "",
      description: "",
    });

    setEditingId(null);
    setError("");
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // ---------------------------------------------
    // VALIDATION
    // ---------------------------------------------

    if (!formData.title.trim()) {
      setError("Certification name is required.");
      return;
    }

    if (!formData.organization.trim()) {
      setError("Issuing organization is required.");
      return;
    }

    // ---------------------------------------------
    // DATA TO SEND TO API
    // ---------------------------------------------

    const certificationData = {
      title: formData.title.trim(),
      organization: formData.organization.trim(),
      issue_date: formData.issue_date || null,
      expiry_date: formData.expiry_date || null,
      credential_id: formData.credential_id.trim(),
      credential_url: formData.credential_url.trim(),
      description: formData.description.trim(),
    };

    try {
      setSaving(true);

      // =================================================
      // UPDATE EXISTING CERTIFICATION
      // =================================================

      if (editingId) {
        const updatedCertification = await updateCertification(
          editingId,
          certificationData
        );

        /*
         * Some APIs return the updated object directly.
         * Others return { data: updatedObject }.
         * Handle both safely.
         */

        const updatedItem =
          updatedCertification?.data ||
          updatedCertification;

        setCertifications((prev) =>
          prev.map((item) =>
            item.id === editingId
              ? {
                  ...item,
                  ...updatedItem,
                  ...certificationData,
                }
              : item
          )
        );

        setSuccess(
          "Certification updated successfully."
        );
      }

      // =================================================
      // CREATE NEW CERTIFICATION
      // =================================================

      else {
        const createdCertification =
          await createCertification(
            certificationData
          );

        /*
         * Some APIs return the created object directly.
         * Others return { data: createdObject }.
         */

        const newItem =
          createdCertification?.data ||
          createdCertification;

        /*
         * If the backend returns the created record,
         * use it. Otherwise reload from database.
         */

        if (newItem?.id) {
          setCertifications((prev) => [
            newItem,
            ...prev,
          ]);
        } else {
          await loadCertifications();
        }

        setSuccess(
          "Certification added successfully."
        );
      }

      resetForm();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      console.error(
        "Error saving certification:",
        err
      );

      setError(
        err?.message ||
          "Unable to save certification. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      title: item.title || "",
      organization: item.organization || "",
      issue_date: item.issue_date
        ? String(item.issue_date).slice(0, 10)
        : "",
      expiry_date: item.expiry_date
        ? String(item.expiry_date).slice(0, 10)
        : "",
      credential_id: item.credential_id || "",
      credential_url: item.credential_url || "",
      description: item.description || "",
    });

    setSuccess("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this certification?"
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setSuccess("");
    setDeletingId(id);

    try {
      await deleteCertification(id);

      /*
       * Only remove it from the UI AFTER
       * the database deletion succeeds.
       */

      setCertifications((prev) =>
        prev.filter((item) => item.id !== id)
      );

      if (editingId === id) {
        resetForm();
      }

      setSuccess(
        "Certification deleted successfully."
      );
    } catch (err) {
      console.error(
        "Error deleting certification:",
        err
      );

      setError(
        err?.message ||
          "Unable to delete certification. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

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
    <div className="admin-certifications-page">

      {/* =================================================
          HEADER
          ================================================= */}

      <div className="admin-certifications-header">

        <div>
          <span className="admin-certifications-label">
            PORTFOLIO MANAGEMENT
          </span>

          <h1>Certifications</h1>

          <p>
            Manage your professional certifications
            shown on your portfolio.
          </p>
        </div>

        {editingId && (
          <button
            type="button"
            className="admin-certifications-secondary-button"
            onClick={resetForm}
            disabled={saving}
          >
            + Add New
          </button>
        )}

      </div>


      {/* =================================================
          ALERTS
          ================================================= */}

      {success && (
        <div className="admin-certifications-alert admin-certifications-success">
          {success}
        </div>
      )}

      {error && (
        <div className="admin-certifications-alert admin-certifications-error">
          {error}
        </div>
      )}


      {/* =================================================
          FORM
          ================================================= */}

      <section className="admin-certifications-form-card">

        <div className="admin-certifications-form-header">

          <div>
            <h2>
              {editingId
                ? "Edit Certification"
                : "Add Certification"}
            </h2>

            <p>
              {editingId
                ? "Update your certification details."
                : "Add a new professional certification."}
            </p>
          </div>

        </div>


        <form
          className="admin-certifications-form"
          onSubmit={handleSubmit}
        >

          {/* =================================================
              CERTIFICATION NAME
              ================================================= */}

          <div className="admin-certifications-form-group">

            <label htmlFor="title">
              Certification Name
            </label>

            <input
              id="title"
              name="title"
              type="text"
              placeholder="AWS Certified Cloud Practitioner"
              value={formData.title}
              onChange={handleChange}
              required
              disabled={saving}
            />

          </div>


          {/* =================================================
              ORGANIZATION
              ================================================= */}

          <div className="admin-certifications-form-group">

            <label htmlFor="organization">
              Issuing Organization
            </label>

            <input
              id="organization"
              name="organization"
              type="text"
              placeholder="Amazon Web Services"
              value={formData.organization}
              onChange={handleChange}
              required
              disabled={saving}
            />

          </div>


          {/* =================================================
              DATES
              ================================================= */}

          <div className="admin-certifications-form-row">

            <div className="admin-certifications-form-group">

              <label htmlFor="issue_date">
                Issue Date
              </label>

              <input
                id="issue_date"
                name="issue_date"
                type="date"
                value={formData.issue_date}
                onChange={handleChange}
                disabled={saving}
              />

            </div>


            <div className="admin-certifications-form-group">

              <label htmlFor="expiry_date">
                Expiry Date
              </label>

              <input
                id="expiry_date"
                name="expiry_date"
                type="date"
                value={formData.expiry_date}
                onChange={handleChange}
                disabled={saving}
              />

            </div>

          </div>


          {/* =================================================
              CREDENTIAL ID
              ================================================= */}

          <div className="admin-certifications-form-group">

            <label htmlFor="credential_id">
              Credential ID
            </label>

            <input
              id="credential_id"
              name="credential_id"
              type="text"
              placeholder="ABC123XYZ"
              value={formData.credential_id}
              onChange={handleChange}
              disabled={saving}
            />

          </div>


          {/* =================================================
              CREDENTIAL URL
              ================================================= */}

          <div className="admin-certifications-form-group">

            <label htmlFor="credential_url">
              Credential URL
            </label>

            <input
              id="credential_url"
              name="credential_url"
              type="url"
              placeholder="https://example.com/verify"
              value={formData.credential_url}
              onChange={handleChange}
              disabled={saving}
            />

          </div>


          {/* =================================================
              DESCRIPTION
              ================================================= */}

          <div className="admin-certifications-form-group">

            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows="6"
              placeholder="Describe what this certification covers..."
              value={formData.description}
              onChange={handleChange}
              disabled={saving}
            />

          </div>


          {/* =================================================
              ACTIONS
              ================================================= */}

          <div className="admin-certifications-form-actions">

            {editingId && (
              <button
                type="button"
                className="admin-certifications-cancel-button"
                onClick={resetForm}
                disabled={saving}
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              className="admin-certifications-primary-button"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : editingId
                ? "Update Certification"
                : "Add Certification"}
            </button>

          </div>

        </form>

      </section>


      {/* =================================================
          CERTIFICATION LIST
          ================================================= */}

      <section className="admin-certifications-list-section">

        <div className="admin-certifications-list-header">

          <div>
            <h2>Your Certifications</h2>

            <p>
              {loading
                ? "Loading..."
                : `${certifications.length} ${
                    certifications.length === 1
                      ? "certification"
                      : "certifications"
                  }`}
            </p>
          </div>

        </div>


        {/* =================================================
            LOADING
            ================================================= */}

        {loading ? (

          <div className="admin-certifications-empty-state">

            <div className="admin-certifications-empty-icon">
              ◌
            </div>

            <h3>
              Loading certifications...
            </h3>

            <p>
              Fetching your certifications from the
              database.
            </p>

          </div>

        ) : certifications.length === 0 ? (

          /* =================================================
             EMPTY
             ================================================= */

          <div className="admin-certifications-empty-state">

            <div className="admin-certifications-empty-icon">
              🏆
            </div>

            <h3>
              No certifications added yet
            </h3>

            <p>
              Add your first professional certification
              using the form above.
            </p>

          </div>

        ) : (

          /* =================================================
             CERTIFICATION CARDS
             ================================================= */

          <div className="admin-certifications-grid">

            {certifications.map((item) => (

              <article
                className="admin-certification-card"
                key={item.id}
              >

                {/* =================================================
                    CARD TOP
                    ================================================= */}

                <div className="admin-certification-card-top">

                  <div className="admin-certification-icon">
                    🏆
                  </div>

                  <div className="admin-certification-title">

                    <h3>
                      {item.title}
                    </h3>

                    <span>
                      {item.organization}
                    </span>

                  </div>

                </div>


                {/* =================================================
                    DATE
                    ================================================= */}

                {(item.issue_date ||
                  item.expiry_date) && (

                  <div className="admin-certification-date">

                    {formatDate(item.issue_date)}

                    <span>→</span>

                    {item.expiry_date
                      ? formatDate(item.expiry_date)
                      : "No Expiry"}

                  </div>

                )}


                {/* =================================================
                    CREDENTIAL
                    ================================================= */}

                {item.credential_id && (

                  <div className="admin-certification-credential">

                    <span>
                      Credential ID
                    </span>

                    <strong>
                      {item.credential_id}
                    </strong>

                  </div>

                )}


                {/* =================================================
                    DESCRIPTION
                    ================================================= */}

                {item.description && (

                  <p className="admin-certification-description">
                    {item.description}
                  </p>

                )}


                {/* =================================================
                    VERIFY LINK
                    ================================================= */}

                {item.credential_url && (

                  <a
                    href={item.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="admin-certification-link"
                  >
                    View Credential ↗
                  </a>

                )}


                {/* =================================================
                    ACTIONS
                    ================================================= */}

                <div className="admin-certification-card-actions">

                  <button
                    type="button"
                    className="admin-certification-edit-button"
                    onClick={() =>
                      handleEdit(item)
                    }
                    disabled={
                      saving ||
                      deletingId !== null
                    }
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="admin-certification-delete-button"
                    onClick={() =>
                      handleDelete(item.id)
                    }
                    disabled={
                      saving ||
                      deletingId !== null
                    }
                  >
                    {deletingId === item.id
                      ? "Deleting..."
                      : "Delete"}
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

export default Certifications;