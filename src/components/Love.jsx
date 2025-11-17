import React from 'react';
import './Love.css';

const Love = () => {
  return (
    <div className="love-page">
      <section id="formula1" className="love-section">
        <h2 className="section-title">
          <span className="section-symbol">/</span>formula 1
        </h2>
        <div className="love-content">
          <p className="love-description">
            I love Formula 1 because it just feels alive in a way nothing else does.
            <br /><br />
            The precision, the constant flow of data, the tiny adjustments that make a huge difference. It all fascinates me. 
            <br /><br />What really keeps me hooked, is the relentless pursuit of perfection and the teamwork behind it. 
            <br /><br />Hundreds of people working together, staying sharp for days, trying to get everything right down to the smallest detail.<br /><br />And for me, Sebastian Vettel is a big part of that love. He's my favourite :) grounded, thoughtful, and genuinely human in a sport that pushes you to your limit.
            F1 isn't just cars on a track; it's people giving everything they've got.
          </p>
        </div>
      </section>

      <section id="liverpool" className="love-section">
        <h2 className="section-title">
          <span className="section-symbol">/</span>liverpool fc
        </h2>
        <div className="love-content">
          <p className="love-description">
            Content about Liverpool FC passion goes here...
          </p>
        </div>
      </section>

      <section id="history-movies" className="love-section">
        <h2 className="section-title">
          <span className="section-symbol">/</span>history + movies
        </h2>
        <div className="love-content">
          <p className="love-description">
            Content about History and Movies passion goes here...
          </p>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 • Built with Redbulls & Passion</p>
      </footer>
    </div>
  );
};

export default Love;
