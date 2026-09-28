const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema(
  {
    semester: {
      type: String,
      required: true,
    },

    sgpa: {
      type: String,
      default: "",
    },

    cgpa: {
      type: String,
      default: "",
    },

    percentage: {
      type: String,
      default: "",
    },

    backlogs: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const academicSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    tenth: {
      percentage: {
        type: Number,
        default: null,
      },

      passingYear: {
        type: String,
        default: "",
      },
    },

    twelfth: {
      percentage: {
        type: Number,
        default: null,
      },

      passingYear: {
        type: String,
        default: "",
      },
    },

    diploma: {
      completed: {
        type: String,
        default: "No",
      },

      percentage: {
        type: Number,
        default: null,
      },

      passingYear: {
        type: String,
        default: "",
      },
    },

    degree: {
      type: String,
      default: "B.Tech",
    },

    branch: {
      type: String,
      default: "",
    },

    college: {
      type: String,
      default: "",
    },

    admissionYear: {
      type: String,
      default: "",
    },

    currentSemester: {
      type: String,
      default: "",
    },

    semesters: {
      type: [semesterSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Academic", academicSchema);