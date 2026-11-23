import React from "react";
import { LuBadgeCheck, LuFlaskConical, LuLeaf, LuTruck } from "react-icons/lu";

import "./FeatureBenefits.css";

const FeatureBenefits = () => {
  const features = [
    {
      icon: LuBadgeCheck,
      title: "Quality Assured",
      description: "Carefully sourced and selected",
    },
    {
      icon: LuFlaskConical,
      title: "Thoughtful Formulations",
      description: "Made with care and purpose",
    },
    {
      icon: LuLeaf,
      title: "Everyday Wellness",
      description: "For a more mindful home",
    },
    {
      icon: LuTruck,
      title: "Fast & Reliable",
      description: "Convenient delivery in Singapore",
    },
  ];

  return (
    <section className="benefits-section">
      <div className="benefits-heading">
        <h2>The Sophest Promise</h2>
      </div>

      <div className="features-container">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div key={feature.title} className="feature-card">
              <div className="feature-wrapper">
                <Icon className="feature-icon" aria-hidden="true" />
              </div>

              <div className="feature-info">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeatureBenefits;
