import React, { useEffect, useState } from "react";
import "./Projects.css";

const API_URL = "http://localhost:5000/api/student/projects";

const Projects = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const emptyProject = {
    name: "",
    type: "Software",
    status: "In Progress",
    description: "",
    technologies: "",
    hardwareComponents: "",
    specifications: "",
    tools: "",
    duration: "",
    github: "",
    liveDemo: "",
  };

  const [formData, setFormData] = useState(emptyProject);

  // =========================================================
  // HARDWARE PROJECT CHECK
  // =========================================================

  const isHardwareProject =
    formData.type === "Hardware" ||
    formData.type === "IoT" ||
    formData.type === "Embedded";

  // =========================================================
  // GET TOKEN
  // =========================================================

  const getToken = () => {
    return (
      localStorage.getItem("campusiqToken") ||
      localStorage.getItem("token")
    );
  };

  // =========================================================
  // LOAD PROJECTS FROM MONGODB
  // =========================================================

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      setError("");

      try {
        const token = getToken();

        if (!token) {
          setError(
            "Your login session has expired. Please login again."
          );
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

            setError(
              "Your login session has expired. Please login again."
            );
          } else {
            setError(
              data.message || "Failed to load projects."
            );
          }

          setLoading(false);
          return;
        }

        setProjects(data.projects || []);
        setLoading(false);
      } catch (err) {
        console.error("Load projects error:", err);

        setError(
          "Unable to connect to CampusIQ server."
        );

        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // =========================================================
  // FORM CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // ADD PROJECT BUTTON
  // =========================================================

  const handleAddProject = () => {
    setEditingId(null);
    setFormData({ ...emptyProject });
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // =========================================================
  // EDIT PROJECT
  // =========================================================

  const handleEdit = (project) => {
    const projectId = project._id || project.id;

    setEditingId(projectId);

    setFormData({
      ...emptyProject,
      ...project,
    });

    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // =========================================================
  // CANCEL FORM
  // =========================================================

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ ...emptyProject });
    setError("");
  };

  // =========================================================
  // SAVE / UPDATE PROJECT
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // -------------------------------------------------------
    // VALIDATION
    // -------------------------------------------------------

    if (!formData.name.trim()) {
      setError("Please enter Project Name.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Please enter Project Description.");
      return;
    }

    const token = getToken();

    if (!token) {
      setError(
        "Your login session has expired. Please login again."
      );
      return;
    }

    try {
      setSaving(true);

      let response;

      // =====================================================
      // UPDATE EXISTING PROJECT
      // =====================================================

      if (editingId) {
        response = await fetch(
          `${API_URL}/${editingId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formData.name.trim(),
              type: formData.type,
              status: formData.status,
              description: formData.description.trim(),
              technologies: formData.technologies,
              hardwareComponents:
                formData.hardwareComponents,
              specifications: formData.specifications,
              tools: formData.tools,
              duration: formData.duration,
              github: formData.github,
              liveDemo: formData.liveDemo,
            }),
          }
        );
      }

      // =====================================================
      // CREATE NEW PROJECT
      // =====================================================

      else {
        response = await fetch(API_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            type: formData.type,
            status: formData.status,
            description: formData.description.trim(),
            technologies: formData.technologies,
            hardwareComponents:
              formData.hardwareComponents,
            specifications: formData.specifications,
            tools: formData.tools,
            duration: formData.duration,
            github: formData.github,
            liveDemo: formData.liveDemo,
          }),
        });
      }

      const data = await response.json();

      // =====================================================
      // ERROR RESPONSE
      // =====================================================

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("campusiqToken");
          localStorage.removeItem("campusiqUser");
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          setError(
            "Your login session has expired. Please login again."
          );
        } else {
          setError(
            data.message ||
              (editingId
                ? "Failed to update project."
                : "Failed to save project.")
          );
        }

        setSaving(false);
        return;
      }

      // =====================================================
      // UPDATE UI WITH DATABASE RESPONSE
      // =====================================================

      if (editingId) {
        const updatedProject =
          data.project || data.updatedProject;

        if (updatedProject) {
          setProjects((prevProjects) =>
            prevProjects.map((project) => {
              const currentId =
                project._id || project.id;

              return currentId === editingId
                ? updatedProject
                : project;
            })
          );
        } else {
          // If backend doesn't return project,
          // reload projects from MongoDB.
          await reloadProjects();
        }

        setSuccess(
          `${formData.name.trim()} updated successfully.`
        );
      } else {
        const newProject = data.project;

        if (newProject) {
          setProjects((prevProjects) => [
            ...prevProjects,
            newProject,
          ]);
        } else {
          await reloadProjects();
        }

        setSuccess(
          `${formData.name.trim()} added successfully.`
        );
      }

      // =====================================================
      // RESET FORM
      // =====================================================

      setShowForm(false);
      setEditingId(null);
      setFormData({ ...emptyProject });

      setSaving(false);
    } catch (err) {
      console.error("Save project error:", err);

      setError(
        "Unable to connect to CampusIQ server."
      );

      setSaving(false);
    }
  };

  // =========================================================
  // RELOAD PROJECTS
  // =========================================================

  const reloadProjects = async () => {
    try {
      const token = getToken();

      if (!token) {
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

      if (response.ok) {
        setProjects(data.projects || []);
      }
    } catch (err) {
      console.error("Reload projects error:", err);
    }
  };

  // =========================================================
  // DELETE PROJECT
  // =========================================================

  const handleDelete = async (id) => {
    const projectToDelete = projects.find(
      (project) =>
        (project._id || project.id) === id
    );

    if (!projectToDelete) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${projectToDelete.name}"?`
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      const token = getToken();

      if (!token) {
        setError(
          "Your login session has expired. Please login again."
        );
        return;
      }

      const response = await fetch(
        `${API_URL}/${id}`,
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

          setError(
            "Your login session has expired. Please login again."
          );
        } else {
          setError(
            data.message || "Failed to delete project."
          );
        }

        return;
      }

      setProjects((prevProjects) =>
        prevProjects.filter(
          (project) =>
            (project._id || project.id) !== id
        )
      );

      setSuccess(
        `${projectToDelete.name} deleted successfully.`
      );
    } catch (err) {
      console.error("Delete project error:", err);

      setError(
        "Unable to connect to CampusIQ server."
      );
    }
  };

  // =========================================================
  // TAGS
  // =========================================================

  const getTags = (value) => {
    if (!value) {
      return [];
    }

    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="projects-page">
        <div className="projects-section">

          <div className="empty-projects">

            <div className="empty-icon">
              ⏳
            </div>

            <h3>
              Loading Projects...
            </h3>

            <p>
              Loading your projects from your student profile.
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
    <div className="projects-page">

      {/* ================= HEADER ================= */}

      <div className="projects-header">

        <div>

          <span className="projects-label">
            STUDENT PORTFOLIO
          </span>

          <h1>
            Projects
          </h1>

          <p>
            Add and manage your academic, software, hardware and IoT projects.
          </p>

        </div>

        <button
          className="add-project-btn"
          onClick={handleAddProject}
        >
          <span>
            +
          </span>

          Add Project
        </button>

      </div>

      {/* ================= GLOBAL SUCCESS ================= */}

      {success && !showForm && (
        <div className="skill-message success-message">
          ✓ {success}
        </div>
      )}

      {/* ================= GLOBAL ERROR ================= */}

      {error && !showForm && (
        <div className="skill-message error-message">
          ⚠️ {error}
        </div>
      )}

      {/* ================= ADD / EDIT FORM ================= */}

      {showForm && (

        <div className="project-form-card">

          <div className="form-card-header">

            <div>

              <span className="section-label">

                {editingId
                  ? "EDIT PROJECT"
                  : "NEW PROJECT"}

              </span>

              <h2>

                {editingId
                  ? "Edit Project"
                  : "Add Project"}

              </h2>

              <p>
                Enter your project details and technical information.
              </p>

            </div>

            <button
              type="button"
              className="close-form-btn"
              onClick={handleCancel}
            >
              ×
            </button>

          </div>

          {/* FORM */}

          <form onSubmit={handleSubmit}>

            {/* ================= BASIC INFORMATION ================= */}

            <div className="form-section-title">

              <span>
                📁
              </span>

              <div>

                <h3>
                  Project Information
                </h3>

                <p>
                  Basic details about your project.
                </p>

              </div>

            </div>

            <div className="project-form-grid">

              {/* Project Name */}

              <div className="form-group">

                <label>
                  Project Name <b>*</b>
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter project name"
                />

              </div>

              {/* Project Type */}

              <div className="form-group">

                <label>
                  Project Type <b>*</b>
                </label>

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >

                  <option value="Software">
                    Software
                  </option>

                  <option value="Hardware">
                    Hardware
                  </option>

                  <option value="IoT">
                    IoT
                  </option>

                  <option value="Embedded">
                    Embedded
                  </option>

                  <option value="Data Analytics">
                    Data Analytics
                  </option>

                  <option value="AI / ML">
                    AI / ML
                  </option>

                </select>

              </div>

              {/* Status */}

              <div className="form-group">

                <label>
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                  <option value="Planned">
                    Planned
                  </option>

                </select>

              </div>

              {/* Duration */}

              <div className="form-group">

                <label>
                  Duration
                </label>

                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Jan 2026 - Apr 2026"
                />

                <small>
                  Example: Jan 2026 - Apr 2026
                </small>

              </div>

              {/* Description */}

              <div className="form-group full-width">

                <label>
                  Project Description <b>*</b>
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the project, problem solved, your contribution and main features..."
                  rows="5"
                />

              </div>

            </div>

            {/* ================= SOFTWARE INFORMATION ================= */}

            <div className="form-section-title second-section">

              <span>
                💻
              </span>

              <div>

                <h3>
                  Technical Information
                </h3>

                <p>
                  Add technologies, programming languages and tools used.
                </p>

              </div>

            </div>

            <div className="project-form-grid">

              {/* Technologies */}

              <div className="form-group">

                <label>
                  Technologies Used
                </label>

                <input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleChange}
                  placeholder="React.js, Python, SQL"
                />

                <small>
                  Separate multiple technologies with commas.
                </small>

              </div>

              {/* Tools */}

              <div className="form-group">

                <label>
                  Tools / Software Used
                </label>

                <input
                  type="text"
                  name="tools"
                  value={formData.tools}
                  onChange={handleChange}
                  placeholder="VS Code, Arduino IDE, Proteus"
                />

                <small>
                  Add development tools or software.
                </small>

              </div>

            </div>

            {/* ================= HARDWARE INFORMATION ================= */}

            {isHardwareProject && (

              <>

                <div className="hardware-section">

                  <div className="form-section-title">

                    <span>
                      ⚙️
                    </span>

                    <div>

                      <h3>
                        Hardware Information
                      </h3>

                      <p>
                        Add components and technical specifications used
                        in your project.
                      </p>

                    </div>

                  </div>

                  <div className="project-form-grid">

                    {/* Hardware Components */}

                    <div className="form-group full-width">

                      <label>
                        Hardware Components
                      </label>

                      <textarea
                        name="hardwareComponents"
                        value={
                          formData.hardwareComponents
                        }
                        onChange={handleChange}
                        placeholder="Arduino UNO, ESP32, Ultrasonic Sensor, Servo Motor, LCD..."
                        rows="3"
                      />

                      <small>
                        Mention the major hardware components used.
                      </small>

                    </div>

                    {/* Specifications */}

                    <div className="form-group full-width">

                      <label>
                        Hardware / Technical Specifications
                      </label>

                      <textarea
                        name="specifications"
                        value={
                          formData.specifications
                        }
                        onChange={handleChange}
                        placeholder="Voltage: 5V, Communication: I2C, Sensor Range: 2-400 cm..."
                        rows="4"
                      />

                      <small>
                        Add voltage, current, communication protocol,
                        sensor range, frequency or other specifications.
                      </small>

                    </div>

                  </div>

                </div>

              </>

            )}

            {/* ================= LINKS ================= */}

            <div className="form-section-title second-section">

              <span>
                🔗
              </span>

              <div>

                <h3>
                  Project Links
                </h3>

                <p>
                  Add links where recruiters can view your project.
                </p>

              </div>

            </div>

            <div className="project-form-grid">

              {/* GitHub */}

              <div className="form-group">

                <label>
                  GitHub URL
                </label>

                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/username/project"
                />

              </div>

              {/* Live Demo */}

              <div className="form-group">

                <label>
                  Live Demo URL
                </label>

                <input
                  type="url"
                  name="liveDemo"
                  value={formData.liveDemo}
                  onChange={handleChange}
                  placeholder="https://your-project.vercel.app"
                />

              </div>

            </div>

            {/* ================= BUTTONS ================= */}

            <div className="form-actions">

              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-project-btn"
                disabled={saving}
              >

                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Project"
                  : "Save Project"}

              </button>

            </div>

            {/* FORM ERROR */}

            {error && (
              <div className="skill-message error-message">
                ⚠️ {error}
              </div>
            )}

          </form>

        </div>

      )}

      {/* ================= PROJECT LIST ================= */}

      <div className="projects-section">

        <div className="projects-section-header">

          <div>

            <span className="section-label">
              PORTFOLIO
            </span>

            <h2>
              🚀 My Projects ({projects.length})
            </h2>

            <p>
              Your academic and personal projects.
            </p>

          </div>

        </div>

        {/* ================= EMPTY ================= */}

        {projects.length === 0 ? (

          <div className="empty-projects">

            <div className="empty-icon">
              🚀
            </div>

            <h3>
              No Projects Added Yet
            </h3>

            <p>
              You haven't added any projects yet. Add your first
              software, hardware, IoT or embedded project.
            </p>

            <button
              className="empty-add-btn"
              onClick={handleAddProject}
            >
              + Add Your First Project
            </button>

          </div>

        ) : (

          /* ================= PROJECT GRID ================= */

          <div className="projects-grid">

            {projects.map((project, index) => {

              const projectId =
                project._id || project.id;

              return (

                <div
                  className="project-card"
                  key={projectId}
                >

                  {/* CARD HEADER */}

                  <div className="project-card-header">

                    <div className="project-title-area">

                      <span className="project-number">
                        {index + 1}
                      </span>

                      <div>

                        <h3>
                          {project.name}
                        </h3>

                        <span className="project-type">
                          {project.type}
                        </span>

                      </div>

                    </div>

                    <span
                      className={`status-badge ${
                        project.status
                          ? project.status
                              .toLowerCase()
                              .replace(/\s+/g, "-")
                          : ""
                      }`}
                    >
                      {project.status}
                    </span>

                  </div>

                  {/* DESCRIPTION */}

                  <p className="project-description">
                    {project.description}
                  </p>

                  {/* DURATION */}

                  {project.duration && (

                    <div className="project-duration">

                      <span>
                        📅
                      </span>

                      {project.duration}

                    </div>

                  )}

                  {/* TECHNOLOGIES */}

                  {getTags(project.technologies).length > 0 && (

                    <div className="project-info-block">

                      <span className="info-title">
                        Technologies
                      </span>

                      <div className="project-tags">

                        {getTags(
                          project.technologies
                        ).map(
                          (tag, tagIndex) => (

                            <span
                              className="technology-tag"
                              key={tagIndex}
                            >
                              {tag}
                            </span>

                          )
                        )}

                      </div>

                    </div>

                  )}

                  {/* HARDWARE COMPONENTS */}

                  {project.hardwareComponents && (

                    <div className="project-info-block">

                      <span className="info-title">
                        Hardware Components
                      </span>

                      <div className="hardware-tags">

                        {getTags(
                          project.hardwareComponents
                        ).map(
                          (
                            component,
                            componentIndex
                          ) => (

                            <span
                              className="hardware-tag"
                              key={componentIndex}
                            >
                              ⚙ {component}
                            </span>

                          )
                        )}

                      </div>

                    </div>

                  )}

                  {/* SPECIFICATIONS */}

                  {project.specifications && (

                    <div className="specifications-box">

                      <span className="info-title">
                        Technical Specifications
                      </span>

                      <p>
                        {project.specifications}
                      </p>

                    </div>

                  )}

                  {/* TOOLS */}

                  {getTags(project.tools).length > 0 && (

                    <div className="project-info-block">

                      <span className="info-title">
                        Tools
                      </span>

                      <div className="tools-list">

                        {getTags(
                          project.tools
                        ).map(
                          (tool, toolIndex) => (

                            <span
                              key={toolIndex}
                            >
                              {tool}
                            </span>

                          )
                        )}

                      </div>

                    </div>

                  )}

                  {/* LINKS */}

                  {(project.github ||
                    project.liveDemo) && (

                    <div className="project-links">

                      {project.github && (

                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="project-link github-link"
                        >
                          GitHub ↗
                        </a>

                      )}

                      {project.liveDemo && (

                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noreferrer"
                          className="project-link demo-link"
                        >
                          Live Demo ↗
                        </a>

                      )}

                    </div>

                  )}

                  {/* ACTIONS */}

                  <div className="project-card-actions">

                    <button
                      className="edit-project-btn"
                      onClick={() =>
                        handleEdit(project)
                      }
                    >
                      ✎ Edit
                    </button>

                    <button
                      className="delete-project-btn"
                      onClick={() =>
                        handleDelete(projectId)
                      }
                    >
                      🗑 Delete
                    </button>

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </div>

      {/* ================= INFORMATION ================= */}

      <div className="project-info-card">

        <div className="info-card-icon">
          💡
        </div>

        <div>

          <h3>
            Project Information
          </h3>

          <p>
            Add projects that demonstrate your technical skills.
            Software projects can include applications and websites,
            while Hardware, IoT and Embedded projects can include
            components, controllers, sensors and technical
            specifications.
          </p>

        </div>

      </div>

    </div>
  );
};

export default Projects;