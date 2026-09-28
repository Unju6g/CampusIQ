import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Students.css";

function Students() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [departmentFilter, setDepartmentFilter] =
    useState("All Departments");

  const students = [
    {
      id: 1,
      name: "Rahul Patil",
      department: "Electronics & Computer Engineering",
      year: "3rd Year",
      cgpa: "8.67",
      applications: 4,
      status: "Placed",
    },
    {
      id: 2,
      name: "Priya Sharma",
      department: "Computer Engineering",
      year: "3rd Year",
      cgpa: "8.45",
      applications: 5,
      status: "Active",
    },
    {
      id: 3,
      name: "Amit Joshi",
      department: "Information Technology",
      year: "3rd Year",
      cgpa: "7.92",
      applications: 3,
      status: "Active",
    },
    {
      id: 4,
      name: "Sneha Kulkarni",
      department: "Electronics Engineering",
      year: "3rd Year",
      cgpa: "8.21",
      applications: 2,
      status: "Active",
    },
    {
      id: 5,
      name: "Aditya Deshmukh",
      department: "Computer Engineering",
      year: "4th Year",
      cgpa: "8.76",
      applications: 6,
      status: "Placed",
    },
  ];

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      student.department
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" ||
      student.status === statusFilter;

    const matchesDepartment =
      departmentFilter === "All Departments" ||
      student.department === departmentFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesDepartment
    );
  });

  const getInitial = (name) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="students-page">

      {/* PAGE HEADER */}
      <div className="students-header">

        <div>
          <span className="students-label">
            TPO / ADMIN PORTAL
          </span>

          <h1>Students</h1>

          <p>
            Manage student profiles and placement activity.
          </p>
        </div>

        <button
          className="back-dashboard-btn"
          onClick={() => navigate("/admin/dashboard")}
        >
          ← Dashboard
        </button>

      </div>


      {/* STAT CARDS */}
      <section className="student-stats">

        <div className="student-stat-card">
          <div className="student-stat-icon blue">
            ♙
          </div>

          <div>
            <span>Total Students</span>
            <strong>642</strong>
          </div>
        </div>


        <div className="student-stat-card">
          <div className="student-stat-icon green">
            ✓
          </div>

          <div>
            <span>Placed Students</span>
            <strong>286</strong>
          </div>
        </div>


        <div className="student-stat-card">
          <div className="student-stat-icon purple">
            ★
          </div>

          <div>
            <span>Placement Rate</span>
            <strong>44.5%</strong>
          </div>
        </div>

      </section>


      {/* MAIN PANEL */}
      <section className="students-panel">

        <div className="students-panel-header">

          <div>
            <h2>Student Directory</h2>

            <p>
              View and manage registered students.
            </p>
          </div>

        </div>


        {/* FILTERS */}
        <div className="students-filters">

          <div className="student-search">

            <span className="search-icon">
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Placed</option>
          </select>


          <select
            value={departmentFilter}
            onChange={(e) =>
              setDepartmentFilter(e.target.value)
            }
          >
            <option>All Departments</option>
            <option>
              Electronics & Computer Engineering
            </option>
            <option>
              Computer Engineering
            </option>
            <option>
              Information Technology
            </option>
            <option>
              Electronics Engineering
            </option>
          </select>

        </div>


        {/* TABLE */}
        <div className="students-table-wrapper">

          <table className="students-table">

            <thead>
              <tr>
                <th>STUDENT</th>
                <th>DEPARTMENT</th>
                <th>YEAR</th>
                <th>CGPA</th>
                <th>APPLICATIONS</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>


            <tbody>

              {filteredStudents.length === 0 ? (

                <tr>
                  <td
                    colSpan="7"
                    className="no-students"
                  >
                    No students found.
                  </td>
                </tr>

              ) : (

                filteredStudents.map((student) => (

                  <tr key={student.id}>

                    {/* STUDENT */}
                    <td>

                      <div className="student-cell">

                        <div className="student-avatar">
                          {getInitial(student.name)}
                        </div>

                        <div className="student-info">

                          <strong>
                            {student.name}
                          </strong>

                          <span>
                            Student ID: STU00
                            {student.id}
                          </span>

                        </div>

                      </div>

                    </td>


                    {/* DEPARTMENT */}
                    <td>
                      <span className="department-text">
                        {student.department}
                      </span>
                    </td>


                    {/* YEAR */}
                    <td>
                      {student.year}
                    </td>


                    {/* CGPA */}
                    <td>

                      <strong className="cgpa">
                        {student.cgpa}
                      </strong>

                    </td>


                    {/* APPLICATIONS */}
                    <td>

                      <span className="application-count">
                        {student.applications}
                      </span>

                    </td>


                    {/* STATUS */}
                    <td>

                      <span
                        className={`student-status ${
                          student.status === "Placed"
                            ? "placed"
                            : "active"
                        }`}
                      >
                        {student.status === "Placed"
                          ? "✓ "
                          : "● "}
                        {student.status}
                      </span>

                    </td>


                    {/* ACTION */}
                    <td>

                      <button
                        className="view-student-btn"
                        onClick={() =>
                          alert(
                            `Student: ${student.name}`
                          )
                        }
                      >
                        View →
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>


        {/* FOOTER */}
        <div className="students-footer">

          <span>
            Showing {filteredStudents.length} of{" "}
            {students.length} students
          </span>

          <div className="footer-pages">

            <button disabled>
              Previous
            </button>

            <span className="page-number">
              1
            </span>

            <button>
              Next →
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Students;