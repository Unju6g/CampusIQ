const mongoose = require("mongoose");

const readinessSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    score: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    technicalScore: {
      type: Number,
      default: 0,
    },

    academicScore: {
      type: Number,
      default: 0,
    },

    projectScore: {
      type: Number,
      default: 0,
    },

    resumeScore: {
      type: Number,
      default: 0,
    },

    skillScore: {
      type: Number,
      default: 0,
    },

    recommendations: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Readiness",
  readinessSchema
);