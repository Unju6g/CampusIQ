const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// =====================================================
// GET LOGGED-IN STUDENT
// GET /api/student/me
// =====================================================

router.get("/me", authMiddleware, async (req, res) => {
  try {
    // Only students can access this route
    if (req.user.role !== "student") {
      return res.status(403).json({
        message: "Student access only.",
      });
    }

    // Find logged-in student
    const user = await User.findById(req.user.id).select(
      "-password -adminKey"
    );

    if (!user) {
      return res.status(404).json({
        message: "Student not found.",
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
      },
    });
  } catch (error) {
    console.error("Student /me error:", error);

    return res.status(500).json({
      message: "Failed to load student data.",
    });
  }
});

// =====================================================
// GET STUDENT ACADEMIC INFORMATION
// GET /api/student/academics
// =====================================================

router.get("/academics", authMiddleware, async (req, res) => {
  try {
    // Only students
    if (req.user.role !== "student") {
      return res.status(403).json({
        message: "Student access only.",
      });
    }

    const user = await User.findById(req.user.id).select(
      "academics"
    );

    if (!user) {
      return res.status(404).json({
        message: "Student not found.",
      });
    }

    return res.status(200).json({
      message: "Academic data loaded successfully.",
      academics: user.academics || {
        tenth: {
          percentage: "",
          passingYear: "",
        },
        twelfth: {
          percentage: "",
          passingYear: "",
        },
      },
    });
  } catch (error) {
    console.error("GET academics error:", error);

    return res.status(500).json({
      message: "Failed to load academic data.",
    });
  }
});

// =====================================================
// SAVE / UPDATE STUDENT ACADEMIC INFORMATION
// PUT /api/student/academics
// =====================================================

router.put("/academics", authMiddleware, async (req, res) => {
  try {
    // Only students
    if (req.user.role !== "student") {
      return res.status(403).json({
        message: "Student access only.",
      });
    }

    const {
      tenthPercentage,
      tenthPassingYear,
      twelfthPercentage,
      twelfthPassingYear,
    } = req.body;

    // =====================================================
    // VALIDATE 10TH PERCENTAGE
    // =====================================================

    if (
      tenthPercentage !== "" &&
      tenthPercentage !== undefined &&
      (
        Number(tenthPercentage) < 0 ||
        Number(tenthPercentage) > 100 ||
        isNaN(Number(tenthPercentage))
      )
    ) {
      return res.status(400).json({
        message: "10th percentage must be between 0 and 100.",
      });
    }

    // =====================================================
    // VALIDATE 12TH PERCENTAGE
    // =====================================================

    if (
      twelfthPercentage !== "" &&
      twelfthPercentage !== undefined &&
      (
        Number(twelfthPercentage) < 0 ||
        Number(twelfthPercentage) > 100 ||
        isNaN(Number(twelfthPercentage))
      )
    ) {
      return res.status(400).json({
        message: "12th percentage must be between 0 and 100.",
      });
    }

    // =====================================================
    // FIND STUDENT
    // =====================================================

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "Student not found.",
      });
    }

    // =====================================================
    // UPDATE ACADEMIC DATA
    // =====================================================

    user.academics = {
      tenth: {
        percentage:
          tenthPercentage !== "" &&
          tenthPercentage !== undefined
            ? Number(tenthPercentage)
            : undefined,

        passingYear:
          tenthPassingYear
            ? String(tenthPassingYear).trim()
            : undefined,
      },

      twelfth: {
        percentage:
          twelfthPercentage !== "" &&
          twelfthPercentage !== undefined
            ? Number(twelfthPercentage)
            : undefined,

        passingYear:
          twelfthPassingYear
            ? String(twelfthPassingYear).trim()
            : undefined,
      },
    };

    await user.save();

    return res.status(200).json({
      message: "Academic information saved successfully.",
      academics: user.academics,
    });
  } catch (error) {
    console.error("PUT academics error:", error);

    return res.status(500).json({
      message: "Failed to save academic information.",
    });
  }
});

module.exports = router;