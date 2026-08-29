function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-container">

        {/* Left Side */}
        <div className="hero-content">

          <p className="hero-intro">
            Hi, I'm <span>Prasoon</span>
          </p>

          <h1>
            Full Stack Developer
            <br />
            & Computer Science Student
          </h1>

          <p className="hero-description">
            I build modern, responsive and scalable web applications
            using clean code and practical technologies.
          </p>


          {/* Main Buttons */}

          <div className="hero-buttons">

            <a
              href="#projects"
              className="primary-btn"
            >
              View My Work
            </a>

            <a
              href="/resume.pdf"
              className="secondary-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume
            </a>

          </div>


          {/* Social Links */}

          <div className="hero-socials">

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
              href="https://leetcode.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LeetCode
            </a>

          </div>

        </div>


        {/* Right Side */}

        <div className="hero-visual">

          <div className="hero-card">

            {/* Code Window Header */}

            <div className="code-header">
              <span></span>
              <span></span>
              <span></span>
            </div>


            {/* Code */}

            <div className="code-content">

              <p>
                <span className="code-purple">
                  const
                </span>{" "}
                developer = {"{"}
              </p>

              <p className="code-indent">
                name:{" "}
                <span className="code-green">
                  "Prasoon"
                </span>,
              </p>

              <p className="code-indent">
                role:{" "}
                <span className="code-green">
                  "Full Stack Developer"
                </span>,
              </p>

              <p className="code-indent">
                passion:{" "}
                <span className="code-green">
                  "Building"
                </span>
              </p>

              <p>
                {"}"}
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* Scroll Indicator */}

      <div className="scroll-indicator">

        <span>
          Scroll to explore
        </span>

        <div className="scroll-line"></div>

      </div>

    </section>
  );
}

export default Hero;