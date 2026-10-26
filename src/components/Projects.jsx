import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { StaggerGrid, StaggerItem } from './animations/StaggerGrid';
import TiltCard from './animations/TiltCard';
import FadeIn from './animations/FadeIn';
import './Projects.css';

const bgTransition = { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] };

const ProjectCard = ({ project }) => {
  const bgVariants = {
    idle:    { opacity: 0.15, scale: 1.06 },
    hovered: { opacity: project.imageOpacity ?? 0.55, scale: 1 },
  };

  const overlayVariants = {
    idle:    { opacity: 1 },
    hovered: { opacity: project.overlayOpacity ?? 1 },
  };

  const linkProps = project.detailsUrl
    ? { href: project.detailsUrl, target: '_blank', rel: 'noopener noreferrer' }
    : {};
  const Card = project.detailsUrl ? motion.a : motion.div;

  return (
    <Card
      className={`project-card${project.detailsUrl ? '' : ' project-card--static'}`}
      {...linkProps}
      initial="idle"
      whileHover="hovered"
      animate="idle"
    >
      {project.image && (
        <>
          <motion.img
            className="project-bg-image"
            src={project.image}
            alt=""
            variants={bgVariants}
            transition={bgTransition}
          />
          <motion.div
            className="project-bg-overlay"
            variants={overlayVariants}
            transition={bgTransition}
          />
        </>
      )}
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        {project.status && <span className="project-status">{project.status}</span>}
      </div>
    </Card>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <FadeIn direction="left">
        <h2 className="section-title">
          <span className="section-symbol">/</span>projects
        </h2>
        <p className="section-subtext">Click on the cards to see the github repo :) </p>
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
