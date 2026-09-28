import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

// CampusIQ Logo
import campusiqLogo from "../../assets/campusiq-header.png";

function Login() {
  const navigate = useNavigate();

  // =====================================================
  // STATE
  // =====================================================

  const [role, setRole] = useState("student");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // =====================================================
  // HANDLE ROLE CHANGE
  // =====================================================

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    setError("");
  };

  // =====================================================
  // HANDLE LOGIN
  // =====================================================

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // -----------------------------------------------------
    // VALIDATION
    // -----------------------------------------------------

    const email = formData.email.trim();

    if (!email) {
      setError("Please enter your college email.");
      return;
    }

    if (!formData.password) {
      setError("Please enter your password.");
      return;
    }

    if (!role) {
      setError("Please select your role.");
      return;
    }

    try {
      setLoading(true);

      // ---------------------------------------------------
      // CONNECT FRONTEND → BACKEND
      // ---------------------------------------------------

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email,
            password: formData.password,
            role: role,
          }),
        }
      );

      // ---------------------------------------------------
      // GET BACKEND RESPONSE
      // ---------------------------------------------------

      const data = await response.json();

      console.log("Login response:", data);

      // ---------------------------------------------------
      // HANDLE BACKEND ERROR
      // ---------------------------------------------------

      if (!response.ok) {
        setError(
          data.message ||
            "Login failed. Please check your email, password and role."
        );
        return;
      }

      // ---------------------------------------------------
      // CHECK TOKEN
      // ---------------------------------------------------

      if (!data.token) {
        console.error("Token missing from backend response:", data);

        setError(
          "Login successful, but authentication token was not received."
        );

        return;
      }

      // ---------------------------------------------------
      // CHECK USER
      // ---------------------------------------------------

      if (!data.user) {
        console.error("User data missing from backend response:", data);

        setError(
          "Login successful, but user information was not received."
        );

        return;
      }

      // ---------------------------------------------------
      // CLEAR OLD LOGIN DATA
      // -----------------------------------------------------

      localStorage.removeItem("campusiqToken");
      localStorage.removeItem("campusiqUser");

      // -----------------------------------------------------
      // SAVE JWT TOKEN
      // IMPORTANT:
      // StudentDashboard/Auth middleware should use "token"
      // -----------------------------------------------------

      localStorage.setItem("token", data.token);

      // -----------------------------------------------------
      // SAVE USER INFORMATION
      // IMPORTANT:
      // StudentLayout uses "user"
      // -----------------------------------------------------

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // -----------------------------------------------------
      // OPTIONAL BACKWARD COMPATIBILITY
      // -----------------------------------------------------
      // Keep these temporarily if any old CampusIQ component
      // still uses these names.

      localStorage.setItem(
        "campusiqToken",
        data.token
      );

      localStorage.setItem(
        "campusiqUser",
        JSON.stringify(data.user)
      );

      // -----------------------------------------------------
      // VERIFY DATA WAS SAVED
      // -----------------------------------------------------

      console.log(
        "Token saved:",
        !!localStorage.getItem("token")
      );

      console.log(
        "User saved:",
        localStorage.getItem("user")
      );

      // -----------------------------------------------------
      // ROLE-BASED REDIRECT
      // -----------------------------------------------------

      if (data.user.role === "student") {
        navigate("/student/dashboard", {
          replace: true,
        });
      } else if (data.user.role === "tpo") {
        navigate("/admin/dashboard", {
          replace: true,
        });
      } else {
        setError(
          "Invalid user role received from server."
        );
      }

    } catch (err) {
      console.error("Login error:", err);

      setError(
        "Unable to connect to CampusIQ server. Make sure the backend is running on http://localhost:5000."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="auth-page login-page">

      <div className="auth-card login-card">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="auth-header login-header">

          {/* CampusIQ Logo */}

          <Link
            to="/"
            className="campusiq-brand"
            aria-label="CampusIQ Home"
          >
            <img
              src={campusiqLogo}
              alt="CampusIQ"
              className="campusiq-logo"
            />
          </Link>

          {/* Heading */}

          <h1 className="auth-heading">
            Welcome Back
          </h1>

          {/* Subtitle */}

          <p className="auth-subtitle">
            Login to continue to your CampusIQ portal.
          </p>

        </div>

        {/* =================================================
            ROLE SWITCHER
        ================================================= */}

        <div className="role-switcher login-role-switcher">

          {/* STUDENT */}

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
            <span aria-hidden="true">
              🎓
            </span>

            <span>
              Student
            </span>
          </button>

          {/* TPO / ADMIN */}

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
            <span aria-hidden="true">
              🏢
            </span>

            <span>
              TPO / Admin
            </span>
          </button>

        </div>

        {/* =================================================
            LOGIN FORM
        ================================================= */}

        <form onSubmit={handleLogin}>

          {/* =================================================
              EMAIL
          ================================================= */}

          <div className="form-field login-field">

            <label htmlFor="email">
              College Email
            </label>

            <div className="input-wrapper">

              <span
                className="input-icon"
                aria-hidden="true"
              >
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

          {/* =================================================
              PASSWORD
          ================================================= */}

          <div className="form-field login-field">

            <label htmlFor="password">
              Password
            </label>

            <div className="input-wrapper">

              <span
                className="input-icon"
                aria-hidden="true"
              >
                🔒
              </span>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
              />

            </div>

          </div>

          {/* =================================================
              FORGOT PASSWORD
          ================================================= */}

          <div className="forgot-link">

            <Link to="/forgot-password">
              Forgot password?
            </Link>

          </div>

          {/* =================================================
              ERROR MESSAGE
          ================================================= */}

          {error && (
            <div className="auth-error">

              <span aria-hidden="true">
                !
              </span>

              <span>
                {error}
              </span>

            </div>
          )}

          {/* =================================================
              LOGIN BUTTON
          ================================================= */}

          <button
            type="submit"
            className="auth-submit login-submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"
            }
          </button>

        </form>

        {/* =================================================
            CREATE ACCOUNT
        ================================================= */}

        <p className="auth-footer login-footer">

          Don't have an account?{" "}

          <Link to="/register">
            Create Account
          </Link>

        </p>

        {/* =================================================
            BACK TO HOME
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

export default Login;