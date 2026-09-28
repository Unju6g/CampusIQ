import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Placement-drives.css";

function PlacementDrives() {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);

  const [drives, setDrives] = useState([
    {
      company: "TechNova Solutions",
      role: "Software Engineer",
      package: "₹8.5 LPA",
      location: "Pune",
      deadline: "15 Sep 2026",
      status: "Active",
    },
    {
      company: "DataSphere Technologies",
      role: "Data Analyst",
      package: "₹7.2 LPA",
      location: "Bangalore",
      deadline: "22 Sep 2026",
      status: "Upcoming",
    },
  ]);

  const [form, setForm] = useState({
    company: "",
    role: "",
    package: "",
    location: "",
    deadline: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createDrive = (e) => {
    e.preventDefault();

    if (
      !form.company.trim() ||
      !form.role.trim() ||
      !form.package.trim() ||
      !form.location.trim() ||
      !form.deadline
    ) {
      alert("Please fill all fields.");
      return;
    }

    const formattedDeadline = new Date(
      form.deadline
    ).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const newDrive = {
      company: form.company,
      role: form.role,
      package: form.package,
      location: form.location,
      deadline: formattedDeadline,
      status: "Upcoming",
    };

    setDrives((prev) => [...prev, newDrive]);

    setForm({
      company: "",
      role: "",
      package: "",
      location: "",
      deadline: "",
    });

    setShowForm(false);
  };

  return (
    <div className="tpo-page">

      {/* ================= HEADER ================= */}

      <div className="tpo-page-header">

        <div>
          <span className="page-label">
            TPO / ADMIN PORTAL
          </span>

          <h1>Placement Drives</h1>

          <p>
            Create and manage campus placement opportunities.
          </p>
        </div>

        <div className="header-actions">

          <button
            className="secondary-button"
            onClick={() => navigate("/admin/dashboard")}
          >
            ← Dashboard
          </button>

          <button
            className="primary-button"
            onClick={() => setShowForm((prev) => !prev)}
          >
            {showForm
              ? "✕ Close"
              : "+ Create Placement Drive"}
          </button>

        </div>

      </div>

      {/* ================= CREATE FORM ================= */}

      {showForm && (
        <section className="tpo-panel create-drive-panel">

          <div className="panel-header">
            <div>
              <h2>Create Placement Drive</h2>

              <p>
                Add a new placement opportunity for eligible students.
              </p>
            </div>
          </div>

          <form
            className="drive-form"
            onSubmit={createDrive}
          >

            <div className="form-group">
              <label htmlFor="company">
                Company Name
              </label>

              <input
                id="company"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Company name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">
                Job Role
              </label>

              <input
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="Software Engineer"
              />
            </div>

            <div className="form-group">
              <label htmlFor="package">
                Package
              </label>

              <input
                id="package"
                name="package"
                value={form.package}
                onChange={handleChange}
                placeholder="₹8 LPA"
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">
                Location
              </label>

              <input
                id="location"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Pune"
              />
            </div>

            <div className="form-group">
              <label htmlFor="deadline">
                Application Deadline
              </label>

              <input
                id="deadline"
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
              />
            </div>

            <div className="form-actions">

              <button
                type="button"
                className="secondary-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                className="primary-button"
                type="submit"
              >
                Create Drive →
              </button>

            </div>

          </form>

        </section>
      )}

      {/* ================= DRIVES TABLE ================= */}

      <section className="tpo-panel">

        <div className="panel-header">

          <div>
            <h2>All Placement Drives</h2>

            <p>
              Monitor active and upcoming placement drives.
            </p>
          </div>

          <span className="drive-count">
            {drives.length} Drives
          </span>

        </div>

        <div className="tpo-table-wrapper">

          <table className="tpo-table">

            <thead>
              <tr>
                <th>Company / Role</th>
                <th>Package</th>
                <th>Location</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {drives.map((drive, index) => (

                <tr key={index}>

                  <td>
                    <div className="drive-name">

                      <div className="drive-avatar">
                        {drive.company.charAt(0)}
                      </div>

                      <div>
                        <strong>
                          {drive.company}
                        </strong>

                        <span>
                          {drive.role}
                        </span>
                      </div>

                    </div>
                  </td>

                  <td>
                    <strong>
                      {drive.package}
                    </strong>
                  </td>

                  <td>
                    {drive.location}
                  </td>

                  <td>
                    {drive.deadline}
                  </td>

                  <td>
                    <span
                      className={`status-pill ${
                        drive.status === "Active"
                          ? "status-green"
                          : "status-orange"
                      }`}
                    >
                      {drive.status === "Active"
                        ? "● Active"
                        : "● Upcoming"}
                    </span>
                  </td>

                  <td>
                    <button
                      className="table-button"
                      onClick={() =>
                        alert(
                          `Managing ${drive.company} - ${drive.role}`
                        )
                      }
                    >
                      Manage →
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        <div className="table-footer">
          Showing {drives.length} placement drives
        </div>

      </section>

    </div>
  );
}

export default PlacementDrives;