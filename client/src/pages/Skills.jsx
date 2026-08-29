import { useEffect, useState } from "react";
import { getSkills } from "../services/api";
import "./Skills.css";
import "../styles/PortfolioPages.css";
function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const data = await getSkills();
        setSkills(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Unable to load skills.");
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  const categories = skills.reduce((result, skill) => {
    const category = skill.category || "Other";

    if (!result[category]) {
      result[category] = [];
    }

    if (skill.name) {
      result[category].push(skill.name);
    }

    return result;
  }, {});

  return (
    <section className="skills" id="skills">
      <div className="skills-container">

        <div className="section-heading">
          <span>04.</span>
          <h2>Skills</h2>
        </div>

        <p className="skills-intro">
          Technologies and tools I use to build, develop and
          deploy modern applications.
        </p>

        {loading && <p>Loading skills...</p>}

        {!loading && error && <p>{error}</p>}

        {!loading &&
          !error &&
          skills.length > 0 && (

            <div className="skills-grid">

              {Object.entries(categories).map(
                ([category, categorySkills]) => (

                  <div
                    className="skill-category"
                    key={category}
                  >

                    <div className="skill-category-header">
                      <span className="skill-number">
                        //
                      </span>

                      <h3>{category}</h3>
                    </div>

                    <div className="skill-list">

                      {categorySkills.map((skill) => (
                        <span
                          className="skill-item"
                          key={`${category}-${skill}`}
                        >
                          {skill}
                        </span>
                      ))}

                    </div>

                  </div>
                )
              )}

            </div>
          )}

        {!loading &&
          !error &&
          skills.length === 0 && (
            <p>No skills found.</p>
          )}

      </div>
    </section>
  );
}

export default Skills;