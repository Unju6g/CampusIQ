const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

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

    technologies: {
      type: String,
      default: "",
      trim: true,
    },

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

    tools: {
      type: String,
      default: "",
      trim: true,
    },

    duration: {
      type: String,
      default: "",
      trim: true,
    },

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