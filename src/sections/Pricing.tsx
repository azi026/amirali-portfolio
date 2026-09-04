import { MouseEvent, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import '../styles/pricing.css';

export type PricingPackageType = 'Landing Page' | 'Business Website' | 'Premium Experience';

interface PricingService {
  id: string;
  index: string;
  tag: string;
  title: PricingPackageType;
  positioning: string;
  pricePrefix: string;
  price: string;
  isPopular?: boolean;
  popularBadge?: string;
  description: string;
  features: string[];
  ctaLabel: string;
}

const SERVICES_DATA: PricingService[] = [
  {
    id: 'pricing-landing',
    index: '01',
    tag: 'Launch',
    title: 'Landing Page',
    positioning: 'For launching a new idea, product, or campaign.',
    pricePrefix: 'Starting from',
    price: '$1,500',
    description:
      'A focused single-page website designed to introduce your idea, capture leads, and convert visitors.',
    features: [
      'Custom UI Design',
      'Responsive Development',
      'Conversion-focused Layout',
      'Basic SEO Setup',
      '1–2 Week Delivery',
    ],
    ctaLabel: 'Build My Landing Page →',
  },
  {
    id: 'pricing-business',
    index: '02',
    tag: 'Grow',
    title: 'Business Website',
    positioning: 'For businesses ready to build trust and grow online.',
    pricePrefix: 'Starting from',
    price: '$3,000',
    isPopular: true,
    popularBadge: 'MOST POPULAR',
    description:
      'A complete digital presence designed for businesses needing credibility, structure, and scalable growth.',
    features: [
      'Multi-page Website',
      'Custom Design System',
      'CMS Integration',
      'Performance Optimization',
      'SEO Foundation',
      '3–4 Week Delivery',
    ],
    ctaLabel: 'Start My Website →',
  },
  {
    id: 'pricing-premium',
    index: '03',
    tag: 'Scale',
    title: 'Premium Experience',
    positioning: 'For brands looking for a unique digital experience.',
    pricePrefix: 'Starting from',
    price: '$5,000+',
    description:
      'A high-end digital experience combining custom visuals, motion, and interactive storytelling.',
    features: [
      'Advanced Animations',
      'Motion Design',
      'Art Direction',
      'Interactive Experiences',
      'Premium UI System',
      'Strategic Support',
    ],
    ctaLabel: 'Discuss My Vision →',
  },
];

interface PricingProps {
  onOpenInquiry?: (serviceType?: PricingPackageType) => void;
}

export default function Pricing({ onOpenInquiry }: PricingProps = {}) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(
        window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
        window.innerWidth >= 1025
      );
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const handleCtaClick = (e: MouseEvent<HTMLAnchorElement>, serviceTitle: PricingPackageType) => {
    e.preventDefault();
    if (onOpenInquiry) {
      onOpenInquiry(serviceTitle);
    } else {
      window.dispatchEvent(
        new CustomEvent('open-inquiry', { detail: { serviceType: serviceTitle } })
      );
    }
  };

  return (
    <section className="pricing-section" id="pricing">
      {/* Restrained teal ambient backdrop glow */}
      <div className="pricing-ambient-glow" aria-hidden="true" />

      <div className="pricing-container">
        {/* Section Header */}
        <div className="pricing-header">
          <motion.div
            className="pricing-tag"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="pricing-tag-dot" aria-hidden="true" />
            <span>PRICING & SERVICES</span>
          </motion.div>

          <motion.h2
            className="pricing-title"
            id="pricing-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Choose the right path for your <span className="pricing-title-serif">project</span>
          </motion.h2>

          <motion.p
            className="pricing-subtitle"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            Every project is tailored around your goals, timeline, and business needs.
          </motion.p>
        </div>

        {/* 3 Pricing / Service Cards */}
        <div className="pricing-grid" role="region" aria-labelledby="pricing-heading">
          {SERVICES_DATA.map((service, index) => (
            <motion.article
              key={service.id}
              className={`pricing-card ${service.isPopular ? 'pricing-card--popular' : ''} ${
                service.id === 'pricing-premium' ? 'pricing-card--premium' : ''
              }`}
              id={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.1,
              }}
              whileHover={
                isDesktop
                  ? {
                      y: -4,
                      transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                    }
                  : undefined
              }
            >
              {/* Subtle badge above the card */}
              {service.isPopular && (
                <div className="pricing-popular-badge-floating" aria-label="Most popular option">
                  <span className="pricing-popular-dot" aria-hidden="true" />
                  <span>{service.popularBadge || 'MOST POPULAR'}</span>
                </div>
              )}

              {/* Card Top: Tag + Index, Title, Price, Description */}
              <div className="pricing-card-top">
                <div className="pricing-card-meta">
                  <span className="pricing-card-tag">{service.tag}</span>
                  <span className="pricing-card-index">{service.index}</span>
                </div>

                <div className="pricing-card-heading-group">
                  <h3 className="pricing-card-title">{service.title}</h3>
                  <p className="pricing-card-positioning">{service.positioning}</p>
                </div>

                <div className="pricing-card-price-block">
                  <span className="pricing-card-price-prefix">{service.pricePrefix}</span>
                  <span className="pricing-card-price-amount">{service.price}</span>
                </div>

                <p className="pricing-card-desc">{service.description}</p>
              </div>

              {/* Card Center: Feature points */}
              <div className="pricing-card-features">
                <ul className="pricing-features-list">
                  {service.features.map((feature, featureIndex) => (
                    <li key={`${service.id}-f-${featureIndex}`} className="pricing-feature-item">
                      <span className="pricing-feature-icon-wrapper" aria-hidden="true">
                        <Check size={11} strokeWidth={2.5} />
                      </span>
                      <span className="pricing-feature-text">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Bottom: Card CTA button */}
              <div className="pricing-card-footer">
                <a
                  href="#inquiry"
                  className="pricing-card-cta"
                  id={`${service.id}-cta`}
                  data-open-inquiry="true"
                  data-service={service.title}
                  onClick={(e) => handleCtaClick(e, service.title)}
                >
                  <span>
                    {service.ctaLabel.endsWith('→') ? service.ctaLabel.slice(0, -1).trim() : service.ctaLabel}{' '}
                    <span className="pricing-card-cta-arrow" aria-hidden="true">→</span>
                  </span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
