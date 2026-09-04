import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';
import '../styles/modal.css';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Lock body scroll when modal is open and handle Escape key
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="project-modal-backdrop"
          id="project-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            className="project-modal-dialog"
            id="project-modal-container"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              type="button"
              className="project-modal-close"
              id="project-modal-close-btn"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Modal Content Scroll Area */}
            <div className="project-modal-scroll">
              {/* Large Project Image */}
              <div className="project-modal-image-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-modal-image"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="project-modal-image-fade" aria-hidden="true" />
              </div>

              {/* Project Body */}
              <div className="project-modal-body">
                {/* Header: Category & Title */}
                <div className="project-modal-header">
                  <span className="project-modal-category">{project.category}</span>
                  <h2 className="project-modal-title" id="project-modal-title">
                    {project.title}
                  </h2>
                </div>

                {/* Description */}
                <p className="project-modal-description">
                  {project.fullDescription || project.shortDescription}
                </p>

                {/* Design Disciplines */}
                <div className="project-modal-tech-section">
                  <span className="project-modal-section-label">Design & Focus</span>
                  <div className="project-modal-tech-list">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="project-modal-tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="project-modal-actions">
                  <button
                    type="button"
                    className="project-modal-btn-close"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  <a
                    href="#contact"
                    className="project-modal-btn-primary"
                    data-open-inquiry="true"
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                      window.dispatchEvent(new CustomEvent('open-inquiry'));
                    }}
                  >
                    <span>Start a Project</span>
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
