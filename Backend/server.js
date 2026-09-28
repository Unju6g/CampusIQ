const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// =====================================================
// ROUTES
// =====================================================

const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");

const academicRoutes = require("./routes/academics");
const skillRoutes = require("./routes/skills");
const projectRoutes = require("./routes/projects");
const certificationRoutes = require("./routes/certifications");

const app = express();

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());
app.use(express.json());

// =====================================================
// AUTHENTICATION ROUTES
// =====================================================

app.use("/api/auth", authRoutes);

// =====================================================
// STUDENT ROUTES
// =====================================================

app.use("/api/student", studentRoutes);

// =====================================================
// STUDENT MODULE ROUTES
// =====================================================

app.use("/api/student/academics", academicRoutes);

app.use("/api/student/skills", skillRoutes);

app.use("/api/student/projects", projectRoutes);

app.use("/api/student/certifications", certificationRoutes);

// =====================================================
// TEST ROUTE
// =====================================================

app.get("/", (req, res) => {
  res.send("CampusIQ Backend is Running!");
});

// =====================================================
// MONGODB CONNECTION
// =====================================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(
        `CampusIQ Backend running on http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:");
    console.error(error.message);
  });