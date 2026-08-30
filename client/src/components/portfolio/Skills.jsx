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


  // =====================================================
  // GROUP SKILLS BY CATEGORY
  // =====================================================

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

        {/* =================================================
            SECTION HEADING
            ================================================= */}

        <div className="skills-heading">
          <div className="skills-heading-line" />

          <h2>Skills</h2>
        </div>


        {/* =================================================
            INTRODUCTION
            ================================================= */}

        <p className="skills-intro">
          Technologies and tools I use to build, develop and
          deploy modern applications.
        </p>


        {/* =================================================
            LOADING
            ================================================= */}

        {loading && (
          <div className="skills-state">
            <span className="skills-state-dot" />

            <p>Loading skills...</p>
          </div>
        )}


        {/* =================================================
            ERROR
            ================================================= */}

        {!loading && error && (
          <div className="skills-state skills-error">
            <span className="skills-state-dot" />

            <p>{error}</p>
          </div>
        )}


        {/* =================================================
            SKILL CATEGORIES
            ================================================= */}

        {!loading &&
          !error &&
          skills.length > 0 && (
            <div className="skills-grid">

              {Object.entries(skillCategories).map(
                ([category, categorySkills]) => (
                  <article
                    className="skill-category"
                    key={category}
                  >

                    {/* Category Header */}

                    <div className="skill-category-header">

                      <span className="skill-category-dot" />

                      <h3>
                        {category}
                      </h3>

                      <span className="skill-count">
                        {categorySkills.length}
                      </span>

                    </div>


                    {/* Divider */}

                    <div className="skill-category-divider" />


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

                  </article>
                )
              )}

            </div>
          )}


        {/* =================================================
            EMPTY STATE
            ================================================= */}

        {!loading &&
          !error &&
          skills.length === 0 && (
            <div className="skills-state">
              <span className="skills-state-dot" />

              <p>No skills found.</p>
            </div>
          )}

      </div>
    </section>
  );
}

export default Skills;