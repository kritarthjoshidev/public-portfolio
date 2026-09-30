import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { FiGithub, FiExternalLink, FiX } from 'react-icons/fi';

const techColors = {
  React: '#61DAFB', 'Node.js': '#68A063', MongoDB: '#4DB33D',
  Python: '#3572A5', 'OpenAI API': '#10A37F', TypeScript: '#3178C6',
  JavaScript: '#F7DF1E', Docker: '#2496ED', Redux: '#764ABC',
  FastAPI: '#009688', 'Socket.io': '#010101', Stripe: '#635BFF',
};

const ProjectCard = ({ project, index, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      className={`project-card ${project.featured ? 'project-card--featured' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onClick(project)}
    >
      {project.featured && <span className="project-card__badge">Featured</span>}

      <div className="project-card__header">
        <div className="project-card__folder">
          <svg width="40" height="34" viewBox="0 0 40 34" fill="none">
            <path d="M0 4C0 1.79 1.79 0 4 0H15.59C16.48 0 17.33.35 17.97.97L20 3H36C38.21 3 40 4.79 40 7V30C40 32.21 38.21 34 36 34H4C1.79 34 0 32.21 0 30V4Z" fill="url(#folderGrad)" />
            <defs>
              <linearGradient id="folderGrad" x1="0" y1="0" x2="40" y2="34" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8B5CF6" />
                <stop offset="1" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="project-card__links">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} title="GitHub">
              <FiGithub size={18} />
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} title="Live Demo">
              <FiExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__desc">{project.description.slice(0, 120)}...</p>

      <div className="project-card__tech">
        {project.tech?.slice(0, 4).map(t => (
          <span
            key={t}
            className="tech-tag"
            style={{ color: techColors[t] || '#8B5CF6', borderColor: `${techColors[t] || '#8B5CF6'}40` }}
          >
            {t}
          </span>
        ))}
        {project.tech?.length > 4 && <span className="tech-tag tech-tag--more">+{project.tech.length - 4}</span>}
      </div>

      <motion.div
        className="project-card__glow"
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.article>
  );
};

const ProjectModal = ({ project, onClose }) => (
  <motion.div
    className="project-modal__overlay"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      className="project-modal"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onClick={e => e.stopPropagation()}
    >
      <button className="project-modal__close" onClick={onClose}><FiX size={22} /></button>

      <div className="project-modal__header">
        {project.featured && <span className="project-card__badge">Featured Project</span>}
        <h2 className="project-modal__title">{project.title}</h2>
      </div>

      <p className="project-modal__desc">{project.description}</p>

      <div className="project-modal__tech">
        <h4>Tech Stack</h4>
        <div className="project-card__tech">
          {project.tech?.map(t => (
            <span key={t} className="tech-tag" style={{ color: techColors[t] || '#8B5CF6', borderColor: `${techColors[t] || '#8B5CF6'}40` }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="project-modal__actions">
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer" className="btn btn--outline">
            <FiGithub /> View Code
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer" className="btn btn--primary">
            <FiExternalLink /> Live Demo
          </a>
        )}
      </div>
    </motion.div>
  </motion.div>
);

const Projects = ({ projects }) => {
  const [ref, inView] = useInView(0.1);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? projects : projects.slice(0, 6);

  return (
    <section id="projects" className="section projects" ref={ref}>
      <div className="container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section__tag">projects</span>
          <h2 className="section__title">What I've Built</h2>
          <p className="section__subtitle">
            A selection of projects spanning AI, full-stack web, and open source
          </p>
        </motion.div>

        <div className="projects__grid">
          {displayed.map((project, i) => (
            <ProjectCard
              key={project._id || i}
              project={project}
              index={i}
              onClick={setSelectedProject}
            />
          ))}
        </div>

        {projects.length > 6 && (
          <motion.div
            className="projects__show-more"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <button className="btn btn--outline" onClick={() => setShowAll(v => !v)}>
              {showAll ? 'Show Less' : `Show All (${projects.length})`}
            </button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
