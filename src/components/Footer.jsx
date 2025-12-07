import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="site-footer">
      <button className="f1-easter-egg" onClick={() => navigate('/f1')}>
        $ view-f1-car
      </button>
      <p>© 2025 • Built with Redbulls & Passion</p>
    </footer>
  );
};

export default Footer;
