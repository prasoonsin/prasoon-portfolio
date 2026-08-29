import { useEffect, useState } from "react";
import { getCodingStats } from "../../services/api";

function LeetCodeStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCodingStats = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getCodingStats();

        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("No coding statistics found");
        }

        const leetCode = data.find(
          (item) =>
            item.platform?.toLowerCase() === "leetcode"
        );

        if (!leetCode) {
          throw new Error(
            "LeetCode profile not found"
          );
        }

        setStats(leetCode);
      } catch (err) {
        console.error(
          "Coding Stats Error:",
          err
        );

        setError(
          "Unable to load LeetCode statistics."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCodingStats();
  }, []);

  return (
    <div className="leetcode-stats-card">

      {/* Header */}

      <div className="stats-header">

        <div>

          <span className="stats-label">
            LEETCODE
          </span>

          <h3>
            Problem Solving
          </h3>

        </div>

        <a
          href="https://leetcode.com/u/fjTAMtDvp0/"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Profile →
        </a>

      </div>


      {/* Loading */}

      {loading && (
        <div className="leetcode-note">
          Loading LeetCode statistics...
        </div>
      )}


      {/* Error */}

      {!loading && error && (
        <div className="leetcode-note">
          {error}
        </div>
      )}


      {/* Statistics */}

      {!loading && !error && stats && (
        <>
          <div className="leetcode-stats">

            {/* Problems Solved */}

            <div className="leetcode-stat">

              <span>
                Total Solved
              </span>

              <strong>
                {stats.problems_solved ?? 0}
              </strong>

            </div>


            {/* Profile */}

            <div className="leetcode-stat">

              <span>
                Profile
              </span>

              <strong>
                ✓
              </strong>

            </div>


            {/* Platform */}

            <div className="leetcode-stat">

              <span>
                Platform
              </span>

              <strong>
                {stats.platform || "LeetCode"}
              </strong>

            </div>


            {/* Rating */}

            <div className="leetcode-stat">

              <span>
                Rating
              </span>

              <strong>
                {stats.rating ?? "—"}
              </strong>

            </div>

          </div>


          <div className="leetcode-note">
            LeetCode profile connected successfully.
          </div>
        </>
      )}

    </div>
  );
}

export default LeetCodeStats;