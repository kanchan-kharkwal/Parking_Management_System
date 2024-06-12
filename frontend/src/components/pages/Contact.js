// src/components/pages/Contact.js
import React from 'react';
import './Contact.css';
import contactImage from '../../assets/car.jpg'; // Import your image file

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-left">
      <div className="contact-image-container">
          <img src={contactImage} alt="Contact" className="contact-image" />
        </div>
      </div>
      <div className="contact-right">
        <div className="contact-content">
          <h1 className="contact-heading">Contact Us</h1>
          <p>If you have any questions, feel free to reach out to us at:</p>
          <p>Email: support@space-sync.com</p>
          <p>Phone: +91 234 567 890</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
