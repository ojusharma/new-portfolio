import React, { useState } from 'react';
import { skills } from '../data/skills';
import './Skills.css';

const SkillCategory = ({ title, items, color, isOpen, onToggle }) => {
  return (
    <div className={`skill-category ${isOpen ? 'open' : 'closed'}`}>
      <button 
        className="skill-category-header"
        onClick={onToggle}
        style={{ borderColor: color }}
      >
        <h3 className="skill-category-title" style={{ color }}>
          {title}
        </h3>
        <span className="toggle-icon" style={{ color }}>
          {isOpen ? '▼' : '▶'}
        </span>
      </button>
      {isOpen && (
        <div className="skill-tags">
          {items.map((skill, index) => (
            <span key={index} className="skill-tag" style={{ borderColor: color }}>
              # {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const Skills = () => {
  const [openCategories, setOpenCategories] = useState({});

  const handleToggle = (categoryKey) => {
    const category = categories.find(cat => cat.key === categoryKey);
    const categoryRow = category.row;
    
    // Find all categories in the same row
    const sameRowCategories = categories.filter(cat => cat.row === categoryRow);
    
    // Check if all categories in this row are currently open
    const allOpen = sameRowCategories.every(cat => openCategories[cat.key]);
    
    // Toggle all categories in the same row
    const newState = { ...openCategories };
    sameRowCategories.forEach(cat => {
      newState[cat.key] = !allOpen;
    });
    
    setOpenCategories(newState);
  };

  const categories = [
    { key: 'languages', title: 'Languages', items: skills.languages, color: '#FFA500', row: 1 },
    { key: 'frameworks', title: 'Frameworks', items: skills.frameworks, color: '#FFA500', row: 1 },
    { key: 'devOps', title: 'DevOps & CI/CD', items: skills.devOps, color: '#FFA500', row: 1 },
    { key: 'cloud', title: 'Cloud Platforms', items: skills.cloud, color: '#00d9ff', row: 2 },
    { key: 'databases', title: 'Databases', items: skills.databases, color: '#00d9ff', row: 2 },
    { key: 'testing', title: 'Testing', items: skills.testing, color: '#00d9ff', row: 2 },
    { key: 'dataScience', title: 'Data Science & ML', items: skills.dataScience, color: '#9b59b6', row: 3 },
    { key: 'tools', title: 'Tools & APIs', items: skills.tools, color: '#9b59b6', row: 3 },
    { key: 'softSkills', title: 'Soft Skills', items: skills.softSkills, color: '#2ecc71', row: 3 }
  ];
  return (
    <section id="skills" className="skills-section">
      <h2 className="section-title">
        <span className="section-symbol">/</span>skills
      </h2>

      <div className="skills-grid">
        {categories.map((category) => (
          <SkillCategory
            key={category.key}
            title={category.title}
            items={category.items}
            color={category.color}
            isOpen={openCategories[category.key]}
            onToggle={() => handleToggle(category.key)}
          />
        ))}
      </div>
    </section>
  );
};

export default Skills;
