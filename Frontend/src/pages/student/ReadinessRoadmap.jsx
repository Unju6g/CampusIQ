import React from "react";

function ReadinessRoadmap() {
  const steps = [
    {
      number: 1,
      title: "Complete Profile",
      description: "Add your academic and personal information.",
    },
    {
      number: 2,
      title: "Improve Skills",
      description: "Build strong technical and communication skills.",
    },
    {
      number: 3,
      title: "Build Projects",
      description: "Add meaningful projects to your profile.",
    },
    {
      number: 4,
      title: "Prepare Resume",
      description: "Create and analyze your placement resume.",
    },
    {
      number: 5,
      title: "Apply for Drives",
      description: "Check eligible companies and apply.",
    },
  ];

  return (
    <div className="student-page">
      <h1>Readiness Roadmap</h1>
      <p>Your step-by-step placement preparation roadmap.</p>

      <div className="page-card">
        {steps.map((step) => (
          <div className="roadmap-step" key={step.number}>
            <div className="roadmap-number">
              {step.number}
            </div>

            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReadinessRoadmap;