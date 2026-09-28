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
  {
    label: "Readiness Roadmap",
    icon: "🗺️",
    path: "/student/readiness-roadmap",
  },
  {
    label: "Eligible Drives",
    icon: "🏢",
    path: "/student/eligible-drives",
  },
  {
    label: "Notice Board",
    icon: "🔔",
    path: "/student/notice-board",
  },
];

const StudentLayout = () => {
  const navigate = useNavigate();

  // =====================================================
  // GET LOGGED-IN USER
  // =====================================================

  const storedUser = localStorage.getItem("campusiqUser");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Invalid stored user data:", error);
    localStorage.removeItem("campusiqUser");
  }

  // =====================================================
  // CHECK AUTHENTICATION
  // =====================================================

  const token = localStorage.getItem("campusiqToken");

  // If there is no login token, go back to login
  if (!token) {
    navigate("/login");
    return null;
  }

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
  localStorage.removeItem("campusiqToken");
  localStorage.removeItem("campusiqUser");

  navigate("/login");
};

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="student-layout">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside className="student-sidebar">

        {/* BRAND */}

        <div className="sidebar-brand">

          <div className="brand-icon">
            C
          </div>

          <div className="brand-text">

            <h2>
              CampusIQ
            </h2>

            <span>
              Student Portal
            </span>

          </div>

        </div>

        {/* MENU TITLE */}

        <div className="menu-title">
          MAIN MENU
        </div>

        {/* MENU */}

        <nav className="sidebar-menu">

          {menuItems.map((item) => (

            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "active" : ""
                }`
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

        {/* USER INFORMATION */}

        <div className="sidebar-user">

          <div className="sidebar-user-avatar">
            {user?.name
              ? user.name.charAt(0).toUpperCase()
              : "S"}
          </div>

          <div className="sidebar-user-info">

            <strong>
              {user?.name || "Student"}
            </strong>

            <span>
              {user?.email || ""}
            </span>

          </div>

        </div>

        {/* LOGOUT */}

        <button
          type="button"
          className="logout-button"
          onClick={handleLogout}
        >
          ↪ Logout
        </button>

      </aside>

      {/* =================================================
          PAGE CONTENT
      ================================================= */}

      <main className="student-main">
        <Outlet />
      </main>

    </div>
  );
};

export default StudentLayout;