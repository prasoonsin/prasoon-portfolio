function Resume() {
  return (
    <section
      className="resume"
      id="resume"
    >
      <div className="resume-container">

        {/* =================================================
            SECTION HEADING
            ================================================= */}

        <div className="resume-heading">
          <div className="resume-heading-line" />

          <h2>Resume</h2>
        </div>


        {/* =================================================
            RESUME CARD
            ================================================= */}

        <div className="resume-card">

          {/* =================================================
              CONTENT
              ================================================= */}

          <div className="resume-content">

            <span className="resume-label">
              MY RESUME
            </span>

            <h3>
              A closer look at my
              <span> journey.</span>
            </h3>

            <p>
              Explore my education, technical skills, projects,
              experience and other professional details in my
              resume.
            </p>


            {/* =================================================
                BUTTONS
                ================================================= */}

            <div className="resume-buttons">

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="resume-primary-btn"
              >
                <span>View Resume</span>
                <span className="resume-btn-arrow">
                  ↗
                </span>
              </a>


              <a
                href="/resume.pdf"
                download="Prasoon-Singh-Resume.pdf"
                className="resume-secondary-btn"
              >
                <span>Download PDF</span>
                <span className="resume-btn-arrow">
                  ↓
                </span>
              </a>

            </div>

          </div>


          {/* =================================================
              RESUME PREVIEW
              ================================================= */}

          <div className="resume-preview">

            <div className="resume-preview-glow" />

            <div className="resume-paper">

              {/* Paper Header */}

              <div className="paper-header">

                <div className="paper-profile" />

                <div className="paper-header-lines">
                  <div className="paper-line paper-title" />
                  <div className="paper-line paper-subtitle" />
                </div>

              </div>


              {/* Divider */}

              <div className="paper-divider" />


              {/* Section */}

              <div className="paper-section-title" />

              <div className="paper-lines">
                <span />
                <span />
                <span />
                <span />
              </div>


              {/* Section */}

              <div className="paper-section-title second" />

              <div className="paper-lines">
                <span />
                <span />
                <span />
              </div>


              {/* Section */}

              <div className="paper-section-title third" />

              <div className="paper-lines">
                <span />
                <span />
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Resume;