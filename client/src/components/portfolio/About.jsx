import "./about.css";

function About() {
  const highlights = [
    {
      title: "Full Stack Development",
      description:
        "Building complete web applications with modern frontend technologies, backend APIs, and databases.",
    },
    {
      title: "Problem Solving",
      description:
        "Strengthening logical thinking through Data Structures, Algorithms, and consistent problem-solving practice.",
    },
    {
      title: "Continuous Learning",
      description:
        "Exploring new technologies, building projects, and continuously improving my software engineering skills.",
    },
  ];

  return (
    <section id="about" className="about-section">
      <div className="about-container">

        {/* Section Heading */}
        <div className="about-heading">
          <div className="heading-line" />
          <h2>About Me</h2>
        </div>

        {/* Main Content */}
        <div className="about-content">

          {/* About Text */}
          <div className="about-text">
            <span className="about-label">ABOUT</span>

            <h3>
              Building ideas into{" "}
              <span>real-world applications.</span>
            </h3>

            <p>
              I'm a Computer Science student focused on building practical
              software and strengthening my skills in full-stack development.
            </p>

            <p>
              I work with technologies such as React, Node.js, Java, Python,
              and SQL, while developing a strong foundation in Data Structures,
              Algorithms, and software engineering.
            </p>

            <p>
              I enjoy turning ideas into functional, well-structured
              applications and continuously learning through projects,
              problem solving, and hands-on development.
            </p>
          </div>

          {/* Highlights */}
          <div className="about-info">
            {highlights.map((item) => (
              <article
                className="info-card"
                key={item.title}
              >
                <div className="info-card-top">
                  <span className="info-dot" />

                  <span className="info-tag">
                    EXPERTISE
                  </span>
                </div>

                <div className="info-card-content">
                  <h4>{item.title}</h4>

                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;