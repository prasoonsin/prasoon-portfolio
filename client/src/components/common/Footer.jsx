function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>
          © {new Date().getFullYear()} Prasoon Singh. All rights reserved.
        </p>

        <p className="footer-text">
          Built with React.js, Node.js & MySQL
        </p>
      </div>
    </footer>
  );
}

export default Footer;