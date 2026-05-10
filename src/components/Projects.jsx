import React from 'react';
import { projects } from '../data/projects';
import { StaggerGrid, StaggerItem } from './animations/StaggerGrid';
import TiltCard from './animations/TiltCard';
import FadeIn from './animations/FadeIn';
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
              {tag}
            </span>
          ))}
        </div>

        <div className="project-footer">
          <div className="project-links">
            <a 
              href={project.detailsUrl} 
              className="project-link details-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub →
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
      <FadeIn direction="left">
        <h2 className="section-title">
          <span className="section-symbol">/</span>projects
        </h2>
      </FadeIn>

      <StaggerGrid className="projects-grid">
        {projects.map((project) => (
          <StaggerItem key={project.id}>
            <TiltCard style={{ height: '100%' }}>
              <ProjectCard project={project} />
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerGrid>
    </section>
  );
};

export default Projects;
