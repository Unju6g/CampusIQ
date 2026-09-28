import React from "react";
import { useNavigate } from "react-router-dom";
import "./tpo-dashboard.css";

function TPODashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("campusiqUser");
    navigate("/login");
  };

  return (
    <div className="tpo-dashboard">

      {/* ================= SIDEBAR ================= */}
      <aside className="tpo-sidebar">

        <div className="tpo-brand">
          Campus<span>IQ</span>
        </div>

        <div className="tpo-profile">
          <div className="tpo-avatar">
            T
          </div>

          <div className="tpo-profile-info">
            <strong>TPO Admin</strong>
            <span>Placement Office</span>
          </div>
        </div>

        <nav className="tpo-nav">

          <button
            type="button"
            className="tpo-nav-item active"
            onClick={() => navigate("/admin/dashboard")}
          >
            <span className="nav-icon">⌂</span>
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            className="tpo-nav-item"
            onClick={() => navigate("/admin/students")}
          >
            <span className="nav-icon">♙</span>
            <span>Students</span>
          </button>

          <button
            type="button"
            className="tpo-nav-item"
            onClick={() => navigate("/admin/companies")}
          >
            <span className="nav-icon">▣</span>
            <span>Companies</span>
          </button>

          <button
            type="button"
            className="tpo-nav-item"
            onClick={() => navigate("/admin/drives")}
          >
            <span className="nav-icon">◈</span>
            <span>Placement Drives</span>
          </button>

          <button
            type="button"
            className="tpo-nav-item"
            onClick={() => navigate("/admin/eligibility")}
          >
            <span className="nav-icon">✓</span>
            <span>Eligibility</span>
          </button>

          <button
            type="button"
            className="tpo-nav-item"
            onClick={() => navigate("/admin/applications")}
          >
            <span className="nav-icon">▤</span>
            <span>Applications</span>
          </button>

          <button
            type="button"
            className="tpo-nav-item"
            onClick={() => navigate("/admin/announcements")}
          >
            <span className="nav-icon">♢</span>
            <span>Announcements</span>
          </button>

          <button
            type="button"
            className="tpo-nav-item"
            onClick={() => navigate("/admin/analytics")}
          >
            <span className="nav-icon">▥</span>
            <span>Analytics</span>
          </button>

        </nav>

        <button
          type="button"
          className="tpo-logout"
          onClick={handleLogout}
        >
          <span>↪</span>
          Logout
        </button>

      </aside>

      {/* ================= MAIN ================= */}
      <main className="tpo-main">

        {/* HEADER */}
        <header className="tpo-header">

          <div>
            <p className="tpo-eyebrow">
              TPO / ADMIN PORTAL
            </p>

            <h1>
              Placement Dashboard
            </h1>

            <p className="tpo-subtitle">
              Manage students, companies and placement drives.
            </p>
          </div>

          <div className="tpo-header-actions">

            <button
              type="button"
              className="header-icon-button"
              title="Notifications"
              onClick={() => navigate("/admin/announcements")}
            >
              ♢
              <span className="notification-dot"></span>
            </button>

            <div className="header-admin">
              <div className="header-admin-avatar">
                T
              </div>

              <div className="header-admin-info">
                <strong>TPO Admin</strong>
                <span>Placement Office</span>
              </div>
            </div>

          </div>

        </header>

        {/* ================= STATS ================= */}
        <section className="tpo-stats">

          <div className="tpo-stat-card">
            <div className="stat-top">
              <span className="stat-label">
                Total Students
              </span>

              <div className="stat-icon">
                ♙
              </div>
            </div>

            <strong className="stat-value">
              642
            </strong>

            <div className="stat-trend positive">
              ↑ 12%
              <span>vs last month</span>
            </div>
          </div>

          <div className="tpo-stat-card">
            <div className="stat-top">
              <span className="stat-label">
                Placed Students
              </span>

              <div className="stat-icon">
                ✓
              </div>
            </div>

            <strong className="stat-value">
              286
            </strong>

            <div className="stat-trend positive">
              ↑ 8%
              <span>vs last month</span>
            </div>
          </div>

          <div className="tpo-stat-card">
            <div className="stat-top">
              <span className="stat-label">
                Active Drives
              </span>

              <div className="stat-icon">
                ◈
              </div>
            </div>

            <strong className="stat-value">
              18
            </strong>

            <div className="stat-trend positive">
              ↑ 4%
              <span>vs last month</span>
            </div>
          </div>

          <div className="tpo-stat-card">
            <div className="stat-top">
              <span className="stat-label">
                Companies
              </span>

              <div className="stat-icon">
                ▣
              </div>
            </div>

            <strong className="stat-value">
              32
            </strong>

            <div className="stat-trend positive">
              ↑ 5%
              <span>vs last month</span>
            </div>
          </div>

        </section>

        {/* ================= TOP GRID ================= */}
        <section className="tpo-top-grid">

          {/* PLACEMENT OVERVIEW */}
          <div className="tpo-panel overview-panel">

            <div className="panel-heading">
              <div>
                <h2>Placement Overview</h2>
                <p>Current placement progress</p>
              </div>

              <span className="panel-icon">
                ▥
              </span>
            </div>

            <div className="placement-summary">
              <div className="placement-rate">
                44.5%
              </div>

              <div className="placement-count">
                286 of 642 students placed
              </div>
            </div>

            <div className="overview-progress">
              <div
                className="overview-progress-fill"
                style={{ width: "44.5%" }}
              />
            </div>

            <div className="overview-footer">
              <span>Placement Progress</span>
              <strong>44.5%</strong>
            </div>

            <button
              type="button"
              className="primary-outline-button"
              onClick={() => navigate("/admin/analytics")}
            >
              View Analytics
              <span>→</span>
            </button>

          </div>

          {/* QUICK ACTIONS */}
          <div className="tpo-panel quick-actions-panel">

            <div className="panel-heading">
              <div>
                <h2>Quick Actions</h2>
                <p>Frequently used placement tools</p>
              </div>

              <span className="panel-icon">
                +
              </span>
            </div>

            <button
              type="button"
              className="quick-action"
              onClick={() => navigate("/admin/drives")}
            >
              <div className="quick-action-icon">
                +
              </div>

              <div className="quick-action-content">
                <strong>Create Placement Drive</strong>
                <span>Add a new company placement drive</span>
              </div>

              <span className="quick-arrow">→</span>
            </button>

            <button
              type="button"
              className="quick-action"
              onClick={() => navigate("/admin/companies")}
            >
              <div className="quick-action-icon">
                ▣
              </div>

              <div className="quick-action-content">
                <strong>Add Company</strong>
                <span>Register a new recruiting company</span>
              </div>

              <span className="quick-arrow">→</span>
            </button>

            <button
              type="button"
              className="quick-action"
              onClick={() => navigate("/admin/announcements")}
            >
              <div className="quick-action-icon">
                ♢
              </div>

              <div className="quick-action-content">
                <strong>Send Announcement</strong>
                <span>Notify students about placement updates</span>
              </div>

              <span className="quick-arrow">→</span>
            </button>

          </div>

        </section>

        {/* ================= RECENT DRIVES ================= */}
        <section className="tpo-panel full-panel">

          <div className="section-header">

            <div>
              <h2>Recent Placement Drives</h2>
              <p>Monitor currently active and upcoming drives</p>
            </div>

            <button
              type="button"
              className="view-all-button"
              onClick={() => navigate("/admin/drives")}
            >
              View All →
            </button>

          </div>

          <div className="table-wrapper">

            <table className="placement-table">

              <thead>
                <tr>
                  <th>Company / Role</th>
                  <th>Applications</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>
                    <div className="company-cell">

                      <div className="company-avatar technova">
                        T
                      </div>

                      <div>
                        <strong>TechNova Solutions</strong>
                        <span>Software Engineer</span>
                      </div>

                    </div>
                  </td>

                  <td>
                    <strong className="table-number">124</strong>
                  </td>

                  <td>15 Sep 2026</td>

                  <td>
                    <span className="status-pill active">
                      Active
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="manage-button"
                      onClick={() => navigate("/admin/drives")}
                    >
                      Manage
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div className="company-cell">

                      <div className="company-avatar databridge">
                        D
                      </div>

                      <div>
                        <strong>DataBridge Analytics</strong>
                        <span>Data Analyst</span>
                      </div>

                    </div>
                  </td>

                  <td>
                    <strong className="table-number">98</strong>
                  </td>

                  <td>20 Sep 2026</td>

                  <td>
                    <span className="status-pill upcoming">
                      Upcoming
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="manage-button"
                      onClick={() => navigate("/admin/drives")}
                    >
                      Manage
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div className="company-cell">

                      <div className="company-avatar cloudcore">
                        C
                      </div>

                      <div>
                        <strong>CloudCore Technologies</strong>
                        <span>Cloud Engineer</span>
                      </div>

                    </div>
                  </td>

                  <td>
                    <strong className="table-number">76</strong>
                  </td>

                  <td>28 Sep 2026</td>

                  <td>
                    <span className="status-pill active">
                      Active
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="manage-button"
                      onClick={() => navigate("/admin/drives")}
                    >
                      Manage
                    </button>
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </section>

        {/* ================= BOTTOM GRID ================= */}
        <section className="tpo-bottom-grid">

          {/* RECENT APPLICATIONS */}
          <div className="tpo-panel">

            <div className="section-header">

              <div>
                <h2>Recent Applications</h2>
                <p>Latest student applications</p>
              </div>

              <button
                type="button"
                className="view-all-button"
                onClick={() => navigate("/admin/applications")}
              >
                View All →
              </button>

            </div>

            <div className="applications-list">

              <div className="application-row">
                <div className="student-avatar avatar-r">
                  R
                </div>

                <div className="application-info">
                  <strong>Rahul Patil</strong>
                  <span>TechNova Solutions</span>
                </div>

                <span className="status-pill shortlisted">
                  Shortlisted
                </span>
              </div>

              <div className="application-row">
                <div className="student-avatar avatar-p">
                  P
                </div>

                <div className="application-info">
                  <strong>Priya Sharma</strong>
                  <span>DataBridge Analytics</span>
                </div>

                <span className="status-pill review">
                  Under Review
                </span>
              </div>

              <div className="application-row">
                <div className="student-avatar avatar-a">
                  A
                </div>

                <div className="application-info">
                  <strong>Ankit Joshi</strong>
                  <span>CloudCore Technologies</span>
                </div>

                <span className="status-pill applied">
                  Applied
                </span>
              </div>

            </div>

          </div>

          {/* ANNOUNCEMENTS */}
          <div className="tpo-panel">

            <div className="section-header">

              <div>
                <h2>Recent Announcements</h2>
                <p>Latest messages sent to students</p>
              </div>

              <button
                type="button"
                className="view-all-button"
                onClick={() => navigate("/admin/announcements")}
              >
                View All →
              </button>

            </div>

            <div className="announcement-list">

              <div className="announcement-item">

                <div className="announcement-icon placement">
                  ♢
                </div>

                <div className="announcement-content">
                  <strong>New placement drive announced</strong>

                  <span>
                    TechNova Solutions is now accepting applications.
                  </span>

                  <small>Today</small>
                </div>

              </div>

              <div className="announcement-item">

                <div className="announcement-icon deadline">
                  !
                </div>

                <div className="announcement-content">
                  <strong>Application deadline reminder</strong>

                  <span>
                    Students are reminded to complete pending applications.
                  </span>

                  <small>Yesterday</small>
                </div>

              </div>

              <div className="announcement-item">

                <div className="announcement-icon event">
                  □
                </div>

                <div className="announcement-content">
                  <strong>Placement orientation session</strong>

                  <span>
                    Orientation session scheduled for eligible students.
                  </span>

                  <small>3 days ago</small>
                </div>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default TPODashboard;