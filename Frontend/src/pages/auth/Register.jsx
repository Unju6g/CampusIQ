import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

// CampusIQ logo
import campusiqLogo from "../../assets/campusiq-header.png";

function Register() {
  const [role, setRole] = useState("student");

  const [step, setStep] = useState(1);

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

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  /* =====================================================
     FORM CHANGE
  ===================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };


  /* =====================================================
     ROLE CHANGE
  ===================================================== */

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setStep(1);
    setError("");
    setSuccess("");
  };


  /* =====================================================
     PASSWORD STRENGTH
  ===================================================== */

  const getPasswordStrength = () => {
    const password = formData.password;

    if (!password) {
      return {
        label: "",
        level: 0,
      };
    }

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {
      return {
        label: "Weak",
        level: 1,
      };
    }

    if (score <= 3) {
      return {
        label: "Medium",
        level: 2,
      };
    }

    return {
      label: "Strong",
      level: 3,
    };
  };

  const passwordStrength = getPasswordStrength();


  /* =====================================================
     STEP VALIDATION
  ===================================================== */

  const validateStep = () => {
    setError("");

    /* -----------------------------
       STEP 1
    ----------------------------- */

    if (step === 1) {
      if (role === "student") {
        if (
          !formData.name ||
          !formData.prn ||
          !formData.email
        ) {
          setError(
            "Please fill all required account information."
          );
          return false;
        }
      }

      if (role === "tpo") {
        if (!formData.email) {
          setError(
            "Please enter your official college email."
          );
          return false;
        }
      }

      return true;
    }


    /* -----------------------------
       STEP 2 - STUDENT ACADEMIC
    ----------------------------- */

    if (step === 2 && role === "student") {

      if (!formData.branch) {
        setError("Please select your branch.");
        return false;
      }

      if (
        formData.cgpa &&
        (
          Number(formData.cgpa) < 0 ||
          Number(formData.cgpa) > 10
        )
      ) {
        setError("CGPA must be between 0 and 10.");
        return false;
      }

      if (
        formData.backlogs &&
        Number(formData.backlogs) < 0
      ) {
        setError("Backlogs cannot be negative.");
        return false;
      }

      return true;
    }


    /* -----------------------------
       STUDENT SECURITY
    ----------------------------- */

    if (
      role === "student" &&
      step === 3
    ) {

      if (!formData.password) {
        setError("Please enter a password.");
        return false;
      }

      if (formData.password.length < 8) {
        setError(
          "Password must contain at least 8 characters."
        );
        return false;
      }

      if (!formData.confirmPassword) {
        setError(
          "Please confirm your password."
        );
        return false;
      }

      if (
        formData.password !==
        formData.confirmPassword
      ) {
        setError("Passwords do not match.");
        return false;
      }

      return true;
    }


    /* -----------------------------
       TPO / ADMIN SECURITY
    ----------------------------- */

    if (
      role === "tpo" &&
      step === 2
    ) {

      if (!formData.department) {
        setError("Please enter department.");
        return false;
      }

      if (!formData.adminKey) {
        setError("Please enter admin key.");
        return false;
      }

      return true;
    }


    return true;
  };


  /* =====================================================
     NEXT STEP
  ===================================================== */

  const handleNext = () => {

    if (!validateStep()) {
      return;
    }

    setError("");
    setSuccess("");

    if (role === "student") {

      if (step < 3) {
        setStep(step + 1);
      }

    } else {

      if (step < 2) {
        setStep(step + 1);
      }

    }
  };


  /* =====================================================
     PREVIOUS STEP
  ===================================================== */

  const handlePrevious = () => {

    setError("");
    setSuccess("");

    if (step > 1) {
      setStep(step - 1);
    }
  };


  /* =====================================================
     REGISTER
  ===================================================== */

  const handleRegister = (e) => {

    e.preventDefault();

    if (!validateStep()) {
      return;
    }

    setError("");
    setSuccess("");


    /* =================================================
       STUDENT FINAL VALIDATION
    ================================================= */

    if (role === "student") {

      if (
        !formData.name ||
        !formData.prn ||
        !formData.email ||
        !formData.branch
      ) {

        setError(
          "Please fill all required student details."
        );

        return;
      }
    }


    /* =================================================
       TPO FINAL VALIDATION
    ================================================= */

    if (role === "tpo") {

      if (
        !formData.email ||
        !formData.department ||
        !formData.adminKey
      ) {

        setError(
          "Please enter all required TPO/Admin details."
        );

        return;
      }
    }


    /* =================================================
       DEMO REGISTRATION

       Backend authentication can replace this later.
    ================================================= */

    const user = {
      ...formData,
      role,
    };


    localStorage.setItem(
      "campusiqRegisteredUser",
      JSON.stringify(user)
    );


    setSuccess(
      "Account created successfully!"
    );


    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };


  /* =====================================================
     STEP LABEL
  ===================================================== */

  const getStepLabel = () => {

    if (role === "student") {

      if (step === 1) {
        return "Account Information";
      }

      if (step === 2) {
        return "Academic Information";
      }

      return "Account Security";
    }


    if (step === 1) {
      return "Account Information";
    }

    return "TPO / Admin Information";
  };


  /* =====================================================
     TOTAL STEPS
  ===================================================== */

  const totalSteps =
    role === "student"
      ? 3
      : 2;


  /* =====================================================
     RENDER
  ===================================================== */

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
            aria-label="CampusIQ Home"
          >

            <img
              src={campusiqLogo}
              alt="CampusIQ"
              className="campusiq-logo"
            />

          </Link>


          <h1 className="auth-heading">
            Create Your Account
          </h1>


          <p className="auth-subtitle">
            Join CampusIQ and manage your placement journey.
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
            <span>🎓 </span>
            Student
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
            <span>🏢 </span>
            TPO / Admin
          </button>

        </div>


       {/* =================================================
    PROGRESS
================================================= */}

