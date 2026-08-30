import { useEffect, useState } from "react";
import { getCodingStats } from "../../services/api";
import "./LeetCodeStats.css";

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
          throw new Error("LeetCode profile not found");
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

      {/* ================= HEADER ================= */}

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


      {/* ================= LOADING ================= */}

      {loading && (
        <div className="leetcode-note">
          Loading LeetCode statistics...
        </div>
      )}


      {/* ================= ERROR ================= */}

      {!loading && error && (
        <div className="leetcode-note">
          {error}
        </div>
      )}


      {/* ================= STATISTICS ================= */}

      {!loading && !error && stats && (
        <>
          {/* TOTAL SOLVED */}

          <div className="leetcode-total">

            <span>
              Problems Solved
            </span>

            <strong>
              {stats.problems_solved ?? 0}
            </strong>

          </div>


          {/* DIFFICULTY STATS */}

          <div className="leetcode-difficulty">

            {/* EASY */}

            <div className="difficulty-card">

              <span>
                Easy
              </span>

              <strong>
                {stats.easy ?? 0}
              </strong>

            </div>


            {/* MEDIUM */}

            <div className="difficulty-card">

              <span>
                Medium
              </span>

              <strong>
                {stats.medium ?? 0}
              </strong>

            </div>


            {/* HARD */}

            <div className="difficulty-card">

              <span>
                Hard
              </span>

              <strong>
                {stats.hard ?? 0}
              </strong>

            </div>

          </div>


          {/* OTHER STATS */}

          <div className="leetcode-stats">

            {/* PROFILE */}

            <div className="leetcode-stat">

              <span>
                Profile
              </span>

              <strong>
                ✓
              </strong>

            </div>


            {/* PLATFORM */}

            <div className="leetcode-stat">

              <span>
                Platform
              </span>

              <strong>
                {stats.platform || "LeetCode"}
              </strong>

            </div>


            {/* RATING */}

            <div className="leetcode-stat">

              <span>
                Rating
              </span>

              <strong>
                {stats.rating || "—"}
              </strong>

            </div>

          </div>


          {/* FOOTER */}

          <div className="leetcode-note">
            Live LeetCode statistics.
          </div>

        </>
      )}

    </div>
  );
}

export default LeetCodeStats;