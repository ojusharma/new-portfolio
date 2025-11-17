import React, { useState, useEffect } from 'react';
import { experiences } from '../data/experience';
import './Experience.css';

const ExperienceItem = ({ experience, activeView, onToggle }) => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (!activeView) {
      setDisplayedLines([]);
      setCurrentLine(0);
      return;
    }

    const contentArray = activeView === 'details' ? experience.details : experience.techStack;
    
    if (currentLine < contentArray.length) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, contentArray[currentLine]]);
        setCurrentLine(prev => prev + 1);
      }, 150); // Delay between lines

      return () => clearTimeout(timer);
    }
  }, [activeView, currentLine, experience.details, experience.techStack]);

  const handleToggle = (view) => {
    onToggle(experience.id, view);
    setDisplayedLines([]);
    setCurrentLine(0);
  };

  return (
    <div className="experience-item">
      <div className="experience-header">
        <div className="experience-info">
          <h3 className="experience-role">
            {experience.role} <span className="experience-company">— {experience.company}</span>
          </h3>
          <p className="experience-description">{experience.description}</p>
          
          <div className="button-group">
            <button 
              className={`details-toggle ${activeView === 'details' ? 'active' : ''}`}
              onClick={() => handleToggle('details')}
            >
              {activeView === 'details' ? '$ exit' : '$ cat details.txt'}
            </button>
            
            <button 
              className={`details-toggle ${activeView === 'techstack' ? 'active' : ''}`}
              onClick={() => handleToggle('techstack')}
            >
              {activeView === 'techstack' ? '$ exit' : '$ cat tech-stack.txt'}
            </button>
          </div>

          {activeView && (
            <div className="terminal-container">
              <div className="terminal-header">
                <span className="terminal-dot red"></span>
                <span className="terminal-dot yellow"></span>
                <span className="terminal-dot green"></span>
                <span className="terminal-title">
                  {activeView === 'details' ? 'experience-details.sh' : 'tech-stack.sh'}
                </span>
              </div>
              <div className="terminal-content">
                <div className="terminal-prompt">
                  <span className="prompt-user">ojus@portfolio</span>
                  <span className="prompt-separator">:</span>
                  <span className="prompt-path">~/experience</span>
                  <span className="prompt-symbol">$</span>
                  <span className="prompt-command">
                    {activeView === 'details' ? ' cat details.txt' : ' cat tech-stack.txt'}
                  </span>
                </div>
                <div className="terminal-output">
                  {activeView === 'techstack' ? (
                    <div className="tech-stack-tags">
                      {displayedLines.map((tech, index) => (
                        <span key={index} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : (
                    displayedLines.map((detail, index) => (
                      <div 
                        key={index} 
                        className="terminal-line visible"
                      >
                        <span className="line-prefix">▹ </span>
                        {detail}
                      </div>
                    ))
                  )}
                  {currentLine >= (activeView === 'details' ? experience.details.length : experience.techStack.length) && displayedLines.length > 0 && (
                    <div className="terminal-prompt-end">
                      <span className="prompt-user">ojus@portfolio</span>
                      <span className="prompt-separator">:</span>
                      <span className="prompt-path">~/experience</span>
                      <span className="prompt-symbol">$</span>
                      <span className="cursor-blink">_</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="experience-period">{experience.period}</div>
      </div>
    </div>
  );
};

const Experience = () => {
  const [activeItems, setActiveItems] = useState({});

  const handleToggle = (expId, view) => {
    setActiveItems(prev => {
      const currentView = prev[expId];
      if (currentView === view) {
        // Close if clicking the same button
        const newState = { ...prev };
        delete newState[expId];
        return newState;
      } else {
        // Open the clicked view for this experience only
        return { [expId]: view };
      }
    });
  };

  return (
    <section id="experience" className="experience-section">
      <h2 className="section-title">
        <span className="section-symbol">/</span>experience
      </h2>

      <div className="experience-list">
        {experiences.map((exp) => (
          <ExperienceItem 
            key={exp.id} 
            experience={exp}
            activeView={activeItems[exp.id] || null}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </section>
  );
};

export default Experience;