<div className="registration-progress">

  {/* Step count */}
  <div className="progress-count">
    Step {step} of {totalSteps}
  </div>

  <div className="progress-track">

    {/* Background line */}
    <div className="progress-line" />

    {/* Active line */}
    <div
      className="progress-fill"
      style={{
        width:
          totalSteps === 3
            ? `${((step - 1) / 2) * 100}%`
            : `${((step - 1) / (totalSteps - 1)) * 100}%`,
      }}
    />

    {/* Step numbers */}
    <div className="progress-steps">

      <span className={step >= 1 ? "active" : ""}>
        1
      </span>

      <span className={step >= 2 ? "active" : ""}>
        2
      </span>

      {role === "student" && (
        <span className={step >= 3 ? "active" : ""}>
          3
        </span>
      )}

    </div>

  </div>

</div>

        {/* =================================================
            FORM
        ================================================= */}

        <form onSubmit={handleRegister}>


          {/* =================================================
              STEP 1
          ================================================= */}

          {step === 1 && (
            <>
              <h3>
                Account Information
              </h3>


              {role === "student" ? (

                <div className="form-grid">


                  {/* FULL NAME */}

                  <div className="form-field">

                    <label>
                      Full Name *
                    </label>


                    <div className="input-wrapper">

                      <span className="input-icon">
                        👤 
                      </span>


                      <input
                        type="text"
                        name="name"
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={handleChange}
                      />

                    </div>

                  </div>


                  {/* PRN */}

                  <div className="form-field">

                    <label>
                      PRN / Roll Number *
                    </label>


                    <div className="input-wrapper">

                      <span className="input-icon">
                        🎓 
                      </span>


                      <input
                        type="text"
                        name="prn"
                        placeholder="Enter PRN"
                        value={formData.prn}
                        onChange={handleChange}
                      />

                    </div>

                  </div>


                  {/* EMAIL */}

                  <div className="form-field">

                    <label>
                      College Email *
                    </label>


                    <div className="input-wrapper">

                      <span className="input-icon">
                        ✉
                      </span>


                      <input
                        type="email"
                        name="email"
                        placeholder="student@college.edu"
                        value={formData.email}
                        onChange={handleChange}
                      />

                    </div>

                  </div>


                  {/* PHONE */}

                  <div className="form-field">

                    <label>
                      Phone Number
                    </label>


                    <div className="input-wrapper">

                      <span className="input-icon">
                        ☎ 
                      </span>


                      <input
                        type="tel"
                        name="phone"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={handleChange}
                      />

                    </div>

                  </div>

                </div>

              ) : (

                /* ============================
                   TPO STEP 1
                ============================ */

                <div className="single-column-form">

                  <div className="form-field">

                    <label>
                      Official College Email *
                    </label>


                    <div className="input-wrapper">

                      <span className="input-icon">
                        ✉ 
                      </span>


                      <input
                        type="email"
                        name="email"
                        placeholder="tpo@college.edu"
                        value={formData.email}
                        onChange={handleChange}
                      />

                    </div>

                  </div>

                </div>

              )}

            </>
          )}


         {/* =================================================
    STUDENT STEP 2
================================================= */}

