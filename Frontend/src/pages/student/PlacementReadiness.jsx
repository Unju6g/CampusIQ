import React from "react";
import { useNavigate } from "react-router-dom";
import "./PlacementReadiness.css";

const PlacementReadiness = () => {
  const navigate = useNavigate();

  // Replace these values with your backend/API values later
  const overallScore = 72;
  const previousScore = 67;

  const scoreBreakdown = [
    {
      title: "Resume Score",
      score: 78,
      description: "Resume quality and completeness",
      route: "/student/resume",
      action: "Improve Resume",
    },
    {
      title: "Skills Score",
      score: 65,
      description: "Technical skills and proficiency",
      route: "/student/skills",
      action: "Improve Skills",
    },
    {
      title: "Projects Score",
      score: 80,
      description: "Projects and practical experience",
      route: "/student/projects",
      action: "Improve Projects",
    },
    {
      title: "Certifications Score",
      score: 60,
      description: "Certifications and completed courses",
      route: "/student/certifications",
      action: "Add Certifications",
    },
  ];

  const getZone = (score) => {
    if (score <= 40) return "danger";
    if (score <= 70) return "warning";
    return "success";
  };

  const getZoneText = (score) => {
    if (score <= 40) return "Needs Improvement";
    if (score <= 70) return "Getting There";
    return "Good Readiness";
  };

  const trend = overallScore - previousScore;

  return (
    <div className="readiness-page">
      {/* PAGE HEADER */}
      <div className="readiness-header">
        <h1>Placement Readiness</h1>
        <p>Track your preparation for campus placements.</p>
      </div>

      {/* MAIN READINESS CARD */}
      <section className="main-readiness-card">
        <div className="readiness-score-section">
          <div className="score-label">
            <span>Your</span>
            <span>Readiness</span>
            <span>Score</span>
          </div>

          <div className="score-value">
            {overallScore}%
          </div>

          {/* TREND */}
          <div className="trend-box">
            <span className={trend >= 0 ? "trend-up" : "trend-down"}>
              {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%
            </span>

            <span className="trend-text">
              since last update
            </span>
          </div>
        </div>

        {/* MAIN PROGRESS BAR */}
        <div className="main-progress-area">
          <div className="zone-labels">
            <span className="zone-red">Needs Work</span>
            <span className="zone-yellow">Developing</span>
            <span className="zone-green">Ready</span>
          </div>

          <div className="zone-progress-bar">
            <div className="red-zone"></div>
            <div className="yellow-zone"></div>
            <div className="green-zone"></div>

            <div
              className={`score-progress ${getZone(overallScore)}`}
              style={{ width: `${overallScore}%` }}
            ></div>
          </div>

          <div className="score-description">
            <strong>{getZoneText(overallScore)}</strong>
            <span>
              Keep improving your skills, projects and resume.
            </span>
          </div>
        </div>
      </section>

      {/* SCORE BREAKDOWN */}
      <section className="breakdown-section">
        <div className="section-heading">
          <div>
            <h2>Score Breakdown</h2>
            <p>
              See what contributes to your overall placement readiness.
            </p>
          </div>

          <div className="overall-small-score">
            Overall <strong>{overallScore}%</strong>
          </div>
        </div>

        <div className="breakdown-grid">
          {scoreBreakdown.map((item) => (
            <div className="breakdown-card" key={item.title}>
              <div className="breakdown-top">
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <div className="breakdown-score">
                  {item.score}%
                </div>
              </div>

              <div className="mini-progress-track">
                <div
                  className={`mini-progress ${getZone(item.score)}`}
                  style={{ width: `${item.score}%` }}
                ></div>
              </div>

              <div className="breakdown-bottom">
                <span className={`status-text ${getZone(item.score)}`}>
                  {getZoneText(item.score)}
                </span>

                <button
                  className="small-action-btn"
                  onClick={() => navigate(item.route)}
                >
                  {item.action}
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* IMPROVE YOUR SCORE */}
      <section className="improve-section">
        <div className="improve-header">
          <div className="improve-icon">↑</div>

          <div>
            <h2>Improve Your Score</h2>
            <p>
              Focus on these areas to increase your placement readiness.
            </p>
          </div>
        </div>

        <div className="quick-links">
          <button
            className="quick-link"
            onClick={() => navigate("/student/skills")}
          >
            <div className="quick-icon">⚡</div>

            <div className="quick-content">
              <strong>Improve Skills</strong>
              <span>
                Add skills and update your proficiency levels.
              </span>
            </div>

            <span className="quick-arrow">→</span>
          </button>

          <button
            className="quick-link"
            onClick={() => navigate("/student/projects")}
          >
            <div className="quick-icon">◆</div>

            <div className="quick-content">
              <strong>Add Projects</strong>
              <span>
                Showcase your academic and practical projects.
              </span>
            </div>

            <span className="quick-arrow">→</span>
          </button>

          <button
            className="quick-link"
            onClick={() => navigate("/student/resume")}
          >
            <div className="quick-icon">▣</div>

            <div className="quick-content">
              <strong>Analyze Resume</strong>
              <span>
                Upload your resume and check your readiness.
              </span>
            </div>

            <span className="quick-arrow">→</span>
          </button>
        </div>
      </section>

      {/* SCORE GUIDE */}
      <section className="score-guide">
        <div className="guide-title">
          <span className="guide-icon">i</span>

          <div>
            <h3>Readiness Score Guide</h3>
            <p>
              Your score is calculated from your resume, skills,
              projects and certifications.
            </p>
          </div>
        </div>

        <div className="guide-zones">
          <div className="guide-zone">
            <span className="guide-dot red"></span>
            <div>
              <strong>0–40%</strong>
              <small>Needs Improvement</small>
            </div>
          </div>

          <div className="guide-zone">
            <span className="guide-dot yellow"></span>
            <div>
              <strong>41–70%</strong>
              <small>Developing</small>
            </div>
          </div>

          <div className="guide-zone">
            <span className="guide-dot green"></span>
            <div>
              <strong>71–100%</strong>
              <small>Good Readiness</small>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlacementReadiness;