import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { experiences } from '../data/experience';
import FadeIn from './animations/FadeIn';
import './Experience.css';

const gearPath = (cx, cy, innerR, outerR, teeth) => {
  const step = (Math.PI * 2) / teeth;
  const toothAngle = step * 0.22;
  let d = '';
  for (let i = 0; i < teeth; i++) {
    const a = step * i - Math.PI / 2;
    d += i === 0 ? 'M ' : 'L ';
    d += `${(cx + innerR * Math.cos(a - toothAngle)).toFixed(2)},${(cy + innerR * Math.sin(a - toothAngle)).toFixed(2)} `;
    d += `L ${(cx + outerR * Math.cos(a - toothAngle)).toFixed(2)},${(cy + outerR * Math.sin(a - toothAngle)).toFixed(2)} `;
    d += `L ${(cx + outerR * Math.cos(a + toothAngle)).toFixed(2)},${(cy + outerR * Math.sin(a + toothAngle)).toFixed(2)} `;
    d += `L ${(cx + innerR * Math.cos(a + toothAngle)).toFixed(2)},${(cy + innerR * Math.sin(a + toothAngle)).toFixed(2)} `;
  }
  return d + 'Z';
};

const CONTRAIL_DOTS = [
  { bottom: '8%',  delay: '0s' },
  { bottom: '13%', delay: '0.15s' },
  { bottom: '19%', delay: '0.3s' },
  { bottom: '26%', delay: '0.5s' },
  { bottom: '34%', delay: '0.7s' },
];

const GRID_LINES = ['15%', '30%', '45%', '60%', '75%', '90%'];

const NEURAL_GRID_LINES = ['15%', '30%', '45%', '60%', '75%', '90%'];

const UBCNeural = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="ubc-neural-strip">
      {NEURAL_GRID_LINES.map((top) => (
        <div key={top} className="neural-grid-line" style={{ top }} />
      ))}
      {isInView && (
        <svg
          className="neural-svg"
          viewBox="0 0 60 90"
          aria-hidden="true"
        >
          {/* Edges — rendered before nodes so nodes appear on top */}
          <line
            className="neural-edge--input-a"
            x1="30" y1="72" x2="18" y2="45"
            stroke="rgba(0,217,255,0.12)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <line
            className="neural-edge--input-b"
            x1="30" y1="72" x2="42" y2="45"
            stroke="rgba(0,217,255,0.12)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <line
            className="neural-edge--hidden-a-out"
            x1="18" y1="45" x2="30" y2="18"
            stroke="rgba(0,217,255,0.12)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <line
            className="neural-edge--hidden-b-out"
            x1="42" y1="45" x2="30" y2="18"
            stroke="rgba(0,217,255,0.12)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Nodes */}
          <circle className="neural-node--input"    cx="30" cy="72" r="5" fill="rgba(255,255,255,0.2)" />
          <circle className="neural-node--hidden-a" cx="18" cy="45" r="5" fill="rgba(255,255,255,0.2)" />
          <circle className="neural-node--hidden-b" cx="42" cy="45" r="5" fill="rgba(255,255,255,0.2)" />
          <circle className="neural-node--output"   cx="30" cy="18" r="5" fill="rgba(255,255,255,0.2)" />
        </svg>
      )}
    </div>
  );
};

const BoeingPlane = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="boeing-plane-strip">
      {GRID_LINES.map((top) => (
        <div key={top} className="plane-grid-line" style={{ top }} />
      ))}
      {isInView && (
        <>
          <svg
            className="boeing-plane-svg"
            viewBox="0 0 60 80"
            aria-hidden="true"
          >
            {/* Fuselage */}
            <ellipse cx="30" cy="38" rx="4.5" ry="22" fill="rgba(255,255,255,0.92)" />
            {/* Nose */}
            <path d="M25.5,17 Q30,8 34.5,17 Z" fill="rgba(255,255,255,0.92)" />
            {/* Swept wings */}
            <path d="M27,36 L4,52 L6,56 L27,42 Z" fill="rgba(235,235,255,0.88)" />
            <path d="M33,36 L56,52 L54,56 L33,42 Z" fill="rgba(235,235,255,0.88)" />
            {/* Winglets */}
            <path d="M4,52 L2,46 L6,56 Z" fill="rgba(200,220,255,0.7)" />
            <path d="M56,52 L58,46 L54,56 Z" fill="rgba(200,220,255,0.7)" />
            {/* Engine pods */}
            <ellipse cx="11" cy="51" rx="4" ry="5.5" fill="rgba(180,190,210,0.82)" />
            <ellipse cx="49" cy="51" rx="4" ry="5.5" fill="rgba(180,190,210,0.82)" />
            {/* Engine inlets */}
            <ellipse cx="11" cy="46" rx="3" ry="2" fill="rgba(60,80,120,0.8)" />
            <ellipse cx="49" cy="46" rx="3" ry="2" fill="rgba(60,80,120,0.8)" />
            {/* Horizontal stabilizers */}
            <path d="M27,57 L17,64 L18,67 L28,61 Z" fill="rgba(220,220,240,0.85)" />
            <path d="M33,57 L43,64 L42,67 L32,61 Z" fill="rgba(220,220,240,0.85)" />
            {/* Vertical stabilizer */}
            <path d="M28,55 L25,44 L35,44 L32,55 Z" fill="rgba(255,255,255,0.9)" />
            {/* Window strip */}
            <rect x="27" y="20" width="6" height="10" rx="1.5" fill="rgba(0,200,255,0.35)" />
          </svg>
          {CONTRAIL_DOTS.map((dot, i) => (
            <div
              key={i}
              className="plane-contrail-dot"
              style={{ bottom: dot.bottom, animationDelay: dot.delay }}
            />
          ))}
        </>
      )}
    </div>
  );
};

