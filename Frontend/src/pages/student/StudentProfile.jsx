import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentProfile() {
  const navigate = useNavigate();

  const storedUser = JSON.parse(
    localStorage.getItem("campusiqUser") || "{}"
  );

  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: storedUser.name || "Student",
    email: storedUser.email || "student@college.edu",
    phone: storedUser.phone || "",
    branch: storedUser.branch || "Electronics & Computer Engineering",
    semester: storedUser.semester || "7",
    passingYear: storedUser.passingYear || "2027",
    cgpa: storedUser.cgpa || "8.67",
    backlogs: storedUser.backlogs || "0",
    tenth: storedUser.tenth || "89",
    twelfth: storedUser.twelfth || "91",
    preferredRole: storedUser.preferredRole || "Software Developer",
    preferredLocation: storedUser.preferredLocation || "Pune",
    languages: storedUser.languages || "English, Hindi, Marathi",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const updatedUser = {
      ...storedUser,
      ...profile,
    };

    localStorage.setItem(
      "campusiqUser",
      JSON.stringify(updatedUser)
    );

    setIsEditing(false);
  };

  return (
    <div className="dashboard-page">

      {/* SIDEBAR */}

      <aside className="dashboard-sidebar">

        <div className="dashboard-logo">
          Campus<span>IQ</span>
        </div>

        <nav>

          <button
            className="sidebar-link"
            onClick={() => navigate("/student/dashboard")}
          >
            Dashboard
          </button>

          <button className="sidebar-link active">
            My Profile
          </button>

          <button
            className="sidebar-link"
            onClick={() => navigate("/student/academics")}
          >
            Academics
          </button>

          <button
            className="sidebar-link"
            onClick={() => navigate("/student/skills")}
          >
            Skills
          </button>

          <button
            className="sidebar-link"
            onClick={() => navigate("/student/certifications")}
          >
            Certifications
          </button>

          <button
            className="sidebar-link"
            onClick={() => navigate("/student/projects")}
          >
            Projects
          </button>

          <button
            className="sidebar-link"
            onClick={() => navigate("/student/resume")}
          >
            AI Resume Analyzer
          </button>

          <button
            className="sidebar-link"
            onClick={() => navigate("/student/readiness")}
          >
            Placement Readiness
          </button>

          <button
            className="sidebar-link"
            onClick={() => navigate("/student/roadmap")}
          >
            Readiness Roadmap
          </button>

          <button
            className="sidebar-link"
            onClick={() => navigate("/student/drives")}
          >
            Eligible Drives
          </button>

          <button
            className="sidebar-link"
            onClick={() => navigate("/student/notices")}
          >
            Notice Board
          </button>

        </nav>

        <button
          className="logout-button"
          onClick={() => {
            localStorage.removeItem("campusiqUser");
            navigate("/login");
          }}
        >
          Logout
        </button>

      </aside>


      {/* MAIN CONTENT */}

      <main className="dashboard-main">

        {/* HEADER */}

        <div className="dashboard-header">

          <div>

            <p className="dashboard-label">
              STUDENT PROFILE
            </p>

            <h1>
              My Profile
            </h1>

            <p>
              Manage your personal, academic and career information.
            </p>

          </div>

          <button
            className="profile-edit-button"
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>

        </div>


        {/* PERSONAL INFORMATION */}

        <section className="dashboard-card">

          <div className="card-header">

            <div>

              <p className="section-label">
                PERSONAL INFORMATION
              </p>

              <h2>
                Basic Details
              </h2>

            </div>

          </div>


          <div className="profile-grid">

            <div className="profile-field">

              <label>
                Full Name
              </label>

              {isEditing ? (
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                />
              ) : (
                <p>{profile.name}</p>
              )}

            </div>


            <div className="profile-field">

              <label>
                College Email
              </label>

              <p>
                {profile.email}
              </p>

            </div>


            <div className="profile-field">

              <label>
                Phone Number
              </label>

              {isEditing ? (
                <input
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              ) : (
                <p>
                  {profile.phone || "Not added"}
                </p>
              )}

            </div>


            <div className="profile-field">

              <label>
                Preferred Languages
              </label>

              {isEditing ? (
                <input
                  name="languages"
                  value={profile.languages}
                  onChange={handleChange}
                />
              ) : (
                <p>
                  {profile.languages}
                </p>
              )}

            </div>

          </div>

        </section>


        {/* ACADEMIC INFORMATION */}

        <section className="dashboard-card">

          <div className="card-header">

            <div>

              <p className="section-label">
                ACADEMICS
              </p>

              <h2>
                Academic Information
              </h2>

            </div>

            <button
              className="text-button"
              onClick={() => navigate("/student/academics")}
            >
              View Academics →
            </button>

          </div>


          <div className="profile-grid">

            <div className="profile-field">

              <label>
                Branch
              </label>

              <p>
                {profile.branch}
              </p>

            </div>


            <div className="profile-field">

              <label>
                Current Semester
              </label>

              <p>
                {profile.semester}
              </p>

            </div>


            <div className="profile-field">

              <label>
                Passing Year
              </label>

              <p>
                {profile.passingYear}
              </p>

            </div>


            <div className="profile-field">

              <label>
                Current CGPA
              </label>

              <p>
                {profile.cgpa}
              </p>

            </div>


            <div className="profile-field">

              <label>
                Active Backlogs
              </label>

              <p>
                {profile.backlogs}
              </p>

            </div>

          </div>

        </section>


        {/* SCHOOL PERFORMANCE */}

        <section className="dashboard-card">

          <div className="card-header">

            <div>

              <p className="section-label">
                ACADEMIC HISTORY
              </p>

              <h2>
                School Performance
              </h2>

            </div>

          </div>


          <div className="academic-mini-grid">

            <div className="academic-mini-card">

              <span>
                10th Percentage
              </span>

              <strong>
                {profile.tenth}%
              </strong>

            </div>


            <div className="academic-mini-card">

              <span>
                12th Percentage
              </span>

              <strong>
                {profile.twelfth}%
              </strong>

            </div>


            <div className="academic-mini-card">

              <span>
                Current CGPA
              </span>

              <strong>
                {profile.cgpa}
              </strong>

            </div>


            <div className="academic-mini-card">

              <span>
                Backlogs
              </span>

              <strong>
                {profile.backlogs}
              </strong>

            </div>

          </div>

        </section>


        {/* CAREER PREFERENCES */}

        <section className="dashboard-card">

          <div className="card-header">

            <div>

              <p className="section-label">
                CAREER
              </p>

              <h2>
                Career Preferences
              </h2>

            </div>

          </div>


          <div className="profile-grid">

            <div className="profile-field">

              <label>
                Preferred Job Role
              </label>

              {isEditing ? (
                <input
                  name="preferredRole"
                  value={profile.preferredRole}
                  onChange={handleChange}
                />
              ) : (
                <p>
                  {profile.preferredRole}
                </p>
              )}

            </div>


            <div className="profile-field">

              <label>
                Preferred Location
              </label>

              {isEditing ? (
                <input
                  name="preferredLocation"
                  value={profile.preferredLocation}
                  onChange={handleChange}
                />
              ) : (
                <p>
                  {profile.preferredLocation}
                </p>
              )}

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default StudentProfile;