import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProjectById } from "../services/api";
import "../styles/PortfolioPages.css";
function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await getProjectById(id);
        setProject(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load project.");
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  if (loading) {
    return <p>Loading project...</p>;
  }

  if (error || !project) {
    return (
      <section className="project-details">
        <p>{error || "Project not found."}</p>
        <Link to="/#projects">
          ← Back to Projects
        </Link>
      </section>
    );
  }

  return (
    <section className="project-details">

      <div className="project-details-container">

        <Link
          to="/#projects"
          className="back-link"
        >
          ← Back to Projects
        </Link>

        {project.image && (
          <div className="project-details-image">
            <img
              src={project.image}
              alt={project.title}
            />
          </div>
        )}

        <span className="project-details-label">
          PROJECT
        </span>

        <h1>{project.title}</h1>

        <p className="project-details-description">
          {project.description}
        </p>

        <div className="project-details-links">

          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub →
            </a>
          )}

          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Demo →
            </a>
          )}

        </div>

      </div>

    </section>
  );
}

export default ProjectDetails;