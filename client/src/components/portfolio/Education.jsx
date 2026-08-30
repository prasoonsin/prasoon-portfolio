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

        {/* Section Heading */}

        <div className="section-heading">
          <span></span>
          <h2>Education</h2>
        </div>


        {/* Loading */}

        {loading && (
          <p className="education-message">
            Loading education...
          </p>
        )}


        {/* Error */}

        {!loading && error && (
          <p className="education-message">
            {error}
          </p>
        )}


        {/* Education Data */}

        {!loading && !error && (
          <div className="education-list">

            {education.length === 0 ? (
              <p className="education-message">
                No education records found.
              </p>
            ) : (
              education.map((item) => (
                <article
                  className="education-card"
                  key={item.id}
                >

                  {/* Degree */}

                  <h3>
                    {item.degree}
                  </h3>


                  {/* Institution */}

                  <h4>
                    {item.institution}
                  </h4>


                  {/* Duration */}

                  {(item.start_year || item.end_year) && (
                    <p className="education-duration">
                      {item.start_year || "N/A"} -{" "}
                      {item.end_year || "Present"}
                    </p>
                  )}


                  {/* Description */}

                  {item.description && (
                    <p className="education-description">
                      {item.description}
                    </p>
                  )}


                  {/* Grade */}

                  {item.grade && (
                    <p className="education-grade">
                      <strong>Grade:</strong>{" "}
                      {item.grade}
                    </p>
                  )}

                </article>
              ))
            )}

          </div>
        )}

      </div>
    </section>
  );
}

export default Education;