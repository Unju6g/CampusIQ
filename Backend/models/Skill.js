const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
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

    category: {
      type: String,
      required: true,
      trim: true,
    },

    proficiency: {
      type: String,
      enum: [
        "Beginner",
        "Intermediate",
        "Advanced",
        "Expert",
      ],
      default: "Intermediate",
    },

    experience: {
      type: Number,
      default: 0,
      min: 0,
      max: 50,
    },
  },
  {
    timestamps: true,
  }
);

skillSchema.index(
  { student: 1, name: 1 },
  { unique: true }
);

module.exports = mongoose.model("Skill", skillSchema);