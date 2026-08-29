import { useEffect, useState } from "react";
import { getExperience } from "../services/api";
import "./Experience.css";
import "../styles/PortfolioPages.css";
function Experience() {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadExperience = async () => {
      try {
        const data = await getExperience();
        setExperience(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load experience.");
      } finally {
        setLoading(false);
      }
    };

    loadExperience();
  }, []);

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      month: "short",
      year: "numeric"
    });
  };

  return (
    <section
      className="experience-section"
      id="experience"
    >
      <div className="experience-container">

        <div className="experience-heading">
          <span>03.</span>
          <h2>Experience</h2>
        </div>

        {loading && (
          <p>Loading experience...</p>
        )}

        {!loading && error && (
          <p>{error}</p>
        )}

        {!loading &&
          !error &&
          experience.length > 0 && (

            <div className="experience-list">

              {experience.map((item) => (
                <article
                  className="experience-card"
                  key={item.id}
                >

                  <div className="experience-top">

                    <div>
                      <h3>{item.position}</h3>
                      <h4>{item.company}</h4>
                    </div>

                    <span className="experience-date">
                      {item.is_current
                        ? "Present"
                        : `${formatDate(item.start_date)} - ${formatDate(item.end_date)}`}
                    </span>

                  </div>

                  {item.description && (
                    <p className="experience-intro">
                      {item.description}
                    </p>
                  )}

                </article>
              ))}

            </div>
          )}

        {!loading &&
          !error &&
          experience.length === 0 && (
            <p>No experience records found.</p>
          )}

      </div>
    </section>
  );
}

export default Experience;