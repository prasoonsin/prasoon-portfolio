import { useEffect, useState } from "react";
import { getCertifications } from "../../services/api";
import "./Certifications.css";

function Certifications() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getCertifications();

        setCertifications(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching certifications:", err);

        setError(
          "Unable to load certifications. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  const formatYear = (date) => {
    if (!date) {
      return null;
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return null;
    }

    return parsedDate.getFullYear();
  };

  return (
    <section
      className="certifications"
      id="certifications"
    >
      <div className="certifications-container">

        {/* =================================================
            SECTION HEADING
            ================================================= */}

        <div className="certifications-heading">
          <div className="certifications-heading-line" />

          <h2>Certifications</h2>
        </div>


        {/* =================================================
            INTRODUCTION
            ================================================= */}

        <p className="certifications-intro">
          Certifications and achievements that represent my
          continuous learning and technical growth.
        </p>


        {/* =================================================
            LOADING
            ================================================= */}

        {loading && (
          <div className="certifications-state">
            <div className="state-dot" />
            <p>Loading certifications...</p>
          </div>
        )}


        {/* =================================================
            ERROR
            ================================================= */}

        {!loading && error && (
          <div className="certifications-state certifications-error">
            <div className="state-dot" />
            <p>{error}</p>
          </div>
        )}


        {/* =================================================
            CERTIFICATION CONTENT
            ================================================= */}

        {!loading && !error && (
          <>
            {certifications.length === 0 ? (
              <div className="certifications-state">
                <div className="state-dot" />

                <p>
                  No certifications added yet.
                </p>
              </div>
            ) : (
              <div className="certifications-grid">

                {certifications.map((certification) => {
                  const year = formatYear(
                    certification.issue_date
                  );

                  return (
                    <article
                      className="certification-card"
                      key={certification.id}
                    >

                      {/* =================================================
                          CARD HEADER
                          ================================================= */}

                      <div className="certification-card-header">

                        <div
                          className="certificate-icon"
                          aria-hidden="true"
                        >
                          <span>✓</span>
                        </div>

                        {year && (
                          <span className="certificate-date">
                            {year}
                          </span>
                        )}

                      </div>


                      {/* =================================================
                          CARD CONTENT
                          ================================================= */}

                      <div className="certification-card-content">

                        <span className="certificate-label">
                          CERTIFICATION
                        </span>

                        <h3>
                          {certification.title}
                        </h3>

                        {certification.organization && (
                          <p className="certificate-issuer">
                            {certification.organization}
                          </p>
                        )}

                        {certification.description && (
                          <p className="certificate-description">
                            {certification.description}
                          </p>
                        )}

                      </div>


                      {/* =================================================
                          CARD FOOTER
                          ================================================= */}

                      {certification.credential_url && (
                        <div className="certification-card-footer">

                          <a
                            href={certification.credential_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="certificate-link"
                          >
                            <span>View Certificate</span>

                            <span
                              className="certificate-arrow"
                              aria-hidden="true"
                            >
                              ↗
                            </span>
                          </a>

                        </div>
                      )}

                    </article>
                  );
                })}

              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}

export default Certifications;