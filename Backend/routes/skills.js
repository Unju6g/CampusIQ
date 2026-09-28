const express = require("express");
const Skill = require("../models/Skill");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({
        message: "Student access only.",
      });
    }

    const skills = await Skill.find({
      student: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Skills loaded successfully.",
      skills,
    });
  } catch (error) {
    console.error("GET skills error:", error);

    res.status(500).json({
      message: "Failed to load skills.",
    });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({
        message: "Student access only.",
      });
    }

    const {
      name,
      category,
      proficiency,
      experience,
    } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        message: "Skill name and category are required.",
      });
    }

    const existing = await Skill.findOne({
      student: req.user.id,
      name: name.trim(),
    });

    if (existing) {
      return res.status(409).json({
        message: `${name.trim()} is already added.`,
      });
    }

    const skill = await Skill.create({
      student: req.user.id,
      name: name.trim(),
      category,
      proficiency: proficiency || "Intermediate",
      experience: Number(experience) || 0,
    });

    res.status(201).json({
      message: "Skill added successfully.",
      skill,
    });
  } catch (error) {
    console.error("POST skill error:", error);

    res.status(500).json({
      message: "Failed to add skill.",
    });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({
        message: "Student access only.",
      });
    }

    const skill = await Skill.findOneAndDelete({
      _id: req.params.id,
      student: req.user.id,
    });

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found.",
      });
    }

    res.status(200).json({
      message: "Skill deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE skill error:", error);

    res.status(500).json({
      message: "Failed to delete skill.",
    });
  }
});

module.exports = router;