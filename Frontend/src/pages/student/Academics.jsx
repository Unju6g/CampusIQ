import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Academics.css";

const API_URL = "http://localhost:5000/api/student/academics";

function Academics() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [academicData, setAcademicData] = useState({
    tenthPercentage: "",
    tenthPassingYear: "",
    twelfthPercentage: "",
    twelfthPassingYear: "",
  });

  // =====================================================
  // GET AUTH TOKEN
  // =====================================================

  const getToken = () => {
    return (
      localStorage.getItem("campusiqToken") ||
      localStorage.getItem("token")
    );
  };

  // =====================================================
  // LOAD ACADEMIC DATA
  // =====================================================

  useEffect(() => {
    const loadAcademicData = async () => {
      try {
        setLoading(true);
        setError("");

        const token = getToken();

        if (!token) {
          navigate("/login", { replace: true });
          return;
        }

        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 401) {
          localStorage.removeItem("campusiqToken");
          localStorage.removeItem("campusiqUser");
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/login", { replace: true });
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load academic information."
          );
        }

        // Supports either:
        // data.academics
        // OR
        // data.user.academics

        const academics =
          data.academics ||
          data.user?.academics ||
          {};

        setAcademicData({
          tenthPercentage:
            academics.tenthPercentage ??
            academics.tenth?.percentage ??
            "",
          tenthPassingYear:
            academics.tenthPassingYear ??
            academics.tenth?.passingYear ??
            "",
          twelfthPercentage:
            academics.twelfthPercentage ??
            academics.twelfth?.percentage ??
            "",
          twelfthPassingYear:
            academics.twelfthPassingYear ??
            academics.twelfth?.passingYear ??
            "",
        });
      } catch (err) {
        console.error("Academics loading error:", err);

        setError(
          err.message ||
            "Unable to load academic information."
        );
      } finally {
        setLoading(false);
      }
    };

    loadAcademicData();
  }, [navigate]);

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAcademicData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const validateForm = () => {
    const {
      tenthPercentage,
      tenthPassingYear,
      twelfthPercentage,
      twelfthPassingYear,
    } = academicData;

    if (
      tenthPercentage !== "" &&
      (Number(tenthPercentage) < 0 ||
        Number(tenthPercentage) > 100)
    ) {
      setError("10th percentage must be between 0 and 100.");
      return false;
    }

    if (
      twelfthPercentage !== "" &&
      (Number(twelfthPercentage) < 0 ||
        Number(twelfthPercentage) > 100)
    ) {
      setError("12th percentage must be between 0 and 100.");
      return false;
    }

    if (
      tenthPassingYear !== "" &&
      !/^\d{4}$/.test(tenthPassingYear)
    ) {
      setError("Please enter a valid 10th passing year.");
      return false;
    }

    if (
      twelfthPassingYear !== "" &&
      !/^\d{4}$/.test(twelfthPassingYear)
    ) {
      setError("Please enter a valid 12th passing year.");
      return false;
    }

    return true;
  };

  // =====================================================
  // SAVE ACADEMIC DATA
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      const token = getToken();

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tenthPercentage:
            academicData.tenthPercentage === ""
              ? null
              : Number(academicData.tenthPercentage),

          tenthPassingYear:
            academicData.tenthPassingYear,

          twelfthPercentage:
            academicData.twelfthPercentage === ""
              ? null
              : Number(academicData.twelfthPercentage),

          twelfthPassingYear:
            academicData.twelfthPassingYear,
        }),
      });

      if (response.status === 401) {
        localStorage.removeItem("campusiqToken");
        localStorage.removeItem("campusiqUser");
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login", { replace: true });
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save academic information."
        );
      }

      setSuccess(
        "Academic information saved successfully."
      );
    } catch (err) {
      console.error("Academics save error:", err);

      setError(
        err.message ||
          "Unable to save academic information."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="academics-page">
        <div className="academics-loading">
          <div className="loading-spinner"></div>
          <p>Loading academic information...</p>
        </div>
      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="academics-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="academics-header">

        <div>
          <p className="page-label">
            STUDENT ACADEMIC PROFILE
          </p>

          <h1>
            Current Academics
          </h1>

          <p className="page-description">
            Add and manage your school, diploma and
            current degree academic information.
          </p>
        </div>

        <button
          type="button"
          className="back-button"
          onClick={() =>
            navigate("/student/dashboard")
          }
        >
          ← Dashboard
        </button>

      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="academic-message error-message">
          <span>!</span>
          <span>{error}</span>
        </div>
      )}

      {/* =================================================
          SUCCESS
      ================================================= */}

      {success && (
        <div className="academic-message success-message">
          <span>✓</span>
          <span>{success}</span>
        </div>
      )}

      {/* =================================================
          FORM
      ================================================= */}

      <form
        className="academics-form"
        onSubmit={handleSubmit}
      >

        {/* =================================================
            SCHOOL EDUCATION
        ================================================= */}

        <section className="academic-card">

          <div className="section-header">

            <div className="section-icon">
              🏫
            </div>

            <div>
              <h2>
                School Education
              </h2>

              <p>
                Enter your 10th and 12th academic
                information.
              </p>
            </div>

          </div>

          <div className="education-block">

            <div className="education-title">
              <h3>10th Standard</h3>
              <span>Secondary School</span>
            </div>

            <div className="form-grid">

              {/* 10TH PERCENTAGE */}

              <div className="form-group">

                <label htmlFor="tenthPercentage">
                  10th Percentage
                </label>

                <div className="input-with-suffix">

                  <input
                    id="tenthPercentage"
                    name="tenthPercentage"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={
                      academicData.tenthPercentage
                    }
                    onChange={handleChange}
                    placeholder="e.g. 85.50"
                  />

                  <span>%</span>

                </div>

                <small>
                  Enter value between 0 and 100
                </small>

              </div>

              {/* 10TH PASSING YEAR */}

              <div className="form-group">

                <label htmlFor="tenthPassingYear">
                  10th Passing Year
                </label>

                <input
                  id="tenthPassingYear"
                  name="tenthPassingYear"
                  type="number"
                  min="1990"
                  max="2100"
                  value={
                    academicData.tenthPassingYear
                  }
                  onChange={handleChange}
                  placeholder="e.g. 2021"
                />

                <small>
                  Year of passing
                </small>

              </div>

            </div>

          </div>

          {/* =================================================
              12TH
          ================================================= */}

          <div className="education-block">

            <div className="education-title">
              <h3>12th Standard</h3>
              <span>Higher Secondary</span>
            </div>

            <div className="form-grid">

              {/* 12TH PERCENTAGE */}

              <div className="form-group">

                <label htmlFor="twelfthPercentage">
                  12th Percentage
                </label>

                <div className="input-with-suffix">

                  <input
                    id="twelfthPercentage"
                    name="twelfthPercentage"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={
                      academicData.twelfthPercentage
                    }
                    onChange={handleChange}
                    placeholder="e.g. 82.50"
                  />

                  <span>%</span>

                </div>

                <small>
                  Enter value between 0 and 100
                </small>

              </div>

              {/* 12TH PASSING YEAR */}

              <div className="form-group">

                <label htmlFor="twelfthPassingYear">
                  12th Passing Year
                </label>

                <input
                  id="twelfthPassingYear"
                  name="twelfthPassingYear"
                  type="number"
                  min="1990"
                  max="2100"
                  value={
                    academicData.twelfthPassingYear
                  }
                  onChange={handleChange}
                  placeholder="e.g. 2023"
                />

                <small>
                  Year of passing
                </small>

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            DEGREE INFORMATION
        ================================================= */}

        <section className="academic-card">

          <div className="section-header">

            <div className="section-icon">
              🎓
            </div>

            <div>
              <h2>
                Current Degree
              </h2>

              <p>
                Your current college academic
                information is already available in
                your profile.
              </p>
            </div>

          </div>

          <div className="degree-info">

            <div className="degree-item">
              <span>Current Degree</span>
              <strong>B.Tech</strong>
            </div>

            <div className="degree-item">
              <span>Course</span>
              <strong>
                Electronics & Computer Engineering
              </strong>
            </div>

            <div className="degree-item">
              <span>Academic Information</span>
              <strong>
                Managed through your student profile
              </strong>
            </div>

          </div>

        </section>

        {/* =================================================
            SAVE
        ================================================= */}

        <div className="save-section">

          <button
            type="submit"
            className="save-button"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "Save Academic Information"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default Academics;