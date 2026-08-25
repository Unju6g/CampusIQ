import React, { useState } from "react";
import "./NoticeBoard.css";

const initialNotices = [
  {
    id: 1,
    icon: "🔔",
    title: "Placement Drive Announcement",
    description: "New placement opportunities will be updated here.",
    time: "Today",
    category: "Placement",
    unread: true,
  },
  {
    id: 2,
    icon: "📢",
    title: "Resume Submission",
    description: "Keep your latest resume updated in CampusIQ.",
    time: "This week",
    category: "Reminder",
    unread: true,
  },
];

function NoticeBoard() {
  const [notices, setNotices] = useState(initialNotices);
  const [dismissedNotice, setDismissedNotice] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const markAsRead = (id) => {
    setNotices((currentNotices) =>
      currentNotices.map((notice) =>
        notice.id === id
          ? { ...notice, unread: false }
          : notice
      )
    );
  };

  const dismissNotice = (id) => {
    const notice = notices.find((item) => item.id === id);

    setDismissedNotice(notice);

    setNotices((currentNotices) =>
      currentNotices.filter((item) => item.id !== id)
    );

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  const undoDismiss = () => {
    if (!dismissedNotice) return;

    setNotices((currentNotices) => [
      dismissedNotice,
      ...currentNotices,
    ]);

    setDismissedNotice(null);
    setShowToast(false);
  };

  return (
    <div className="notice-page">

      {/* ================= PAGE HEADER ================= */}

      <div className="notice-header">
        <h1>Notice Board</h1>
        <p>
          Latest placement and college announcements.
        </p>
      </div>


      {/* ================= NOTICE SECTION ================= */}

      <section className="notice-section">

        <div className="section-header">

          <div className="section-icon">
            🔔
          </div>

          <div>
            <h2>Latest Notices</h2>
            <p>
              Stay updated with important CampusIQ announcements.
            </p>
          </div>

        </div>


        {/* ================= NOTICE LIST ================= */}

        {notices.length > 0 ? (

          <div className="notice-list">

            {notices.map((notice) => (

              <div
                key={notice.id}
                className={`notice-card ${notice.category.toLowerCase()} ${
                  notice.unread ? "unread" : "read"
                }`}
                onClick={() => markAsRead(notice.id)}
              >

                {/* Category indicator */}
                <div className="category-line"></div>


                {/* Icon */}

                <div className="notice-icon">
                  {notice.icon}
                </div>


                {/* Content */}

                <div className="notice-content">

                  <div className="notice-title-row">

                    <div className="notice-title-wrapper">

                      {notice.unread && (
                        <span className="unread-dot"></span>
                      )}

                      <h3>{notice.title}</h3>

                      {notice.unread && (
                        <span className="new-badge">
                          New
                        </span>
                      )}

                    </div>


                    {/* Time */}

                    <span className="notice-time">
                      {notice.time}
                    </span>

                  </div>


                  <p className="notice-description">
                    {notice.description}
                  </p>


                  {/* Category */}

                  <span
                    className={`category-badge ${notice.category.toLowerCase()}`}
                  >
                    {notice.category}
                  </span>

                </div>


                {/* Dismiss */}

                <button
                  className="dismiss-button"
                  onClick={(event) => {
                    event.stopPropagation();
                    dismissNotice(notice.id);
                  }}
                  title="Dismiss notice"
                  aria-label="Dismiss notice"
                >
                  ×
                </button>

              </div>

            ))}

          </div>

        ) : (

          /* ================= EMPTY STATE ================= */

          <div className="empty-state">

            <div className="empty-icon">
              🔔
            </div>

            <h3>
              No new announcements right now
            </h3>

            <p>
              You're all caught up! New placement and college
              announcements will appear here.
            </p>

          </div>

        )}

      </section>


      {/* ================= INFORMATION CARD ================= */}

      <div className="notice-info">

        <div className="info-icon">
          i
        </div>

        <div>
          <h3>Stay Updated</h3>

          <p>
            New placement drives, resume deadlines, college
            announcements, and other important updates will
            appear here.
          </p>
        </div>

      </div>


      {/* ================= UNDO TOAST ================= */}

      {showToast && (

        <div className="undo-toast">

          <span>
            Notice dismissed
          </span>

          <button onClick={undoDismiss}>
            Undo
          </button>

        </div>

      )}

    </div>
  );
}

export default NoticeBoard;