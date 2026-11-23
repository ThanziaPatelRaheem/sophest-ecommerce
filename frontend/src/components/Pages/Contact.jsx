import React from "react";
import MetaData from "../Layout/MetaData";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Contact = () => {
  return (
    <>
      <MetaData title={`Contact Us | Sophest`} />

      <section className="contact-page main-grid">
        <h2 className="page-heading">Contact Us</h2>

        <div className="contact-wrapper">
          <p className="contact-intro">
            Have a question about our products or orders? We're happy to help.
          </p>

          <div className="contact-box">
            <FiMail className="contact-icon" />
            <h3>Email</h3>
            <p>
              <a href="mailto:info@sophest.com">info@sophest.com</a>
            </p>
          </div>

          <div className="contact-box">
            <FiPhone className="contact-icon" />
            <h3>Phone</h3>
            <p>
              <a href="tel:+919986025091">+91 9986025091</a>
            </p>
          </div>

          <div className="contact-box">
            <FiMapPin className="contact-icon" />
            <h3>Location</h3>
            <p>Chennai, Tamil Nadu, India</p>
          </div>

          <p className="contact-note">
            For order-related enquiries, please include your Order ID.
          </p>
        </div>
      </section>
    </>
  );
};

export default Contact;
