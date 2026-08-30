import { useEffect, useState } from "react";
import { getSkills } from "../../services/api";
import "./Skills.css";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getSkills();

        setSkills(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Skills API Error:", err);

        setError(
          "Unable to load skills. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);


  // Group skills by category

  const skillCategories = skills.reduce(
    (categories, skill) => {
      const category = skill.category || "Other";

      if (!categories[category]) {
        categories[category] = [];
      }

      if (skill.name) {
        categories[category].push(skill.name);
      }

      return categories;
    },
    {}
  );


  return (
    <section
      className="skills"
      id="skills"
    >
      <div className="skills-container">

        {/* Section Heading */}

        <div className="section-heading">
          <span></span>
          <h2>Skills</h2>
        </div>


        {/* Introduction */}

        <p className="skills-intro">
          Technologies and tools I use to build, develop and
          deploy modern applications.
        </p>


        {/* Loading */}

        {loading && (
          <p className="skills-message">
            Loading skills...
          </p>
        )}


        {/* Error */}

        {!loading && error && (
          <p className="skills-message">
            {error}
          </p>
        )}


        {/* Skills */}

        {!loading &&
          !error &&
          skills.length > 0 && (
            <div className="skills-grid">

              {Object.entries(skillCategories).map(
                ([category, categorySkills]) => (
                  <div
                    className="skill-category"
                    key={category}
                  >

                    {/* Category Header */}

                    <div className="skill-category-header">

                      <span className="skill-number">
                        //
                      </span>

                      <h3>
                        {category}
                      </h3>

                    </div>


                    {/* Skill List */}

                    <div className="skill-list">

                      {categorySkills.map(
                        (skill) => (
                          <span
                            className="skill-item"
                            key={`${category}-${skill}`}
                          >
                            {skill}
                          </span>
                        )
                      )}

                    </div>

                  </div>
                )
              )}

            </div>
          )}


        {/* Empty State */}

        {!loading &&
          !error &&
          skills.length === 0 && (
            <p className="skills-message">
              No skills found.
            </p>
          )}

      </div>
    </section>
  );
}

export default Skills;