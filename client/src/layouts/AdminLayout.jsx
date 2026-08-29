import { Outlet, Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    {
      name: "Dashboard",
      path: "/admin"
    },
    {
      name: "Education",
      path: "/admin/education"
    },
    {
      name: "Experience",
      path: "/admin/experience"
    },
    {
      name: "Skills",
      path: "/admin/skills"
    },
    {
      name: "Projects",
      path: "/admin/projects"
    },
    {
      name: "Certifications",
      path: "/admin/certifications"
    },
    {
      name: "Coding Stats",
      path: "/admin/coding-stats"
    },
    {
      name: "Blog",
      path: "/admin/blogs"
    },
    {
      name: "Categories",
      path: "/admin/categories"
    },
    {
      name: "Tags",
      path: "/admin/tags"
    },
    {
      name: "Comments",
      path: "/admin/comments"
    },
    {
      name: "Contacts",
      path: "/admin/contacts"
    },
    {
      name: "Users",
      path: "/admin/users"
    }
  ];

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <aside className="admin-sidebar">

        {/* Logo */}
        <div className="admin-logo">
          <Link to="/admin">
            <span>&lt;</span>
            Prasoon
            <span>/&gt;</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="admin-navigation">

          {navigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={
                isActive(item.path)
                  ? "admin-nav-link active"
                  : "admin-nav-link"
              }
            >
              {item.name}
            </Link>
          ))}

        </nav>

        {/* Sidebar Bottom */}
        <div className="admin-sidebar-bottom">

          <Link
            to="/"
            className="admin-nav-link"
          >
            View Portfolio
          </Link>

          <button
            type="button"
            className="admin-logout"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </aside>

      {/* Main Area */}
      <div className="admin-main">

        {/* Top Header */}
        <header className="admin-header">

          <div>
            <h1>Admin Panel</h1>
            <p>
              Manage your portfolio content
            </p>
          </div>

          <div className="admin-user">

            <span className="admin-user-name">
              {user?.name || "Admin"}
            </span>

            <span className="admin-user-role">
              {user?.role || "Admin"}
            </span>

          </div>

        </header>

        {/* Page Content */}
        <main className="admin-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;