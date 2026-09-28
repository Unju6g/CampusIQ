import React from "react";
import { useNavigate } from "react-router-dom";
import "./Applications.css";

function Applications() {

  const applications = [
    {
      student: "Rahul Patil",
      company: "TechNova Solutions",
      role: "Software Engineer",
      date: "25 Aug 2026",
      status: "Shortlisted",
    },
    {
      student: "Priya Sharma",
      company: "DataSphere Technologies",
      role: "Data Analyst",
      date: "24 Aug 2026",
      status: "Under Review",
    },
    {
      student: "Amit Joshi",
      company: "CloudCore Systems",
      role: "Cloud Engineer",
      date: "22 Aug 2026",
      status: "Applied",
    },
  ];

  return (
    <div className="tpo-page">

      <div className="tpo-page-header">

        <div>

          <span className="page-label">
            TPO / ADMIN PORTAL
          </span>

          <h1>Applications</h1>

          <p>
            Track and manage student placement applications.
          </p>

        </div>

      </div>

      <section className="tpo-panel">

        <div className="panel-header">

          <div>
            <h2>Student Applications</h2>
            <p>
              Review applications submitted for placement drives.
            </p>
          </div>

          <select className="tpo-select">
            <option>All Statuses</option>
            <option>Applied</option>
            <option>Under Review</option>
            <option>Shortlisted</option>
            <option>Rejected</option>
          </select>

        </div>

        <div className="tpo-table-wrapper">

          <table className="tpo-table">

            <thead>

              <tr>
                <th>Student</th>
                <th>Company</th>
                <th>Role</th>
                <th>Applied On</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {applications.map((application, index) => (

                <tr key={index}>

                  <td>

                    <div className="person-cell">

                      <div className="avatar avatar-orange">
                        {application.student.charAt(0)}
                      </div>

                      <strong>
                        {application.student}
                      </strong>

                    </div>

                  </td>

                  <td>
                    {application.company}
                  </td>

                  <td>
                    {application.role}
                  </td>

                  <td>
                    {application.date}
                  </td>

                  <td>

                    <span
                      className={`status-pill ${
                        application.status === "Shortlisted"
                          ? "status-orange"
                          : application.status === "Applied"
                          ? "status-blue"
                          : "status-outline"
                      }`}
                    >
                      {application.status}
                    </span>

                  </td>

                  <td>

                    <button className="table-button">
                      Review
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
}

export default Applications;