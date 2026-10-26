import React from 'react';
import { education } from '../data/education';
import FadeIn from './animations/FadeIn';
import './Education.css';

const Education = () => (
  <section id="education" className="education-section">
    <FadeIn direction="left">
      <h2 className="section-title">
        <span className="section-symbol">/</span>education
      </h2>
      <p className="section-subtext">Degree, awards, and the roles I held on campus</p>
    </FadeIn>

    <FadeIn direction="up">
      <div className="edu-card">
        <div className="edu-header">
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
        </div>

        <div className="edu-awards">
          <div>
            <h4 className="edu-group-label">Honours</h4>
            <ul className="edu-list">
              {education.honours.map((item) => (
                <li key={item.name} className="edu-row">
                  <span>{item.name}</span>
                  <span className="edu-muted">{item.year}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="edu-group-label">Scholarships</h4>
            <ul className="edu-list">
              {education.scholarships.map((item) => (
                <li key={item.name} className="edu-row">
                  <span>{item.name}</span>
                  <span className="edu-muted">{item.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="edu-roles">
          <h4 className="edu-group-label">Roles at UBC</h4>
          <ul className="edu-list">
            {education.roles.map((role) => (
              <li key={role.title} className="edu-role">
                <div className="edu-role-head">
                  <span className="edu-role-title">{role.title}</span>
                  <span className="edu-period">{role.period}</span>
                </div>
                <ul className="edu-highlights">
                  {role.highlights.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FadeIn>
  </section>
);

export default Education;
