import React from 'react';
import { contactInfo } from '../data/contact';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">
        <span className="section-symbol">/</span>contact
      </h2>

      <div className="contact-content">
        <div className="contact-text">
          <h3 className="contact-heading">Let's Connect</h3>
          <p className="contact-description">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
        </div>

        <div className="contact-links">
          {contactInfo.email && (
            <a 
              href={`mailto:${contactInfo.email}`}
              className="contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="link-icon">📧</span>
              <span className="link-text">Email</span>
            </a>
          )}

          {contactInfo.github && (
            <a 
              href={contactInfo.github}
              className="contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="link-icon">🐙</span>
              <span className="link-text">GitHub</span>
            </a>
          )}

          {contactInfo.linkedin && (
            <a 
              href={contactInfo.linkedin}
              className="contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="link-icon">💼</span>
              <span className="link-text">LinkedIn</span>
            </a>
          )}

          {contactInfo.twitter && (
            <a 
              href={contactInfo.twitter}
              className="contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="link-icon">🐦</span>
              <span className="link-text">Twitter</span>
            </a>
          )}
        </div>
      </div>

      <footer className="footer">
        <p>© 2025 • Built with React & ❤️</p>
      </footer>
    </section>
  );
};

export default Contact;
