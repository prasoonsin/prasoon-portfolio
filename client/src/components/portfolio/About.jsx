import "./about.css";

function About() {
  const highlights = [
    {
      title: "Full Stack Development",
      description:
        "Building complete web applications from frontend interfaces to backend APIs and databases.",
    },
    {
      title: "Problem Solving",
      description:
        "Practising Data Structures and Algorithms to strengthen logical thinking and problem-solving skills.",
    },
    {
      title: "Continuous Learning",
      description:
        "Exploring new technologies and continuously improving my development and software engineering skills.",
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
              I'm a Computer Science student and Full Stack Developer
              interested in building modern, scalable and user-friendly
              web applications.
            </p>

            <p>
              I enjoy working with technologies like React, Node.js,
              Java, Python and databases while continuously improving
              my problem-solving and development skills.
            </p>

            <p>
              My goal is to build software that is not only functional,
              but also clean, secure and enjoyable to use.
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