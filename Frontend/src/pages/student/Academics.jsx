import React, { useState } from "react";
import "./Academics.css";

const semesterList = [
  "1st Semester",
  "2nd Semester",
  "3rd Semester",
  "4th Semester",
  "5th Semester",
  "6th Semester",
  "7th Semester",
  "8th Semester",
];

const createSemesterData = () =>
  semesterList.map((semester, index) => ({
    semester,
    sgpa: "",
    cgpa: "",
    percentage: "",
    backlogs: "",
  }));

function Academics() {
  const [formData, setFormData] = useState({
    tenthPercentage: "",
    tenthYear: "",
    twelfthPercentage: "",
    twelfthYear: "",

    diplomaCompleted: "No",
    diplomaPercentage: "",
    diplomaYear: "",

    degree: "B.Tech",
    branch: "Electronics & Computer Engineering",
    college: "Walchand Institute of Technology",
    admissionYear: "2023",
    currentSemester: "7th Semester",

    semesters: createSemesterData(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSemesterChange = (index, field, value) => {
    const updatedSemesters = [...formData.semesters];

    updatedSemesters[index] = {
      ...updatedSemesters[index],
      [field]: value,
    };

    setFormData((prev) => ({
      ...prev,
      semesters: updatedSemesters,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Academic Details:", formData);

    alert("Academic details saved successfully!");
  };

  const handleReset = () => {
    setFormData({
      tenthPercentage: "",
      tenthYear: "",
      twelfthPercentage: "",
      twelfthYear: "",

      diplomaCompleted: "No",
      diplomaPercentage: "",
      diplomaYear: "",

      degree: "B.Tech",
      branch: "Electronics & Computer Engineering",
      college: "Walchand Institute of Technology",
      admissionYear: "2023",
      currentSemester: "7th Semester",

      semesters: createSemesterData(),
    });
  };

  return (
    <div className="academics-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="academics-header">
        <div>
          <span className="academics-label">
            STUDENT ACADEMIC PROFILE
          </span>

          <h1>Current Academics</h1>

          <p>
            Add and manage your school, diploma and current degree
            academic information.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>

        {/* =====================================================
            SCHOOL EDUCATION
        ===================================================== */}

        <section className="academic-section">

          <div className="section-heading">
            <div className="section-icon">🏫</div>

            <div>
              <h2>School Education</h2>
              <p>
                Enter your 10th and 12th academic information.
              </p>
            </div>
          </div>

          <div className="education-grid">

            {/* 10th */}
            <div className="education-row">

              <div className="education-title">
                <strong>10th Standard</strong>
                <span>Secondary School</span>
              </div>

              <div className="form-group">
                <label>10th Percentage</label>

                <div className="input-with-helper">
                  <input
                    type="number"
                    name="tenthPercentage"
                    value={formData.tenthPercentage}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    step="0.01"
                    placeholder="e.g. 85.50"
                  />

                  <span>%</span>
                </div>

                <small>Enter value between 0 and 100</small>
              </div>

              <div className="form-group">
                <label>10th Passing Year</label>

                <input
                  type="number"
                  name="tenthYear"
                  value={formData.tenthYear}
                  onChange={handleChange}
                  min="2000"
                  max="2100"
                  placeholder="e.g. 2021"
                />

                <small>Year of passing</small>
              </div>

            </div>

            {/* 12th */}
            <div className="education-row">

              <div className="education-title">
                <strong>12th Standard</strong>
                <span>Higher Secondary</span>
              </div>

              <div className="form-group">
                <label>12th Percentage</label>

                <div className="input-with-helper">
                  <input
                    type="number"
                    name="twelfthPercentage"
                    value={formData.twelfthPercentage}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    step="0.01"
                    placeholder="e.g. 82.50"
                  />

                  <span>%</span>
                </div>

                <small>Enter value between 0 and 100</small>
              </div>

              <div className="form-group">
                <label>12th Passing Year</label>

                <input
                  type="number"
                  name="twelfthYear"
                  value={formData.twelfthYear}
                  onChange={handleChange}
                  min="2000"
                  max="2100"
                  placeholder="e.g. 2023"
                />

                <small>Year of passing</small>
              </div>

            </div>

          </div>
        </section>


        {/* =====================================================
            DIPLOMA
        ===================================================== */}

        <section className="academic-section">

          <div className="section-heading">
            <div className="section-icon">🎓</div>

            <div>
              <h2>Diploma Information</h2>
              <p>
                Diploma information is optional.
              </p>
            </div>
          </div>

          <div className="form-grid">

            <div className="form-group">
              <label>Did you complete a Diploma?</label>

              <select
                name="diplomaCompleted"
                value={formData.diplomaCompleted}
                onChange={handleChange}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>

              <small>
                Select Yes only if you completed a diploma.
              </small>
            </div>

          </div>

          {formData.diplomaCompleted === "Yes" && (
            <div className="diploma-fields">

              <div className="form-group">
                <label>Diploma Percentage</label>

                <div className="input-with-helper">
                  <input
                    type="number"
                    name="diplomaPercentage"
                    value={formData.diplomaPercentage}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    step="0.01"
                    placeholder="e.g. 78.50"
                  />

                  <span>%</span>
                </div>

                <small>Enter value between 0 and 100</small>
              </div>

              <div className="form-group">
                <label>Diploma Passing Year</label>

                <input
                  type="number"
                  name="diplomaYear"
                  value={formData.diplomaYear}
                  onChange={handleChange}
                  min="2000"
                  max="2100"
                  placeholder="e.g. 2023"
                />

                <small>Year of passing</small>
              </div>

            </div>
          )}

        </section>


        {/* =====================================================
            CURRENT DEGREE
        ===================================================== */}

        <section className="academic-section">

          <div className="section-heading">
            <div className="section-icon">📚</div>

            <div>
              <h2>Current Degree</h2>
              <p>
                Enter your present degree and college information.
              </p>
            </div>
          </div>

          <div className="form-grid">

            <div className="form-group">
              <label>Degree</label>

              <select
                name="degree"
                value={formData.degree}
                onChange={handleChange}
              >
                <option value="B.Tech">B.Tech</option>
                <option value="B.E">B.E</option>
                <option value="M.Tech">M.Tech</option>
                <option value="M.E">M.E</option>
                <option value="B.Sc">B.Sc</option>
                <option value="BCA">BCA</option>
                <option value="MCA">MCA</option>
              </select>
            </div>

            <div className="form-group">
              <label>Current Semester</label>

              <select
                name="currentSemester"
                value={formData.currentSemester}
                onChange={handleChange}
              >
                {semesterList.map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Branch / Specialization</label>

              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                placeholder="Enter your branch"
              />
            </div>

            <div className="form-group">
              <label>Admission Year</label>

              <input
                type="number"
                name="admissionYear"
                value={formData.admissionYear}
                onChange={handleChange}
                min="2000"
                max="2100"
                placeholder="e.g. 2023"
              />
            </div>

            <div className="form-group full-width">
              <label>College / Institute</label>

              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="Enter your college name"
              />
            </div>

          </div>

        </section>


        {/* =====================================================
            SEMESTER PERFORMANCE
        ===================================================== */}

        <section className="academic-section semester-section">

          <div className="section-heading">
            <div className="section-icon">📊</div>

            <div>
              <h2>Semester-wise Academic Performance</h2>

              <p>
                Enter SGPA, CGPA, percentage and backlogs for
                each semester.
              </p>
            </div>
          </div>


          {/* INPUT GUIDELINE */}

          <div className="academic-guideline">

            <div className="guideline-icon">
              i
            </div>

            <div>
              <strong>Input Guidelines</strong>

              <p>
                SGPA and CGPA should be between 0 and 10.
                Percentage should be between 0 and 100.
                Enter 0 for backlogs if there are none.
              </p>
            </div>

          </div>


          {/* SEMESTER TABLE */}

          <div className="semester-table-wrapper">

            <div className="semester-table">

              {/* HEADER */}

              <div className="semester-table-header">

                <div>Semester</div>

                <div>
                  SGPA
                  <span>/ 10</span>
                </div>

                <div>
                  CGPA
                  <span>/ 10</span>
                </div>

                <div>
                  Percentage
                  <span>/ 100</span>
                </div>

                <div>
                  Backlogs
                </div>

              </div>


              {/* ROWS */}

              {formData.semesters.map((semester, index) => (

                <div
                  className="semester-table-row"
                  key={semester.semester}
                >

                  {/* SEMESTER */}

                  <div className="semester-name">

                    <span className="semester-number">
                      {index + 1}
                    </span>

                    <strong>
                      {semester.semester}
                    </strong>

                  </div>


                  {/* SGPA */}

                  <div className="semester-input">

                    <input
                      type="number"
                      value={semester.sgpa}
                      onChange={(e) =>
                        handleSemesterChange(
                          index,
                          "sgpa",
                          e.target.value
                        )
                      }
                      min="0"
                      max="10"
                      step="0.01"
                      placeholder="0.00"
                    />

                  </div>


                  {/* CGPA */}

                  <div className="semester-input">

                    <input
                      type="number"
                      value={semester.cgpa}
                      onChange={(e) =>
                        handleSemesterChange(
                          index,
                          "cgpa",
                          e.target.value
                        )
                      }
                      min="0"
                      max="10"
                      step="0.01"
                      placeholder="0.00"
                    />

                  </div>


                  {/* PERCENTAGE */}

                  <div className="semester-input">

                    <input
                      type="number"
                      value={semester.percentage}
                      onChange={(e) =>
                        handleSemesterChange(
                          index,
                          "percentage",
                          e.target.value
                        )
                      }
                      min="0"
                      max="100"
                      step="0.01"
                      placeholder="0.00"
                    />

                  </div>


                  {/* BACKLOG */}

                  <div className="semester-input backlog-input">

                    <input
                      type="number"
                      value={semester.backlogs}
                      onChange={(e) =>
                        handleSemesterChange(
                          index,
                          "backlogs",
                          e.target.value
                        )
                      }
                      min="0"
                      step="1"
                      placeholder="0"
                    />

                  </div>

                </div>

              ))}

            </div>

          </div>


          {/* NOTE */}

          <div className="semester-note">
            <span>ⓘ</span>

            <p>
              SGPA and CGPA are calculated out of 10.
              Percentage is calculated out of 100.
              Backlogs should be entered as the number of
              active backlogs for that semester.
            </p>
          </div>

        </section>


        {/* =====================================================
            ACTION BUTTONS
        ===================================================== */}

        <div className="save-area">

          <button
            type="button"
            className="reset-academic-btn"
            onClick={handleReset}
          >
            Reset
          </button>

          <button
            type="submit"
            className="save-academic-btn"
          >
            Save Academic Details
          </button>

        </div>

      </form>

    </div>
  );
}

export default Academics;