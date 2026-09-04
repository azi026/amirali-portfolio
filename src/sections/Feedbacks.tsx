import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import '../styles/feedbacks.css';

interface FeedbackCardData {
  id: string;
  quote: string;
  clientName: string;
  clientRole: string;
}

const FEEDBACKS_DATA: FeedbackCardData[] = [
  {
    id: 'feedback-1',
    quote:
      'Working together brought a refined typographic rhythm and structure to our brand. The website balances minimal elegance with a clear path to client inquiries.',
    clientName: 'Elena Vance',
    clientRole: 'Design Director, Architectural Practice',
  },
  {
    id: 'feedback-2',
    quote:
      'The attention to layout balance and responsive execution was exceptional. Our digital presence feels truly bespoke, delivering a smooth experience across every device.',
    clientName: 'Marcus Sterling',
    clientRole: 'Founder, Independent Advisory',
  },
  {
    id: 'feedback-3',
    quote:
      'A structured, transparent collaboration from concept to deployment. The final site communicates our editorial perspective with confidence and technical speed.',
    clientName: 'Sophie Althaus',
    clientRole: 'Creative Principal, Contemporary Studio',
  },
];

export default function Feedbacks() {
  return (
    <section className="feedbacks-section" id="feedbacks">
      {/* Subtle ambient backdrop aura */}
      <div className="feedbacks-ambient-glow" aria-hidden="true" />

      <div className="feedbacks-container">
        {/* Section Header */}
        <div className="feedbacks-header">
          <motion.div
            className="feedbacks-tag"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="feedbacks-tag-dot" aria-hidden="true" />
            <span>Feedbacks</span>
          </motion.div>

          <motion.h2
            className="feedbacks-title"
            id="feedbacks-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Client <span className="feedbacks-title-serif">Feedbacks</span>
          </motion.h2>

          <motion.p
            className="feedbacks-subtitle"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            Feedback from founders and creative leaders on collaborative web projects.
          </motion.p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="feedbacks-grid" role="region" aria-labelledby="feedbacks-heading">
          {FEEDBACKS_DATA.map((item, index) => (
            <motion.article
              key={item.id}
              className="feedback-card"
              id={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.12,
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
              }}
            >
              <div className="feedback-quote-wrapper" aria-hidden="true">
                <Quote size={20} />
              </div>

              <blockquote className="feedback-text">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <footer className="feedback-author">
                <cite className="feedback-author-name">{item.clientName}</cite>
                <span className="feedback-author-role">{item.clientRole}</span>
              </footer>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
