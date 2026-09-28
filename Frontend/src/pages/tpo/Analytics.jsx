import React from "react";
import { useNavigate } from "react-router-dom";
import "./Analytics.css";

function Analytics() {
  const navigate = useNavigate();

  const handleExport = () => {
    const report = `
CampusIQ Placement Analytics Report

Placement Rate: 44.5%
Students Placed: 286
Total Students: 642
Companies: 32
Active Drives: 18

Placement Status
Placed: 286
In Process: 142
Not Placed: 214

Top Recruiting Companies
TechNova Solutions: 64
DataSphere Technologies: 51
CloudCore Systems: 43
Infosys: 38
    `.trim();

    const blob = new Blob([report], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "CampusIQ-Analytics-Report.txt";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const stats = [
    {
      label: "Placement Rate",
      value: "44.5%",
      change: "5.2%",
      description: "vs last year",
      icon: "↗",
    },
    {
      label: "Students Placed",
      value: "286",
      change: "8%",
      description: "vs last month",
      icon: "✓",
    },
    {
      label: "Companies",
      value: "32",
      change: "5",
      description: "new companies",
      icon: "▣",
    },
    {
      label: "Active Drives",
      value: "18",
      change: "4%",
      description: "vs last month",
      icon: "◈",
    },
  ];

  const companies = [
    {
      name: "TechNova Solutions",
      students: 64,
      percentage: 100,
    },
    {
      name: "DataSphere Technologies",
      students: 51,
      percentage: 80,
    },
    {
      name: "CloudCore Systems",
      students: 43,
      percentage: 67,
    },
    {
      name: "Infosys",
      students: 38,
      percentage: 59,
    },
  ];

  return (
    <div className="analytics-page">

      {/* ================= HEADER ================= */}

      <header className="analytics-header">

        <div className="analytics-header-left">
          <span className="analytics-label">
            TPO / ADMIN PORTAL
          </span>

          <h1>Analytics</h1>

          <p>
            Analyze placement performance and recruitment trends.
          </p>
        </div>

        <div className="analytics-header-actions">

          <button
            type="button"
            className="analytics-back-btn"
            onClick={() => navigate("/admin/dashboard")}
          >
            <span>←</span>
            Dashboard
          </button>

          <button
            type="button"
            className="analytics-export-btn"
            onClick={handleExport}
          >
            <span>↓</span>
            Export Report
          </button>

        </div>

      </header>


      {/* ================= STAT CARDS ================= */}

      <section className="analytics-stats">

        {stats.map((stat, index) => (
          <div
            className="analytics-stat-card"
            key={index}
          >

            <div className="analytics-stat-top">

              <span className="analytics-stat-label">
                {stat.label}
              </span>

              <span className="analytics-stat-icon">
                {stat.icon}
              </span>

            </div>

            <div className="analytics-stat-value">
              {stat.value}
            </div>

            <div className="analytics-stat-bottom">

              <span className="analytics-stat-change">
                ↑ {stat.change}
              </span>

              <span className="analytics-stat-description">
                {stat.description}
              </span>

            </div>

          </div>
        ))}

      </section>


      {/* ================= PLACEMENT PROGRESS ================= */}

      <section className="analytics-panel">

        <div className="analytics-panel-header">

          <div>
            <h2>Placement Progress</h2>

            <p>
              Overall student placement progress.
            </p>
          </div>

          <div className="analytics-panel-value">
            44.5%
          </div>

        </div>

        <div className="analytics-progress-section">

          <div className="analytics-progress-info">

            <strong>286</strong>

            <span>
              students placed
            </span>

            <span className="analytics-divider">
              /
            </span>

            <strong>642</strong>

            <span>
              total students
            </span>

          </div>

          <div className="analytics-progress-track">

            <div
              className="analytics-progress-fill"
              style={{ width: "44.5%" }}
            ></div>

          </div>

        </div>

      </section>


      {/* ================= TWO COLUMN SECTION ================= */}

      <section className="analytics-grid">

        {/* PLACEMENT STATUS */}

        <div className="analytics-panel analytics-status-panel">

          <div className="analytics-panel-header">

            <div>
              <h2>Placement Status</h2>

              <p>
                Current student placement distribution.
              </p>
            </div>

          </div>

          <div className="analytics-status-list">

            <div className="analytics-status-item">

              <div className="analytics-status-name">
                <span className="analytics-dot analytics-dot-green"></span>
                Placed
              </div>

              <strong>286</strong>

            </div>

            <div className="analytics-status-item">

              <div className="analytics-status-name">
                <span className="analytics-dot analytics-dot-blue"></span>
                In Process
              </div>

              <strong>142</strong>

            </div>

            <div className="analytics-status-item">

              <div className="analytics-status-name">
                <span className="analytics-dot analytics-dot-gray"></span>
                Not Placed
              </div>

              <strong>214</strong>

            </div>

          </div>

        </div>


        {/* PLACEMENT TREND */}

        <div className="analytics-panel">

          <div className="analytics-panel-header">

            <div>
              <h2>Placement Trend</h2>

              <p>
                Students placed throughout the year.
              </p>
            </div>

            <span className="analytics-trend-value">
              +12.4%
            </span>

          </div>

          <div className="analytics-chart">

            <div className="analytics-y-labels">
              <span>300</span>
              <span>200</span>
              <span>100</span>
              <span>0</span>
            </div>

            <div className="analytics-chart-area">

              <div className="analytics-chart-line">

                <div className="analytics-point p1"></div>
                <div className="analytics-point p2"></div>
                <div className="analytics-point p3"></div>
                <div className="analytics-point p4"></div>
                <div className="analytics-point p5"></div>
                <div className="analytics-point p6"></div>

              </div>

              <div className="analytics-chart-grid-line line-1"></div>
              <div className="analytics-chart-grid-line line-2"></div>
              <div className="analytics-chart-grid-line line-3"></div>
              <div className="analytics-chart-grid-line line-4"></div>

            </div>

          </div>

          <div className="analytics-months">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>

        </div>

      </section>


      {/* ================= TOP COMPANIES ================= */}

      <section className="analytics-panel analytics-companies-panel">

        <div className="analytics-panel-header">

          <div>
            <h2>Top Recruiting Companies</h2>

            <p>
              Companies with the highest number of selected students.
            </p>
          </div>

          <button
            type="button"
            className="analytics-view-btn"
            onClick={() => navigate("/admin/companies")}
          >
            View Companies
            <span>→</span>
          </button>

        </div>


        <div className="analytics-company-list">

          {companies.map((company, index) => (

            <div
              className="analytics-company-row"
              key={index}
            >

              <div className="analytics-company-rank">
                {index + 1}
              </div>

              <div className="analytics-company-info">

                <strong>
                  {company.name}
                </strong>

                <div className="analytics-company-bar">

                  <div
                    className="analytics-company-bar-fill"
                    style={{
                      width: `${company.percentage}%`,
                    }}
                  ></div>

                </div>

              </div>

              <div className="analytics-company-count">
                <strong>
                  {company.students}
                </strong>

                <span>
                  students
                </span>
              </div>

            </div>

          ))}

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="analytics-footer">

        <span>
          CampusIQ Placement Analytics
        </span>

        <span>
          Updated for 2026 placement cycle
        </span>

      </footer>

    </div>
  );
}

export default Analytics;