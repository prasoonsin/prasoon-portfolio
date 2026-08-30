import { useEffect, useState } from "react";
import { getExperience } from "../../services/api";
import "./Experience.css";

function Experience() {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getExperience();

        setExperience(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Experience API Error:", err);

        setError(
          "Unable to load experience data. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      month: "short",
      year: "numeric",
    });
  };

  const getDateRange = (item) => {
    const startDate = formatDate(item.start_date);
    const endDate = formatDate(item.end_date);

    if (item.is_current) {
      return startDate
        ? `${startDate} - Present`
        : "Present";
    }

    if (startDate && endDate) {
      return `${startDate} - ${endDate}`;
    }

    if (startDate) {
      return startDate;
    }

    return "";
  };

  return (
    <section
      id="experience"
      className="experience-section"
    >
      <div className="experience-container">

        {/* =================================================
            SECTION HEADING
            ================================================= */}

        <div className="experience-heading">
          <div className="experience-heading-line" />

          <h2>Experience</h2>
        </div>


        {/* =================================================
            INTRO
            ================================================= */}

        <p className="experience-description">
          My professional experience, practical learning,
          and the technologies I've worked with along the way.
        </p>


        {/* =================================================
            LOADING
            ================================================= */}

        {loading && (
          <div className="experience-state">
            <span className="experience-state-dot" />
            <p>Loading experience...</p>
          </div>
        )}


        {/* =================================================
            ERROR
            ================================================= */}

        {!loading && error && (
          <div className="experience-state experience-error">
            <span className="experience-state-dot" />
            <p>{error}</p>
          </div>
        )}


        {/* =================================================
            EXPERIENCE DATA
            ================================================= */}

        {!loading && !error && (
          <>
            {experience.length === 0 ? (
              <div className="experience-state">
                <span className="experience-state-dot" />

                <p>
                  No experience records found.
                </p>
              </div>
            ) : (
              <div className="experience-list">

                {experience.map((item) => (
                  <article
                    className="experience-card"
                    key={item.id}
                  >

                    {/* =================================================
                        CARD TOP
                        ================================================= */}

                    <div className="experience-top">

                      <div className="experience-title-area">

                        <span className="experience-label">
                          EXPERIENCE
                        </span>

                        <h3>
                          {item.position}
                        </h3>

                        <h4>
                          {item.company}
                        </h4>

                      </div>


                      {/* =================================================
                          DATE
                          ================================================= */}

                      {getDateRange(item) && (
                        <div className="experience-date-box">

                          <span className="experience-date-label">
                            PERIOD
                          </span>

                          <span className="experience-date">
                            {getDateRange(item)}
                          </span>

                        </div>
                      )}

                    </div>


                    {/* =================================================
                        CURRENT STATUS
                        ================================================= */}

                    {item.is_current && (
                      <div className="experience-current">
                        <span className="current-dot" />
                        Currently working here
                      </div>
                    )}


                    {/* =================================================
                        DESCRIPTION
                        ================================================= */}

                    {item.description && (
                      <div className="experience-body">

                        <p>
                          {item.description}
                        </p>

                      </div>
                    )}


                    {/* =================================================
                        TECHNOLOGIES
                        ================================================= */}

                    {item.technologies && (
                      <div className="experience-tech-section">

                        <span className="experience-tech-label">
                          TECHNOLOGIES
                        </span>

                        <div className="experience-tech">

                          {Array.isArray(item.technologies) ? (
                            item.technologies.map(
                              (technology) => (
                                <span
                                  key={technology}
                                >
                                  {technology}
                                </span>
                              )
                            )
                          ) : (
                            String(item.technologies)
                              .split(",")
                              .map((technology) => (
                                <span
                                  key={technology.trim()}
                                >
                                  {technology.trim()}
                                </span>
                              ))
                          )}

                        </div>

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

export default Experience;