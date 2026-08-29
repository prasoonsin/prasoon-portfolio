import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="not-found">

      <div className="not-found-container">

        <span>404</span>

        <h1>Page Not Found</h1>

        <p>
          The page you're looking for doesn't exist.
        </p>

        <Link to="/">
          ← Back to Home
        </Link>

      </div>

    </section>
  );
}

export default NotFound;