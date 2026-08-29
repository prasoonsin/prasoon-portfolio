import { useEffect, useState } from "react";

function GitHubStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const username = "prasoonsin";

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://api.github.com/users/${username}`
        );

        if (!response.ok) {
          throw new Error(
            `GitHub API returned ${response.status}`
          );
        }

        const data = await response.json();

        setStats({
          repositories: data.public_repos ?? 0,
          followers: data.followers ?? 0,
          following: data.following ?? 0,
        });
      } catch (err) {
        console.error("GitHub API Error:", err);

        setError(
          "Unable to load GitHub statistics."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);

  return (
    <div className="github-stats-card">

      {/* Header */}

      <div className="stats-header">

        <div>
          <span className="stats-label">
            GITHUB
          </span>

          <h3>
            Code & Contributions
          </h3>
        </div>

        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Profile →
        </a>

      </div>


      {/* Loading */}

      {loading && (
        <div className="github-note">
          Loading GitHub statistics...
        </div>
      )}


      {/* Error */}

      {!loading && error && (
        <div className="github-note">
          {error}
        </div>
      )}


      {/* Statistics */}

      {!loading && !error && stats && (
        <>
          <div className="github-stats">

            <div className="github-stat">
              <span>Repositories</span>
              <strong>
                {stats.repositories}
              </strong>
            </div>

            <div className="github-stat">
              <span>Followers</span>
              <strong>
                {stats.followers}
              </strong>
            </div>

            <div className="github-stat">
              <span>Following</span>
              <strong>
                {stats.following}
              </strong>
            </div>

          </div>

          <div className="github-note">
            Live statistics from GitHub.
          </div>
        </>
      )}

    </div>
  );
}

export default GitHubStats;