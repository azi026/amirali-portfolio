import { amiraliPortrait } from '../assets';
import '../styles/about.css';

export default function About() {
  return (
    <section className="about-section" id="about">
      {/* Ambient background illumination */}
      <div className="about-ambient-glow" aria-hidden="true" />

      <div className="about-container">
        <div className="about-layout-grid">
          {/* Left Column: Refined personal profile portrait */}
          <div className="about-visual-wrapper">
            <div className="about-portrait-stage">
              {/* Subtle teal atmospheric aura */}
              <div className="about-portrait-aura" aria-hidden="true" />

              {/* Personal profile container */}
              <div className="about-profile-card" id="about-profile-card">
                <img
                  src={amiraliPortrait}
                  alt="Amirali"
                  className="about-profile-img"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="about-profile-vignette" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Right Column: About Content */}
          <div className="about-content">
            <div className="about-tag">
              <span className="about-tag-dot" aria-hidden="true" />
              <span>ABOUT ME</span>
            </div>

            <h2 className="about-statement" id="about-heading">
              I'm <span className="about-statement-serif">Amirali</span>.
            </h2>

            <div className="about-message-body">
              <p className="about-lead-paragraph">
                I build websites that actually make more sales and make more clients.
              </p>

              <p className="about-paragraph">
                You can see my work, choose one of my plans and start working together.
              </p>

              <div className="about-highlight-wrapper">
                <span className="about-highlight-dash" aria-hidden="true" />
                <p className="about-highlight">
                  Let's make more sales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

