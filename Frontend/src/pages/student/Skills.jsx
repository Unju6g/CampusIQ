import React, { useEffect, useState } from "react";
import "./Skills.css";

const Skills = () => {
  const [skillName, setSkillName] = useState("");
  const [category, setCategory] = useState("");
  const [proficiency, setProficiency] = useState("Intermediate");
  const [experience, setExperience] = useState("");

  const [skills, setSkills] = useState([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // =========================================================
  // BACKEND API
  // =========================================================

  const API_URL = "http://localhost:5000/api/student/skills";

  // =========================================================
  // GET SKILLS FROM MONGODB
  // =========================================================

  useEffect(() => {
    const loadSkills = async () => {
      setLoading(true);
      setError("");

      try {
        const token =
          localStorage.getItem("campusiqToken") ||
          localStorage.getItem("token");

        if (!token) {
          setError("Your login session has expired. Please login again.");
          setLoading(false);
          return;
        }

        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("campusiqToken");
            localStorage.removeItem("campusiqUser");
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            setError("Your login session has expired. Please login again.");
          } else {
            setError(data.message || "Failed to load skills.");
          }

          setLoading(false);
          return;
        }

        setSkills(data.skills || []);
        setLoading(false);
      } catch (err) {
        console.error("Load skills error:", err);

        setError("Unable to connect to CampusIQ server.");
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  // =========================================================
  // ADD SKILL
  // =========================================================

  const handleAddSkill = async () => {
    setError("");
    setSuccess("");

    const trimmedName = skillName.trim();

    if (!trimmedName) {
      setError("Please enter a skill name.");
      return;
    }

    if (!category) {
      setError("Please select a category.");
      return;
    }

    if (experience === "") {
      setError("Please enter your experience.");
      return;
    }

    const experienceValue = Number(experience);

    if (
      Number.isNaN(experienceValue) ||
      experienceValue < 0 ||
      experienceValue > 50
    ) {
      setError("Experience must be between 0 and 50 years.");
      return;
    }

    // Check duplicate skill on frontend
    const alreadyExists = skills.some(
      (skill) =>
        skill.name &&
        skill.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (alreadyExists) {
      setError(`${trimmedName} is already added.`);
      return;
    }

    try {
      setSaving(true);

      const token =
        localStorage.getItem("campusiqToken") ||
        localStorage.getItem("token");

      if (!token) {
        setError("Your login session has expired. Please login again.");
        setSaving(false);
        return;
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          category,
          proficiency,
          experience: experienceValue,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("campusiqToken");
          localStorage.removeItem("campusiqUser");
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          setError("Your login session has expired. Please login again.");
        } else {
          setError(data.message || "Failed to add skill.");
        }

        setSaving(false);
        return;
      }

      // Add MongoDB returned skill to UI
      setSkills((previousSkills) => [
        ...previousSkills,
        data.skill,
      ]);

      // Clear form
      setSkillName("");
      setCategory("");
      setProficiency("Intermediate");
      setExperience("");

      setSuccess(`${trimmedName} added successfully.`);

      setSaving(false);
    } catch (err) {
      console.error("Add skill error:", err);

      setError("Unable to connect to CampusIQ server.");
      setSaving(false);
    }
  };

  // =========================================================
  // DELETE SKILL
  // =========================================================

  const handleDeleteSkill = async (id) => {
    const skillToDelete = skills.find(
      (skill) => skill._id === id || skill.id === id
    );

    if (!skillToDelete) {
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${skillToDelete.name}?`
    );

    if (!confirmDelete) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      const token =
        localStorage.getItem("campusiqToken") ||
        localStorage.getItem("token");

      if (!token) {
        setError("Your login session has expired. Please login again.");
        return;
      }

      const skillId = skillToDelete._id || skillToDelete.id;

      const response = await fetch(
        `${API_URL}/${skillId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("campusiqToken");
          localStorage.removeItem("campusiqUser");
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          setError("Your login session has expired. Please login again.");
        } else {
          setError(data.message || "Failed to delete skill.");
        }

        return;
      }

      // Remove deleted skill from UI
      setSkills((previousSkills) =>
        previousSkills.filter(
          (skill) =>
            skill._id !== skillId &&
            skill.id !== skillId
        )
      );

      setSuccess(`${skillToDelete.name} deleted successfully.`);
    } catch (err) {
      console.error("Delete skill error:", err);

      setError("Unable to connect to CampusIQ server.");
    }
  };

  // =========================================================
  // SAVE SKILLS
  // =========================================================

  const handleSaveSkills = () => {
    setError("");
    setSuccess("");

    if (skills.length === 0) {
      setError("Please add at least one skill before saving.");
      return;
    }

    /*
      Skills are already saved in MongoDB when
      the user clicks "+ Add Skill".

      Therefore this button does not need another
      backend request.
    */

    setSuccess("Your skills are already saved to your profile.");
  };

  // =========================================================
  // EXPERIENCE LABEL
  // =========================================================

  const getExperienceLabel = (years) => {
    return Number(years) === 1
      ? "1 Year"
      : `${years} Years`;
  };

  // =========================================================
  // LOADING STATE
  // =========================================================

  if (loading) {
    return (
      <div className="skills-page">
        <div className="skills-card">
          <div className="skills-empty-state">
            <div className="empty-icon">⏳</div>

            <h3>Loading Skills...</h3>

            <p>
              Loading your skills from your student profile.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="skills-page">

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <div className="skills-header">
        <div>
          <span className="skills-label">
            STUDENT PROFILE
          </span>

          <h1>Skills</h1>

          <p>
            Add and manage your technical skills, proficiency and experience.
          </p>
        </div>
      </div>

      {/* =====================================================
          ADD SKILL CARD
          ===================================================== */}

      <section className="skills-card">

        <div className="skills-section-heading">
          <div className="skills-section-icon">
            ⚙️
          </div>

          <div>
            <h2>Add Skill</h2>

            <p>
              Add your technical skills and provide your experience level.
            </p>
          </div>
        </div>

        <div className="skills-form">

          {/* Skill Name */}

          <div className="skill-form-group">
            <label htmlFor="skillName">
              Skill Name
            </label>

            <input
              id="skillName"
              type="text"
              placeholder="e.g. Python"
              value={skillName}
              onChange={(e) =>
                setSkillName(e.target.value)
              }
            />
          </div>

          {/* Category */}

          <div className="skill-form-group">
            <label htmlFor="category">
              Category
            </label>

            <select
              id="category"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              <option value="">
                Select category
              </option>

              <option value="Programming">
                Programming
              </option>

              <option value="Database">
                Database
              </option>

              <option value="Data Analytics">
                Data Analytics
              </option>

              <option value="Web Development">
                Web Development
              </option>

              <option value="AI / ML">
                AI / ML
              </option>

              <option value="Cloud">
                Cloud
              </option>

              <option value="Tools">
                Tools
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>

          {/* Proficiency */}

          <div className="skill-form-group">
            <label htmlFor="proficiency">
              Proficiency Level
            </label>

            <select
              id="proficiency"
              value={proficiency}
              onChange={(e) =>
                setProficiency(e.target.value)
              }
            >
              <option value="Beginner">
                Beginner
              </option>

              <option value="Intermediate">
                Intermediate
              </option>

              <option value="Advanced">
                Advanced
              </option>

              <option value="Expert">
                Expert
              </option>
            </select>
          </div>

          {/* Experience */}

          <div className="skill-form-group">
            <label htmlFor="experience">
              Experience
            </label>

            <div className="experience-input">

              <input
                id="experience"
                type="number"
                min="0"
                max="50"
                step="1"
                placeholder="0"
                value={experience}
                onChange={(e) =>
                  setExperience(e.target.value)
                }
              />

              <span>
                Years
              </span>

            </div>
          </div>

        </div>

        {/* ADD BUTTON */}

        <div className="add-skill-area">
          <button
            type="button"
            className="add-skill-btn"
            onClick={handleAddSkill}
            disabled={saving}
          >
            {saving ? "Saving..." : "+ Add Skill"}
          </button>
        </div>

        {/* ERROR */}

        {error && (
          <div className="skill-message error-message">
            ⚠️ {error}
          </div>
        )}

        {/* SUCCESS */}

        {success && (
          <div className="skill-message success-message">
            ✓ {success}
          </div>
        )}

      </section>

      {/* =====================================================
          MY SKILLS CARD
          ===================================================== */}

      <section className="skills-card my-skills-card">

        <div className="skills-section-heading">

          <div className="skills-section-icon">
            💻
          </div>

          <div>
            <h2>
              My Skills ({skills.length})
            </h2>

            <p>
              Your current technical skills and experience.
            </p>
          </div>

        </div>

        {/* EMPTY STATE */}

        {skills.length === 0 ? (

          <div className="skills-empty-state">

            <div className="empty-icon">
              📋
            </div>

            <h3>
              No skills added yet
            </h3>

            <p>
              Add your first skill using the form above.
            </p>

          </div>

        ) : (

          /* =================================================
             SKILLS TABLE
             ================================================= */

          <div className="skills-table-wrapper">

            <table className="skills-table">

              <thead>
                <tr>
                  <th>
                    Skill
                  </th>

                  <th>
                    Category
                  </th>

                  <th>
                    Proficiency
                  </th>

                  <th>
                    Experience
                  </th>

                  <th>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>

                {skills.map((skill) => (

                  <tr
                    key={skill._id || skill.id}
                  >

                    {/* Skill */}

                    <td>

                      <div className="skill-name-cell">

                        <div className="skill-avatar">
                          {skill.name
                            ? skill.name
                                .charAt(0)
                                .toUpperCase()
                            : "?"}
                        </div>

                        <strong>
                          {skill.name}
                        </strong>

                      </div>

                    </td>

                    {/* Category */}

                    <td>

                      <span className="category-badge">
                        {skill.category}
                      </span>

                    </td>

                    {/* Proficiency */}

                    <td>

                      <span
                        className={`proficiency-badge proficiency-${skill.proficiency
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {skill.proficiency}
                      </span>

                    </td>

                    {/* Experience */}

                    <td>

                      <span className="experience-value">
                        {getExperienceLabel(
                          skill.experience
                        )}
                      </span>

                    </td>

                    {/* Delete */}

                    <td>

                      <button
                        type="button"
                        className="delete-skill-btn"
                        onClick={() =>
                          handleDeleteSkill(
                            skill._id || skill.id
                          )
                        }
                      >
                        🗑 Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </section>

      {/* =====================================================
          SAVE SKILLS
          ===================================================== */}

      <section className="save-skills-card">

        <div className="save-skills-content">

          <div className="save-icon">
            💾
          </div>

          <div>

            <h3>
              Save Your Skills
            </h3>

            <p>
              Save your complete skill list to your student profile.
              You can update it anytime.
            </p>

          </div>

        </div>

        <button
          type="button"
          className="save-skills-btn"
          onClick={handleSaveSkills}
        >
          Save Skills
        </button>

      </section>

    </div>
  );
};

export default Skills;