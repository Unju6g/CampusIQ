import React, { useEffect, useMemo, useState } from "react";
import "./EligibleDrives.css";

const defaultDrives = [
  {
    id: "tcs-software-developer",
    company: "TCS",
    role: "Software Developer",
    logo: "TCS",
    type: "Campus",
    package: 7.5,
    location: "Pune",
    minCGPA: 7.0,
    deadline: "2026-09-02",
    requiredSkills: ["Python", "SQL", "React.js"],
    description:
      "Software development opportunity for students interested in application development.",
  },
  {
    id: "infosys-data-analyst",
    company: "Infosys",
    role: "Data Analyst",
    logo: "INF",
    type: "Campus",
    package: 6.5,
    location: "Pune",
    minCGPA: 7.5,
    deadline: "2026-09-05",
    requiredSkills: ["Python", "SQL", "Power BI", "Excel"],
    description:
      "Data analytics role involving data preparation, reporting and visualization.",
  },
  {
    id: "accenture-developer",
    company: "Accenture",
    role: "Associate Software Engineer",
    logo: "ACC",
    type: "Off-Campus",
    package: 8.0,
    location: "Mumbai",
    minCGPA: 7.5,
    deadline: "2026-09-15",
    requiredSkills: ["Java", "SQL", "Git", "JavaScript"],
    description:
      "Technology role focused on software development and enterprise applications.",
  },
  {
    id: "wipro-python",
    company: "Wipro",
    role: "Python Developer",
    logo: "WIP",
    type: "Campus",
    package: 5.5,
    location: "Bangalore",
    minCGPA: 6.5,
    deadline: "2026-09-20",
    requiredSkills: ["Python", "Django", "SQL"],
    description:
      "Python development opportunity for students interested in backend development.",
  },
];

const getStoredArray = (keys) => {
  for (const key of keys) {
    try {
      const value = localStorage.getItem(key);

      if (value) {
        const parsed = JSON.parse(value);

        if (Array.isArray(parsed)) {
          return parsed;
        }

        if (parsed && Array.isArray(parsed.data)) {
          return parsed.data;
        }

        if (parsed && Array.isArray(parsed.drives)) {
          return parsed.drives;
        }
      }
    } catch (error) {
      console.warn(`Could not read ${key} from localStorage`);
    }
  }

  return [];
};

const getStoredObject = (keys) => {
  for (const key of keys) {
    try {
      const value = localStorage.getItem(key);

      if (value) {
        return JSON.parse(value);
      }
    } catch (error) {
      console.warn(`Could not read ${key} from localStorage`);
    }
  }

  return null;
};

const normalizeSkill = (skill) => {
  if (!skill) return "";

  if (typeof skill === "string") {
    return skill.trim().toLowerCase();
  }

  return (
    skill.name ||
    skill.skill ||
    skill.title ||
    ""
  )
    .trim()
    .toLowerCase();
};

const isSkillMatching = (studentSkills, requiredSkill) => {
  const required = normalizeSkill(requiredSkill);

  if (!required) return false;

  return studentSkills.some((studentSkill) => {
    const current = normalizeSkill(studentSkill);

    return (
      current === required ||
      current.includes(required) ||
      required.includes(current)
    );
  });
};

const getDaysRemaining = (deadline) => {
  if (!deadline) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0);

  const difference =
    deadlineDate.getTime() - today.getTime();

  return Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  );
};

