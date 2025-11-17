import React from 'react';
import { projects } from '../data/projects';
import './Projects.css';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      {/* <div className="project-image">
        <img 
          src={project.coverImage} 
          alt={project.title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x250/1a1a1a/FFA500?text=Project+Image';
          }}
        />
      </div> */}
      
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        
        <div className="project-tags">
          {project.tags.map((tag, index) => (
            <span key={index} className="project-tag">
              # {tag}
            </span>
          ))}
        </div>

        <div className="project-footer">
          <span className="project-tech">{project.techStack}</span>
          <div className="project-links">
            <a 
              href={project.detailsUrl} 
              className="project-link details-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Details →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">
        <span className="section-symbol">/</span>projects
      </h2>

      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
