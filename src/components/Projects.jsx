import React from 'react';
import { projects } from '../data/projects';
import { StaggerGrid, StaggerItem } from './animations/StaggerGrid';
import TiltCard from './animations/TiltCard';
import FadeIn from './animations/FadeIn';
import './Projects.css';

const ProjectCard = ({ project }) => {
  return (
    <a
      className="project-card"
      href={project.detailsUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
      </div>
    </a>
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
          <StaggerItem key={project.id} className="project-stagger-item">
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
