function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-container">

        {/* =================================================
            LEFT CONTENT
            ================================================= */}

        <div className="hero-content">

          {/* Intro */}
          <div className="hero-intro">
            <span className="intro-line"></span>

            <span>
              Hi, I'm <strong>Prasoon</strong>
            </span>
          </div>


          {/* Main Heading */}
          <h1>
            Computer Science Student
            <span className="hero-title-accent">
              {" "} & Problem Solver
            </span>
          </h1>


          {/* Description */}
          <p className="hero-description">
            I’m passionate about building software, solving problems,
            and turning ideas into practical solutions through code.
          </p>


          {/* =================================================
              BUTTONS
              ================================================= */}

          <div className="hero-buttons">

            <a
              href="#projects"
              className="primary-btn"
            >
              <span>View My Work</span>
              <span className="btn-arrow">↗</span>
            </a>


            <a
              href="/resume.pdf"
              className="secondary-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Download Resume</span>
              <span className="btn-arrow">↓</span>
            </a>

          </div>


          {/* =================================================
              SOCIAL LINKS
              ================================================= */}

          <div className="hero-socials">

            <span className="social-label">
              FIND ME
            </span>

            <div className="social-links">

              <a
                href="https://github.com/prasoonsin"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>


              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>


              <a
                href="https://leetcode.com/u/fjTAMtDvp0/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LeetCode
              </a>

            </div>

          </div>

        </div>


        {/* =================================================
            RIGHT SIDE - PROFILE IMAGE
            ================================================= */}

        <div className="hero-visual">

          {/* Soft background glow */}
          <div className="hero-glow"></div>


          {/* Decorative frame */}
          <div className="profile-frame">

            <div className="profile-corner profile-corner-top"></div>

            <div className="profile-corner profile-corner-bottom"></div>


            {/* Profile Image */}
            <div className="profile-wrapper">

              <img
                src="/profile.png"
                alt="Prasoon"
                className="profile-image"
              />

            </div>


            {/* Small caption */}
            <div className="profile-caption">

              <span className="caption-line"></span>

              <span>
                FULL STACK DEVELOPER
              </span>

              <span className="caption-dot"></span>

            </div>

          </div>

        </div>

      </div>


      {/* =================================================
          SCROLL INDICATOR
          ================================================= */}

      <div className="scroll-indicator">

        <span>
          Scroll to explore
        </span>

        <div className="scroll-line">
          <span></span>
        </div>

      </div>


      {/* =================================================
          DECORATIVE DOTS
          ================================================= */}

      <span className="floating-dot dot-one"></span>

      <span className="floating-dot dot-two"></span>

    </section>
  );
}

export default Hero;