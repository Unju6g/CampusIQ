import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./StudentLayout.css";

const menuItems = [
  { label: "Dashboard", icon: "🏠", path: "/student/dashboard" },
  { label: "Profile", icon: "👤", path: "/student/profile" },
  { label: "Academics", icon: "🎓", path: "/student/academics" },
  { label: "Skills", icon: "💻", path: "/student/skills" },
  { label: "Projects", icon: "🚀", path: "/student/projects" },
  { label: "Certifications", icon: "🏆", path: "/student/certifications" },
  { label: "Resume", icon: "📄", path: "/student/resume" },
  { label: "Readiness", icon: "🎯", path: "/student/readiness" },
  { label: "Readiness Roadmap", icon: "🗺️", path: "/student/readiness-roadmap" },
  { label: "Eligible Drives", icon: "🏢", path: "/student/eligible-drives" },
  { label: "Notice Board", icon: "🔔", path: "/student/notice-board" },
];

const StudentLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="student-layout">

      {/* SIDEBAR */}
      <aside className="student-sidebar">

        <div className="sidebar-brand">
          <div className="brand-icon">C</div>

          <div className="brand-text">
            <h2>CampusIQ</h2>
            <span>Student Portal</span>
          </div>
        </div>

        <div className="menu-title">
          MAIN MENU
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <span className="menu-icon">
                {item.icon}
              </span>

              <span className="menu-label">
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          ↪ Logout
        </button>

      </aside>

      {/* PAGE CONTENT */}
      <main className="student-main">
        <Outlet />
      </main>

    </div>
  );
};

export default StudentLayout;