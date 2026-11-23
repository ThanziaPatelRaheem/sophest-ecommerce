import React from "react";
import { NavLink } from "react-router-dom";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram, FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io5";

import "../../css/footer.css";

// Use the same Sophest logo asset as your header.
// Adjust the filename if your existing logo uses another name.
import footerLogo from "../../assets/images/sophest-logo.png";

const socialLinks = [
  {
    name: "Facebook",
    url: "",
    Icon: FaFacebookSquare,
  },
  {
    name: "Instagram",
    url: "",
    Icon: FaSquareInstagram,
  },
  {
    name: "X (Twitter)",
    url: "",
    Icon: FaSquareXTwitter,
  },
  {
    name: "YouTube",
    url: "",
    Icon: IoLogoYoutube,
  },
];

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-logo">
          <img
            src={footerLogo}
            alt="Sophest — Everyday Essentials"
            className="footer-brand-logo"
          />

          <p className="brand-tagline">
            Thoughtfully chosen essentials for everyday living.
          </p>
        </div>

        <div className="footer-quick-links">
          <h3 className="column-title">Quick Links</h3>

          <nav aria-label="Footer navigation">
            <ul className="quick-links-container">
              <li>
                <NavLink to="/about-us" className="quick-links-items">
                  Our Story
                </NavLink>
              </li>

              <li>
                <NavLink to="/contact" className="quick-links-items">
                  Contact Us
                </NavLink>
              </li>

              <li>
                <NavLink to="/shipping-info" className="quick-links-items">
                  Shipping & Delivery
                </NavLink>
              </li>

              <li>
                <NavLink to="/terms-conditions" className="quick-links-items">
                  Terms & Conditions
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="footer-social-icons">
          <h3 className="social-title">Follow Us</h3>

          <nav aria-label="Social media">
            <ul className="socials-container">
              {socialLinks.map(({ name, url, Icon }) => (
                <li key={name}>
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className="socials-link"
                    >
                      <Icon className="socials-icon" />
                    </a>
                  ) : (
                    <span
                      className="socials-link socials-link-disabled"
                      aria-label={`${name} — coming soon`}
                      title={`${name} — coming soon`}
                    >
                      <Icon className="socials-icon" />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="copyrights-container">
        <p className="copyrights-tagline">
          © {new Date().getFullYear()} Sophest. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
