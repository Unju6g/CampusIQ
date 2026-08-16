import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Target,
  FileText,
  BarChart3,
  Building2,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  BrainCircuit,
  Users,
  Menu,
  X,
} from "lucide-react";

import "./Landing.css";

import logo from "../assets/campusiq-header.png";


function Landing() {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleModal, setRoleModal] = useState(null);


  const openRoleModal = (type) => {
    setRoleModal(type);
    setMobileMenuOpen(false);
  };


  const closeRoleModal = () => {
    setRoleModal(null);
  };


  const goToPortal = (role) => {
    if (roleModal === "login") {
      navigate(`/login?role=${role}`);
    } else {
      navigate(`/register?role=${role}`);
    }

    setRoleModal(null);
  };


  return (
    <main className="landing-page">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <Link
          to="/"
          className="brand"
          onClick={() => setMobileMenuOpen(false)}
        >
          <img
            src={logo}
            alt="CampusIQ"
            className="navbar-logo"
          />
        </Link>


        <div
          className={`nav-links ${
            mobileMenuOpen ? "mobile-open" : ""
          }`}
        >

          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
          >
            Features
          </a>

          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </a>


          <div className="nav-actions">

            <button
              type="button"
              className="nav-login"
              onClick={() => openRoleModal("login")}
            >
              Login
            </button>

            <button
              type="button"
              className="nav-signup"
              onClick={() => openRoleModal("signup")}
            >
              Sign Up
            </button>

          </div>

        </div>


        <button
          type="button"
          className="mobile-menu-button"
          onClick={() =>
            setMobileMenuOpen(!mobileMenuOpen)
          }
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? (
            <X size={25} />
          ) : (
            <Menu size={25} />
          )}
        </button>

      </nav>


      {/* ================= ROLE MODAL ================= */}

      {roleModal && (

        <div
          className="role-modal-overlay"
          onClick={closeRoleModal}
        >

          <div
            className="role-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              type="button"
              className="modal-close"
              onClick={closeRoleModal}
              aria-label="Close"
            >
              <X size={20} />
            </button>


            <div className="modal-icon">
              <GraduationCap size={28} />
            </div>


            <p className="modal-label">
              CAMPUSIQ PORTAL
            </p>


            <h2>
              {roleModal === "login"
                ? "Choose your login"
                : "Create your account"}
            </h2>


            <p className="modal-description">
              Select your account type to continue.
            </p>


            <div className="role-options">

              <button
                type="button"
                className="role-option"
                onClick={() =>
                  goToPortal("student")
                }
              >

                <div className="role-option-icon">
                  <GraduationCap size={25} />
                </div>

                <div className="role-option-content">

                  <strong>
                    Student
                  </strong>

                  <span>
                    Access your placement dashboard,
                    applications and preparation tools.
                  </span>

                </div>

                <ArrowRight size={19} />

              </button>


              <button
                type="button"
                className="role-option"
                onClick={() =>
                  goToPortal("tpo")
                }
              >

                <div className="role-option-icon">
                  <Building2 size={25} />
                </div>

                <div className="role-option-content">

                  <strong>
                    TPO / Placement Cell
                  </strong>

                  <span>
                    Manage students, companies,
                    drives and placement analytics.
                  </span>

                </div>

                <ArrowRight size={19} />

              </button>

            </div>

          </div>

        </div>

      )}


      {/* ================= HERO ================= */}

      <section className="hero">

        <div className="hero-content">

          <div className="hero-badge">
            <span className="badge-dot"></span>
            Smart Placement Management Platform
          </div>


          <h1>
            Your Campus.
            <br />
            Your <span>Career.</span>
            <br />
            Smarter.
          </h1>


          <p>
            CampusIQ connects students, placement officers
            and companies in one intelligent platform designed
            to simplify the entire placement journey.
          </p>


          <div className="institution-line">

            <GraduationCap size={18} />

            <span>
              Walchand Institute of Technology Placement Cell
            </span>

          </div>


          <div className="hero-buttons">

            <button
              type="button"
              className="primary-button"
              onClick={() =>
                openRoleModal("signup")
              }
            >
              Get Started
              <ArrowRight size={18} />
            </button>


            <a
              href="#features"
              className="secondary-button"
            >
              Explore Features
            </a>

          </div>

        </div>


        {/* ================= DASHBOARD PREVIEW ================= */}

        <div className="hero-dashboard">

          <div className="preview-label">
            <span className="preview-dot"></span>
            SAMPLE STUDENT DASHBOARD
          </div>


          <div className="dashboard-header">

            <div>

              <p>
                Placement overview
              </p>

              <h3>
                See your readiness at a glance
              </h3>

            </div>


            <div className="profile-circle">
              <GraduationCap size={20} />
            </div>

          </div>


          <div className="readiness-card">

            <div>

              <p>
                Placement Readiness
              </p>

              <h2>
                78%
              </h2>

              <span>
                Sample score
              </span>

            </div>


            <div className="progress-circle">
              78
            </div>

          </div>


          <div className="mini-cards">

            <div className="mini-card">

              <Target size={19} />

              <p>
                Eligible Companies
              </p>

              <h3>
                12
              </h3>

            </div>


            <div className="mini-card">

              <FileText size={19} />

              <p>
                Resume Score
              </p>

              <h3>
                82%
              </h3>

            </div>


            <div className="mini-card">

              <Building2 size={19} />

              <p>
                Active Drives
              </p>

              <h3>
                5
              </h3>

            </div>

          </div>

        </div>

      </section>


      {/* ================= TRUST STRIP ================= */}

      <section className="trust-strip">

        <div>
          <CheckCircle2 size={18} />
          Automated Eligibility
        </div>

        <div>
          <BrainCircuit size={18} />
          AI-Powered Insights
        </div>

        <div>
          <BarChart3 size={18} />
          Placement Analytics
        </div>

        <div>
          <Users size={18} />
          Student & TPO Management
        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section
        className="features-section"
        id="features"
      >

        <div className="section-heading">

          <p>
            WHY CAMPUSIQ
          </p>

          <h2>
            Everything you need for{" "}
            <span>
              placement success.
            </span>
          </h2>

          <div className="heading-line"></div>

        </div>


        <div className="feature-grid">

          <a
            href="#smart-eligibility"
            className="feature-card"
          >

            <div className="feature-icon">
              <Target
                size={27}
                strokeWidth={2}
              />
            </div>

            <h3>
              Smart Eligibility
            </h3>

            <p>
              Automatically identify companies and placement
              drives you're eligible for based on your academic
              profile.
            </p>

            <span className="learn-more">
              Learn More
              <ArrowRight size={16} />
            </span>

          </a>


          <a
            href="#resume-analysis"
            className="feature-card"
          >

            <div className="feature-icon">
              <FileText
                size={27}
                strokeWidth={2}
              />
            </div>

            <h3>
              AI Resume Analysis
            </h3>

            <p>
              Analyze your resume and receive intelligent
              suggestions to improve your placement profile.
            </p>

            <span className="learn-more">
              Learn More
              <ArrowRight size={16} />
            </span>

          </a>


          <a
            href="#readiness"
            className="feature-card"
          >

            <div className="feature-icon">
              <BarChart3
                size={27}
                strokeWidth={2}
              />
            </div>

            <h3>
              Readiness Score
            </h3>

            <p>
              Understand your placement readiness, skill gaps
              and recommended preparation roadmap.
            </p>

            <span className="learn-more">
              Learn More
              <ArrowRight size={16} />
            </span>

          </a>


          <a
            href="#tpo-management"
            className="feature-card"
          >

            <div className="feature-icon">
              <Building2
                size={27}
                strokeWidth={2}
              />
            </div>

            <h3>
              TPO Management
            </h3>

            <p>
              Give placement officers powerful tools to manage
              students, companies, drives and placement activities.
            </p>

            <span className="learn-more">
              Learn More
              <ArrowRight size={16} />
            </span>

          </a>

        </div>

      </section>


      {/* ================= FEATURE DETAILS ================= */}

      <section className="feature-details">

        <div
          className="feature-detail"
          id="smart-eligibility"
        >

          <div className="detail-icon">
            <Target size={30} />
          </div>

          <div>

            <p className="detail-label">
              SMART ELIGIBILITY
            </p>

            <h3>
              Find the right placement opportunities automatically.
            </h3>

            <p>
              CampusIQ evaluates CGPA, branch, backlog status
              and company requirements to identify eligible
              students and drives.
            </p>

          </div>

        </div>


        <div
          className="feature-detail"
          id="resume-analysis"
        >

          <div className="detail-icon">
            <FileText size={30} />
          </div>

          <div>

            <p className="detail-label">
              AI RESUME ANALYSIS
            </p>

            <h3>
              Understand how strong your resume is.
            </h3>

            <p>
              CampusIQ analyzes resume content and provides
              improvement suggestions to strengthen your
              placement profile.
            </p>

          </div>

        </div>


        <div
          className="feature-detail"
          id="readiness"
        >

          <div className="detail-icon">
            <BarChart3 size={30} />
          </div>

          <div>

            <p className="detail-label">
              PLACEMENT READINESS
            </p>

            <h3>
              Know what you need to improve before placement season.
            </h3>

            <p>
              Identify skill gaps and receive preparation
              recommendations through readiness analysis
              and roadmap suggestions.
            </p>

          </div>

        </div>


        <div
          className="feature-detail"
          id="tpo-management"
        >

          <div className="detail-icon">
            <Building2 size={30} />
          </div>

          <div>

            <p className="detail-label">
              TPO MANAGEMENT
            </p>

            <h3>
              Centralize your entire placement operation.
            </h3>

            <p>
              Manage students, companies, placement drives,
              eligibility filtering, announcements and analytics
              from one platform.
            </p>

          </div>

        </div>

      </section>


      {/* ================= ABOUT ================= */}

      <section
        className="about-section"
        id="about"
      >

        <div className="about-heading">

          <p className="section-label">
            BUILT FOR YOUR CAMPUS
          </p>

          <h2>
            Turning placement management{" "}
            <span>
              into intelligence.
            </span>
          </h2>

        </div>


        <div className="about-content">

          <p>
            CampusIQ brings students and placement teams
            together through automation, analytics and
            AI-powered insights.
          </p>

          <p>
            Instead of managing placement activities manually,
            institutions can use one centralized platform to
            make faster and smarter decisions.
          </p>


          <div className="institution-card">

            <GraduationCap size={24} />

            <div>

              <strong>
                Walchand Institute of Technology
              </strong>

              <span>
                Placement Cell
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer>

        <div className="footer-brand">

          <Link
            to="/"
            className="brand"
          >

            <img
              src={logo}
              alt="CampusIQ"
              className="footer-logo"
            />

          </Link>

          <p>
            Intelligent Guidance. Better Placements.
          </p>

        </div>


        <div className="footer-links">

          <div>

            <h4>
              Platform
            </h4>

            <a href="#features">
              Features
            </a>

            <a href="#about">
              About
            </a>

          </div>


          <div>

            <h4>
              Portals
            </h4>

            <button
              type="button"
              onClick={() =>
                openRoleModal("login")
              }
            >
              Login
            </button>

            <button
              type="button"
              onClick={() =>
                openRoleModal("signup")
              }
            >
              Sign Up
            </button>

          </div>


          <div>

            <h4>
              Institution
            </h4>

            <span>
              Walchand Institute of Technology
            </span>

            <span>
              Placement Cell
            </span>

          </div>

        </div>

      </footer>


      {/* ================= COPYRIGHT ================= */}

      <div className="copyright">

        <span>
          © 2026 CampusIQ
        </span>

        <span>
          Smart Placement Management Platform
        </span>

      </div>

    </main>
  );
}


export default Landing;