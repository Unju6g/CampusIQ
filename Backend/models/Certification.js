const mongoose = require("mongoose");

const certificationSchema = new mongoose.Schema(
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

    issuingOrganization: {
      type: String,
      default: "",
      trim: true,
    },

    issueDate: {
      type: String,
      default: "",
    },

    expiryDate: {
      type: String,
      default: "",
    },

    credentialId: {
      type: String,
      default: "",
      trim: true,
    },

    credentialUrl: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Certification",
  certificationSchema
);