const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// =====================================================
// REGISTER
// POST /api/auth/register
// =====================================================

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      prn,
      email,
      phone,
      branch,
      passingYear,
      semester,
      cgpa,
      backlogs,
      department,
      adminKey,
      password,
      role,
    } = req.body;

    // -------------------------------------------------
    // Basic validation
    // -------------------------------------------------

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Email, password and role are required.",
      });
    }

    // -------------------------------------------------
    // Validate role
    // -------------------------------------------------

    if (role !== "student" && role !== "tpo") {
      return res.status(400).json({
        message: "Invalid role. Select Student or TPO.",
      });
    }

    // -------------------------------------------------
    // Student validation
    // -------------------------------------------------

    if (role === "student") {
      if (!name || !prn || !branch) {
        return res.status(400).json({
          message: "Please fill all required student details.",
        });
      }

      if (password.length < 8) {
        return res.status(400).json({
          message: "Password must contain at least 8 characters.",
        });
      }
    }

    // -------------------------------------------------
    // TPO validation
    // -------------------------------------------------

    if (role === "tpo") {
      if (!department || !adminKey) {
        return res.status(400).json({
          message: "Please enter all required TPO/Admin details.",
        });
      }

      if (adminKey.length < 4) {
        return res.status(400).json({
          message: "Invalid admin key.",
        });
      }
    }

    // -------------------------------------------------
    // Check existing email
    // -------------------------------------------------

    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered.",
      });
    }

    // -------------------------------------------------
    // Hash password
    // -------------------------------------------------

    const hashedPassword = await bcrypt.hash(password, 10);

    // -------------------------------------------------
    // Create user
    // -------------------------------------------------

    const user = await User.create({
      name: name ? name.trim() : undefined,
      prn: prn ? prn.trim() : undefined,
      email: email.toLowerCase().trim(),
      phone: phone ? phone.trim() : undefined,
      branch: branch ? branch.trim() : undefined,
      passingYear,
      semester,
      cgpa: cgpa ? Number(cgpa) : undefined,
      backlogs: backlogs ? Number(backlogs) : 0,
      department: department
        ? department.trim()
        : undefined,
      adminKey:
        role === "tpo"
          ? adminKey
          : undefined,
      password: hashedPassword,
      role,
    });

    // -------------------------------------------------
    // Response
    // -------------------------------------------------

    return res.status(201).json({
      message: "Registration successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      message: "Server error during registration.",
    });
  }
});

// =====================================================
// LOGIN
// POST /api/auth/login
// =====================================================

router.post("/login", async (req, res) => {
  try {
    const {
      email,
      password,
      role,
    } = req.body;

    // -------------------------------------------------
    // Basic validation
    // -------------------------------------------------

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Email, password and role are required.",
      });
    }

    // -------------------------------------------------
    // Validate role
    // -------------------------------------------------

    if (role !== "student" && role !== "tpo") {
      return res.status(400).json({
        message: "Invalid user role.",
      });
    }

    // -------------------------------------------------
    // Find user
    // -------------------------------------------------

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    // -------------------------------------------------
    // Check role
    // -------------------------------------------------

    if (user.role !== role) {
      return res.status(401).json({
        message: "Selected role does not match this account.",
      });
    }

    // -------------------------------------------------
    // Check password
    // -------------------------------------------------

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    // -------------------------------------------------
    // Check JWT secret
    // -------------------------------------------------

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing from .env");

      return res.status(500).json({
        message: "Server authentication configuration error.",
      });
    }

    // -------------------------------------------------
    // Create JWT
    // -------------------------------------------------

    const token = jwt.sign(
      {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // -------------------------------------------------
    // Login successful
    // -------------------------------------------------

    return res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,

        // Send student information
        prn: user.prn,
        phone: user.phone,
        branch: user.branch,
        passingYear: user.passingYear,
        semester: user.semester,
        cgpa: user.cgpa,
        backlogs: user.backlogs,
        department: user.department,
      },
    });

  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Server error during login.",
    });
  }
});

// =====================================================
// GET LOGGED-IN USER
// GET /api/auth/me
// =====================================================

router.get("/me", authMiddleware, async (req, res) => {
  try {
    // Make sure authenticated user is a student
    if (req.user.role !== "student") {
      return res.status(403).json({
        message: "Student access only.",
      });
    }

    // Find user using JWT id
    const user = await User.findById(req.user.id).select(
      "-password -adminKey"
    );

    if (!user) {
      return res.status(404).json({
        message: "Student account not found.",
      });
    }

    return res.status(200).json({
      message: "Student data loaded successfully.",
      user: {
        id: user._id,
        name: user.name,
        prn: user.prn,
        email: user.email,
        phone: user.phone,
        branch: user.branch,
        passingYear: user.passingYear,
        semester: user.semester,
        cgpa: user.cgpa,
        backlogs: user.backlogs,
        department: user.department,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });

  } catch (error) {
    console.error("Get student error:", error);

    return res.status(500).json({
      message: "Server error while loading student data.",
    });
  }
});

module.exports = router;