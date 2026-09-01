import { useEffect, useState } from "react";

function GitHubStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const username = "prasoonsin";
  const cacheKey = `github-stats-${username}`;
  const cacheDuration = 10 * 60 * 1000; // 10 minutes

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        setLoading(true);

        // ----------------------------------------
        // 1. Check cached data first
        // ----------------------------------------

        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
          const cached = JSON.parse(cachedData);

          const isFresh =
            Date.now() - cached.timestamp < cacheDuration;

          if (isFresh) {
            setStats(cached.stats);
            setLoading(false);
            return;
          }
        }

        // ----------------------------------------
        // 2. Fetch GitHub profile
        // ----------------------------------------

        const response = await fetch(
          `https://api.github.com/users/${username}`,
          {
            headers: {
              Accept: "application/vnd.github+json",
            },
          }
        );

        // ----------------------------------------
        // 3. Handle rate limit
        // ----------------------------------------

        if (response.status === 403) {
          throw new Error("GitHub API rate limit reached");
        }

        // ----------------------------------------
        // 4. Handle user not found
        // ----------------------------------------

        if (response.status === 404) {
          throw new Error("GitHub user not found");
        }

        if (!response.ok) {
          throw new Error(
            `GitHub API returned ${response.status}`
          );
        }

        const data = await response.json();

        // ----------------------------------------
        // 5. Create statistics object
        // ----------------------------------------

        const newStats = {
          repositories: data.public_repos ?? 0,
          followers: data.followers ?? 0,
          following: data.following ?? 0,
        };

        setStats(newStats);

        // ----------------------------------------
        // 6. Save data in browser cache
        // ----------------------------------------

        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            stats: newStats,
            timestamp: Date.now(),
          })
        );
      } catch (error) {
        console.error("GitHub API Error:", error);

        // ----------------------------------------
        // 7. Use old cached data if API fails
        // ----------------------------------------

        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
          const cached = JSON.parse(cachedData);

          setStats(cached.stats);
        } else {
          setStats(null);
        }
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


      {/* Statistics */}
      {!loading && stats && (
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


      {/* API unavailable */}
      {!loading && !stats && (
        <div className="github-note">
          GitHub statistics are temporarily unavailable.
        </div>
      )}

    </div>
  );
}

export default GitHubStats;