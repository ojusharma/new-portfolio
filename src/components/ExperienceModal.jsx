import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './ExperienceModal.css';

const ExperienceModal = ({ experience, initialTab = 'details', onClose }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [showEndPrompt, setShowEndPrompt] = useState(false);
  const bodyRef = useRef(null);

  const content = activeTab === 'details' ? experience.details : experience.techStack;

  useEffect(() => {
    setDisplayedLines([]);
    setCurrentLine(0);
    setShowEndPrompt(false);
  }, [activeTab]);

  useEffect(() => {
    if (currentLine < content.length) {
      const delay = activeTab === 'details' ? 110 : 70;
      const timer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, content[currentLine]]);
        setCurrentLine(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else if (currentLine === content.length && content.length > 0) {
      const timer = setTimeout(() => setShowEndPrompt(true), 250);
      return () => clearTimeout(timer);
    }
  }, [currentLine, content, activeTab]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const slug = experience.company
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/\s+/g, '-');

  return (
    <motion.div
      className="expm-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
    >
      <div className="expm-mobile-dismiss">tap here to exit</div>
      <motion.div
        className="expm-window"
        initial={{ scale: 0.91, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.91, opacity: 0, y: 24 }}
        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
      >
        {/* Chrome */}
        <div className="expm-chrome">
          <div className="expm-dots">
            <button className="expm-dot expm-dot--red" onClick={onClose} aria-label="Close modal" />
            <span className="expm-dot expm-dot--yellow" />
            <span className="expm-dot expm-dot--green" />
          </div>
          <div className="expm-chrome-title">
            ojus@portfolio: ~/experience/{slug}
          </div>
          <kbd className="expm-esc-hint">ESC</kbd>
        </div>

        {/* Tabs */}
        <div className="expm-tabs">
          <button
            className={`expm-tab ${activeTab === 'details' ? 'expm-tab--active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            details.txt
          </button>
          <button
            className={`expm-tab ${activeTab === 'techstack' ? 'expm-tab--active' : ''}`}
            onClick={() => setActiveTab('techstack')}
          >
            tech-stack.txt
          </button>
          <div className="expm-tabs-filler" />
          <span className="expm-tabs-count">
            {content.length} {activeTab === 'details' ? 'entries' : 'technologies'}
          </span>
        </div>

        {/* Body */}
        <div className="expm-body" ref={bodyRef}>
          <div className="expm-scanlines" aria-hidden="true" />

          {/* Info block */}
          <div className="expm-info-block">
            <div className="expm-info-header">
              <span className="expm-info-company">{experience.company}</span>
              <span className="expm-info-period">{experience.period}</span>
            </div>
            <span className="expm-info-role">{experience.role}</span>
          </div>

          {/* Command prompt */}
          <div className="expm-prompt">
            <span className="expm-p-user">ojus@portfolio</span>
            <span className="expm-p-sep">:</span>
            <span className="expm-p-path">~/experience</span>
            <span className="expm-p-sym">$</span>
            <span className="expm-p-cmd">
              {activeTab === 'details' ? ' cat details.txt' : ' cat tech-stack.txt'}
            </span>
          </div>

          {/* Output */}
          <div className="expm-output">
            {activeTab === 'techstack' ? (
              <div className="expm-tag-grid">
                {displayedLines.map((tech, i) => (
                  <span key={i} className="expm-tag" style={{ animationDelay: `${i * 0.04}s` }}>
                    {tech}
                  </span>
                ))}
              </div>
            ) : (
              displayedLines.map((line, i) => (
                <div key={i} className="expm-line">
                  <span className="expm-line-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="expm-line-arrow">▹</span>
                  <span className="expm-line-text">{line}</span>
                </div>
              ))
            )}
          </div>

          {/* End prompt */}
          {showEndPrompt && (
            <div className="expm-prompt expm-prompt--end">
              <span className="expm-p-user">ojus@portfolio</span>
              <span className="expm-p-sep">:</span>
              <span className="expm-p-path">~/experience</span>
              <span className="expm-p-sym">$</span>
              <span className="expm-cursor">█</span>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExperienceModal;
