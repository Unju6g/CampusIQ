import React from "react";

function ProfileProgress() {
  const progress = 75;

  return (
    <div className="dashboard-card">

      <div className="card-header">
        <h2>Profile Completion</h2>
        <span>{progress}%</span>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="progress-text">
        Complete your profile to improve your placement opportunities.
      </p>

      <a
        href="/student/profile"
        className="primary-button"
      >
        Complete Profile
      </a>

    </div>
  );
}

export default ProfileProgress;