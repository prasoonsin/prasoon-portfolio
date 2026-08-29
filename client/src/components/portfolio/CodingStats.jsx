import GitHubStats from "./GitHubStats";
import LeetCodeStats from "./LeetCodeStats";

function CodingStats() {
  return (
    <section
      className="coding-stats"
      id="coding-stats"
    >
      <div className="coding-stats-container">

        {/* Section Heading */}

        <div className="section-heading">
          <span>07.</span>
          <h2>Coding Profiles</h2>
        </div>


        {/* Introduction */}

        <p className="coding-stats-intro">
          My coding activity, open-source work and
          problem-solving progress.
        </p>


        {/* Coding Platforms */}

        <div className="coding-stats-grid">

          <GitHubStats />

          <LeetCodeStats />

        </div>

      </div>
    </section>
  );
}

export default CodingStats;