import { useEffect, useState } from "react";
import { getProjects } from "../../services/api";
import ProjectCard from "./ProjectCard";
import "./Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProjects();

        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Projects API Error:", err);

        setError(
          "Unable to load projects. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section
      className="projects"
      id="projects"
    >
      <div className="projects-container">

        {/* =================================================
            SECTION HEADING
            ================================================= */}

        <div className="projects-heading">
          <div className="projects-heading-line" />

          <h2>Projects</h2>
        </div>


        {/* =================================================
            INTRODUCTION
            ================================================= */}

        <p className="projects-intro">
          Some of the projects I've built while learning,
          experimenting and solving real-world problems.
        </p>


        {/* =================================================
            LOADING
            ================================================= */}

        {loading && (
          <div className="projects-state">
            <span className="projects-state-dot" />

            <p>Loading projects...</p>
          </div>
        )}


        {/* =================================================
            ERROR
            ================================================= */}

        {!loading && error && (
          <div className="projects-state projects-error">
            <span className="projects-state-dot" />

            <p>{error}</p>
          </div>
        )}


        {/* =================================================
            PROJECTS
            ================================================= */}

        {!loading && !error && (
          <>
            {projects.length === 0 ? (
              <div className="projects-state">
                <span className="projects-state-dot" />

                <p>No projects found.</p>
              </div>
            ) : (
              <div className="projects-grid">

                {projects.map((project) => (
                  <div
                    className="project-wrapper"
                    key={project.id}
                  >
                    <ProjectCard
                      project={project}
                    />
                  </div>
                ))}

              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}

export default Projects;