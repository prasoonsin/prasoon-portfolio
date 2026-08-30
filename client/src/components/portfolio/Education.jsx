import { useEffect, useState } from "react";
import { getEducation } from "../../services/api";
import "./Education.css";

function Education() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getEducation();

        setEducation(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Education API Error:", err);

        setError(
          "Unable to load education data. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  return (
    <section
      className="education"
      id="education"
    >
      <div className="education-container">

        {/* =================================================
            SECTION HEADING
            ================================================= */}

        <div className="education-heading">
          <div className="education-heading-line" />

          <h2>Education</h2>
        </div>


        {/* =================================================
            INTRO
            ================================================= */}

        <p className="education-intro">
          My academic journey and the experiences that
          have shaped my foundation in computer science.
        </p>


        {/* =================================================
            LOADING
            ================================================= */}

        {loading && (
          <div className="education-state">
            <span className="education-state-dot" />
            <p>Loading education...</p>
          </div>
        )}


        {/* =================================================
            ERROR
            ================================================= */}

        {!loading && error && (
          <div className="education-state education-error">
            <span className="education-state-dot" />
            <p>{error}</p>
          </div>
        )}


        {/* =================================================
            EDUCATION DATA
            ================================================= */}

        {!loading && !error && (
          <>
            {education.length === 0 ? (
              <div className="education-state">
                <span className="education-state-dot" />

                <p>
                  No education records found.
                </p>
              </div>
            ) : (
              <div className="education-list">

                {education.map((item) => (
                  <article
                    className="education-card"
                    key={item.id}
                  >

                    {/* =================================================
                        CARD TOP
                        ================================================= */}

                    <div className="education-card-top">

                      <div className="education-card-title">

                        <span className="education-label">
                          EDUCATION
                        </span>

                        <h3>
                          {item.degree}
                        </h3>

                        <h4>
                          {item.institution}
                        </h4>

                      </div>


                      {/* Duration */}

                      {(item.start_year || item.end_year) && (
                        <div className="education-duration">
                          <span className="duration-label">
                            DURATION
                          </span>

                          <span className="duration-value">
                            {item.start_year || "N/A"}
                            {" — "}
                            {item.end_year || "Present"}
                          </span>
                        </div>
                      )}

                    </div>


                    {/* =================================================
                        DESCRIPTION
                        ================================================= */}

                    {item.description && (
                      <p className="education-description">
                        {item.description}
                      </p>
                    )}


                    {/* =================================================
                        GRADE
                        ================================================= */}

                    {item.grade && (
                      <div className="education-grade">
                        <span className="grade-label">
                          GRADE
                        </span>

                        <span className="grade-value">
                          {item.grade}
                        </span>
                      </div>
                    )}

                  </article>
                ))}

              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}

export default Education;