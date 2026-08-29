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

        {/* Section Heading */}

        <div className="experience-heading">
          <span>03.</span>
          <h2>Experience</h2>
        </div>


        {/* Loading */}

        {loading && (
          <p className="experience-message">
            Loading experience...
          </p>
        )}


        {/* Error */}

        {!loading && error && (
          <p className="experience-message">
            {error}
          </p>
        )}


        {/* Experience Data */}

        {!loading && !error && (
          <div className="experience-list">

            {experience.length === 0 ? (
              <p className="experience-message">
                No experience records found.
              </p>
            ) : (
              experience.map((item) => (
                <article
                  className="experience-card"
                  key={item.id}
                >

                  {/* Experience Top */}

                  <div className="experience-top">

                    <div>

                      <h3>
                        {item.position}
                      </h3>

                      <h4>
                        {item.company}
                      </h4>

                    </div>


                    {/* Date */}

                    {getDateRange(item) && (
                      <span className="experience-date">
                        {getDateRange(item)}
                      </span>
                    )}

                  </div>


                  {/* Description */}

                  {item.description && (
                    <div className="experience-body">

                      <p className="experience-intro">
                        {item.description}
                      </p>

                    </div>
                  )}


                  {/* Technologies */}

                  {item.technologies && (
                    <div className="experience-tech">

                      {Array.isArray(item.technologies) ? (
                        item.technologies.map((technology) => (
                          <span key={technology}>
                            {technology}
                          </span>
                        ))
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

export default Experience;