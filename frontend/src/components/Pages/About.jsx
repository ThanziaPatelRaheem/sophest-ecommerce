import React from "react";
import MetaData from "../Layout/MetaData";

const About = () => {
  return (
    <>
      <MetaData title="Our Story | Sophest" />

      <section className="about-us-section main-grid">
        <div className="about-us">
          <div className="about-hero">
            <span className="about-label">
              THE SOPHEST STORY · EVERYDAY ESSENTIALS
            </span>

            <h1>
              Rooted in trust.
              <br />
              <em>Made for every day.</em>
            </h1>

            <div className="about-gold-line"></div>

            <p>
              Thoughtfully chosen. Quality checked. Made for the way you live.
            </p>
          </div>

          <div className="about-story-content">
            <span className="about-label">01 / WHO WE ARE</span>
            <h2>Our Story</h2>

            <p>
              Sophest Private Limited is an FMCG company based in Chennai,
              India. We bring quality products to Singapore and the surrounding
              region. Our products make homes cleaner, meals better and everyday
              routines easier.
            </p>

            <p>
              We don't run a factory. We run a standard. We choose manufacturing
              partners carefully, specify what goes into every product and check
              it before it carries our crest. Families, retailers and businesses
              can rely on that difference.
            </p>
          </div>

          <div className="about-values">
            <div className="about-value-card">
              <span className="about-label">02 / OUR VISION</span>
              <h3>A trusted name in every home.</h3>
              <p>
                To be the most trusted consumer brand in the homes of Singapore
                and Southeast Asia.
              </p>
            </div>

            <div className="about-value-card">
              <span className="about-label">03 / OUR MISSION</span>
              <h3>Better everyday living.</h3>
              <p>
                To deliver quality FMCG products that improve everyday living.
                Honestly made, quality-checked and fairly priced.
              </p>
            </div>
          </div>

          <div className="about-promise">
            <span className="about-label">THE SOPHEST PROMISE</span>
            <h2>
              “We don't run a factory.
              <br />
              We run a standard.”
            </h2>
            <div className="about-gold-line"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
