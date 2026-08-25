import { NavLink, useNavigate } from "react-router-dom";

function StudentSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("campusiqUser");
    navigate("/login");
  };

  return (
    <aside className="dashboard-sidebar">

      <div className="dashboard-logo">
        Campus<span>IQ</span>
      </div>

      <nav className="sidebar-menu">

        <NavLink to="/student/dashboard">
          🏠 Dashboard
        </NavLink>

        <NavLink to="/student/profile">
          👤 My Profile
        </NavLink>

        <NavLink to="/student/academics">
          🎓 Academics
        </NavLink>

        <NavLink to="/student/certifications">
          📜 Certifications
        </NavLink>

        <NavLink to="/student/projects">
          💻 Projects
        </NavLink>

        <NavLink to="/student/skills">
          🛠️ Skills
        </NavLink>

        <NavLink to="/student/resume">
          📄 AI Resume Analyzer
        </NavLink>

        <NavLink to="/student/readiness">
          📊 Placement Readiness
        </NavLink>

        <NavLink to="/student/roadmap">
          🗺️ Readiness Roadmap
        </NavLink>

        <NavLink to="/student/drives">
          🏢 Eligible Drives
        </NavLink>

        <NavLink to="/student/notices">
          🔔 Notice Board
        </NavLink>

      </nav>

      <button
        className="logout-button"
        onClick={handleLogout}
      >
        Logout
      </button>

    </aside>
  );
}

export default StudentSidebar;