const TUMGears = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="tum-gears-strip">
      {GRID_LINES.map((top) => (
        <div key={top} className="tum-grid-line" style={{ top }} />
      ))}
      {isInView && (
        <svg className="tum-gears-svg" viewBox="0 0 60 90" aria-hidden="true">
          <g className="gear--large">
            <path d={gearPath(28, 62, 11, 15, 8)} fill="rgba(255,255,255,0.10)" stroke="rgba(0,217,255,0.35)" strokeWidth="0.6" />
            <circle cx="28" cy="62" r="4.5" fill="rgba(0,217,255,0.15)" stroke="rgba(0,217,255,0.3)" strokeWidth="0.5" />
            <circle cx="28" cy="62" r="2" fill="rgba(0,217,255,0.5)" />
          </g>
          <g className="gear--small">
            <path d={gearPath(41, 39, 7, 10, 6)} fill="rgba(255,255,255,0.10)" stroke="rgba(0,217,255,0.3)" strokeWidth="0.6" />
            <circle cx="41" cy="39" r="3" fill="rgba(0,217,255,0.12)" stroke="rgba(0,217,255,0.25)" strokeWidth="0.5" />
            <circle cx="41" cy="39" r="1.5" fill="rgba(0,217,255,0.4)" />
          </g>
          <g className="gear--micro">
            <path d={gearPath(20, 24, 4.5, 6.5, 5)} fill="rgba(255,255,255,0.08)" stroke="rgba(0,217,255,0.25)" strokeWidth="0.5" />
            <circle cx="20" cy="24" r="2" fill="rgba(0,217,255,0.12)" />
            <circle cx="20" cy="24" r="1" fill="rgba(0,217,255,0.4)" />
          </g>
          <line x1="28" y1="62" x2="41" y2="39" stroke="rgba(0,217,255,0.06)" strokeWidth="0.5" strokeDasharray="2,3" />
          <line x1="41" y1="39" x2="20" y2="24" stroke="rgba(0,217,255,0.06)" strokeWidth="0.5" strokeDasharray="2,3" />
        </svg>
      )}
    </div>
  );
};

const TUMServer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="tum-server-strip">
      {GRID_LINES.map((top) => (
        <div key={top} className="tum-grid-line" style={{ top }} />
      ))}
      {isInView && (
        <svg className="tum-server-svg" viewBox="0 0 60 90" aria-hidden="true">
          {[20, 40, 60].map((cy, i) => (
            <g key={cy}>
              <rect x="5" y={cy - 8} width="50" height="14" rx="2" fill="rgba(255,255,255,0.06)" stroke="rgba(0,217,255,0.2)" strokeWidth="0.6" />
              <rect x="9"  y={cy - 4} width="8" height="6" rx="1" fill="rgba(0,217,255,0.08)" stroke="rgba(0,217,255,0.18)" strokeWidth="0.4" />
              <rect x="19" y={cy - 4} width="8" height="6" rx="1" fill="rgba(0,217,255,0.08)" stroke="rgba(0,217,255,0.18)" strokeWidth="0.4" />
              <rect x="29" y={cy - 4} width="8" height="6" rx="1" fill="rgba(0,217,255,0.08)" stroke="rgba(0,217,255,0.18)" strokeWidth="0.4" />
              <circle cx="43" cy={cy - 2} r="1.8" className={`server-led server-led--${i * 2}`} />
              <circle cx="48" cy={cy - 2} r="1.8" className={`server-led server-led--${i * 2 + 1}`} />
            </g>
          ))}
          <line x1="30" y1="12" x2="30" y2="68" stroke="rgba(0,217,255,0.07)" strokeWidth="1.5" strokeDasharray="3,4" className="server-cable" />
        </svg>
      )}
    </div>
  );
};

const BAR_DATA = [
  { x: 7,  h: 40, delay: '0s' },
  { x: 17, h: 62, delay: '0.1s' },
  { x: 27, h: 32, delay: '0.2s' },
  { x: 37, h: 52, delay: '0.3s' },
  { x: 47, h: 45, delay: '0.4s' },
];

