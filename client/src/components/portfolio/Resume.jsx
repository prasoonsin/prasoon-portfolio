function Resume() {
  return (
    <section
      className="resume"
      id="resume"
    >
      <div className="resume-container">

        {/* Section Heading */}

        <div className="section-heading">
          <span></span>
          <h2>Resume</h2>
        </div>


        {/* Resume Card */}

        <div className="resume-card">

          {/* Left Side */}

          <div className="resume-content">

            <span className="resume-label">
              MY RESUME
            </span>

            <h3>
              Let's build something
              <span> meaningful.</span>
            </h3>

            <p>
              Explore my education, technical skills, projects,
              experience and other professional details in my resume.
            </p>


            {/* Resume Buttons */}

            <div className="resume-buttons">

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="resume-primary-btn"
              >
                View Resume
              </a>

              <a
                href="/resume.pdf"
                download="Prasoon-Singh-Resume.pdf"
                className="resume-secondary-btn"
              >
                Download PDF
              </a>

            </div>

          </div>


          {/* Right Side */}

          <div className="resume-preview">

            <div className="resume-paper">

              <div className="paper-line large"></div>

              <div className="paper-line medium"></div>

              <div className="paper-line small"></div>


              <div className="paper-section"></div>


              <div className="paper-lines">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>


              <div className="paper-section"></div>


              <div className="paper-lines">
                <span></span>
                <span></span>
                <span></span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Resume;