import { motion } from 'motion/react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { amiraliPortrait } from '../assets';
import '../styles/hero.css';

export default function Hero() {
  return (
    <section className="hero-section" id="hero">
      {/* Restrained teal ambient back-glow */}
      <motion.div
        className="hero-ambient-glow"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="hero-container">
        {/* Left Column: Heading & Calls to Action */}
        <div className="hero-content">
          {/* Heading with elegant upward reveal */}
          <div className="hero-heading-wrapper">
            <motion.h1
              className="hero-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className="hero-heading-line">Build premium websites</span>
              <span className="hero-heading-line hero-heading-emphasis">
                That make more clients
              </span>
            </motion.h1>
          </div>

          {/* Action CTAs - subtle staggered entrance */}
          <div className="hero-actions">
            <motion.a
              href="#contact"
              className="hero-btn-primary"
              id="hero-primary-cta"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.12,
              }}
              onClick={(e) => {
                const target = document.getElementById('contact') || document.getElementById('process');
                if (target) {
                  e.preventDefault();
                  const headerEl = document.getElementById('main-navbar');
                  const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : (window.innerWidth <= 900 ? 64 : 80);

                  if (target.id === 'contact' && window.innerWidth <= 900) {
                    const cardEl = target.querySelector('.contact-card') as HTMLElement | null;
                    const elementToAlign = cardEl || target;
                    const cardRect = elementToAlign.getBoundingClientRect();
                    const cardAbsoluteTop = cardRect.top + window.pageYOffset;
                    const cardHeight = cardRect.height;
                    const availableHeight = window.innerHeight - headerHeight;

                    let targetScrollTop: number;
                    if (cardHeight < availableHeight) {
                      const remainingSpace = availableHeight - cardHeight;
                      const centeredTopSpace = Math.max(22, Math.round(remainingSpace / 2));
                      targetScrollTop = cardAbsoluteTop - headerHeight - centeredTopSpace;
                    } else {
                      targetScrollTop = cardAbsoluteTop - headerHeight - 22;
                    }

                    window.scrollTo({ top: Math.max(0, targetScrollTop), behavior: 'smooth' });
                    return;
                  }

                  const elementPosition = target.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                  window.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
                }
              }}
            >
              <span>Start a project</span>
              <span className="hero-btn-icon-wrap" aria-hidden="true">
                <ArrowUpRight size={16} />
              </span>
            </motion.a>

            <motion.a
              href="#works"
              className="hero-btn-secondary"
              id="hero-secondary-cta"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
              }}
              onClick={(e) => {
                const target = document.getElementById('works');
                if (target) {
                  e.preventDefault();
                  const headerEl = document.getElementById('main-navbar');
                  const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : (window.innerWidth <= 900 ? 64 : 80);
                  const elementPosition = target.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                  window.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
                }
              }}
            >
              <span>View my work</span>
              <span className="hero-btn-icon-wrap hero-btn-icon-down" aria-hidden="true">
                <ArrowDown size={15} />
              </span>
            </motion.a>
          </div>
        </div>

        {/* Right Column: Integrated Portrait Composition */}
        <div className="hero-visual-wrapper">
          <div className="hero-portrait-stage">
            {/* Subtle emerald halo behind portrait */}
            <motion.div
              className="hero-portrait-aura"
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 0.7, scale: 1 }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            />

            {/* Portrait container with gentle scale-in from 0.96 to 1 */}
            <motion.div
              className="hero-portrait-container"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.22,
              }}
            >
              <img
                src={amiraliPortrait}
                alt="Amirali Damirchilo"
                className="hero-portrait-img"
                referrerPolicy="no-referrer"
                loading="eager"
              />

              {/* Seamless dark blend */}
              <div className="hero-portrait-blend" aria-hidden="true" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
