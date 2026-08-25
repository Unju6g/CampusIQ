import React, { useState } from "react";
import "./Profile.css";

function Profile() {
  // =====================================================
  // EDIT MODE
  // =====================================================

  const [isEditing, setIsEditing] = useState(false);

  // =====================================================
  // PROFILE DATA
  // =====================================================

  const [profile, setProfile] = useState({
    fullName: "Gunjan Shaha",
    username: "gunjanshaha92-1",
    email: "gunjan@gmail.com",
    role: "Student",

    college: "Walchand Institute of Technology",
    branch: "Electronics & Computer Engineering",
    currentSemester: "7th Semester",
    cgpa: "8.67",
  });

  // =====================================================
  // TEMPORARY DATA
  // Used for Cancel button
  // =====================================================

  const [originalProfile, setOriginalProfile] = useState(profile);

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((previousProfile) => ({
      ...previousProfile,
      [name]: value,
    }));
  };

  // =====================================================
  // EDIT PROFILE
  // =====================================================

  const handleEdit = () => {
    setOriginalProfile(profile);
    setIsEditing(true);
  };

  // =====================================================
  // CANCEL EDIT
  // =====================================================

  const handleCancel = () => {
    setProfile(originalProfile);
    setIsEditing(false);
  };

  // =====================================================
  // SAVE PROFILE
  // =====================================================

  const handleSave = () => {
    setOriginalProfile(profile);
    setIsEditing(false);

    alert("Profile updated successfully!");
  };

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div className="profile-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="profile-header">

        <div className="profile-header-content">

          <span className="profile-label">
            STUDENT PROFILE
          </span>

          <h1>
            My Profile
          </h1>

          <p>
            Manage your personal and academic profile information.
          </p>

        </div>

        {!isEditing && (
          <button
            className="edit-profile-btn"
            onClick={handleEdit}
          >
            ✏️ Edit Profile
          </button>
        )}

      </div>


      {/* =================================================
          MAIN PROFILE CARD
      ================================================= */}

      <div className="profile-main-card">


        {/* =================================================
            PROFILE INTRO
        ================================================= */}

        <div className="profile-top">

          <div className="profile-avatar">
            {profile.fullName.charAt(0).toUpperCase()}
          </div>


          <div className="profile-intro">

            <h2>
              {profile.fullName}
            </h2>

            <p>
              {profile.branch}
            </p>

            <span>
              {profile.college}
            </span>

          </div>


          <div className="profile-role">

            <span className="role-badge">
              {profile.role}
            </span>

          </div>

        </div>


        {/* =================================================
            PERSONAL INFORMATION
        ================================================= */}

        <div className="profile-section">

          <div className="section-title">

            <div className="section-icon">
              👤
            </div>

            <div>
              <h3>
                Personal Information
              </h3>

              <p>
                Your basic account and personal details.
              </p>
            </div>

          </div>


          <div className="profile-grid">


            {/* FULL NAME */}

            <div className="profile-info-card">

              <label>
                Full Name
              </label>

              {isEditing ? (

                <input
                  type="text"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />

              ) : (

                <strong>
                  {profile.fullName}
                </strong>

              )}

            </div>


            {/* USERNAME */}

            <div className="profile-info-card">

              <label>
                Username
              </label>

              {isEditing ? (

                <input
                  type="text"
                  name="username"
                  value={profile.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                />

              ) : (

                <strong>
                  {profile.username}
                </strong>

              )}

            </div>


            {/* EMAIL */}

            <div className="profile-info-card">

              <label>
                Email
              </label>

              {isEditing ? (

                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />

              ) : (

                <strong>
                  {profile.email}
                </strong>

              )}

            </div>


            {/* ROLE */}

            <div className="profile-info-card">

              <label>
                Role
              </label>

              <strong>
                {profile.role}
              </strong>

              {isEditing && (
                <small className="readonly-text">
                  Role cannot be changed
                </small>
              )}

            </div>

          </div>

        </div>


        {/* =================================================
            ACADEMIC INFORMATION
        ================================================= */}

        <div className="profile-section">

          <div className="section-title">

            <div className="section-icon">
              🎓
            </div>

            <div>

              <h3>
                Academic Information
              </h3>

              <p>
                Your current academic details.
              </p>

            </div>

          </div>


          <div className="profile-grid">


            {/* COLLEGE */}

            <div className="profile-info-card">

              <label>
                College
              </label>

              {isEditing ? (

                <input
                  type="text"
                  name="college"
                  value={profile.college}
                  onChange={handleChange}
                  placeholder="Enter college name"
                />

              ) : (

                <strong>
                  {profile.college}
                </strong>

              )}

            </div>


            {/* BRANCH */}

            <div className="profile-info-card">

              <label>
                Branch
              </label>

              {isEditing ? (

                <input
                  type="text"
                  name="branch"
                  value={profile.branch}
                  onChange={handleChange}
                  placeholder="Enter branch"
                />

              ) : (

                <strong>
                  {profile.branch}
                </strong>

              )}

            </div>


            {/* CURRENT SEMESTER */}

            <div className="profile-info-card">

              <label>
                Current Semester
              </label>

              {isEditing ? (

                <select
                  name="currentSemester"
                  value={profile.currentSemester}
                  onChange={handleChange}
                >

                  <option value="1st Semester">
                    1st Semester
                  </option>

                  <option value="2nd Semester">
                    2nd Semester
                  </option>

                  <option value="3rd Semester">
                    3rd Semester
                  </option>

                  <option value="4th Semester">
                    4th Semester
                  </option>

                  <option value="5th Semester">
                    5th Semester
                  </option>

                  <option value="6th Semester">
                    6th Semester
                  </option>

                  <option value="7th Semester">
                    7th Semester
                  </option>

                  <option value="8th Semester">
                    8th Semester
                  </option>

                </select>

              ) : (

                <strong>
                  {profile.currentSemester}
                </strong>

              )}

            </div>


            {/* CGPA */}

            <div className="profile-info-card">

              <label>
                Current CGPA
              </label>

              {isEditing ? (

                <div className="cgpa-input-wrapper">

                  <input
                    type="number"
                    name="cgpa"
                    value={profile.cgpa}
                    onChange={handleChange}
                    min="0"
                    max="10"
                    step="0.01"
                    placeholder="0.00"
                  />

                  <span>
                    / 10
                  </span>

                </div>

              ) : (

                <strong className="cgpa-value">

                  {profile.cgpa}

                  <span>
                    / 10
                  </span>

                </strong>

              )}

            </div>

          </div>

        </div>


        {/* =================================================
            EDIT ACTIONS
        ================================================= */}

        {isEditing && (

          <div className="profile-actions">

            <button
              className="cancel-profile-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>


            <button
              className="save-profile-btn"
              onClick={handleSave}
            >
              ✓ Save Changes
            </button>

          </div>

        )}


        {/* =================================================
            INFORMATION NOTE
        ================================================= */}

        <div className="profile-note">

          <div className="note-icon">
            ℹ️
          </div>

          <div>

            <strong>
              Academic Information
            </strong>

            <p>
              Detailed semester marks, SGPA, CGPA,
              percentage and backlogs can be managed
              from the Academics section.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;