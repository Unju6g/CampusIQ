import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

// CampusIQ Logo
import campusiqLogo from "../../assets/campusiq-header.png";

function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    prn: "",
    email: "",
    phone: "",
    branch: "",
    passingYear: "",
    semester: "",
    cgpa: "",
    backlogs: "",
    department: "",
    adminKey: "",
    password: "",
    confirmPassword: "",
  });

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // =====================================================
  // HANDLE ROLE
  // =====================================================

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    setError("");
    setSuccess("");
  };

  // =====================================================
  // HANDLE REGISTER
  // =====================================================

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // -----------------------------
    // Basic validation
    // -----------------------------

    if (!formData.email.trim()) {
      setError("Please enter your college email.");
      return;
    }

    if (!formData.password) {
      setError("Please enter a password.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // -----------------------------
    // Student validation
    // -----------------------------

    if (role === "student") {
      if (
        !formData.name.trim() ||
        !formData.prn.trim() ||
        !formData.branch.trim()
      ) {
        setError(
          "Please fill Full Name, PRN and Branch."
        );
        return;
      }
    }

    // -----------------------------
    // TPO validation
    // -----------------------------

    if (role === "tpo") {
      if (
        !formData.department.trim() ||
        !formData.adminKey.trim()
      ) {
        setError(
          "Please enter Department and Admin Key."
        );
        return;
      }
    }

    try {
      setLoading(true);

      // =================================================
      // SEND DATA TO BACKEND
      // =================================================

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: formData.name,
            prn: formData.prn,
            email: formData.email,
            phone: formData.phone,
            branch: formData.branch,
            passingYear: formData.passingYear,
            semester: formData.semester,
            cgpa: formData.cgpa,
            backlogs: formData.backlogs,
            department: formData.department,
            adminKey:
              role === "tpo"
                ? formData.adminKey
                : undefined,
            password: formData.password,
            role: role,
          }),
        }
      );

      const data = await response.json();

      // =================================================
      // BACKEND ERROR
      // =================================================

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed."
        );
      }

      // =================================================
      // SUCCESS
      // =================================================

      setSuccess(
        "Account created successfully! Redirecting to login..."
      );

      // Clear form
      setFormData({
        name: "",
        prn: "",
        email: "",
        phone: "",
        branch: "",
        passingYear: "",
        semester: "",
        cgpa: "",
        backlogs: "",
        department: "",
        adminKey: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      console.error("Registration error:", err);

      setError(
        err.message ||
        "Unable to connect to CampusIQ server. Make sure the backend is running on http://localhost:5000."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page register-page">

      <div className="auth-card register-card">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="auth-header">

          <Link
            to="/"
            className="campusiq-brand"
          >
            <img
              src={campusiqLogo}
              alt="CampusIQ"
              className="campusiq-logo"
            />
          </Link>

          <h1 className="auth-heading">
            Create Account
          </h1>

          <p className="auth-subtitle">
            Create your CampusIQ account to get started.
          </p>

        </div>

        {/* =================================================
            ROLE SWITCHER
        ================================================= */}

        <div className="role-switcher">

          <button
            type="button"
            className={
              role === "student"
                ? "active"
                : ""
            }
            onClick={() =>
              handleRoleChange("student")
            }
          >
            <span>🎓</span>
            <span>Student</span>
          </button>

          <button
            type="button"
            className={
              role === "tpo"
                ? "active"
                : ""
            }
            onClick={() =>
              handleRoleChange("tpo")
            }
          >
            <span>🏢</span>
            <span>TPO / Admin</span>
          </button>

        </div>

        {/* =================================================
            REGISTER FORM
        ================================================= */}

        <form onSubmit={handleRegister}>

          {/* =================================================
              STUDENT DETAILS
          ================================================= */}

          {role === "student" && (
            <>
              <h3>Student Details</h3>

              <div className="form-grid">

                {/* FULL NAME */}

                <div className="form-field">
                  <label htmlFor="name">
                    Full Name *
                  </label>

                  <div className="input-wrapper">
                    <span className="input-icon">
                      👤
                    </span>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* PRN */}

                <div className="form-field">
                  <label htmlFor="prn">
                    PRN *
                  </label>

                  <div className="input-wrapper">
                    <span className="input-icon">
                      🎫
                    </span>

                    <input
                      id="prn"
                      name="prn"
                      type="text"
                      value={formData.prn}
                      onChange={handleChange}
                      placeholder="Enter your PRN"
                    />
                  </div>
                </div>

                {/* EMAIL */}

                <div className="form-field">
                  <label htmlFor="email">
                    College Email *
                  </label>

                  <div className="input-wrapper">
                    <span className="input-icon">
                      ✉
                    </span>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="student@college.edu"
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* PHONE */}

                <div className="form-field">
                  <label htmlFor="phone">
                    Phone Number
                  </label>

                  <div className="input-wrapper">
                    <span className="input-icon">
                      📱
                    </span>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                {/* BRANCH */}

                <div className="form-field">
                  <label htmlFor="branch">
                    Branch *
                  </label>

                  <div className="input-wrapper">
                    <span className="input-icon">
                      💻
                    </span>

                    <input
                      id="branch"
                      name="branch"
                      type="text"
                      value={formData.branch}
                      onChange={handleChange}
                      placeholder="e.g. E&CE"
                    />
                  </div>
                </div>

                {/* PASSING YEAR */}

                <div className="form-field">
                  <label htmlFor="passingYear">
                    Passing Year
                  </label>

                  <input
                    id="passingYear"
                    name="passingYear"
                    type="text"
                    value={formData.passingYear}
                    onChange={handleChange}
                    placeholder="e.g. 2027"
                  />
                </div>

                {/* SEMESTER */}

                <div className="form-field">
                  <label htmlFor="semester">
                    Semester
                  </label>

                  <input
                    id="semester"
                    name="semester"
                    type="text"
                    value={formData.semester}
                    onChange={handleChange}
                    placeholder="e.g. 7"
                  />
                </div>

                {/* CGPA */}

                <div className="form-field">
                  <label htmlFor="cgpa">
                    CGPA
                  </label>

                  <input
                    id="cgpa"
                    name="cgpa"
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={formData.cgpa}
                    onChange={handleChange}
                    placeholder="e.g. 8.67"
                  />
                </div>

                {/* BACKLOGS */}

                <div className="form-field">
                  <label htmlFor="backlogs">
                    Backlogs
                  </label>

                  <input
                    id="backlogs"
                    name="backlogs"
                    type="number"
                    min="0"
                    value={formData.backlogs}
                    onChange={handleChange}
                    placeholder="e.g. 0"
                  />
                </div>

              </div>
            </>
          )}

          {/* =================================================
              TPO DETAILS
          ================================================= */}

          {role === "tpo" && (
            <>
              <h3>TPO / Admin Details</h3>

              <div className="form-field">

                <label htmlFor="department">
                  Department *
                </label>

                <div className="input-wrapper">

                  <span className="input-icon">
                    🏢
                  </span>

                  <input
                    id="department"
                    name="department"
                    type="text"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Enter department"
                  />

                </div>

              </div>

              <div className="form-field">

                <label htmlFor="adminKey">
                  Admin Key *
                </label>

                <div className="input-wrapper">

                  <span className="input-icon">
                    🔑
                  </span>

                  <input
                    id="adminKey"
                    name="adminKey"
                    type="password"
                    value={formData.adminKey}
                    onChange={handleChange}
                    placeholder="Enter admin key"
                  />

                </div>

              </div>
            </>
          )}

          {/* =================================================
              ACCOUNT SECURITY
          ================================================= */}

          <h3>Account Security</h3>

          {/* PASSWORD */}

          <div className="form-field">

            <label htmlFor="password">
              Password *
            </label>

            <div className="input-wrapper">

              <span className="input-icon">
                🔒
              </span>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                autoComplete="new-password"
              />

            </div>

            <span className="field-help">
              Use at least 8 characters with uppercase,
              lowercase, numbers and symbols.
            </span>

          </div>

          {/* CONFIRM PASSWORD */}

          <div className="form-field">

            <label htmlFor="confirmPassword">
              Confirm Password *
            </label>

            <div className="input-wrapper">

              <span className="input-icon">
                🔒
              </span>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                autoComplete="new-password"
              />

            </div>

          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div className="auth-error">

              <span className="auth-error-icon">
                !
              </span>

              <span>
                {error}
              </span>

            </div>
          )}

          {/* =================================================
              SUCCESS
          ================================================= */}

          {success && (
            <div className="auth-success">
              {success}
            </div>
          )}

          {/* =================================================
              SUBMIT
          ================================================= */}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        {/* =================================================
            LOGIN
        ================================================= */}

        <p className="auth-footer">

          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>

        </p>

        {/* =================================================
            BACK HOME
        ================================================= */}

        <Link
          to="/"
          className="back-home"
        >
          ← Back to Home
        </Link>

      </div>

    </div>
  );
}

export default Register;