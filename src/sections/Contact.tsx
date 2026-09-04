import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import '../styles/contact.css';

interface ContactProps {
  onOpenInquiry?: () => void;
}

export default function Contact({ onOpenInquiry }: ContactProps = {}) {
  const emailAddress = 'amiralidm1390@gmail.com';

  return (
    <section className="contact-section" id="contact">
      {/* Restrained ambient teal background glow */}
      <div className="contact-ambient-glow" aria-hidden="true" />

      <div className="contact-container">
        {/* Main Editorial Contact Card */}
        <div className="contact-card">
          {/* Section Tag */}
          <motion.div
            className="contact-tag"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="contact-tag-dot" aria-hidden="true" />
            <span>CONTACT</span>
          </motion.div>

          {/* Large Headline */}
          <motion.h2
            className="contact-title"
            id="contact-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Have a project in <span className="contact-title-serif">mind?</span>
          </motion.h2>

          {/* Short Supporting Description */}
          <motion.p
            className="contact-description"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            Let&apos;s create a website that turns visitors into clients.
          </motion.p>

          {/* Primary CTA and Professional Contact Presentation */}
          <motion.div
            className="contact-actions"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <button
              type="button"
              className="contact-btn-primary"
              id="contact-primary-btn"
              data-open-inquiry="true"
              onClick={() => {
                if (onOpenInquiry) {
                  onOpenInquiry();
                } else {
                  window.dispatchEvent(new CustomEvent('open-inquiry'));
                }
              }}
            >
              <span>Start a project</span>
              <ArrowUpRight size={16} className="contact-btn-icon" aria-hidden="true" />
            </button>

            <div className="contact-info-block">
              <span className="contact-info-label">Contact</span>
              <span
                className="contact-info-email"
                id="contact-secondary-email-text"
              >
                {emailAddress}
              </span>
            </div>
          </motion.div>

          {/* Subtle Trust Indicator */}
          <motion.div
            className="contact-trust-indicator"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
          >
            <span className="contact-trust-dot" aria-hidden="true" />
            <span>Available for selected projects</span>
          </motion.div>

          {/* Clean Bottom Information Row (No Icons) */}
          <motion.div
            className="contact-details"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
          >
            <span className="contact-detail-item">Response within 24 hours</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
