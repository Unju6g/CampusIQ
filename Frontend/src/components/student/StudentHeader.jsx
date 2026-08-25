import React from "react";

function StudentHeader() {
  return (
    <header className="student-header">

      <div>
        <h2>Student Dashboard</h2>
        <p>CampusIQ Placement Management</p>
      </div>

      <div className="header-profile">
        <div className="header-avatar">
          G
        </div>

        <div>
          <strong>Student</strong>
          <span>Student</span>
        </div>
      </div>

    </header>
  );
}

export default StudentHeader;