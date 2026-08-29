import { useEffect, useState } from "react";
import { getProjects } from "../services/api";
import ProjectCard from "../components/portfolio/ProjectCard";
import "./Projects.css";
import "../styles/PortfolioPages.css";
function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <section className="projects" id="projects">
      <div className="projects-container">

        <div className="section-heading">
          <span>05.</span>
          <h2>Projects</h2>
        </div>

        <p className="projects-intro">
          Some of the projects I've built while learning,
          experimenting and solving real-world problems.
        </p>

        {loading && (
          <p>Loading projects...</p>
        )}

        {!loading && error && (
          <p>{error}</p>
        )}

        {!loading &&
          !error &&
          projects.length > 0 && (

            <div className="projects-grid">

              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={{
                    ...project,
                    github: project.github_url,
                    live: project.live_url,
                    type: project.type || "Full Stack Project",
                    technologies: project.technologies || []
                  }}
                />
              ))}

            </div>
          )}

        {!loading &&
          !error &&
          projects.length === 0 && (
            <p>No projects found.</p>
          )}

      </div>
    </section>
  );
}

export default Projects;