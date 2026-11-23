import React from "react";
import { Link } from "react-router";

const HeroBanner = () => {
  return (
    <>
      <section className="hero-banner main-grid">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-main">Everyday Essentials,</span>
            <span className="hero-title-accent">Elevated.</span>
          </h1>

          <div className="hero-gold-line" aria-hidden="true"></div>

          <p className="hero-info">
            Thoughtfully curated home care, authentic spices, pure honey and
            wellness brews for everyday living.
          </p>

          <Link to="/products" className="hero-btn">
            Explore Collection
          </Link>
        </div>
      </section>
    </>
  );
};

export default HeroBanner;
