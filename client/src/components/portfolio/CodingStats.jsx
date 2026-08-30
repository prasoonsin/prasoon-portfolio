import GitHubStats from "./GitHubStats";
import LeetCodeStats from "./LeetCodeStats";

function CodingStats() {
  return (
    <section
      className="coding-stats"
      id="coding-stats"
    >
      <div className="coding-stats-container">

        {/* =================================================
            SECTION HEADING
            ================================================= */}

        <div className="coding-stats-heading">
          <div className="coding-stats-heading-line" />

          <h2>Coding Profiles</h2>
        </div>


        {/* =================================================
            INTRODUCTION
            ================================================= */}

        <p className="coding-stats-intro">
          My coding activity, open-source work and
          problem-solving progress.
        </p>


        {/* =================================================
            CODING PLATFORMS
            ================================================= */}

        <div className="coding-stats-grid">
          <div className="coding-profile-card">
            <GitHubStats />
          </div>

          <div className="coding-profile-card">
            <LeetCodeStats />
          </div>
        </div>

      </div>
    </section>
  );
}

export default CodingStats;