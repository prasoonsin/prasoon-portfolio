function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Top Section */}
        <div className="footer-top">

          {/* Brand */}
          <div className="footer-brand">
            <h3>
              Prasoon<span>.</span>
            </h3>

            <p>
              Full Stack Developer & Computer Science Student
            </p>
          </div>


          {/* Social Links */}
          <div className="footer-socials">

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


        {/* Divider */}
        <div className="footer-divider"></div>


        {/* Bottom Section */}
        <div className="footer-bottom">

          <p className="footer-copyright">
            © {currentYear} Prasoon Singh. All rights reserved.
          </p>

          <p className="footer-text">
            Built with React.js, Node.js & MySQL
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;