const UBCChart = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="ubc-chart-strip">
      {GRID_LINES.map((top) => (
        <div key={top} className="chart-grid-line" style={{ top }} />
      ))}
      {isInView && (
        <svg className="ubc-chart-svg" viewBox="0 0 60 90" aria-hidden="true">
          {/* Axes */}
          <line x1="4" y1="78" x2="56" y2="78" stroke="rgba(0,217,255,0.25)" strokeWidth="0.8" />
          <line x1="4" y1="14" x2="4"  y2="78" stroke="rgba(0,217,255,0.12)" strokeWidth="0.5" />

          {/* Bars */}
          {BAR_DATA.map((bar, i) => (
            <rect
              key={i}
              x={bar.x}
              y={78 - bar.h}
              width="8"
              height={bar.h}
              rx="1.5"
              fill="rgba(0,217,255,0.18)"
              stroke="rgba(0,217,255,0.38)"
              strokeWidth="0.5"
              className="chart-bar"
              style={{ animationDelay: bar.delay }}
            />
          ))}

          {/* Top-of-bar dots */}
          {BAR_DATA.map((bar, i) => (
            <circle
              key={i}
              cx={bar.x + 4}
              cy={78 - bar.h}
              r="2"
              fill="rgba(0,217,255,0.75)"
              className="chart-dot"
              style={{ animationDelay: `${parseFloat(bar.delay) + 0.5}s` }}
            />
          ))}

          {/* Trend line */}
          <polyline
            points={BAR_DATA.map(bar => `${bar.x + 4},${78 - bar.h}`).join(' ')}
            fill="none"
            stroke="rgba(0,217,255,0.22)"
            strokeWidth="0.8"
            strokeDasharray="100"
            strokeDashoffset="100"
            className="chart-line"
          />
        </svg>
      )}
    </div>
  );
};

const ExperienceItem = ({ experience, index, activeView, onToggle }) => {
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
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [activeView, currentLine, experience.details, experience.techStack]);

  const handleToggle = (view) => {
    onToggle(experience.id, view);
    setDisplayedLines([]);
    setCurrentLine(0);
  };

  const offsetClass = index % 2 === 0 ? 'experience-item--left' : 'experience-item--right';

  const cardContent = (
    <div className="experience-content">
      <div className="experience-header">
        <div className="experience-info">
          <div className="experience-title-block">
            <h3 className="experience-company-name">{experience.company}</h3>
            <p className="experience-role-title">
              <span className="role-prefix">›</span> {experience.role}
            </p>
          </div>
          <p className="experience-description">{experience.description}</p>

          <div className="button-group">
            <button
              className={`details-toggle ${activeView === 'details' ? 'active' : ''}`}
              onClick={() => handleToggle('details')}
            >
              {activeView === 'details' ? '$ exit' : '$ details'}
            </button>

            <button
              className={`details-toggle ${activeView === 'techstack' ? 'active' : ''}`}
              onClick={() => handleToggle('techstack')}
            >
              {activeView === 'techstack' ? '$ exit' : '$ tech-stack'}
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
                      {displayedLines.map((tech, i) => (
                        <span key={i} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                      </div>
                    ) : (
                      displayedLines.map((detail, i) => (
                        <div key={i} className="terminal-line visible">
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

  if (experience.company === 'Boeing') {
    return (
      <div className={`boeing-card-wrapper ${offsetClass}`}>
        <div className="experience-item">{cardContent}</div>
        <BoeingPlane />
      </div>
    );
  }

  if (experience.company === 'University of British Columbia' && experience.id === 2) {
    return (
      <div className={`ubc-card-wrapper ${offsetClass}`}>
        <UBCNeural />
        <div className="experience-item">{cardContent}</div>
      </div>
    );
  }

  if (experience.company === 'Technical University of Munich (TUM)' && experience.id === 3) {
    return (
      <div className={`tum-gears-card-wrapper ${offsetClass}`}>
        <div className="experience-item">{cardContent}</div>
        <TUMGears />
      </div>
    );
  }

  if (experience.company === 'Technical University of Munich (TUM)' && experience.id === 4) {
    return (
      <div className={`tum-server-card-wrapper ${offsetClass}`}>
        <TUMServer />
        <div className="experience-item">{cardContent}</div>
      </div>
    );
  }

  if (experience.company === 'University of British Columbia' && experience.id === 5) {
    return (
      <div className={`ubc-chart-card-wrapper ${offsetClass}`}>
        <div className="experience-item">{cardContent}</div>
        <UBCChart />
      </div>
    );
  }

  return (
    <div className={`experience-item ${offsetClass}`}>
      {cardContent}
    </div>
  );
};

const Experience = () => {
  const [activeItems, setActiveItems] = useState({});

  const handleToggle = (expId, view) => {
    setActiveItems(prev => {
      const currentView = prev[expId];
      if (currentView === view) {
        const newState = { ...prev };
        delete newState[expId];
        return newState;
      } else {
        return { [expId]: view };
      }
    });
  };

  return (
    <section id="experience" className="experience-section">
      <FadeIn direction="left">
        <h2 className="section-title">
          <span className="section-symbol">/</span>experience
        </h2>
      </FadeIn>

      <div className="experience-list">
        {experiences.map((exp, index) => (
          <FadeIn key={exp.id} delay={index * 0.1} direction="up">
            <ExperienceItem
              experience={exp}
              index={index}
              activeView={activeItems[exp.id] || null}
              onToggle={handleToggle}
            />
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default Experience;
