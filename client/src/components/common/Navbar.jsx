import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    // Close mobile menu after clicking a link
    setMenuOpen(false);
  };

  const navigationItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "certifications", label: "Certifications" },
    { id: "coding-stats", label: "Coding" },
    { id: "blog", label: "Blog" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="navbar">

      <div className="navbar-container">

        {/* Logo */}

        <button
          className="navbar-logo"
          onClick={() => scrollToSection("home")}
          aria-label="Go to home"
        >
          <span>&lt;</span>
          Prasoon
          <span>/&gt;</span>
        </button>


        {/* Desktop Navigation */}

        <div className="navbar-links">

          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}

          <button
            className="resume-button"
            onClick={() => scrollToSection("resume")}
          >
            Resume
          </button>

        </div>


        {/* Mobile Menu Button */}

        <button
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>


      {/* Mobile Navigation */}

      <div
        className={`mobile-menu ${
          menuOpen ? "mobile-menu-open" : ""
        }`}
      >

        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
          >
            {item.label}
          </button>
        ))}

        <button
          className="mobile-resume-button"
          onClick={() => scrollToSection("resume")}
        >
          Resume
        </button>

      </div>

    </nav>
  );
}

export default Navbar;