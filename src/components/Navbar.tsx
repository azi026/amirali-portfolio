import { useState, useEffect, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import '../styles/navbar.css';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Works', href: '#works' },
  { label: 'Process', href: '#process' },
  { label: 'Feedbacks', href: '#feedbacks' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

const mobileOverlayVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

const mobileDrawerVariants = {
  hidden: {
    opacity: 0,
    y: -22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.36,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -14,
    transition: {
      duration: 0.22,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const mobileNavLinksVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // 50ms stagger delay per navigation link
      delayChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1,
      duration: 0.15,
    },
  },
};

const mobileNavItemVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: {
      duration: 0.15,
      ease: 'easeIn',
    },
  },
};

const mobileFooterVariants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.43, // Reveals last with a gentle fade-up right after all nav links stagger in
    },
  },
  exit: {
    opacity: 0,
    y: 6,
    transition: {
      duration: 0.15,
      ease: 'easeIn',
    },
  },
};

interface NavbarProps {
  onOpenInquiry?: () => void;
}

export default function Navbar({ onOpenInquiry }: NavbarProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['hero', 'about', 'works', 'process', 'feedbacks', 'pricing', 'contact'];
      const headerEl = document.getElementById('main-navbar');
      const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : (window.innerWidth <= 900 ? 64 : 80);
      const scrollPosition = window.pageYOffset + headerHeight + 60;

      let current = 'hero';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  // Auto-close menu if resized to desktop viewport
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      if (targetId === 'hero' || !targetId) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();

        // Ensure body overflow lock is cleared immediately so smooth scroll executes smoothly
        if (document.body.style.overflow === 'hidden') {
          document.body.style.overflow = '';
        }

        const headerEl = document.getElementById('main-navbar');
        const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : (window.innerWidth <= 900 ? 64 : 80);

        // For Contact section on mobile, scroll so the card appears naturally centered with comfortable top spacing
        if (targetId === 'contact' && window.innerWidth <= 900) {
          const cardEl = targetEl.querySelector('.contact-card') as HTMLElement | null;
          const elementToAlign = cardEl || targetEl;
          const cardRect = elementToAlign.getBoundingClientRect();
          const cardAbsoluteTop = cardRect.top + window.pageYOffset;
          const cardHeight = cardRect.height;
          const availableHeight = window.innerHeight - headerHeight;

          let targetScrollTop: number;
          if (cardHeight < availableHeight) {
            // Center the card in the viewport space below the navbar, keeping comfortable top clearance
            const remainingSpace = availableHeight - cardHeight;
            const centeredTopSpace = Math.max(22, Math.round(remainingSpace / 2));
            targetScrollTop = cardAbsoluteTop - headerHeight - centeredTopSpace;
          } else {
            // If card is taller than viewport, position with comfortable top spacing below header
            targetScrollTop = cardAbsoluteTop - headerHeight - 22;
          }

          requestAnimationFrame(() => {
            window.scrollTo({
              top: Math.max(0, targetScrollTop),
              behavior: 'smooth',
            });
          });
          return;
        }

        // For Works section, scroll so the project cards are centered in the viewport and the bottom area (tags and View Case Study buttons) is visible
        if (targetId === 'works') {
          const cardEl = (targetEl.querySelector('.project-card') || targetEl.querySelector('.works-grid')) as HTMLElement | null;
          const sectionRect = targetEl.getBoundingClientRect();
          const sectionAbsoluteTop = sectionRect.top + window.pageYOffset;
          const availableHeight = window.innerHeight - headerHeight;

          let targetScrollTop: number;

          if (cardEl) {
            const cardRect = cardEl.getBoundingClientRect();
            const cardAbsoluteTop = cardRect.top + window.pageYOffset;
            const cardHeight = cardRect.height;

            if (cardHeight < availableHeight) {
              // Center the project cards in the viewport space below the navbar
              const remainingSpace = availableHeight - cardHeight;
              const centeredTopSpace = Math.round(remainingSpace / 2);
              targetScrollTop = cardAbsoluteTop - headerHeight - centeredTopSpace;
              // Ensure we don't scroll above the section top on ultra-tall displays
              targetScrollTop = Math.max(sectionAbsoluteTop - headerHeight, targetScrollTop);
            } else {
              // If card is taller than available viewport, position so bottom area (tags and buttons) is comfortably visible
              const bottomClearance = window.innerWidth <= 900 ? 20 : 28;
              targetScrollTop = cardAbsoluteTop + cardHeight - window.innerHeight + bottomClearance;
            }
          } else {
            // Calibrated fallback offset to scroll slightly lower past the section padding
            const offset = window.innerWidth <= 900 ? 110 : 150;
            targetScrollTop = sectionAbsoluteTop - headerHeight + offset;
          }

          requestAnimationFrame(() => {
            window.scrollTo({
              top: Math.max(0, targetScrollTop),
              behavior: 'smooth'
            });
          });
          return;
        }

        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        requestAnimationFrame(() => {
          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth'
          });
        });
      } else if (targetId === 'contact' || targetId === 'pricing' || targetId === 'feedbacks') {
        e.preventDefault();
        const fallback = document.getElementById('process');
        if (fallback) {
          const headerEl = document.getElementById('main-navbar');
          const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : (window.innerWidth <= 900 ? 64 : 80);
          const elementPosition = fallback.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth'
          });
        }
      }
    }
  };

  return (
    <motion.header
      id="main-navbar"
      className={`navbar-header ${mobileMenuOpen ? 'menu-open' : ''}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="navbar-container">
        {/* Left: Brand / Name */}
        <a
          href="#hero"
          className="navbar-brand"
          id="navbar-brand-link"
          onClick={(e) => {
            if (mobileMenuOpen) setMobileMenuOpen(false);
            handleLinkClick(e, '#hero');
          }}
        >
          <span className="navbar-brand-dot" aria-hidden="true" />
          <span className="navbar-brand-name">Amirali Damirchilo</span>
        </a>

        {/* Right: Desktop Navigation Links */}
        <nav className="navbar-nav" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`navbar-link ${isActive ? 'active' : ''}`}
                id={`nav-link-${link.label.toLowerCase()}`}
                onClick={(e) => handleLinkClick(e, link.href)}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action: Start a Project CTA & Mobile Toggle */}
        <div className="navbar-actions">
          {/* Hide header CTA buttons completely when mobile menu is open; drawer has its own CTA at bottom */}
          {!mobileMenuOpen && (
            <>
              <a
                href="#inquiry"
                className="navbar-cta navbar-cta-desktop"
                id="navbar-cta-btn"
                data-open-inquiry="true"
                onClick={(e) => {
                  e.preventDefault();
                  if (onOpenInquiry) {
                    onOpenInquiry();
                  } else {
                    window.dispatchEvent(new CustomEvent('open-inquiry'));
                  }
                }}
              >
                <span>Start a project</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>

              {/* Mobile CTA (Compact) */}
              <a
                href="#inquiry"
                className="navbar-cta navbar-cta-mobile"
                id="navbar-cta-mobile-btn"
                data-open-inquiry="true"
                aria-label="Start a project"
                onClick={(e) => {
                  e.preventDefault();
                  if (onOpenInquiry) {
                    onOpenInquiry();
                  } else {
                    window.dispatchEvent(new CustomEvent('open-inquiry'));
                  }
                }}
              >
                <span>Start</span>
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </>
          )}

          {/* Mobile menu trigger - displays close (X) when menu is open */}
          <button
            type="button"
            className="navbar-mobile-toggle"
            id="navbar-mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.span
                  key="close-icon"
                  initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                  transition={{ duration: 0.16, ease: 'easeOut' }}
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu-icon"
                  initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -45, scale: 0.8 }}
                  transition={{ duration: 0.16, ease: 'easeOut' }}
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Backdrop Overlay & Drawer portaled to document.body for root viewport layering */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                <motion.div
                  className="navbar-mobile-backdrop"
                  id="navbar-mobile-backdrop"
                  variants={mobileOverlayVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-hidden="true"
                />
                <motion.div
                  className="navbar-mobile-drawer"
                  id="navbar-mobile-menu"
                  variants={mobileDrawerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.nav
                    className="navbar-mobile-links"
                    aria-label="Mobile Navigation"
                    variants={mobileNavLinksVariants}
                  >
                    {NAV_LINKS.map((link) => {
                      const sectionId = link.href.replace('#', '');
                      const isActive = activeSection === sectionId;
                      return (
                        <motion.a
                          key={link.label}
                          href={link.href}
                          variants={mobileNavItemVariants}
                          className={`navbar-mobile-link ${isActive ? 'active' : ''}`}
                          onClick={(e) => {
                            setMobileMenuOpen(false);
                            handleLinkClick(e, link.href);
                          }}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          <span className="navbar-mobile-link-label">{link.label}</span>
                          <span className="navbar-mobile-link-arrow">→</span>
                        </motion.a>
                      );
                    })}
                  </motion.nav>
                  <motion.div
                    className="navbar-mobile-drawer-footer"
                    variants={mobileFooterVariants}
                  >
                    <a
                      href="#inquiry"
                      className="navbar-mobile-cta"
                      id="navbar-drawer-cta-btn"
                      data-open-inquiry="true"
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileMenuOpen(false);
                        if (onOpenInquiry) {
                          onOpenInquiry();
                        } else {
                          window.dispatchEvent(new CustomEvent('open-inquiry'));
                        }
                      }}
                    >
                      <span>Start a project</span>
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </motion.header>
  );
}
