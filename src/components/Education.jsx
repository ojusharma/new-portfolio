import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { education } from '../data/education';
import FadeIn from './animations/FadeIn';
import './Education.css';

const EASE = [0.22, 1, 0.36, 1];

// Wipes a block in from the top edge, like a line being printed to a terminal.
const Reveal = ({ as = 'div', delay = 0, className, children }) => {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { clipPath: 'inset(0 0 100% 0)', y: 10 }}
      whileInView={{ clipPath: 'inset(0 0 -2% 0)', y: 0 }}
      viewport={{ once: true, margin: '0px 0px -90px 0px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
};

const Rule = () => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="edu-rule"
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '0px 0px -90px 0px' }}
      transition={{ duration: 0.8, ease: EASE }}
    />
  );
};

const Education = () => {
  return (
    <section id="education" className="education-section">
      <FadeIn direction="left">
        <h2 className="section-title">
          <span className="section-symbol">/</span>education
        </h2>
        <p className="section-subtext">Degree, awards, and the roles I held on campus</p>
      </FadeIn>

      <div className="edu-card">
        <Reveal className="edu-header">
          <div>
            <h3 className="edu-school">{education.school}</h3>
            <p className="edu-degree">{education.degree}</p>
            <p className="edu-minor">{education.minor}</p>
          </div>
          <div className="edu-meta">
            <span className="edu-graduated">{education.graduated}</span>
            <span className="edu-gpa">
              <span className="edu-gpa-label">GPA </span>
              {education.gpa.value}
              <span className="edu-gpa-scale"> / {education.gpa.scale}</span>
            </span>
          </div>
        </Reveal>

        <div className="edu-awards">
          <Rule />
          <Reveal>
            <h4 className="edu-group-label">Honours</h4>
            <ul className="edu-list">
              {education.honours.map((item) => (
                <li key={item.name} className="edu-row">
                  <span>{item.name}</span>
                  <span className="edu-muted">{item.year}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.12}>
            <h4 className="edu-group-label">Scholarships</h4>
            <ul className="edu-list">
              {education.scholarships.map((item) => (
                <li key={item.name} className="edu-row">
                  <span>{item.name}</span>
                  <span className="edu-muted">{item.detail}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="edu-roles">
          <Rule />
          <Reveal>
            <h4 className="edu-group-label">Roles at UBC</h4>
          </Reveal>
          <ul className="edu-list">
            {education.roles.map((role) => (
              <Reveal as="li" key={role.title} className="edu-role">
                <div className="edu-role-head">
                  <span className="edu-role-title">{role.title}</span>
                  <span className="edu-period">{role.period}</span>
                </div>
                <ul className="edu-highlights">
                  {role.highlights.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Education;
