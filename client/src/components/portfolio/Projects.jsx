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

        {/* Section Heading */}

        <div className="section-heading">
          <span>05.</span>
          <h2>Projects</h2>
        </div>


        {/* Introduction */}

        <p className="projects-intro">
          Some of the projects I've built while learning,
          experimenting and solving real-world problems.
        </p>


        {/* Loading */}

        {loading && (
          <p className="projects-message">
            Loading projects...
          </p>
        )}


        {/* Error */}

        {!loading && error && (
          <p className="projects-message">
            {error}
          </p>
        )}


        {/* Projects */}

        {!loading && !error && (
          <div className="projects-grid">

            {projects.length === 0 ? (
              <p className="projects-message">
                No projects found.
              </p>
            ) : (
              projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              ))
            )}

          </div>
        )}

      </div>
    </section>
  );
}

export default Projects;