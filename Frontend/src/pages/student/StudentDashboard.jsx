import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./student-dashboard.css";

/* =====================================================
   SVG ICONS
===================================================== */

const Icon = ({ name, size = 20 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const icons = {
    dashboard: (
      <svg {...common}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),

    profile: (
      <svg {...common}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
      </svg>
    ),

    academics: (
      <svg {...common}>
        <path d="M3 10l9-5 9 5-9 5-9-5z" />
        <path d="M7 12v5c3 2 7 2 10 0v-5" />
        <path d="M21 10v6" />
      </svg>
    ),

    skills: (
      <svg {...common}>
        <path d="M9 12l2 2 4-4" />
        <path d="M20 7h-5l-2-2H9L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
      </svg>
    ),

    projects: (
      <svg {...common}>
        <path d="M3 7h6l2 2h10v9a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7z" />
        <path d="M8 13h8" />
        <path d="M12 9v8" />
      </svg>
    ),

    certificate: (
      <svg {...common}>
        <circle cx="12" cy="8" r="5" />
        <path d="M9 12l-1 9 4-2 4 2-1-9" />
        <path d="M10 8l1 1 2-2" />
      </svg>
    ),

    resume: (
      <svg {...common}>
        <path d="M6 2h9l5 5v15H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
        <path d="M14 2v6h6" />
        <path d="M8 13h8" />
        <path d="M8 17h6" />
        <path d="M8 9h2" />
      </svg>
    ),

    readiness: (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),

    roadmap: (
      <svg {...common}>
        <path d="M4 19V5" />
        <path d="M4 5c4-3 7 3 10 0s6 0 6 0v10c-3 0-6-3-9 0s-7-3-7 0" />
      </svg>
    ),

    drives: (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 8h10" />
        <path d="M7 12h10" />
        <path d="M7 16h6" />
      </svg>
    ),

    bell: (
      <svg {...common}>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </svg>
    ),

    arrow: (
      <svg {...common}>
        <path d="M5 12h14" />
        <path d="M13 6l6 6-6 6" />
      </svg>
    ),

    logout: (
      <svg {...common}>
        <path d="M10 17l5-5-5-5" />
        <path d="M15 12H3" />
        <path d="M21 19V5a2 2 0 0 0-2-2h-5" />
      </svg>
    ),

    edit: (
      <svg {...common}>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),

    warning: (
      <svg {...common}>
        <path d="M12 3L2.5 20h19L12 3z" />
        <path d="M12 9v5" />
        <path d="M12 17h.01" />
      </svg>
    ),

    close: (
      <svg {...common}>
        <path d="M6 6l12 12" />
        <path d="M18 6L6 18" />
      </svg>
    ),
  };

  return icons[name] || null;
};

/* =====================================================
   STAT CARD
===================================================== */

const StatCard = ({
  icon,
  label,
  value,
  type = "default",
  description,
}) => {
  return (
    <div className={`stat-card stat-${type}`}>
      <div className="stat-icon">
        <Icon name={icon} size={21} />
      </div>

      <div className="stat-content">
        <span className="stat-label">{label}</span>
        <strong className="stat-value">{value}</strong>

        {description && (
          <span className="stat-description">{description}</span>
        )}
      </div>
    </div>
  );
};

/* =====================================================
   INFO CARD
===================================================== */

const InfoItem = ({ label, value, warning = false }) => {
  return (
    <div className={`info-item ${warning ? "info-warning" : ""}`}>
      <span className="info-label">{label}</span>

      {warning ? (
        <button className="add-now-button">
          {value}
          <Icon name="arrow" size={14} />
        </button>
      ) : (
        <strong className="info-value">{value}</strong>
      )}
    </div>
  );
};

/* =====================================================
   SIDEBAR
===================================================== */

const SidebarNav = ({ studentName, navigate, onLogout }) => {
  const menuItems = [
    {
      label: "Dashboard",
      path: "/student/dashboard",
      icon: "dashboard",
    },
    {
      label: "Profile",
      path: "/student/profile",
      icon: "profile",
    },
    {
      label: "Academics",
      path: "/student/academics",
      icon: "academics",
    },
    {
      label: "Skills",
      path: "/student/skills",
      icon: "skills",
    },
    {
      label: "Projects",
      path: "/student/projects",
      icon: "projects",
    },
    {
      label: "Certifications",
      path: "/student/certifications",
      icon: "certificate",
    },
    {
      label: "Resume",
      path: "/student/resume",
      icon: "resume",
    },
    {
      label: "Readiness",
      path: "/student/readiness",
      icon: "readiness",
    },
    {
      label: "Readiness Roadmap",
      path: "/student/readiness-roadmap",
      icon: "roadmap",
    },
    {
      label: "Eligible Drives",
      path: "/student/eligible-drives",
      icon: "drives",
    },
  ];

  return (
    <aside className="sidebar">
      {/* STUDENT IDENTITY */}
      <div className="sidebar-brand">
        <div className="student-avatar-large">
          {(studentName || "S").charAt(0).toUpperCase()}
        </div>

        <div className="student-brand-info">
          <h2>{studentName || "Student"}</h2>
          <p>Student Portal</p>
        </div>
      </div>

      {/* MAIN MENU */}
      <div className="sidebar-menu-title">MAIN MENU</div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`sidebar-link ${
              item.label === "Dashboard" ? "active" : ""
            }`}
            onClick={() => navigate(item.path)}
          >
            <span className="sidebar-icon">
              <Icon name={item.icon} size={19} />
            </span>

            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* SIDEBAR FOOTER */}
      <div className="sidebar-bottom">
        <div className="help-card">
          <div className="help-icon">?</div>

          <div>
            <strong>Need help?</strong>
            <span>We're here for you.</span>
          </div>
        </div>

        <button className="sidebar-logout" onClick={onLogout}>
          <Icon name="logout" size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

/* =====================================================
   QUICK ACTION CARD
===================================================== */

const QuickAction = ({ icon, title, description, onClick }) => {
  return (
    <button className="quick-action-card" onClick={onClick}>
      <div className="quick-action-icon">
        <Icon name={icon} size={21} />
      </div>

      <div className="quick-action-content">
        <strong>{title}</strong>
        <span>{description}</span>
      </div>

      <div className="quick-action-arrow">
        <Icon name="arrow" size={17} />
      </div>
    </button>
  );
};

/* =====================================================
   STUDENT DASHBOARD
===================================================== */

function StudentDashboard() {
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  /* ===================================================
     FETCH STUDENT
  =================================================== */

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token =
          localStorage.getItem("campusiqToken") ||
          localStorage.getItem("token");

        if (!token) {
          setError(
            "Your login session has expired. Please login again."
          );
          setLoading(false);
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/student/me",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("campusiqToken");
            localStorage.removeItem("campusiqUser");
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            setError(
              "Your login session has expired. Please login again."
            );
          } else {
            setError(
              data.message || "Unable to load student data."
            );
          }

          setLoading(false);
          return;
        }

        setStudent(data.user);
        setLoading(false);
      } catch (err) {
        console.error("Dashboard error:", err);

        setError(
          "Unable to connect to CampusIQ server."
        );

        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  /* ===================================================
     LOGOUT
  =================================================== */

  const handleLogout = () => {
    localStorage.removeItem("campusiqToken");
    localStorage.removeItem("campusiqUser");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  /* ===================================================
     LOADING
  =================================================== */

  if (loading) {
    return (
      <div className="dashboard-loading-page">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  /* ===================================================
     ERROR
  =================================================== */

  if (error) {
    return (
      <div className="dashboard-error-page">
        <div className="error-box">
          <div className="error-icon">
            <Icon name="warning" size={28} />
          </div>

          <h2>Unable to load dashboard</h2>
          <p>{error}</p>

          <button
            onClick={() => navigate("/login")}
            className="primary-button"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  /* ===================================================
     DATA
  =================================================== */

  const studentName = student?.name || "Student";

  const firstName = studentName
    .split(" ")[0]
    .trim();

  const cgpa =
    student?.cgpa !== undefined &&
    student?.cgpa !== null
      ? student.cgpa
      : "Not added";

  const semester =
    student?.semester || "Not added";

  const backlogs =
    student?.backlogs !== undefined &&
    student?.backlogs !== null
      ? student.backlogs
      : 0;

  const passingYear =
    student?.passingYear || "Not added";

  const department =
    student?.department || "";

  /* ===================================================
     PROFILE COMPLETION
  =================================================== */

  const profileFields = [
    student?.name,
    student?.prn,
    student?.email,
    student?.phone,
    student?.branch,
    student?.department,
    student?.cgpa,
    student?.semester,
    student?.passingYear,
  ];

  const completedFields = profileFields.filter(
    (field) =>
      field !== undefined &&
      field !== null &&
      field !== ""
  ).length;

  const profileCompletion = Math.round(
    (completedFields / profileFields.length) * 100
  );

  /* ===================================================
     QUICK ACTIONS
  =================================================== */

  const quickActions = [
    {
      icon: "profile",
      title: "Update Profile",
      description: "Manage your personal information",
      path: "/student/profile",
    },
    {
      icon: "academics",
      title: "Academics",
      description: "Manage your academic details",
      path: "/student/academics",
    },
    {
      icon: "skills",
      title: "Skills",
      description: "Add and manage technical skills",
      path: "/student/skills",
    },
    {
      icon: "projects",
      title: "Projects",
      description: "Showcase your projects and experience",
      path: "/student/projects",
    },
    {
      icon: "resume",
      title: "Resume",
      description: "Manage your placement resume",
      path: "/student/resume",
    },
    {
      icon: "readiness",
      title: "Readiness",
      description: "Check your placement readiness",
      path: "/student/readiness",
    },
  ];

  /* ===================================================
     RETURN
  =================================================== */

  return (
    <div className="campusiq-layout">

      {/* MOBILE OVERLAY */}
      {mobileMenu && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileMenu(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <div
        className={`sidebar-wrapper ${
          mobileMenu ? "mobile-open" : ""
        }`}
      >
        <SidebarNav
          studentName={studentName}
          navigate={(path) => {
            setMobileMenu(false);
            navigate(path);
          }}
          onLogout={handleLogout}
        />
      </div>

      {/* MAIN AREA */}
      <main className="dashboard-main">

        {/* TOP HEADER */}
        <header className="top-header">

          <div className="mobile-header-left">
            <button
              className="mobile-menu-button"
              onClick={() =>
                setMobileMenu(!mobileMenu)
              }
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <div className="mobile-logo">
              CampusIQ
            </div>
          </div>

          <div className="top-brand">
            CampusIQ
          </div>

          <div className="top-header-right">

            <button className="notification-button">
              <Icon name="bell" size={19} />
              <span className="notification-dot"></span>
            </button>

            <div className="header-profile">
              <div className="header-avatar">
                {studentName
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="header-profile-text">
                <strong>{studentName}</strong>
                <span>Student</span>
              </div>
            </div>

          </div>
        </header>

        {/* CONTENT */}
        <div className="dashboard-content">

          {/* PAGE INTRO */}
          <section className="welcome-section">

            <div className="welcome-text">

              <span className="eyebrow">
                STUDENT PORTAL
              </span>

              <h1>
                Welcome back, {firstName}!{" "}
                <span className="wave">👋</span>
              </h1>

              <p>
                Here's your current placement overview.
                Keep building your profile to improve your
                placement readiness.
              </p>

            </div>

            <div className="completion-card">

              <div className="completion-circle">
                <svg
                  width="72"
                  height="72"
                  viewBox="0 0 72 72"
                >
                  <circle
                    cx="36"
                    cy="36"
                    r="30"
                    className="circle-bg"
                  />

                  <circle
                    cx="36"
                    cy="36"
                    r="30"
                    className="circle-progress"
                    style={{
                      strokeDashoffset:
                        188 -
                        (188 *
                          profileCompletion) /
                          100,
                    }}
                  />
                </svg>

                <span>
                  {profileCompletion}%
                </span>
              </div>

              <div className="completion-text">
                <strong>Profile Complete</strong>
                <span>
                  {profileCompletion < 100
                    ? "Keep improving your profile"
                    : "Your profile is complete"}
                </span>
              </div>

            </div>

          </section>

          {/* STAT CARDS */}
          <section className="stats-grid">

            <StatCard
              icon="academics"
              label="Current CGPA"
              value={cgpa}
              type="success"
              description="Academic performance"
            />

            <StatCard
              icon="dashboard"
              label="Current Semester"
              value={semester}
              type="blue"
              description="Current semester"
            />

            <StatCard
              icon="warning"
              label="Backlogs"
              value={backlogs}
              type={
                Number(backlogs) > 0
                  ? "danger"
                  : "success"
              }
              description={
                Number(backlogs) > 0
                  ? "Needs attention"
                  : "No active backlogs"
              }
            />

            <StatCard
              icon="roadmap"
              label="Passing Year"
              value={passingYear}
              type="purple"
              description="Expected graduation"
            />

          </section>

          {/* STUDENT INFORMATION */}
          <section className="dashboard-card">

            <div className="card-heading">

              <div className="heading-icon profile-color">
                <Icon name="profile" size={21} />
              </div>

              <div>
                <span className="section-eyebrow">
                  STUDENT INFORMATION
                </span>

                <h2>Your Details</h2>

                <p>
                  Your basic profile information
                </p>
              </div>

              <button
                className="outline-button"
                onClick={() =>
                  navigate("/student/profile")
                }
              >
                <Icon name="edit" size={15} />
                Edit Profile
              </button>

            </div>

            <div className="info-grid">

              <InfoItem
                label="Full Name"
                value={
                  student?.name || "Not added"
                }
              />

              <InfoItem
                label="PRN"
                value={
                  student?.prn || "Not added"
                }
              />

              <InfoItem
                label="Email"
                value={
                  student?.email || "Not added"
                }
              />

              <InfoItem
                label="Phone"
                value={
                  student?.phone || "Not added"
                }
              />

              <InfoItem
                label="Branch"
                value={
                  student?.branch || "Not added"
                }
              />

              <InfoItem
                label="Department"
                value={
                  department
                    ? department
                    : "Add now →"
                }
                warning={!department}
              />

            </div>

          </section>

          {/* ACADEMIC PERFORMANCE */}
          <section className="dashboard-card">

            <div className="card-heading">

              <div className="heading-icon academic-color">
                <Icon
                  name="academics"
                  size={21}
                />
              </div>

              <div>
                <span className="section-eyebrow">
                  ACADEMIC OVERVIEW
                </span>

                <h2>Academic Performance</h2>

                <p>
                  Your current academic snapshot
                </p>
              </div>

              <button
                className="outline-button"
                onClick={() =>
                  navigate("/student/academics")
                }
              >
                Manage Academics
                <Icon name="arrow" size={15} />
              </button>

            </div>

            <div className="academic-summary">

              <div className="academic-item">
                <span>Current CGPA</span>
                <strong>{cgpa}</strong>
              </div>

              <div className="academic-item">
                <span>Current Semester</span>
                <strong>{semester}</strong>
              </div>

              <div className="academic-item">
                <span>Backlogs</span>
                <strong
                  className={
                    Number(backlogs) > 0
                      ? "text-danger"
                      : "text-success"
                  }
                >
                  {backlogs}
                </strong>
              </div>

              <div className="academic-item">
                <span>Passing Year</span>
                <strong>
                  {passingYear}
                </strong>
              </div>

            </div>

          </section>

          {/* QUICK ACTIONS */}
          <section className="quick-actions-section">

            <div className="section-title">

              <span className="section-eyebrow">
                PLACEMENT PROFILE
              </span>

              <h2>Quick Actions</h2>

              <p>
                Continue building your placement profile.
              </p>

            </div>

            <div className="quick-actions-grid">

              {quickActions.map((action) => (
                <QuickAction
                  key={action.title}
                  icon={action.icon}
                  title={action.title}
                  description={
                    action.description
                  }
                  onClick={() =>
                    navigate(action.path)
                  }
                />
              ))}

            </div>

          </section>

          {/* FOOTER */}
          <footer className="dashboard-footer">
            <span>
              CampusIQ • Student Placement Portal
            </span>

            <span>
              Keep learning. Keep building. 🚀
            </span>
          </footer>

        </div>
      </main>
    </div>
  );
}

export default StudentDashboard;