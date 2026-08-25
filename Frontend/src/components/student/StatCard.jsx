import React from "react";

function StatCard({ icon, title, value, subtitle }) {
  return (
    <div className="stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <div className="stat-content">
        <span>{title}</span>
        <h2>{value}</h2>
        <p>{subtitle}</p>
      </div>

    </div>
  );
}

export default StatCard;