import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { Project } from '../types';
import { ProjectModal } from '../components';
import '../styles/works.css';

export default function Works() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="works-section" id="works">
      {/* Restrained ambient teal background glow */}
      <div className="works-ambient-glow" aria-hidden="true" />

      <div className="works-container">
        {/* Section Header */}
        <motion.div
          className="works-header"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="works-tag">
            <span className="works-tag-dot" aria-hidden="true" />
            <span>Featured Portfolio</span>
          </div>

          <h2 className="works-heading" id="works-title">
            Selected Works
          </h2>

          <p className="works-subtext">
            A collection of premium digital experiences and website concepts.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="works-grid">
          {PROJECTS.map((project, index) => (
            <motion.article
              key={project.id}
              className="project-card"
              id={`project-card-${project.id}`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.08 + index * 0.1,
              }}
              whileHover={{
                y: -5,
                transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
              }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Thumbnail Container */}
              <div className="project-card-image-wrap">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-card-img"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="project-card-overlay" aria-hidden="true" />
              </div>

              {/* Card Body */}
              <div className="project-card-body">
                <div className="project-card-meta">
                  <span className="project-card-category">{project.category}</span>
                </div>

                <h3 className="project-card-title">{project.title}</h3>

                <p className="project-card-desc">{project.shortDescription}</p>

                {/* Metadata Row: Role / Focus */}
                {project.role && (
                  <div className="project-card-role-meta">
                    <span className="project-role-label">Role:</span>
                    <span className="project-role-value">{project.role}</span>
                  </div>
                )}

                {/* Footer: Tags & Action Button in one row */}
                <div className="project-card-footer">
                  <div className="project-card-tech">
                    {project.technologies.map((tag) => (
                      <span key={tag} className="project-tech-badge">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="project-view-btn"
                    id={`view-case-study-btn-${project.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    aria-label={`View case study for ${project.title}`}
                  >
                    <span>View Case Study</span>
                    <span className="project-view-btn-icon" aria-hidden="true">
                      <ArrowUpRight size={14} />
                    </span>
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
