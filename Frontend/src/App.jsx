import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Dashboards
import StudentDashboard from "./pages/student/StudentDashboard";
import TPODashboard from "./pages/tpo/TPODashboard";


/* ================================
   PROTECTED ROUTE
================================ */

function ProtectedRoute({ children, role }) {
  const storedUser = localStorage.getItem("campusiqUser");

  // User is not logged in
  if (!storedUser) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(storedUser);

  // User has wrong role
  if (user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


/* ================================
   APP
================================ */

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =========================
            LANDING PAGE
        ========================= */}

        <Route
          path="/"
          element={<Landing />}
        />


        {/* =========================
            AUTHENTICATION
        ========================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =========================
            STUDENT DASHBOARD
        ========================= */}

        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />


        {/* =========================
            TPO DASHBOARD
        ========================= */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="tpo">
              <TPODashboard />
            </ProtectedRoute>
          }
        />


        {/* =========================
            INVALID URL
        ========================= */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;