import React, { useMemo, useState } from "react";
import "./Eligibility.css";

function Eligibility() {
  const [selectedCompany, setSelectedCompany] = useState(
    "TechNova Solutions"
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const companies = {
    "TechNova Solutions": {
      requiredCgpa: 7.0,
      requiredSkills: ["Python", "SQL", "React", "Git", "JavaScript"],
    },
    "DataSphere Technologies": {
      requiredCgpa: 6.5,
      requiredSkills: ["Python", "SQL", "Machine Learning"],
    },
    "CloudCore Systems": {
      requiredCgpa: 7.2,
      requiredSkills: ["AWS", "Python", "Docker", "Linux"],
    },
  };

  const students = [
    {
      name: "Rahul Patil",
      cgpa: 8.2,
      skills: ["Python", "SQL", "React", "Git"],
    },
    {
      name: "Priya Sharma",
      cgpa: 7.8,
      skills: ["Python", "SQL", "React", "JavaScript", "Git"],
    },
    {
      name: "Amit Joshi",
      cgpa: 6.9,
      skills: ["Python", "SQL", "HTML"],
    },
    {
      name: "Sneha Kulkarni",
      cgpa: 8.6,
      skills: ["Python", "SQL", "React", "Git", "JavaScript"],
    },
    {
      name: "Riya Deshmukh",
      cgpa: 7.4,
      skills: ["Python", "SQL", "Git"],
    },
  ];

  const company = companies[selectedCompany];

  const processedStudents = useMemo(() => {
    return students.map((student) => {
      const matchedSkills = company.requiredSkills.filter((skill) =>
        student.skills.some(
          (studentSkill) =>
            studentSkill.toLowerCase() === skill.toLowerCase()
        )
      );

      const eligible =
        student.cgpa >= company.requiredCgpa &&
        matchedSkills.length === company.requiredSkills.length;

      return {
        ...student,
        matchedSkills,
        requiredSkillsCount: company.requiredSkills.length,
        eligible,
      };
    });
  }, [selectedCompany, company]);

  const filteredStudents = processedStudents.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Eligible" && student.eligible) ||
      (statusFilter === "Not Eligible" && !student.eligible);

    return matchesSearch && matchesStatus;
  });

  const eligibleCount = processedStudents.filter(
    (student) => student.eligible
  ).length;

  const notEligibleCount = processedStudents.length - eligibleCount;

  const eligibilityRate =
    processedStudents.length > 0
      ? ((eligibleCount / processedStudents.length) * 100).toFixed(1)
      : "0.0";

  const getInitial = (name) => {
    return name.charAt(0).toUpperCase();
  };

  const getAvatarClass = (index) => {
    const classes = [
      "avatar-blue",
      "avatar-purple",
      "avatar-green",
      "avatar-orange",
      "avatar-pink",
    ];

    return classes[index % classes.length];
  };

  const getCgpaClass = (cgpa) => {
    if (cgpa >= company.requiredCgpa) {
      return "cgpa-good";
    }

    if (cgpa >= company.requiredCgpa - 0.5) {
      return "cgpa-warning";
    }

    return "cgpa-danger";
  };

  return (
    <div className="eligibility-page">

      {/* PAGE HEADER */}
      <div className="eligibility-header">
        <div>
          <span className="page-label">TPO / ADMIN PORTAL</span>

          <h1>Eligibility</h1>

          <p>
            Check student eligibility for placement drives based on
            CGPA and required skills.
          </p>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="eligibility-stats">

        <div className="eligibility-stat-card eligible-stat">
          <div className="stat-label">
            Eligible Students
          </div>

          <div className="stat-number">
            {eligibleCount}
          </div>

          <div className="stat-caption">
            Students meeting all requirements
          </div>
        </div>

        <div className="eligibility-stat-card not-eligible-stat">
          <div className="stat-label">
            Not Eligible
          </div>

          <div className="stat-number">
            {notEligibleCount}
          </div>

          <div className="stat-caption">
            Students requiring improvement
          </div>
        </div>

        <div className="eligibility-stat-card rate-stat">
          <div className="stat-label">
            Eligibility Rate
          </div>

          <div className="stat-number">
            {eligibilityRate}%
          </div>

          <div className="mini-progress">
            <div
              className="mini-progress-fill"
              style={{ width: `${eligibilityRate}%` }}
            />
          </div>
        </div>

      </div>

      {/* MAIN PANEL */}
      <section className="tpo-panel eligibility-panel">

        {/* PANEL HEADER */}
        <div className="eligibility-panel-header">

          <div>
            <h2>Eligibility Checker</h2>

            <p>
              Student eligibility based on CGPA and required skills.
            </p>
          </div>

          <div className="company-selector">

            <label htmlFor="company">
              Select Company
            </label>

            <div className="select-wrapper">

              <select
                id="company"
                value={selectedCompany}
                onChange={(e) =>
                  setSelectedCompany(e.target.value)
                }
              >
                {Object.keys(companies).map((companyName) => (
                  <option
                    key={companyName}
                    value={companyName}
                  >
                    {companyName}
                  </option>
                ))}
              </select>

            </div>

          </div>

        </div>

        {/* REQUIREMENT INFO */}
        <div className="requirements-box">

          <div className="requirement-item">
            <span>Minimum CGPA</span>
            <strong>{company.requiredCgpa}</strong>
          </div>

          <div className="requirement-divider" />

          <div className="requirement-item">
            <span>Required Skills</span>

            <strong>
              {company.requiredSkills.length} skills
            </strong>
          </div>

          <div className="required-skills">
            {company.requiredSkills.map((skill) => (
              <span key={skill} className="required-skill-tag">
                {skill}
              </span>
            ))}
          </div>

        </div>

        {/* SEARCH / FILTER */}
        <div className="eligibility-toolbar">

          <div className="search-wrapper">
            <span className="search-icon">⌕</span>

            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="filter-wrapper">

            <label htmlFor="statusFilter">
              Status
            </label>

            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="All">All Students</option>
              <option value="Eligible">Eligible</option>
              <option value="Not Eligible">
                Not Eligible
              </option>
            </select>

          </div>

        </div>

        {/* TABLE */}
        <div className="eligibility-table-wrapper">

          <table className="eligibility-table">

            <thead>
              <tr>
                <th>STUDENT</th>
                <th>CGPA</th>
                <th>SKILLS MATCHED</th>
                <th>STATUS</th>
              </tr>
            </thead>

            <tbody>

              {filteredStudents.length > 0 ? (

                filteredStudents.map((student, index) => (

                  <tr key={student.name}>

                    {/* STUDENT */}
                    <td>
                      <div className="student-cell">

                        <div
                          className={`student-avatar ${getAvatarClass(
                            index
                          )}`}
                        >
                          {getInitial(student.name)}
                        </div>

                        <div className="student-info">
                          <strong>
                            {student.name}
                          </strong>

                          <span>
                            Student
                          </span>
                        </div>

                      </div>
                    </td>

                    {/* CGPA */}
                    <td>
                      <div className="cgpa-cell">

                        <strong
                          className={getCgpaClass(
                            student.cgpa
                          )}
                        >
                          {student.cgpa.toFixed(1)}
                        </strong>

                        <span>
                          / {company.requiredCgpa.toFixed(1)} req.
                        </span>

                      </div>
                    </td>

                    {/* SKILLS */}
                    <td>

                      <div className="skills-match">

                        <div className="skills-count">
                          <strong>
                            {student.matchedSkills.length}
                          </strong>

                          <span>
                            / {student.requiredSkillsCount} matched
                          </span>
                        </div>

                        <div className="skill-progress">
                          <div
                            className="skill-progress-fill"
                            style={{
                              width: `${
                                (student.matchedSkills.length /
                                  student.requiredSkillsCount) *
                                100
                              }%`,
                            }}
                          />
                        </div>

                      </div>

                    </td>

                    {/* STATUS */}
                    <td>

                      {student.eligible ? (

                        <span className="eligibility-badge eligible-badge">
                          <span>✓</span>
                          Eligible
                        </span>

                      ) : (

                        <span className="eligibility-badge not-eligible-badge">
                          <span>✕</span>
                          Not Eligible
                        </span>

                      )}

                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td
                    colSpan="4"
                    className="empty-table"
                  >
                    <div className="empty-icon">
                      ⌕
                    </div>

                    <strong>
                      No students found
                    </strong>

                    <span>
                      Try changing your search or filter.
                    </span>
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* FOOTER */}
        <div className="eligibility-footer">

          Showing{" "}
          <strong>{filteredStudents.length}</strong>{" "}
          of{" "}
          <strong>{processedStudents.length}</strong>{" "}
          students

        </div>

      </section>

    </div>
  );
}

export default Eligibility;