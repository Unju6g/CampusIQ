import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// =====================================================
// MAIN PAGES
// =====================================================

import Landing from "./pages/Landing";

// =====================================================
// AUTHENTICATION
// =====================================================

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// =====================================================
// STUDENT PAGES
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
// TPO
// =====================================================

import TPODashboard from "./pages/tpo/TPODashboard";

// =====================================================
// PROTECTED ROUTE
// =====================================================

function ProtectedRoute({ children, role }) {
  const storedUser = localStorage.getItem("campusiqUser");

  // User is not logged in
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

  // User has wrong role
  if (user.role !== role) {
    if (user.role === "student") {
      return <Navigate to="/student/dashboard" replace />;
    }

    if (user.role === "tpo") {
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

        {/* ================= HOME ================= */}

        <Route
          path="/"
          element={<Landing />}
        />

        {/* ================= AUTH ================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ================= STUDENT ================= */}

        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/profile"
          element={
            <ProtectedRoute role="student">
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/academics"
          element={
            <ProtectedRoute role="student">
              <Academics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/certifications"
          element={
            <ProtectedRoute role="student">
              <Certifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/projects"
          element={
            <ProtectedRoute role="student">
              <Projects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/skills"
          element={
            <ProtectedRoute role="student">
              <Skills />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/resume"
          element={
            <ProtectedRoute role="student">
              <ResumeAnalyzer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/readiness"
          element={
            <ProtectedRoute role="student">
              <PlacementReadiness />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/roadmap"
          element={
            <ProtectedRoute role="student">
              <ReadinessRoadmap />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/drives"
          element={
            <ProtectedRoute role="student">
              <EligibleDrives />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/notices"
          element={
            <ProtectedRoute role="student">
              <NoticeBoard />
            </ProtectedRoute>
          }
        />

        {/* ================= TPO ================= */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="tpo">
              <TPODashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= INVALID URL ================= */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;