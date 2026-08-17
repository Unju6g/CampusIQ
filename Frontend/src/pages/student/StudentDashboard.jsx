import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("campusiqUser")
  );

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
          <a>My Profile</a>
          <a>Academics</a>
          <a>AI Resume Analyzer</a>
          <a>Placement Readiness</a>
          <a>Readiness Roadmap</a>
          <a>Eligible Drives</a>
          <a>Notice Board</a>
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

          <div>
            <p className="dashboard-label">
              STUDENT PORTAL
            </p>

            <h1>
              Welcome, {user?.name || "Student"} 👋
            </h1>

            <p>
              Here's your current placement overview.
            </p>
          </div>

        </div>

        <div className="dashboard-stats">

          <div className="stat-card">
            <span>Placement Readiness</span>
            <strong>78%</strong>
          </div>

          <div className="stat-card">
            <span>Resume Score</span>
            <strong>82%</strong>
          </div>

          <div className="stat-card">
            <span>Eligible Companies</span>
            <strong>12</strong>
          </div>

          <div className="stat-card">
            <span>Active Drives</span>
            <strong>5</strong>
          </div>

        </div>

        <div className="dashboard-grid">

          <section className="dashboard-panel">

            <h2>Placement Readiness</h2>

            <div className="readiness-score">
              78%
            </div>

            <p>
              Your profile is progressing well. Focus on
              improving DSA and problem-solving skills.
            </p>

            <button>
              View Readiness Roadmap
            </button>

          </section>

          <section className="dashboard-panel">

            <h2>Skill Gaps</h2>

            <div className="skill">
              <span>Python</span>
              <span>85%</span>
            </div>

            <div className="skill">
              <span>SQL</span>
              <span>90%</span>
            </div>

            <div className="skill">
              <span>DSA</span>
              <span>60%</span>
            </div>

            <div className="skill">
              <span>Communication</span>
              <span>70%</span>
            </div>

          </section>

        </div>

        <section className="dashboard-panel">

          <h2>Eligible Placement Drives</h2>

          <div className="drive-card">

            <div>
              <h3>Software Engineer</h3>
              <p>Campus Recruitment Drive</p>
            </div>

            <span className="eligible">
              Eligible
            </span>

            <button>
              View Details
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default StudentDashboard;