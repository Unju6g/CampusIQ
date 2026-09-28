import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Announcements.css";

function Announcements() {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);

  const [announcements, setAnnouncements] = useState([
    {
      title: "TechNova Solutions Placement Drive",
      message:
        "Applications are now open for the Software Engineer placement drive.",
      type: "Placement",
      date: "28 Aug 2026",
      status: "Published",
    },
    {
      title: "Resume Submission Deadline",
      message:
        "Students are requested to update and submit their latest resumes.",
      type: "Important",
      date: "27 Aug 2026",
      status: "Published",
    },
    {
      title: "Campus Placement Orientation",
      message:
        "A placement orientation session will be conducted for eligible students.",
      type: "Event",
      date: "25 Aug 2026",
      status: "Published",
    },
  ]);

  const [form, setForm] = useState({
    title: "",
    message: "",
    type: "General",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createAnnouncement = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.message.trim()) {
      return;
    }

    const newAnnouncement = {
      title: form.title,
      message: form.message,
      type: form.type,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Published",
    };

    setAnnouncements([
      newAnnouncement,
      ...announcements,
    ]);

    setForm({
      title: "",
      message: "",
      type: "General",
    });

    setShowForm(false);
  };

  const deleteAnnouncement = (index) => {
    const updatedAnnouncements = announcements.filter(
      (_, i) => i !== index
    );

    setAnnouncements(updatedAnnouncements);
  };

  return (
    <div className="tpo-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="tpo-page-header">

        <div>
          <span className="page-label">
            TPO / ADMIN PORTAL
          </span>

          <h1>Announcements</h1>

          <p>
            Create and manage important placement announcements.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm
            ? "✕ Close"
            : "+ Create Announcement"}
        </button>

      </div>

      {/* =================================================
          CREATE ANNOUNCEMENT
      ================================================= */}

      {showForm && (
        <section className="tpo-panel announcement-form-panel">

          <div className="panel-header">
            <div>
              <h2>Create Announcement</h2>

              <p>
                Publish an important message for students.
              </p>
            </div>
          </div>

          <form
            className="announcement-form"
            onSubmit={createAnnouncement}
          >

            <div className="form-group">
              <label>Announcement Title</label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter announcement title"
              />
            </div>

            <div className="form-group">
              <label>Announcement Type</label>

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
              >
                <option value="General">General</option>
                <option value="Placement">Placement</option>
                <option value="Important">Important</option>
                <option value="Event">Event</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Message</label>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your announcement..."
                rows="5"
              />
            </div>

            <div className="form-actions">

              <button
                type="button"
                className="secondary-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-button"
              >
                Publish Announcement
              </button>

            </div>

          </form>

        </section>
      )}

      {/* =================================================
          ANNOUNCEMENTS LIST
      ================================================= */}

      <section className="tpo-panel">

        <div className="panel-header">

          <div>
            <h2>Recent Announcements</h2>

            <p>
              Manage announcements shared with students.
            </p>
          </div>

          <span className="announcement-count">
            {announcements.length} Announcements
          </span>

        </div>

        <div className="announcement-list">

          {announcements.length === 0 ? (

            <div className="empty-state">
              <div className="empty-icon">
                📢
              </div>

              <h3>No announcements yet</h3>

              <p>
                Create your first announcement for students.
              </p>

              <button
                className="primary-button"
                onClick={() => setShowForm(true)}
              >
                + Create Announcement
              </button>
            </div>

          ) : (

            announcements.map((announcement, index) => (

              <div
                className="announcement-card"
                key={index}
              >

                {/* ICON */}

                <div
                  className={`announcement-icon ${
                    announcement.type.toLowerCase()
                  }`}
                >
                  {announcement.type === "Important"
                    ? "!"
                    : announcement.type === "Event"
                    ? "◷"
                    : announcement.type === "Placement"
                    ? "↗"
                    : "i"}
                </div>

                {/* CONTENT */}

                <div className="announcement-content">

                  <div className="announcement-title-row">

                    <h3>
                      {announcement.title}
                    </h3>

                    <span
                      className={`announcement-type ${
                        announcement.type.toLowerCase()
                      }`}
                    >
                      {announcement.type}
                    </span>

                  </div>

                  <p>
                    {announcement.message}
                  </p>

                  <div className="announcement-meta">

                    <span>
                      📅 {announcement.date}
                    </span>

                    <span className="published-status">
                      ✓ {announcement.status}
                    </span>

                  </div>

                </div>

                {/* ACTIONS */}

                <div className="announcement-actions">

                  <button
                    className="table-button"
                    onClick={() =>
                      alert(
                        "Announcement management will be connected to the backend later."
                      )
                    }
                  >
                    Manage →
                  </button>

                  <button
                    className="delete-button"
                    onClick={() =>
                      deleteAnnouncement(index)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

        {/* FOOTER */}

        {announcements.length > 0 && (
          <div className="announcement-footer">
            Showing {announcements.length} of{" "}
            {announcements.length} announcements
          </div>
        )}

      </section>

      {/* =================================================
          BACK TO DASHBOARD
      ================================================= */}

      <button
        className="back-dashboard-button"
        onClick={() => navigate("/admin/dashboard")}
      >
        ← Back to Dashboard
      </button>

    </div>
  );
}

export default Announcements;