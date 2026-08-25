import React, { useState } from "react";
import "./Certifications.css";

const certificationExamples = [
  "AWS Certified Cloud Practitioner",
  "NPTEL Data Structures",
  "Google Data Analytics",
  "Python Certification",
];

function Certifications() {
  const [certifications, setCertifications] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    issuer: "",
    issueDate: "",
    credentialId: "",
    credentialUrl: "",
  });

  const openAddForm = (certificationName = "") => {
    setFormData({
      name: certificationName,
      issuer: "",
      issueDate: "",
      credentialId: "",
      credentialUrl: "",
    });

    setShowForm(true);

    setTimeout(() => {
      document
        .querySelector(".certification-form-card")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };

  const closeForm = () => {
    setShowForm(false);
    setFormData({
      name: "",
      issuer: "",
      issueDate: "",
      credentialId: "",
      credentialUrl: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter certification name.");
      return;
    }

    const newCertification = {
      ...formData,
      id: Date.now(),
    };

    setCertifications((prev) => [...prev, newCertification]);

    closeForm();
  };

  const deleteCertification = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this certification?"
    );

    if (!confirmDelete) return;

    setCertifications((prev) =>
      prev.filter((certification) => certification.id !== id)
    );
  };

  return (
    <div className="certifications-page">

      {/* ================= HEADER ================= */}

      <div className="certifications-header">
        <div>
          <span className="certifications-label">
            PROFILE &nbsp;/&nbsp; CERTIFICATIONS
          </span>

          <h1>Certifications</h1>

          <p>
            Showcase your certifications and achievements for placement
            opportunities.
          </p>
        </div>

        {certifications.length > 0 && (
          <button
            className="add-certification-header-btn"
            onClick={() => openAddForm()}
          >
            <span>+</span>
            Add Certification
          </button>
        )}
      </div>

      {/* ================= INFORMATION CARD ================= */}

      <section className="certification-info-card">

        <div className="info-icon-box">
          <span>i</span>
        </div>

        <div className="info-content">
          <h2>Certification Information</h2>

          <p>
            Add certifications that demonstrate your technical knowledge,
            professional skills, and learning achievements.
          </p>

          <div className="examples-title">
            Examples:
          </div>

          <div className="certification-examples">
            {certificationExamples.map((example) => (
              <button
                type="button"
                className="example-chip"
                key={example}
                onClick={() => openAddForm(example)}
              >
                <span className="chip-plus">+</span>
                {example}
              </button>
            ))}
          </div>

          <div className="certification-tip">
            <span className="tip-icon">💡</span>

            <span>
              Don't see your certification? You can add any other
              certification using the Add Certification form.
            </span>
          </div>
        </div>
      </section>

      {/* ================= ADD FORM ================= */}

      {showForm && (
        <section className="certification-form-card">

          <div className="form-card-header">
            <div>
              <span className="form-section-label">
                NEW CERTIFICATION
              </span>

              <h2>Add Certification</h2>

              <p>
                Enter your certification details below.
              </p>
            </div>

            <button
              type="button"
              className="close-form-btn"
              onClick={closeForm}
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="cert-form-grid">

              <div className="cert-form-group">
                <label>
                  Certification Name <span>*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. AWS Certified Cloud Practitioner"
                  required
                />
              </div>

              <div className="cert-form-group">
                <label>Issuing Organization</label>

                <input
                  type="text"
                  name="issuer"
                  value={formData.issuer}
                  onChange={handleChange}
                  placeholder="e.g. Amazon Web Services"
                />
              </div>

              <div className="cert-form-group">
                <label>Issue Date</label>

                <input
                  type="month"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleChange}
                />
              </div>

              <div className="cert-form-group">
                <label>Credential ID</label>

                <input
                  type="text"
                  name="credentialId"
                  value={formData.credentialId}
                  onChange={handleChange}
                  placeholder="Enter credential ID"
                />
              </div>

              <div className="cert-form-group full-width">
                <label>Credential URL</label>

                <input
                  type="url"
                  name="credentialUrl"
                  value={formData.credentialUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                />

                <small>
                  Add a verification link if available.
                </small>
              </div>

            </div>

            <div className="cert-form-actions">

              <button
                type="button"
                className="cancel-cert-btn"
                onClick={closeForm}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-cert-btn"
              >
                Save Certification
              </button>

            </div>

          </form>
        </section>
      )}

      {/* ================= MY CERTIFICATIONS ================= */}

      <section className="my-certifications-card">

        <div className="my-certifications-header">

          <div>
            <h2>
              My Certifications{" "}
              <span className="certification-count">
                ({certifications.length})
              </span>
            </h2>

            <p>
              Keep your certification profile updated for placement
              opportunities.
            </p>
          </div>

        </div>

        {/* ================= EMPTY STATE ================= */}

        {certifications.length === 0 ? (
          <div className="certification-empty-state">

            <div className="empty-cert-icon">
              🏆
            </div>

            <h3>No certifications added</h3>

            <p>
              Add your certifications to strengthen your placement profile
              and showcase your achievements.
            </p>

            <button
              type="button"
              className="empty-add-cert-btn"
              onClick={() => openAddForm()}
            >
              <span>+</span>
              Add Certification
            </button>

          </div>
        ) : (
          <div className="certifications-list">

            {certifications.map((certification, index) => (
              <div
                className="certification-item"
                key={certification.id}
              >

                <div className="cert-item-icon">
                  🏆
                </div>

                <div className="cert-item-content">

                  <div className="cert-title-row">

                    <h3>
                      {certification.name}
                    </h3>

                    <span className="cert-number">
                      {index + 1}
                    </span>

                  </div>

                  {certification.issuer && (
                    <p className="cert-issuer">
                      {certification.issuer}
                    </p>
                  )}

                  <div className="cert-meta">

                    {certification.issueDate && (
                      <span>
                        Issued: {certification.issueDate}
                      </span>
                    )}

                    {certification.credentialId && (
                      <span>
                        ID: {certification.credentialId}
                      </span>
                    )}

                  </div>

                  {certification.credentialUrl && (
                    <a
                      href={certification.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="credential-link"
                    >
                      View Credential ↗
                    </a>
                  )}

                </div>

                <button
                  type="button"
                  className="delete-cert-btn"
                  onClick={() =>
                    deleteCertification(certification.id)
                  }
                >
                  Delete
                </button>

              </div>
            ))}

          </div>
        )}

      </section>

    </div>
  );
}

export default Certifications;