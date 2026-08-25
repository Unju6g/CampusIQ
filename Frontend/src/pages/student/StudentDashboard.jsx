import React, { useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./student-dashboard.css";

function StudentDashboard() {
  const navigate = useNavigate();

  const [notificationOpen, setNotificationOpen] = useState(false);

  // =========================================================
  // GET LOGGED-IN STUDENT
  // =========================================================
  const storedUser = localStorage.getItem("campusiqUser");

  let user = {};

  try {
    user = storedUser ? JSON.parse(storedUser) : {};
  } catch (error) {
    user = {};
  }

  // Try profile data also if your Profile page stores it separately
  let profileData = {};

  try {
    const storedProfile = localStorage.getItem("campusiqProfile");
    profileData = storedProfile ? JSON.parse(storedProfile) : {};
  } catch (error) {
    profileData = {};
  }

  // =========================================================
  // STUDENT NAME
  // =========================================================
  const studentName =
    user.name ||
    user.fullName ||
    profileData.name ||
    profileData.fullName ||
    "Gunjan Shaha";

  // =========================================================
  // PROFILE COMPLETION / MISSING ITEMS
  // =========================================================
  const hasProfilePhoto =
    Boolean(user.profilePhoto) ||
    Boolean(user.photoURL) ||
    Boolean(user.avatar) ||
    Boolean(profileData.profilePhoto) ||
    Boolean(profileData.photoURL);

  const projectCount = Array.isArray(user.projects)
    ? user.projects.length
    : Array.isArray(profileData.projects)
      ? profileData.projects.length
      : Number(user.projectCount || profileData.projectCount || 0);

  const hasResume =
    Boolean(user.resumeUploaded) ||
    Boolean(user.resumeUrl) ||
    Boolean(user.resumeFileName) ||
    Boolean(profileData.resumeUploaded) ||
    Boolean(profileData.resumeUrl) ||
    Boolean(profileData.resumeFileName);

  const missingItems = useMemo(() => {
    const items = [];

    if (!hasProfilePhoto) {
      items.push({
        icon: "○",
        text: "Add a profile photo",
        path: "/student/profile",
      });
    }

    if (projectCount < 1) {
      items.push({
        icon: "◇",
        text: "Add at least 1 project",
        path: "/student/projects",
      });
    }

    if (!hasResume) {
      items.push({
        icon: "□",
        text: "Upload your resume",
        path: "/student/resume",
      });
    }

    return items.slice(0, 3);
  }, [hasProfilePhoto, projectCount, hasResume]);

  // =========================================================
  // SIDEBAR
  // =========================================================
  const menuItems = [
    {
      name: "Dashboard",
      path: "/student/dashboard",
      icon: "⌂",
    },
    {
      name: "Profile",
      path: "/student/profile",
      icon: "◉",
    },
    {
      name: "Academics",
      path: "/student/academics",
      icon: "▣",
    },
    {
      name: "Skills",
      path: "/student/skills",
      icon: "◇",
    },
    {
      name: "Projects",
      path: "/student/projects",
      icon: "◆",
    },
    {
      name: "Certifications",
      path: "/student/certifications",
      icon: "✦",
    },
    {
      name: "Resume",
      path: "/student/resume",
      icon: "▤",
    },
    {
      name: "Readiness",
      path: "/student/readiness",
      icon: "◌",
    },
    {
      name: "Readiness Roadmap",
      path: "/student/roadmap",
      icon: "↗",
    },
    {
      name: "Eligible Drives",
      path: "/student/drives",
      icon: "▥",
    },
    {
      name: "Notice Board",
      path: "/student/notices",
      icon: "●",
    },
  ];

  // =========================================================
  // LOGOUT
  // =========================================================
  const handleLogout = () => {
    localStorage.removeItem("campusiqUser");
    navigate("/login");
  };

  // =========================================================
  // NOTIFICATIONS
  // =========================================================
  const notices = [
    {
      id: 1,
      title: "New Placement Drive Available",
      description: "A new Software Developer placement drive is available.",
      time: "Today",
      unread: true,
      icon: "●",
    },
    {
      id: 2,
      title: "Resume Submission Reminder",
      description: "Keep your latest resume updated in CampusIQ.",
      time: "This week",
      unread: true,
      icon: "◆",
    },
    {
      id: 3,
      title: "Profile Update",
      description: "Complete your profile to improve recommendations.",
      time: "2 days ago",
      unread: false,
      icon: "✓",
    },
  ];

  const unreadNotices = notices.filter((notice) => notice.unread);

  // =========================================================
  // STAT CARD NAVIGATION
  // =========================================================
  const statCards = [
    {
      title: "Placement Readiness",
      value: "78%",
      description: "Good progress",
      icon: "◌",
      path: "/student/readiness",
    },
    {
      title: "Resume Score",
      value: "82%",
      description: "Above average",
      icon: "▤",
      path: "/student/resume",
    },
    {
      title: "Eligible Companies",
      value: "12",
      description: "Based on your profile",
      icon: "▥",
      path: "/student/drives",
    },
    {
      title: "Active Drives",
      value: "5",
      description: "Currently open",
      icon: "◆",
      path: "/student/drives",
    },
  ];

  // =========================================================
  // RECENT ACTIVITY
  // =========================================================
  const recentActivities = [
    {
      icon: "✦",
      title: "Added a new certification",
      time: "2 days ago",
      path: "/student/certifications",
    },
    {
      icon: "◇",
      title: "Updated your skills",
      time: "3 days ago",
      path: "/student/skills",
    },
    {
      icon: "◆",
      title: "Added a new project",
      time: "5 days ago",
      path: "/student/projects",
    },
    {
      icon: "▥",
      title: "Checked eligible placement drives",
      time: "1 week ago",
      path: "/student/drives",
    },
  ];

  return (
    <div className="student-dashboard">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}
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
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <span className="menu-icon">
                {item.icon}
              </span>

              <span className="menu-label">
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          <span>↪</span>
          Logout
        </button>

      </aside>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <main className="dashboard-main">

        {/* =====================================================
            HEADER
        ===================================================== */}
        <header className="dashboard-header">

          <div className="header-left">

            <span className="portal-label">
              STUDENT PORTAL
            </span>

            <h1>
              Welcome, {studentName}
              <span className="welcome-hand">👋</span>
            </h1>

            <p>
              Here's your current placement overview.
            </p>

          </div>

          <div className="header-right">

            {/* NOTIFICATION */}
            <div className="notification-wrapper">

              <button
                className={`notification-button ${
                  notificationOpen ? "notification-active" : ""
                }`}
                onClick={() =>
                  setNotificationOpen(!notificationOpen)
                }
                title="Notifications"
                aria-label="Open notifications"
              >
                <span>●</span>

                {unreadNotices.length > 0 && (
                  <span className="notification-dot"></span>
                )}
              </button>

              {notificationOpen && (
                <div className="notification-dropdown">

                  <div className="notification-header">
                    <div>
                      <strong>Notifications</strong>
                      <span>
                        {unreadNotices.length} unread
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        setNotificationOpen(false)
                      }
                      className="notification-close"
                    >
                      ×
                    </button>
                  </div>

                  <div className="notification-list">

                    {unreadNotices.length === 0 ? (
                      <div className="no-notifications">
                        <span>✓</span>
                        <p>No new notifications</p>
                      </div>
                    ) : (
                      unreadNotices
                        .slice(0, 3)
                        .map((notice) => (
                          <button
                            key={notice.id}
                            className="notification-item"
                            onClick={() => {
                              setNotificationOpen(false);
                              navigate("/student/notices");
                            }}
                          >
                            <span className="notification-item-icon">
                              {notice.icon}
                            </span>

                            <span className="notification-item-content">
                              <strong>
                                {notice.title}
                              </strong>

                              <small>
                                {notice.description}
                              </small>

                              <em>
                                {notice.time}
                              </em>
                            </span>

                            <span className="unread-dot"></span>
                          </button>
                        ))
                    )}

                  </div>

                  <button
                    className="view-all-notifications"
                    onClick={() => {
                      setNotificationOpen(false);
                      navigate("/student/notices");
                    }}
                  >
                    View All Notifications →
                  </button>

                </div>
              )}

            </div>

            {/* PROFILE MINI */}
            <div className="profile-mini">

              <div className="profile-avatar">
                {studentName.charAt(0).toUpperCase()}
              </div>

              <div>
                <strong>{studentName}</strong>
                <span>Student</span>
              </div>

            </div>

          </div>

        </header>

        {/* =====================================================
            STAT CARDS
        ===================================================== */}
        <section className="stats-grid">

          {statCards.map((card) => (
            <button
              key={card.title}
              className="stat-card"
              onClick={() => navigate(card.path)}
            >

              <div className="stat-icon">
                {card.icon}
              </div>

              <div className="stat-content">

                <span>{card.title}</span>

                <strong>{card.value}</strong>

                <small>{card.description}</small>

              </div>

              <span className="stat-arrow">
                →
              </span>

            </button>
          ))}

        </section>

        {/* =====================================================
            PROFILE + ACADEMIC
        ===================================================== */}
        <section className="overview-grid">

          {/* PROFILE COMPLETION */}
          <div className="dashboard-card profile-card">

            <div className="card-header">

              <div>
                <span className="section-label">
                  PROFILE
                </span>

                <h2>
                  Profile Completion
                </h2>
              </div>

              <strong className="percentage">
                78%
              </strong>

            </div>

            <p className="card-description">
              Complete your profile to improve your placement
              recommendations.
            </p>

            <div className="progress-container">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: "78%" }}
                ></div>
              </div>
            </div>

            {/* MISSING PROFILE ITEMS */}
            <div className="missing-profile">

              <div className="missing-title">
                <strong>Profile checklist</strong>

                {missingItems.length > 0 && (
                  <span>
                    {missingItems.length} remaining
                  </span>
                )}
              </div>

              {missingItems.length > 0 ? (
                <div className="missing-list">

                  {missingItems.map((item) => (
                    <button
                      key={item.text}
                      className="missing-item"
                      onClick={() => navigate(item.path)}
                    >
                      <span className="missing-icon">
                        {item.icon}
                      </span>

                      <span>{item.text}</span>

                      <span className="missing-arrow">
                        →
                      </span>
                    </button>
                  ))}

                </div>
              ) : (
                <div className="profile-complete-message">
                  <span>✓</span>
                  Your profile is complete.
                </div>
              )}

            </div>

            <button
              className="outline-button"
              onClick={() => navigate("/student/profile")}
            >
              Complete Profile →
            </button>

          </div>

          {/* ACADEMIC OVERVIEW */}
          <div className="dashboard-card academic-card">

            <div className="card-header">

              <div>
                <span className="section-label">
                  ACADEMICS
                </span>

                <h2>
                  Academic Overview
                </h2>
              </div>

              <button
                className="text-button"
                onClick={() =>
                  navigate("/student/academics")
                }
              >
                View Details →
              </button>

            </div>

            <div className="academic-grid">

              <div className="academic-item">
                <span>10th Percentage</span>
                <strong>89%</strong>
              </div>

              <div className="academic-item">
                <span>12th Percentage</span>
                <strong>91%</strong>
              </div>

              <div className="academic-item">
                <span>Current CGPA</span>
                <strong>8.67</strong>
              </div>

              <div className="academic-item">
                <span>Active Backlogs</span>
                <strong>0</strong>
              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            SEMESTER PERFORMANCE
        ===================================================== */}
        <section className="dashboard-card performance-card">

          <div className="card-header">

            <div>
              <span className="section-label">
                ACADEMIC PERFORMANCE
              </span>

              <h2>
                Semester-wise Performance
              </h2>
            </div>

            <button
              className="text-button"
              onClick={() =>
                navigate("/student/academics")
              }
            >
              View All →
            </button>

          </div>

          <div className="semester-table">

            <div className="table-row table-heading">
              <span>Semester</span>
              <span>SGPA</span>
              <span>Status</span>
            </div>

            <div className="table-row">
              <span>Semester 1</span>
              <strong>8.20</strong>

              <span className="status completed">
                <span className="status-check">✓</span>
                Completed
              </span>
            </div>

            <div className="table-row">
              <span>Semester 2</span>
              <strong>8.45</strong>

              <span className="status completed">
                <span className="status-check">✓</span>
                Completed
              </span>
            </div>

            <div className="table-row">
              <span>Semester 3</span>
              <strong>8.60</strong>

              <span className="status completed">
                <span className="status-check">✓</span>
                Completed
              </span>
            </div>

            <div className="table-row">
              <span>Semester 4</span>
              <strong>8.72</strong>

              <span className="status completed">
                <span className="status-check">✓</span>
                Completed
              </span>
            </div>

            <div className="table-row">
              <span>Semester 5</span>
              <strong>8.80</strong>

              <span className="status completed">
                <span className="status-check">✓</span>
                Completed
              </span>
            </div>

            <div className="table-row">
              <span>Semester 6</span>
              <strong>8.67</strong>

              <span className="status current">
                <span className="current-dot"></span>
                Current
              </span>
            </div>

          </div>

        </section>

        {/* =====================================================
            QUICK ACTIONS
        ===================================================== */}
        <section className="dashboard-card quick-actions-card">

          <div className="card-header">

            <div>
              <span className="section-label">
                QUICK ACTIONS
              </span>

              <h2>
                Continue Your Preparation
              </h2>
            </div>

          </div>

          <div className="quick-actions">

            {/* RESUME */}
            <button
              onClick={() =>
                navigate("/student/resume")
              }
              className="quick-action"
            >
              <span className="quick-action-icon">
                ▤
              </span>

              <div>
                <strong>Analyze Resume</strong>
                <small>
                  Improve your resume score
                </small>
              </div>
            </button>

            {/* SKILLS - RECOMMENDED */}
            <button
              onClick={() =>
                navigate("/student/skills")
              }
              className="quick-action recommended"
            >
              <span className="quick-action-icon">
                ◇
              </span>

              <div>
                <div className="quick-action-title">
                  <strong>Update Skills</strong>

                  <span className="recommended-label">
                    Recommended
                  </span>
                </div>

                <small>
                  Add or improve your skills
                </small>
              </div>
            </button>

            {/* PROJECT */}
            <button
              onClick={() =>
                navigate("/student/projects")
              }
              className="quick-action"
            >
              <span className="quick-action-icon">
                ◆
              </span>

              <div>
                <strong>Add Project</strong>
                <small>
                  Build your project portfolio
                </small>
              </div>
            </button>

            {/* DRIVES */}
            <button
              onClick={() =>
                navigate("/student/drives")
              }
              className="quick-action"
            >
              <span className="quick-action-icon">
                ▥
              </span>

              <div>
                <strong>View Drives</strong>
                <small>
                  Check eligible opportunities
                </small>
              </div>
            </button>

          </div>

        </section>

        {/* =====================================================
            RECENT ACTIVITY
        ===================================================== */}
        <section className="dashboard-card activity-card">

          <div className="card-header">

            <div>
              <span className="section-label">
                ACTIVITY
              </span>

              <h2>
                Recent Activity
              </h2>
            </div>

            <span className="activity-count">
              Latest updates
            </span>

          </div>

          <div className="activity-list">

            {recentActivities.map((activity, index) => (
              <button
                key={index}
                className="activity-item"
                onClick={() =>
                  navigate(activity.path)
                }
              >

                <span className="activity-icon">
                  {activity.icon}
                </span>

                <span className="activity-content">
                  <strong>
                    {activity.title}
                  </strong>

                  <small>
                    {activity.time}
                  </small>
                </span>

                <span className="activity-arrow">
                  →
                </span>

              </button>
            ))}

          </div>

        </section>

      </main>
    </div>
  );
}

export default StudentDashboard;