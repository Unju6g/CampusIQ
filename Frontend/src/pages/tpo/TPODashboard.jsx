import { useNavigate } from "react-router-dom";

function TPODashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("campusiqUser");
    navigate("/login");
  };

  return (
    <div className="dashboard-page">

      <aside className="dashboard-sidebar">

        <div className="dashboard-logo">
          Campus<span>IQ</span>
        </div>

        <nav>
          <a className="active">Dashboard</a>
          <a>Students</a>
          <a>Companies</a>
          <a>Placement Drives</a>
          <a>Eligibility</a>
          <a>Applications</a>
          <a>Announcements</a>
          <a>Analytics</a>
        </nav>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </aside>

      <main className="dashboard-main">

        <div className="dashboard-header">

          <p className="dashboard-label">
            TPO / ADMIN PORTAL
          </p>

          <h1>Placement Dashboard</h1>

          <p>
            Manage students, companies and placement drives.
          </p>

        </div>

        <div className="dashboard-stats">

          <div className="stat-card">
            <span>Total Students</span>
            <strong>642</strong>
          </div>

          <div className="stat-card">
            <span>Placed Students</span>
            <strong>286</strong>
          </div>

          <div className="stat-card">
            <span>Active Drives</span>
            <strong>18</strong>
          </div>

          <div className="stat-card">
            <span>Companies</span>
            <strong>32</strong>
          </div>

        </div>

        <div className="dashboard-grid">

          <section className="dashboard-panel">

            <h2>Placement Overview</h2>

            <div className="analytics-number">
              44.5%
            </div>

            <p>
              Current overall placement rate.
            </p>

            <button>
              View Analytics
            </button>

          </section>

          <section className="dashboard-panel">

            <h2>Quick Actions</h2>

            <button className="action-button">
              + Create Placement Drive
            </button>

            <button className="action-button">
              + Add Company
            </button>

            <button className="action-button">
              Send Announcement
            </button>

          </section>

        </div>

        <section className="dashboard-panel">

          <h2>Recent Placement Drives</h2>

          <div className="drive-card">

            <div>
              <h3>Software Engineer</h3>
              <p>Applications: 124</p>
            </div>

            <span className="eligible">
              Active
            </span>

            <button>
              Manage
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default TPODashboard;