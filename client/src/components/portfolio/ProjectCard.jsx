function ProjectCard({ project }) {
  if (!project) {
    return null;
  }

  return (
    <article className="project-card">

      {/* Project Image */}

      {project.image && (
        <div className="project-image">
          <img
            src={project.image}
            alt={project.title || "Project"}
          />
        </div>
      )}


      {/* Project Content */}

      <div className="project-content">

        <div className="project-top">

          {/* Project Type */}

          {project.type && (
            <span className="project-type">
              {project.type}
            </span>
          )}


          {/* Project Links */}

          <div className="project-links">

            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                GitHub
              </a>
            )}

            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live Demo"
              >
                Live
              </a>
            )}

          </div>

        </div>


        {/* Title */}

        <h3>
          {project.title}
        </h3>


        {/* Description */}

        {project.description && (
          <p className="project-description">
            {project.description}
          </p>
        )}


        {/* Technologies */}

        {project.technologies && (
          <div className="project-tech">

            {Array.isArray(project.technologies)
              ? project.technologies.map((technology) => (
                  <span key={technology}>
                    {technology}
                  </span>
                ))
              : String(project.technologies)
                  .split(",")
                  .map((technology) => (
                    <span key={technology.trim()}>
                      {technology.trim()}
                    </span>
                  ))}

          </div>
        )}

      </div>

    </article>
  );
}

export default ProjectCard;