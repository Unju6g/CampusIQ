const mongoose = require("mongoose");

// =====================================================
// SEMESTER SCHEMA
// =====================================================

const semesterSchema = new mongoose.Schema(
  {
    semester: {
      type: String,
      required: true,
      trim: true,
    },

    sgpa: {
      type: String,
      default: "",
      trim: true,
    },

    cgpa: {
      type: String,
      default: "",
      trim: true,
    },

    percentage: {
      type: String,
      default: "",
      trim: true,
    },

    backlogs: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    _id: false,
  }
);

// =====================================================
// ACADEMIC SCHEMA
// =====================================================

const academicSchema = new mongoose.Schema(
  {
    // -------------------------------------------------
    // Logged-in student
    // -------------------------------------------------

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // -------------------------------------------------
    // 10th
    // -------------------------------------------------

    tenth: {
      percentage: {
        type: Number,
        default: null,
      },

      passingYear: {
        type: String,
        default: "",
        trim: true,
      },
    },

    // -------------------------------------------------
    // 12th
    // -------------------------------------------------

    twelfth: {
      percentage: {
        type: Number,
        default: null,
      },

      passingYear: {
        type: String,
        default: "",
        trim: true,
      },
    },

    // -------------------------------------------------
    // Diploma
    // -------------------------------------------------

    diploma: {
      completed: {
        type: String,
        default: "No",
        trim: true,
      },

      percentage: {
        type: Number,
        default: null,
      },

      passingYear: {
        type: String,
        default: "",
        trim: true,
      },
    },

    // -------------------------------------------------
    // Degree
    // -------------------------------------------------

    degree: {
      type: String,
      default: "B.Tech",
      trim: true,
    },

    branch: {
      type: String,
      default: "",
      trim: true,
    },

    college: {
      type: String,
      default: "",
      trim: true,
    },

    admissionYear: {
      type: String,
      default: "",
      trim: true,
    },

    currentSemester: {
      type: String,
      default: "",
      trim: true,
    },

    // -------------------------------------------------
    // Semester-wise academic records
    // -------------------------------------------------

    semesters: {
      type: [semesterSchema],
      default: [],
    },
  },

  // Automatically adds:
  // createdAt
  // updatedAt

  {
    timestamps: true,
  }
);

// =====================================================
// EXPORT MODEL
// =====================================================

module.exports = mongoose.model("Academic", academicSchema);