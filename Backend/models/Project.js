const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    // Student who owns this project
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Basic Project Information
    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: [
        "Software",
        "Hardware",
        "IoT",
        "Embedded",
        "Data Analytics",
        "AI / ML",
      ],
      default: "Software",
    },

    status: {
      type: String,
      enum: [
        "In Progress",
        "Completed",
        "Planned",
      ],
      default: "In Progress",
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Technical Information
    technologies: {
      type: String,
      default: "",
      trim: true,
    },

    tools: {
      type: String,
      default: "",
      trim: true,
    },

    // Hardware / Embedded / IoT Information
    hardwareComponents: {
      type: String,
      default: "",
      trim: true,
    },

    specifications: {
      type: String,
      default: "",
      trim: true,
    },

    // Project Duration
    duration: {
      type: String,
      default: "",
      trim: true,
    },

    // Project Links
    github: {
      type: String,
      default: "",
      trim: true,
    },

    liveDemo: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);