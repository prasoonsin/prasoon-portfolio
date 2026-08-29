import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const cards = [
    {
      title: "Education",
      description: "Manage your education details.",
      icon: "🎓",
      path: "/admin/education",
    },
    {
      title: "Experience",
      description: "Manage your professional experience.",
      icon: "💼",
      path: "/admin/experience",
    },
    {
      title: "Skills",
      description: "Manage your technical skills.",
      icon: "⚡",
      path: "/admin/skills",
    },
    {
      title: "Projects",
      description: "Manage your portfolio projects.",
      icon: "🚀",
      path: "/admin/projects",
    },
    {
      title: "Certifications",
      description: "Manage your certifications.",
      icon: "🏆",
      path: "/admin/certifications",
    },
    {
      title: "Coding Stats",
      description: "Manage your coding statistics.",
      icon: "💻",
      path: "/admin/coding-stats",
    },
    {
      title: "Blog Posts",
      description: "Create and manage your blog posts.",
      icon: "📝",
      path: "/admin/blogs",
    },
    {
      title: "Messages",
      description: "View messages received from your portfolio.",
      icon: "✉️",
      path: "/admin/messages",
    },
  ];

  return (
    <div className="admin-dashboard">

      {/* HEADER */}
      <div className="dashboard-header">

        <div>
          <span className="dashboard-label">ADMIN PANEL</span>

          <h1>Dashboard</h1>

          <p>
            Manage your portfolio content from one place.
          </p>
        </div>

        <div className="dashboard-status">
          <span className="status-dot"></span>
          System Online
        </div>

      </div>

      {/* STATS */}
      <div className="dashboard-stats">

        <div className="stat-box">
          <span className="stat-icon">📁</span>
          <div>
            <strong>8</strong>
            <span>Sections</span>
          </div>
        </div>

        <div className="stat-box">
          <span className="stat-icon">⚙️</span>
          <div>
            <strong>Admin</strong>
            <span>Control Panel</span>
          </div>
        </div>

        <div className="stat-box">
          <span className="stat-icon">🚀</span>
          <div>
            <strong>Active</strong>
            <span>Portfolio</span>
          </div>
        </div>

      </div>

      {/* SECTION TITLE */}
      <div className="dashboard-section-title">
        <div>
          <span>CONTENT MANAGEMENT</span>
          <h2>Manage Portfolio</h2>
        </div>
      </div>

      {/* CARDS */}
      <div className="admin-dashboard-grid">

        {cards.map((card, index) => (
          <Link
            to={card.path}
            key={card.path}
            className="admin-card"
          >

            <div className="admin-card-top">

              <div className="admin-card-icon">
                {card.icon}
              </div>

              <span className="card-number">
                {String(index + 1).padStart(2, "0")}
              </span>

            </div>

            <div className="admin-card-content">

              <h3>{card.title}</h3>

              <p>{card.description}</p>

            </div>

            <div className="admin-card-footer">

              <span>Manage</span>

              <span className="admin-card-arrow">
                →
              </span>

            </div>

          </Link>
        ))}

      </div>

    </div>
  );
}

export default Dashboard;