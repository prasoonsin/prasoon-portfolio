import { useEffect, useState } from "react";
import { getCertifications } from "../services/api";
import "./Certifications.css";
import "../styles/PortfolioPages.css";
function Certifications() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCertifications = async () => {
      try {
        const data = await getCertifications();

        setCertifications(
          Array.isArray(data) ? data : []
        );
      } catch (err) {
        console.error(err);
        setError("Failed to load certifications.");
      } finally {
        setLoading(false);
      }
    };

    loadCertifications();
  }, []);

  return (
    <section
      className="certifications"
      id="certifications"
    >
      <div className="certifications-container">

        <div className="section-heading">
          <span>06.</span>
          <h2>Certifications</h2>
        </div>

        <p className="certifications-intro">
          Certifications and achievements that represent my
          continuous learning and technical growth.
        </p>

        {loading && (
          <p>Loading certifications...</p>
        )}

        {!loading && error && (
          <p>{error}</p>
        )}

        {!loading &&
          !error &&
          certifications.length > 0 && (

            <div className="certifications-grid">

              {certifications.map((certification) => (
                <article
                  className="certification-card"
                  key={certification.id}
                >

                  <div className="certification-top">

                    <div className="certificate-icon">
                      ✓
                    </div>

                    {certification.issue_date && (
                      <span className="certificate-date">
                        {new Date(
                          certification.issue_date
                        ).getFullYear()}
                      </span>
                    )}

                  </div>

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
              ))}

            </div>
          )}

        {!loading &&
          !error &&
          certifications.length === 0 && (
            <p>No certifications found.</p>
          )}

      </div>
    </section>
  );
}

export default Certifications;