{step === 2 &&
  role === "student" && (

  <>
    <h3>
      Academic Information
    </h3>

    <div className="form-grid">

      {/* BRANCH */}
      <div className="form-field">

        <label>
          <span className="label-icon">🎓</span>
          Branch *
        </label>

        <div className="select-wrapper">

          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
          >

            <option value="">
              Select Branch
            </option>

            <option value="ECM">
              Electronics & Computer Engineering
            </option>

            <option value="CSE">
              Computer Science Engineering
            </option>

            <option value="IT">
              Information Technology
            </option>

          </select>

        </div>

      </div>


      {/* PASSING YEAR */}
      <div className="form-field">

        <label>
          <span className="label-icon">📅</span>
          Passing Year
        </label>

        <div className="select-wrapper">

          <select
            name="passingYear"
            value={formData.passingYear}
            onChange={handleChange}
          >

            <option value="">
              Select Year
            </option>

            <option value="2026">
              2026
            </option>

            <option value="2027">
              2027
            </option>

            <option value="2028">
              2028
            </option>

            <option value="2029">
              2029
            </option>

          </select>

        </div>

      </div>


      {/* SEMESTER */}
      <div className="form-field">

        <label>
          <span className="label-icon">📚</span>
          Current Semester
        </label>

        <div className="select-wrapper">

          <select
            name="semester"
            value={formData.semester}
            onChange={handleChange}
          >

            <option value="">
              Select Semester
            </option>

            <option value="1">
              1st
            </option>

            <option value="2">
              2nd
            </option>

            <option value="3">
              3rd
            </option>

            <option value="4">
              4th
            </option>

            <option value="5">
              5th
            </option>

            <option value="6">
              6th
            </option>

            <option value="7">
              7th
            </option>

            <option value="8">
              8th
            </option>

          </select>

        </div>

      </div>


      {/* CGPA */}
      <div className="form-field">

        <label>
          <span className="label-icon">⭐</span>
          CGPA
        </label>

        <div className="input-wrapper">

          <input
            type="number"
            step="0.001"
            min="0"
            max="10"
            name="cgpa"
            placeholder="Enter CGPA"
            value={formData.cgpa}
            onChange={handleChange}
          />

        </div>

        <small className="field-help">
          Enter a value between 0.0 and 10.0
        </small>

      </div>


      {/* BACKLOGS */}
      <div className="form-field">

        <label>
          <span className="label-icon">📋</span>
          Active Backlogs
        </label>

        <div className="input-wrapper">

          <input
            type="number"
            min="0"
            name="backlogs"
            placeholder="Enter number of backlogs"
            value={formData.backlogs}
            onChange={handleChange}
          />

        </div>

        <small className="field-help">
          Enter 0 if you have no active backlogs.
        </small>

      </div>

    </div>
  </>
)}

          {/* =================================================
              TPO STEP 2
          ================================================= */}

          {step === 2 &&
            role === "tpo" && (

            <>
              <h3>
                TPO / Admin Information
              </h3>


              <div className="single-column-form">


                {/* DEPARTMENT */}

                <div className="form-field">

                  <label>
                    Department *
                  </label>


                  <div className="input-wrapper">

                    <span className="input-icon">
                      🏢
                    </span>


                    <input
                      type="text"
                      name="department"
                      placeholder="Placement Cell / Department"
                      value={formData.department}
                      onChange={handleChange}
                    />

                  </div>

                </div>


                {/* ADMIN KEY */}

                <div className="form-field">

                  <label>
                    Department / Admin Key *
                  </label>


                  <div className="input-wrapper">

                    <span className="input-icon">
                      🔑
                    </span>


                    <input
                      type="password"
                      name="adminKey"
                      placeholder="Enter admin key"
                      value={formData.adminKey}
                      onChange={handleChange}
                    />

                  </div>

                </div>

              </div>

            </>
          )}


          {/* =================================================
              STUDENT STEP 3
          ================================================= */}

          {step === 3 &&
            role === "student" && (

            <>
              <h3>
                Account Security
              </h3>


              <div className="single-column-form">


                {/* PASSWORD */}

                <div className="form-field">

                  <label>
                    Password *
                  </label>


                  <div className="input-wrapper">

                    <span className="input-icon">
                      🔒
                    </span>


                    <input
                      type="password"
                      name="password"
                      placeholder="Minimum 8 characters"
                      value={formData.password}
                      onChange={handleChange}
                    />

                  </div>


                  {/* PASSWORD STRENGTH */}

                  {formData.password && (

                    <div className="password-strength">

                      <div className="strength-bars">

                        <span
                          className={
                            passwordStrength.level >= 1
                              ? "filled"
                              : ""
                          }
                        />


                        <span
                          className={
                            passwordStrength.level >= 2
                              ? "filled"
                              : ""
                          }
                        />


                        <span
                          className={
                            passwordStrength.level >= 3
                              ? "filled"
                              : ""
                          }
                        />

                      </div>


                      <span
                        className={`strength-text strength-${passwordStrength.level}`}
                      >
                        {passwordStrength.label}
                      </span>

                    </div>

                  )}


                  <small className="field-help">
                    Use at least 8 characters with uppercase,
                    lowercase, numbers and symbols.
                  </small>

                </div>


                {/* CONFIRM PASSWORD */}

                <div className="form-field">

                  <label>
                    Confirm Password *
                  </label>


                  <div className="input-wrapper">

                    <span className="input-icon">
                      🔐
                    </span>


                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />

                  </div>

                </div>

              </div>

            </>
          )}


          {/* =================================================
              ERROR
          ================================================= */}

          {error && (

            <p className="auth-error">

              <span>!</span>

              {error}

            </p>

          )}


          {/* =================================================
              SUCCESS
          ================================================= */}

          {success && (

            <p className="auth-success">

              <span>✓</span>

              {success}

            </p>

          )}


          {/* =================================================
              NAVIGATION BUTTONS
          ================================================= */}

          <div className="wizard-actions">


            {step > 1 ? (

              <button
                type="button"
                className="secondary-button"
                onClick={handlePrevious}
              >
                ← Previous
              </button>

            ) : (

              <span />

            )}


            {(
              (role === "student" && step < 3) ||
              (role === "tpo" && step < 2)
            ) ? (

              <button
                type="button"
                className="auth-submit next-button"
                onClick={handleNext}
              >
                Continue →
              </button>

            ) : (

              <button
                className="auth-submit"
                type="submit"
              >
                Create{" "}

                {role === "student"
                  ? "Student"
                  : "TPO"}{" "}

                Account
              </button>

            )}

          </div>

        </form>


        {/* =================================================
            FOOTER
        ================================================= */}

        <p className="auth-footer">

          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>

        </p>


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