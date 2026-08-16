import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Temporary pages - we will build these later */}
        <Route
          path="/login"
          element={
            <div style={{ padding: "50px", color: "white" }}>
              Login page coming next...
            </div>
          }
        />

        <Route
          path="/register"
          element={
            <div style={{ padding: "50px", color: "white" }}>
              Registration page coming next...
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;