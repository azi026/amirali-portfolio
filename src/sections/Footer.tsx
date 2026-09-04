import { Linkedin, Github } from 'lucide-react';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="footer-section" id="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand & Description */}
          <div className="footer-brand-col">
            <span className="footer-brand-name" id="footer-brand-title">
              AMIRALI DAMIRCHILO
            </span>
            <p className="footer-description" id="footer-description-text">
              &ldquo;I design websites that turn ideas into meaningful digital experiences.&rdquo;
            </p>
          </div>

          {/* Social Icons */}
          <div className="footer-socials">
            <a
              href="https://ir.linkedin.com/in/amir-damirchilo"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              id="footer-linkedin-link"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} strokeWidth={1.6} aria-hidden="true" />
            </a>
            <a
              href="https://github.com/amiralidamirchilo"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              id="footer-github-link"
              aria-label="GitHub"
            >
              <Github size={20} strokeWidth={1.6} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Subtle Divider Line */}
        <div className="footer-divider" aria-hidden="true" />

        {/* Bottom Area: Copyright */}
        <div className="footer-bottom">
          <p className="footer-copyright" id="footer-copyright-text">
            &copy; 2026 Amirali Damirchilo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
