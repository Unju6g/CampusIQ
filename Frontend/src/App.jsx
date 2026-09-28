import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// =====================================================
// MAIN
// =====================================================

import Landing from "./pages/Landing";

// =====================================================
// AUTH
// =====================================================

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// =====================================================
// STUDENT
// =====================================================

import StudentDashboard from "./pages/student/StudentDashboard";
import Profile from "./pages/student/Profile";
import Academics from "./pages/student/Academics";
import Certifications from "./pages/student/Certifications";
import Projects from "./pages/student/Projects";
import Skills from "./pages/student/Skills";
import ResumeAnalyzer from "./pages/student/ResumeAnalyzer";
import PlacementReadiness from "./pages/student/PlacementReadiness";
import ReadinessRoadmap from "./pages/student/ReadinessRoadmap";
import EligibleDrives from "./pages/student/EligibleDrives";
import NoticeBoard from "./pages/student/NoticeBoard";

// =====================================================
// TPO / ADMIN
// =====================================================

import TPODashboard from "./pages/tpo/TPODashboard";
import Students from "./pages/tpo/Students";
import Companies from "./pages/tpo/Companies";
import PlacementDrives from "./pages/tpo/PlacementDrives";
import Eligibility from "./pages/tpo/Eligibility";
import Applications from "./pages/tpo/Applications";
import Announcements from "./pages/tpo/Announcements";
import Analytics from "./pages/tpo/Analytics";

// =====================================================
// PROTECTED ROUTE
// =====================================================

function ProtectedRoute({ children, role }) {
  const storedUser = localStorage.getItem("campusiqUser");

  // ---------------------------------------------------
  // No login
  // ---------------------------------------------------

  if (!storedUser) {
    return <Navigate to="/login" replace />;
  }

  let user;

  try {
    user = JSON.parse(storedUser);
  } catch (error) {
    localStorage.removeItem("campusiqUser");
    return <Navigate to="/login" replace />;
  }

  // ---------------------------------------------------
  // Check role
  // ---------------------------------------------------

  if (!user || user.role !== role) {

    if (user?.role === "student") {
      return <Navigate to="/student/dashboard" replace />;
    }

    if (user?.role === "tpo") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return <Navigate to="/login" replace />;
  }

  return children;
}

// =====================================================
// APP
// =====================================================

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =================================================
            HOME
        ================================================= */}

        <Route
          path="/"
          element={<Landing />}
        />

        {/* =================================================
            AUTHENTICATION
        ================================================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* =================================================
            STUDENT DASHBOARD
        ================================================= */}

        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            STUDENT PROFILE
        ================================================= */}

        <Route
          path="/student/profile"
          element={
            <ProtectedRoute role="student">
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            STUDENT ACADEMICS
        ================================================= */}

        <Route
          path="/student/academics"
          element={
            <ProtectedRoute role="student">
              <Academics />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            STUDENT CERTIFICATIONS
        ================================================= */}

        <Route
          path="/student/certifications"
          element={
            <ProtectedRoute role="student">
              <Certifications />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            STUDENT PROJECTS
        ================================================= */}

        <Route
          path="/student/projects"
          element={
            <ProtectedRoute role="student">
              <Projects />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            STUDENT SKILLS
        ================================================= */}

        <Route
          path="/student/skills"
          element={
            <ProtectedRoute role="student">
              <Skills />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            STUDENT RESUME
        ================================================= */}

        <Route
          path="/student/resume"
          element={
            <ProtectedRoute role="student">
              <ResumeAnalyzer />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            STUDENT PLACEMENT READINESS
        ================================================= */}

        <Route
          path="/student/readiness"
          element={
            <ProtectedRoute role="student">
              <PlacementReadiness />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            STUDENT ROADMAP
        ================================================= */}

        <Route
          path="/student/roadmap"
          element={
            <ProtectedRoute role="student">
              <ReadinessRoadmap />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            STUDENT ELIGIBLE DRIVES
        ================================================= */}

        <Route
          path="/student/drives"
          element={
            <ProtectedRoute role="student">
              <EligibleDrives />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            STUDENT NOTICE BOARD
        ================================================= */}

        <Route
          path="/student/notices"
          element={
            <ProtectedRoute role="student">
              <NoticeBoard />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            TPO / ADMIN DASHBOARD
        ================================================= */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="tpo">
              <TPODashboard />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            TPO / ADMIN - STUDENTS
        ================================================= */}

        <Route
          path="/admin/students"
          element={
            <ProtectedRoute role="tpo">
              <Students />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            TPO / ADMIN - COMPANIES
        ================================================= */}

        <Route
          path="/admin/companies"
          element={
            <ProtectedRoute role="tpo">
              <Companies />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            TPO / ADMIN - PLACEMENT DRIVES
        ================================================= */}

        <Route
          path="/admin/placement-drives"
          element={
            <ProtectedRoute role="tpo">
              <PlacementDrives />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            TPO / ADMIN - ELIGIBILITY
        ================================================= */}

        <Route
          path="/admin/eligibility"
          element={
            <ProtectedRoute role="tpo">
              <Eligibility />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            TPO / ADMIN - APPLICATIONS
        ================================================= */}

        <Route
          path="/admin/applications"
          element={
            <ProtectedRoute role="tpo">
              <Applications />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            TPO / ADMIN - ANNOUNCEMENTS
        ================================================= */}

        <Route
          path="/admin/announcements"
          element={
            <ProtectedRoute role="tpo">
              <Announcements />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            TPO / ADMIN - ANALYTICS
        ================================================= */}

        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute role="tpo">
              <Analytics />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            BACKWARD-COMPATIBLE TPO ROUTES
            These prevent old buttons from breaking.
        ================================================= */}

        {/* Old Placement Drives URL */}
        <Route
          path="/admin/drives"
          element={
            <Navigate
              to="/admin/placement-drives"
              replace
            />
          }
        />

        {/* Old Companies URL */}
        <Route
          path="/admin/company"
          element={
            <Navigate
              to="/admin/companies"
              replace
            />
          }
        />

        {/* Old Student URL */}
        <Route
          path="/admin/student"
          element={
            <Navigate
              to="/admin/students"
              replace
            />
          }
        />

        {/* =================================================
            INVALID URL
        ================================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;