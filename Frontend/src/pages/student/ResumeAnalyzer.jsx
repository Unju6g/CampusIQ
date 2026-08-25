import React, { useRef, useState } from "react";
import "./ResumeAnalyzer.css";

const certifications = [
  {
    id: 1,
    name: "Python Certification",
    provider: "CodeWithHarry",
    year: "2025",
  },
  {
    id: 2,
    name: "NPTEL Data Structures",
    provider: "NPTEL",
    year: "2025",
  },
  {
    id: 3,
    name: "Google Data Analytics",
    provider: "Google",
    year: "2025",
  },
  {
    id: 4,
    name: "AWS Certified Cloud Practitioner",
    provider: "Amazon Web Services",
    year: "2025",
  },
];

const courses = [
  {
    id: 1,
    name: "Python for Beginners",
    provider: "CodeWithHarry",
    year: "2025",
  },
  {
    id: 2,
    name: "Data Analytics Course",
    provider: "CodeWithHarry",
    year: "2025",
  },
  {
    id: 3,
    name: "SQL for Data Analysis",
    provider: "Online Course",
    year: "2025",
  },
];

function ResumeAnalyzer() {
  const fileInputRef = useRef(null);

  const [resumeFile, setResumeFile] = useState(null);
  const [selectedCertifications, setSelectedCertifications] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // --------------------------------
  // File validation
  // --------------------------------
  const handleFile = (file) => {
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file only.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5 MB.");
      return;
    }

    setResumeFile(file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // --------------------------------
  // Certification selection
  // --------------------------------
  const toggleCertification = (id) => {
    setSelectedCertifications((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // --------------------------------
  // Course selection
  // --------------------------------
  const toggleCourse = (id) => {
    setSelectedCourses((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // --------------------------------
  // Analyze resume
  // --------------------------------
  const handleAnalyze = async () => {
    if (!resumeFile) return;

    setIsAnalyzing(true);

    try {
      // ----------------------------------------
      // Add your backend/API call here later
      // ----------------------------------------
      console.log("Resume:", resumeFile);
      console.log("Selected certifications:", selectedCertifications);
      console.log("Selected courses:", selectedCourses);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert("Resume analysis completed!");
    } catch (error) {
      console.error("Resume analysis failed:", error);
      alert("Something went wrong while analyzing your resume.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="resume-page">

      {/* ============================
          PAGE HEADER
      ============================ */}
      <div className="resume-header">
        <div className="ai-label">AI POWERED</div>

        <h1>AI Resume Analyzer</h1>

        <p>
          Upload your resume and analyze your placement readiness.
        </p>
      </div>

      {/* ============================
          UPLOAD SECTION
      ============================ */}
      <section className="resume-card upload-card">

        <div className="section-heading">
          <div className="section-icon">
            📄
          </div>

          <div>
            <h2>Upload Your Resume</h2>
            <p>
              Upload your PDF resume to analyze your skills, projects and
              overall profile.
            </p>
          </div>
        </div>

        <div className="section-divider"></div>

        <div
          className={`upload-zone ${
            isDragging ? "dragging" : ""
          } ${resumeFile ? "has-file" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            hidden
          />

          <div className="upload-icon">
            ↑
          </div>

          {!resumeFile ? (
            <>
              <h3>Choose your resume PDF</h3>

              <p className="upload-main-text">
                Drag & drop your resume here or click to browse
              </p>

              <p className="upload-helper">
                PDF only • Maximum file size: 5 MB
              </p>

              <button
                type="button"
                className="choose-file-button"
                onClick={(event) => {
                  event.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                Choose PDF File
              </button>
            </>
          ) : (
            <>
              <h3>Resume Selected</h3>

              <p className="selected-file-name">
                {resumeFile.name}
              </p>

              <p className="upload-helper">
                {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB • PDF
              </p>

              <button
                type="button"
                className="change-file-button"
                onClick={(event) => {
                  event.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                Change PDF
              </button>
            </>
          )}
        </div>
      </section>

      {/* ============================
          CERTIFICATIONS
      ============================ */}
      <section className="resume-card">

        <div className="section-heading">
          <div className="section-icon">
            🏆
          </div>

          <div>
            <h2>Completed Certifications</h2>
            <p>
              Select certifications that you want the AI to consider during
              resume analysis.
            </p>
          </div>
        </div>

        <div className="section-divider"></div>

        <div className="selection-count">
          <strong>{selectedCertifications.length}</strong>{" "}
          certification
          {selectedCertifications.length !== 1 ? "s" : ""} selected
        </div>

        <div className="selection-list">
          {certifications.map((certification) => {
            const isSelected = selectedCertifications.includes(
              certification.id
            );

            return (
              <label
                key={certification.id}
                className={`selection-row ${
                  isSelected ? "selected" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() =>
                    toggleCertification(certification.id)
                  }
                />

                <div className="selection-content">
                  <div className="selection-title">
                    {certification.name}
                  </div>

                  <div className="selection-meta">
                    {certification.provider} • Completed{" "}
                    {certification.year}
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </section>

      {/* ============================
          COURSES
      ============================ */}
      <section className="resume-card">

        <div className="section-heading">
          <div className="section-icon">
            🎓
          </div>

          <div>
            <h2>Completed Courses</h2>
            <p>
              Select relevant courses that strengthen your resume profile.
            </p>
          </div>
        </div>

        <div className="section-divider"></div>

        <div className="selection-count">
          <strong>{selectedCourses.length}</strong>{" "}
          course
          {selectedCourses.length !== 1 ? "s" : ""} selected
        </div>

        <div className="selection-list">
          {courses.map((course) => {
            const isSelected = selectedCourses.includes(course.id);

            return (
              <label
                key={course.id}
                className={`selection-row ${
                  isSelected ? "selected" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleCourse(course.id)}
                />

                <div className="selection-content">
                  <div className="selection-title">
                    {course.name}
                  </div>

                  <div className="selection-meta">
                    {course.provider} • Completed{" "}
                    {course.year}
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </section>

      {/* ============================
          SMART INTEGRATION
      ============================ */}
      <section className="resume-card integration-card">

        <div className="integration-icon">
          ✦
        </div>

        <div>
          <h2>Smart Resume Integration</h2>

          <p>
            Your selected certifications and courses will be considered
            together with your education, skills and projects during AI
            resume analysis.
          </p>
        </div>

      </section>

      {/* ============================
          ANALYZE SECTION
      ============================ */}
      <section className="resume-card analyze-card">

        <div className="analyze-left">

          <div className="analyze-icon">
            🤖
          </div>

          <div>
            <h2>
              {isAnalyzing
                ? "Analyzing your resume..."
                : "Ready to analyze?"}
            </h2>

            <p>
              {isAnalyzing
                ? "Please wait while AI analyzes your resume."
                : resumeFile
                ? "Your resume is ready for AI analysis."
                : "Please upload your resume before starting the analysis."}
            </p>
          </div>

        </div>

        <button
          type="button"
          className={`analyze-button ${
            !resumeFile || isAnalyzing ? "disabled" : ""
          }`}
          disabled={!resumeFile || isAnalyzing}
          onClick={handleAnalyze}
        >
          {isAnalyzing
            ? "Analyzing..."
            : "Analyze Resume →"}
        </button>

      </section>

    </div>
  );
}

export default ResumeAnalyzer;