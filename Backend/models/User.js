const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // =====================================================
    // BASIC USER INFORMATION
    // =====================================================

    name: {
      type: String,
      trim: true,
    },

    prn: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    branch: {
      type: String,
      trim: true,
    },

    passingYear: {
      type: String,
    },

    semester: {
      type: String,
    },

    cgpa: {
      type: Number,
    },

    backlogs: {
      type: Number,
      default: 0,
    },

    department: {
      type: String,
      trim: true,
    },

    adminKey: {
      type: String,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "tpo"],
      required: true,
    },

    // =====================================================
    // ACADEMIC INFORMATION
    // =====================================================

    academics: {
      tenth: {
        percentage: {
          type: Number,
          min: 0,
          max: 100,
        },

        passingYear: {
          type: String,
          trim: true,
        },
      },

      twelfth: {
        percentage: {
          type: Number,
          min: 0,
          max: 100,
        },

        passingYear: {
          type: String,
          trim: true,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);