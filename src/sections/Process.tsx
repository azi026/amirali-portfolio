import { motion } from 'motion/react';
import '../styles/process.css';

interface StepItem {
  number: string;
  title: string;
  description: string;
}

const PROCESS_STEPS: StepItem[] = [
  {
    number: '01',
    title: 'Discovery',
    description: 'Understanding your goals, brand, and project requirements.',
  },
  {
    number: '02',
    title: 'Strategy & Design',
    description: 'Creating the structure, visual direction, and user experience.',
  },
  {
    number: '03',
    title: 'Development',
    description: 'Building a fast, responsive, and polished website.',
  },
  {
    number: '04',
    title: 'Launch & Support',
    description: 'Delivering the final website and helping you move forward.',
  },
];

export default function Process() {
  return (
    <section className="process-section" id="process">
      {/* Subtle ambient backdrop illumination */}
      <div className="process-ambient-glow" aria-hidden="true" />

      <div className="process-container">
        {/* Section Header */}
        <div className="process-header">
          <motion.div
            className="process-tag"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="process-tag-dot" aria-hidden="true" />
            <span>Process</span>
          </motion.div>

          <motion.h2
            className="process-title"
            id="process-heading"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            My <span className="process-title-serif">Process</span>
          </motion.h2>

          <motion.p
            className="process-subtitle"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
          >
            A simple and transparent process from idea to launch.
          </motion.p>
        </div>

        {/* Process Steps Grid with subtle staggered card reveals */}
        <div className="process-grid">
          {PROCESS_STEPS.map((step, index) => (
            <motion.article
              key={step.number}
              className="process-card"
              id={`process-step-${step.number}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.18 + index * 0.12,
              }}
            >
              {/* Very subtle teal ambient glow only during viewport entrance */}
              <motion.div
                className="process-card-glow"
                aria-hidden="true"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0, 0.7, 0] }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.95,
                  times: [0, 0.45, 1],
                  ease: 'easeInOut',
                  delay: 0.2 + index * 0.12,
                }}
              />

              <div className="process-card-accent" aria-hidden="true" />

              <div className="process-card-num-box">
                <span className="process-card-num">{step.number}</span>
              </div>

              <h3 className="process-card-heading">
                <span className="process-card-heading-prefix">{step.number} —</span>
                <span className="process-card-heading-title">{step.title}</span>
              </h3>

              <p className="process-card-desc">{step.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
