import React from 'react';
import { skills } from '../data/skills';
import './Skills.css';

const SkillCategory = ({ title, items, color }) => {
  return (
    <div className="skill-category">
      <h3 className="skill-category-title" style={{ color }}>{title}</h3>
      <div className="skill-tags">
        {items.map((skill, index) => (
          <span key={index} className="skill-tag" style={{ borderColor: color }}>
            # {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <h2 className="section-title">
        <span className="section-symbol">$</span> skills<span className="cursor">_</span>
      </h2>

      <div className="skills-grid">
        <SkillCategory 
          title="Languages" 
          items={skills.languages}
          color="#FFA500"
        />
        <SkillCategory 
          title="Frameworks" 
          items={skills.frameworks}
          color="#FFA500"
        />
        <SkillCategory 
          title="Tools" 
          items={skills.tools}
          color="#FFA500"
        />
      </div>
    </section>
  );
};

export default Skills;
