import { useEffect, useState } from "react";
import { getEducation } from "../services/api";
import "./Education.css";
import "../styles/PortfolioPages.css";
function Education() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEducation = async () => {
      try {
        const data = await getEducation();
        setEducation(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load education.");
      } finally {
        setLoading(false);
      }
    };

    loadEducation();
  }, []);

  return (
    <section className="education" id="education">
      <div className="education-container">

        <div className="section-heading">
          <span>02.</span>
          <h2>Education</h2>
        </div>

        {loading && (
          <p className="education-message">
            Loading education...
          </p>
        )}

        {!loading && error && (
          <p className="education-message">
            {error}
          </p>
        )}

        {!loading && !error && education.length > 0 && (
          <div className="education-list">

            {education.map((item) => (
              <article
                className="education-card"
                key={item.id}
              >
                <h3>{item.degree}</h3>

                <h4>{item.institution}</h4>

                <p className="education-duration">
                  {item.start_year} - {item.end_year}
                </p>

                {item.description && (
                  <p className="education-description">
                    {item.description}
                  </p>
                )}

                {item.grade && (
                  <p className="education-grade">
                    <strong>Grade:</strong> {item.grade}
                  </p>
                )}
              </article>
            ))}

          </div>
        )}

        {!loading &&
          !error &&
          education.length === 0 && (
            <p className="education-message">
              No education records found.
            </p>
          )}

      </div>
    </section>
  );
}

export default Education;