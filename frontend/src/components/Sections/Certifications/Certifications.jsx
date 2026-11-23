import React from "react";
import {
  LuBadgeCheck,
  LuShieldCheck,
  LuFactory,
  LuCircleCheck,
} from "react-icons/lu";

import "./Certifications.css";

const certifications = [
  {
    name: "ISO",
    description: "International Quality Standards",
    icon: LuBadgeCheck,
  },
  {
    name: "HACCP",
    description: "Food Safety Management",
    icon: LuShieldCheck,
  },
  {
    name: "GMP",
    description: "Good Manufacturing Practices",
    icon: LuFactory,
  },
  {
    name: "HALAL",
    description: "Halal Certification",
    icon: LuCircleCheck,
  },
];

const Certifications = () => {
  return (
    <section className="certifications-section">
      <div className="certifications-heading">
        <h2>Our Quality Certifications</h2>
      </div>

      <p className="certifications-subtitle">
        Quality, safety and care in every step.
      </p>

      <div className="certifications-container">
        {certifications.map((certification) => {
          const Icon = certification.icon;

          return (
            <div className="certification-card" key={certification.name}>
              <Icon className="certification-icon" aria-hidden="true" />

              <h3>{certification.name}</h3>
              <p>{certification.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Certifications;
