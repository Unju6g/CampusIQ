const express = require("express");

const router = express.Router();

// =====================================================
// CERTIFICATIONS ROUTES
// =====================================================

// Temporary test route
router.get("/", (req, res) => {
  res.status(200).json({
    message: "Certifications API is working.",
  });
});

module.exports = router;