const formatDeadline = (deadline) => {
  if (!deadline) return "Not specified";

  const date = new Date(deadline);

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatPackage = (value) => {
  if (!value) return "Not specified";

  return `${value} LPA`;
};

function EligibleDrives({
  student,
  setActivePage,
}) {
  const [drives, setDrives] = useState([]);
  const [studentSkills, setStudentSkills] = useState([]);
  const [appliedDrives, setAppliedDrives] = useState([]);

  const [eligibilityFilter, setEligibilityFilter] =
    useState("all");

  const [locationFilter, setLocationFilter] =
    useState("all");

  const [packageFilter, setPackageFilter] =
    useState("all");

  const [sortBy, setSortBy] =
    useState("deadline");

  const [selectedDrive, setSelectedDrive] =
    useState(null);

  useEffect(() => {
    loadPlacementData();
  }, []);

  const loadPlacementData = () => {
    /*
      TPO drives can be saved using:

      localStorage.setItem(
        "placementDrives",
        JSON.stringify(drives)
      );

      In the final backend version, replace this
      localStorage section with an API call.
    */

    const tpoDrives = getStoredArray([
      "placementDrives",
      "placement_drives",
      "tpoPlacementDrives",
      "tpoDrives",
    ]);

    setDrives(
      tpoDrives.length > 0
        ? tpoDrives
        : defaultDrives
    );

    const savedSkills = getStoredArray([
      "studentSkills",
      "skills",
      "mySkills",
      "student_skills",
    ]);

    setStudentSkills(
      savedSkills.length > 0
        ? savedSkills
        : student?.skills || []
    );

    const savedApplications =
      getStoredArray([
        "appliedDrives",
        "studentApplications",
        "applications",
      ]);

    setAppliedDrives(savedApplications);
  };

  const getStudentCGPA = () => {
    const storedStudent =
      getStoredObject([
        "studentProfile",
        "student",
        "profile",
      ]);

    return Number(
      storedStudent?.cgpa ??
        student?.cgpa ??
        8.67
    );
  };

  const studentCGPA = getStudentCGPA();

  const checkEligibility = (drive) => {
    const requiredCGPA =
      Number(
        drive.minCGPA ??
          drive.minimumCGPA ??
          drive.cgpa ??
          0
      );

    return studentCGPA >= requiredCGPA;
  };

  const isApplied = (driveId) => {
    return appliedDrives.some((application) => {
      if (typeof application === "string") {
        return application === driveId;
      }

      return (
        application.driveId === driveId ||
        application.id === driveId ||
        application.placementDriveId === driveId
      );
    });
  };

  const locations = useMemo(() => {
    const uniqueLocations = [
      ...new Set(
        drives
          .map(
            (drive) =>
              drive.location ||
              drive.city ||
              "Not specified"
          )
          .filter(Boolean)
      ),
    ];

    return uniqueLocations;
  }, [drives]);

  const filteredAndSortedDrives = useMemo(() => {
    let result = [...drives];

    /*
      Eligibility filter
    */
    if (eligibilityFilter === "eligible") {
      result = result.filter((drive) =>
        checkEligibility(drive)
      );
    }

    if (eligibilityFilter === "not-eligible") {
      result = result.filter(
        (drive) => !checkEligibility(drive)
      );
    }

    /*
      Location filter
    */
    if (locationFilter !== "all") {
      result = result.filter((drive) => {
        const location =
          drive.location ||
          drive.city ||
          "Not specified";

        return location === locationFilter;
      });
    }

    /*
      Package filter
    */
    if (packageFilter !== "all") {
      const minimumPackage =
        Number(packageFilter);

      result = result.filter((drive) => {
        return (
          Number(
            drive.package ??
              drive.ctc ??
              drive.salary ??
              0
          ) >= minimumPackage
        );
      });
    }

    /*
      Sorting
    */
    result.sort((a, b) => {
      if (sortBy === "deadline") {
        return (
          new Date(a.deadline || "9999-12-31") -
          new Date(b.deadline || "9999-12-31")
        );
      }

      if (sortBy === "package") {
        return (
          Number(
            b.package ??
              b.ctc ??
              b.salary ??
              0
          ) -
          Number(
            a.package ??
              a.ctc ??
              a.salary ??
              0
          )
        );
      }

      return 0;
    });

    return result;
  }, [
    drives,
    eligibilityFilter,
    locationFilter,
    packageFilter,
    sortBy,
    studentCGPA,
  ]);

  const handleApply = (drive) => {
    if (!checkEligibility(drive)) {
      return;
    }

    if (isApplied(drive.id)) {
      return;
    }

    const application = {
      id: `${drive.id}-${Date.now()}`,
      driveId: drive.id,
      company: drive.company,
      role: drive.role,
      appliedAt: new Date().toISOString(),
      status: "Applied",
    };

    const updatedApplications = [
      ...appliedDrives,
      application,
    ];

    setAppliedDrives(updatedApplications);

    localStorage.setItem(
      "appliedDrives",
      JSON.stringify(updatedApplications)
    );

    alert(
      `Application submitted for ${drive.company} - ${drive.role}`
    );
  };

  const handleViewDetails = (drive) => {
    setSelectedDrive(drive);
  };

  const getDeadlineClass = (deadline) => {
    const days = getDaysRemaining(deadline);

    if (days !== null && days >= 0 && days <= 5) {
      return "deadline-urgent";
    }

    return "";
  };

  const getDeadlineMessage = (deadline) => {
    const days = getDaysRemaining(deadline);

    if (days === null) return "";

    if (days < 0) {
      return "Deadline passed";
    }

    if (days === 0) {
      return "Closing Today";
    }

    if (days === 1) {
      return "Closing Tomorrow";
    }

    if (days <= 5) {
      return "Closing Soon";
    }

    return "";
  };

  return (
    <main className="eligible-drives-page">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="drives-page-header">
        <div>
          <p className="drives-eyebrow">
            PLACEMENTS
          </p>

          <h1>
            Eligible Drives
          </h1>

          <p className="drives-subtitle">
            Check companies and placement drives you
            are eligible for.
          </p>
        </div>
      </div>

      {/* =========================================
          AVAILABLE DRIVES HEADER
      ========================================= */}

      <div className="drives-section-header">

        <div>
          <h2>
            Available Placement Drives
          </h2>

          <p>
            {filteredAndSortedDrives.length} drive
            {filteredAndSortedDrives.length !== 1
              ? "s"
              : ""}{" "}
            available
          </p>
        </div>

      </div>

      {/* =========================================
          FILTERS
      ========================================= */}

      <section className="drive-controls">

        <div className="filter-group">

          <label>
            Eligibility
          </label>

          <select
            value={eligibilityFilter}
            onChange={(e) =>
              setEligibilityFilter(
                e.target.value
              )
            }
          >
            <option value="all">
              All Drives
            </option>

            <option value="eligible">
              Eligible Only
            </option>

            <option value="not-eligible">
              Not Eligible
            </option>
          </select>

        </div>

        <div className="filter-group">

          <label>
            Location
          </label>

          <select
            value={locationFilter}
            onChange={(e) =>
              setLocationFilter(
                e.target.value
              )
            }
          >
            <option value="all">
              All Locations
            </option>

            {locations.map((location) => (
              <option
                key={location}
                value={location}
              >
                {location}
              </option>
            ))}
          </select>

        </div>

        <div className="filter-group">

          <label>
            Minimum Package
          </label>

          <select
            value={packageFilter}
            onChange={(e) =>
              setPackageFilter(
                e.target.value
              )
            }
          >
            <option value="all">
              Any Package
            </option>

            <option value="5">
              5+ LPA
            </option>

            <option value="7">
              7+ LPA
            </option>

            <option value="10">
              10+ LPA
            </option>

          </select>

        </div>

        <div className="filter-group">

          <label>
            Sort By
          </label>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          >
            <option value="deadline">
              Deadline: Soonest First
            </option>

            <option value="package">
              Package: Highest First
            </option>

          </select>

        </div>

      </section>

      {/* =========================================
          DRIVE CARDS
      ========================================= */}

      <section className="drives-grid">

        {filteredAndSortedDrives.length === 0 ? (

          <div className="drives-empty-state">

            <div className="empty-icon">
              ⌕
            </div>

            <h3>
              No placement drives found
            </h3>

            <p>
              Try changing your filters to see
              more opportunities.
            </p>

          </div>

        ) : (

          filteredAndSortedDrives.map(
            (drive) => {

              const eligible =
                checkEligibility(drive);

              const applied =
                isApplied(drive.id);

              const requiredSkills =
                drive.requiredSkills ||
                drive.skills ||
                [];

              const packageValue =
                Number(
                  drive.package ??
                    drive.ctc ??
                    drive.salary ??
                    0
                );

              const location =
                drive.location ||
                drive.city ||
                "Not specified";

              const deadlineMessage =
                getDeadlineMessage(
                  drive.deadline
                );

              return (
                <article
                  className={`placement-drive-card ${
                    !eligible
                      ? "drive-not-eligible"
                      : ""
                  }`}
                  key={drive.id}
                >

                  {/* TOP */}
                  <div className="drive-card-top">

                    <div className="company-logo-box">
                      {drive.logo ||
                        drive.company
                          ?.substring(0, 3)
                          .toUpperCase()}
                    </div>

                    <div className="drive-title">

                      <div className="drive-title-row">

                        <h3>
                          {drive.role}
                        </h3>

                        {drive.type &&
                          drive.type !==
                            "Campus" && (
                            <span
                              className={`drive-type-badge ${
                                drive.type
                                  .toLowerCase()
                                  .replace(
                                    /\s+/g,
                                    "-"
                                  )
                              }`}
                            >
                              {drive.type}
                            </span>
                          )}

                      </div>

                      <p>
                        {drive.company}
                      </p>

                    </div>

                    <div
                      className={`eligibility-badge ${
                        eligible
                          ? "eligible"
                          : "not-eligible"
                      }`}
                    >
                      {eligible
                        ? "✓ Eligible"
                        : "Not Eligible"}
                    </div>

                  </div>

                  {/* INFORMATION */}
                  <div className="drive-details-grid">

                    <div className="drive-detail-item">

                      <div className="detail-icon">
                        ₹
                      </div>

                      <div>
                        <span>
                          Package
                        </span>

                        <strong>
                          {formatPackage(
                            packageValue
                          )}
                        </strong>
                      </div>

                    </div>

                    <div className="drive-detail-item">

                      <div className="detail-icon">
                        ◉
                      </div>

                      <div>
                        <span>
                          Location
                        </span>

                        <strong>
                          {location}
                        </strong>
                      </div>

                    </div>

                    <div className="drive-detail-item">

                      <div className="detail-icon">
                        ✓
                      </div>

                      <div>
                        <span>
                          Minimum CGPA
                        </span>

                        <strong>
                          {drive.minCGPA ??
                            drive.minimumCGPA ??
                            "—"}
                        </strong>
                      </div>

                    </div>

                    <div className="drive-detail-item">

                      <div
                        className={`detail-icon ${
                          deadlineMessage
                            ? "deadline-icon"
                            : ""
                        }`}
                      >
                        ◷
                      </div>

                      <div>

                        <span>
                          Application Deadline
                        </span>

                        <strong
                          className={getDeadlineClass(
                            drive.deadline
                          )}
                        >
                          {formatDeadline(
                            drive.deadline
                          )}
                        </strong>

                        {deadlineMessage && (
                          <small className="closing-soon">
                            {deadlineMessage}
                          </small>
                        )}

                      </div>

                    </div>

                  </div>

                  {/* DESCRIPTION */}
                  {drive.description && (
                    <p className="drive-description">
                      {drive.description}
                    </p>
                  )}

                  {/* REQUIRED SKILLS */}
                  <div className="required-skills-section">

                    <div className="required-skills-title">
                      Required Skills
                    </div>

                    <div className="skill-tags">

                      {requiredSkills.length ===
                      0 ? (
                        <span className="no-skills">
                          No specific skills listed
                        </span>
                      ) : (
                        requiredSkills.map(
                          (skill) => {

                            const matched =
                              isSkillMatching(
                                studentSkills,
                                skill
                              );

                            return (
                              <span
                                key={skill}
                                className={`drive-skill-tag ${
                                  matched
                                    ? "skill-match"
                                    : "skill-missing"
                                }`}
                              >
                                {matched
                                  ? "✓ "
                                  : ""}
                                {skill}
                              </span>
                            );
                          }
                        )
                      )}

                    </div>

                    {requiredSkills.length >
                      0 && (
                      <div className="skill-match-help">

                        <span>
                          ✓
                        </span>

                        Matching your skills

                        <span className="missing-dot">
                          ○
                        </span>

                        Skill to improve

                      </div>
                    )}

                  </div>

                  {/* ACTIONS */}
                  <div className="drive-actions">

                    <button
                      className="view-details-button"
                      onClick={() =>
                        handleViewDetails(
                          drive
                        )
                      }
                    >
                      View Details
                    </button>

                    {applied ? (

                      <button
                        className="applied-button"
                        disabled
                      >
                        ✓ Applied
                      </button>

                    ) : eligible ? (

                      <button
                        className="apply-button"
                        onClick={() =>
                          handleApply(drive)
                        }
                      >
                        Apply Now →
                      </button>

                    ) : (

                      <button
                        className="apply-button disabled"
                        disabled
                        title="You do not meet the eligibility requirements"
                      >
                        Apply Now
                      </button>

                    )}

                  </div>

                </article>
              );
            }
          )
        )}

      </section>

      {/* =========================================
          DETAILS MODAL
      ========================================= */}

      {selectedDrive && (

        <div
          className="drive-modal-overlay"
          onClick={() =>
            setSelectedDrive(null)
          }
        >

          <div
            className="drive-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() =>
                setSelectedDrive(null)
              }
            >
              ×
            </button>

            <div className="modal-logo">
              {selectedDrive.logo ||
                selectedDrive.company
                  ?.substring(0, 3)
                  .toUpperCase()}
            </div>

            <h2>
              {selectedDrive.role}
            </h2>

            <p className="modal-company">
              {selectedDrive.company}
            </p>

            <div className="modal-info-grid">

              <div>
                <span>
                  Package
                </span>

                <strong>
                  {formatPackage(
                    selectedDrive.package
                  )}
                </strong>
              </div>

              <div>
                <span>
                  Location
                </span>

                <strong>
                  {selectedDrive.location ||
                    selectedDrive.city ||
                    "Not specified"}
                </strong>
              </div>

              <div>
                <span>
                  Minimum CGPA
                </span>

                <strong>
                  {selectedDrive.minCGPA ??
                    selectedDrive.minimumCGPA ??
                    "—"}
                </strong>
              </div>

              <div>
                <span>
                  Deadline
                </span>

                <strong>
                  {formatDeadline(
                    selectedDrive.deadline
                  )}
                </strong>
              </div>

            </div>

            {selectedDrive.description && (
              <div className="modal-description">

                <h4>
                  About this drive
                </h4>

                <p>
                  {selectedDrive.description}
                </p>

              </div>
            )}

            <div className="modal-skills">

              <h4>
                Required Skills
              </h4>

              <div className="skill-tags">

                {(
                  selectedDrive.requiredSkills ||
                  selectedDrive.skills ||
                  []
                ).map((skill) => {

                  const matched =
                    isSkillMatching(
                      studentSkills,
                      skill
                    );

                  return (
                    <span
                      key={skill}
                      className={`drive-skill-tag ${
                        matched
                          ? "skill-match"
                          : "skill-missing"
                      }`}
                    >
                      {matched
                        ? "✓ "
                        : ""}
                      {skill}
                    </span>
                  );
                })}

              </div>

            </div>

            <div className="modal-actions">

              <button
                className="view-details-button"
                onClick={() =>
                  setSelectedDrive(null)
                }
              >
                Close
              </button>

              {isApplied(
                selectedDrive.id
              ) ? (

                <button
                  className="applied-button"
                  disabled
                >
                  ✓ Applied
                </button>

              ) : checkEligibility(
                  selectedDrive
                ) ? (

                <button
                  className="apply-button"
                  onClick={() => {
                    handleApply(
                      selectedDrive
                    );

                    setSelectedDrive(null);
                  }}
                >
                  Apply Now →
                </button>

              ) : (

                <button
                  className="apply-button disabled"
                  disabled
                >
                  Not Eligible
                </button>

              )}

            </div>

          </div>

        </div>

      )}

    </main>
  );
}

export default EligibleDrives;