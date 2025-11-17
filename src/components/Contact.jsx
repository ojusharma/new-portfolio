import React, { useState } from 'react';
import { contactInfo } from '../data/contact';
import './Contact.css';

const Contact = () => {
  const [isHoveringEmail, setIsHoveringEmail] = useState(false);
  const [isHoveringGithub, setIsHoveringGithub] = useState(false);
  const [isHoveringLinkedin, setIsHoveringLinkedin] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleEmailClick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(contactInfo.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">
        <span className="section-symbol">/</span>contact
      </h2>

      <div className="contact-content">
        <div className="contact-text">
          <p className="contact-description">
            I'm always open to discussing new projects, creative ideas, or opportunities.
            If you want to geek out about Formula 1, Liverpool FC or History, I'm more than happy to chat! 
          </p>
        </div>

        <div className="contact-links">
          {contactInfo.email && (
            <a 
              href={`mailto:${contactInfo.email}`}
              className="contact-link"
              onClick={handleEmailClick}
              onMouseEnter={() => setIsHoveringEmail(true)}
              onMouseLeave={() => setIsHoveringEmail(false)}
            >
              <span className="link-icon">📧</span>
              <span className="link-text">
                {copied ? 'Copied to clipboard!' : (isHoveringEmail ? contactInfo.email : 'Email')}
              </span>
            </a>
          )}

          {contactInfo.github && (
            <a 
              href={contactInfo.github}
              className="contact-link"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsHoveringGithub(true)}
              onMouseLeave={() => setIsHoveringGithub(false)}
            >
              <span className="link-icon">🐙</span>
              <span className="link-text">
                {isHoveringGithub ? '@ojusharma' : 'GitHub'}
              </span>
            </a>
          )}

          {contactInfo.linkedin && (
            <a 
              href={contactInfo.linkedin}
              className="contact-link"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsHoveringLinkedin(true)}
              onMouseLeave={() => setIsHoveringLinkedin(false)}
            >
              <span className="link-icon">💼</span>
              <span className="link-text">
                {isHoveringLinkedin ? '/ojus-sharma' : 'LinkedIn'}
              </span>
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
        <p>© 2025 • Built with Redbulls & Passion</p>
      </footer>
    </section>
  );
};

export default Contact;
