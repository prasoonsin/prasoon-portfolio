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

        {/* Section Heading */}

        <div className="section-heading">
          <span></span>
          <h2>Certifications</h2>
        </div>


        {/* Introduction */}

        <p className="certifications-intro">
          Certifications and achievements that represent my
          continuous learning and technical growth.
        </p>


        {/* Loading */}

        {loading && (
          <p className="certifications-status">
            Loading certifications...
          </p>
        )}


        {/* Error */}

        {!loading && error && (
          <p className="certifications-status">
            {error}
          </p>
        )}


        {/* Certification List */}

        {!loading && !error && (
          <>
            {certifications.length === 0 ? (
              <p className="certifications-status">
                No certifications added yet.
              </p>
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

                      {/* Card Top */}

                      <div className="certification-top">

                        <div
                          className="certificate-icon"
                          aria-hidden="true"
                        >
                          ✓
                        </div>

                        {year && (
                          <span className="certificate-date">
                            {year}
                          </span>
                        )}

                      </div>


                      {/* Title */}

                      <h3>
                        {certification.title}
                      </h3>


                      {/* Issuing Organization */}

                      {certification.organization && (
                        <p className="certificate-issuer">
                          {certification.organization}
                        </p>
                      )}


                      {/* Description */}

                      {certification.description && (
                        <p className="certificate-description">
                          {certification.description}
                        </p>
                      )}


                      {/* Certificate Link */}

                      {certification.credential_url && (
                        <a
                          href={certification.credential_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="certificate-link"
                        >
                          View Certificate →
                        </a>
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