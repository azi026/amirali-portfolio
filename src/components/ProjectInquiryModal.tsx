import { useState, useEffect, useRef, FormEvent, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Check, AlertCircle, Loader2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import '../styles/inquiry-modal.css';

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialWebsiteType?: WebsiteType;
}

export type WebsiteType = 'Landing Page' | 'Business Website' | 'Premium Experience';
export type BudgetRange = '$1,000 - $2,500' | '$2,500 - $5,000' | '$5,000+';

const WEBSITE_TYPES: WebsiteType[] = [
  'Landing Page',
  'Business Website',
  'Premium Experience',
];

const BUDGET_RANGES: BudgetRange[] = [
  '$1,000 - $2,500',
  '$2,500 - $5,000',
  '$5,000+',
];

export default function ProjectInquiryModal({ isOpen, onClose, initialWebsiteType }: ProjectInquiryModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [currentWebsite, setCurrentWebsite] = useState('');
  const [websiteType, setWebsiteType] = useState<WebsiteType>(initialWebsiteType || 'Landing Page');
  const [budget, setBudget] = useState<BudgetRange>('$2,500 - $5,000');
  const [details, setDetails] = useState('');

  // Sync selected website type when modal opens or initial type is updated
  useEffect(() => {
    if (initialWebsiteType) {
      setWebsiteType(initialWebsiteType);
      if (initialWebsiteType === 'Landing Page') {
        setBudget('$1,000 - $2,500');
      } else if (initialWebsiteType === 'Business Website') {
        setBudget('$2,500 - $5,000');
      } else if (initialWebsiteType === 'Premium Experience') {
        setBudget('$5,000+');
      }
    }
  }, [initialWebsiteType, isOpen]);

  const [errors, setErrors] = useState<{ name?: string; email?: string; details?: string }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const firstInputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const successTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle body scroll lock & Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    // Focus first input field softly
    const timeout = setTimeout(() => {
      firstInputRef.current?.focus();
    }, 150);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timeout);
    };
  }, [isOpen, onClose]);

  // Clean up any pending success transition or auto-close timer on unmount
  useEffect(() => {
    return () => {
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current);
      }
    };
  }, []);

  // Reset state when modal is closed
  const handleClose = () => {
    if (successTimerRef.current) {
      clearTimeout(successTimerRef.current);
    }
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
    }
    onClose();
    setTimeout(() => {
      setIsSubmitted(false);
      setIsSuccess(false);
      setIsSubmitting(false);
      setSubmitError(null);
      setErrors({});
    }, 300);
  };

  // Automatically close modal 3 seconds after showing "Inquiry Sent ✓"
  useEffect(() => {
    if (isSubmitted) {
      autoCloseTimerRef.current = setTimeout(() => {
        handleClose();
      }, 3000);
    }

    return () => {
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current);
      }
    };
  }, [isSubmitted]);

  const validate = () => {
    const newErrors: { name?: string; email?: string; details?: string } = {};
    if (!name.trim()) {
      newErrors.name = 'Please enter your name.';
    }
    if (!email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please provide a valid email address.';
    }
    if (!details.trim()) {
      newErrors.details = 'Please briefly share your project goals or scope.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstInvalidId = newErrors.name
        ? 'inquiry-name'
        : newErrors.email
        ? 'inquiry-email'
        : newErrors.details
        ? 'inquiry-details'
        : null;

      if (firstInvalidId) {
        setTimeout(() => {
          const container = scrollContainerRef.current;
          const targetEl = document.getElementById(firstInvalidId);
          if (container && targetEl) {
            const fieldGroup = targetEl.closest('.inquiry-field-group') || targetEl;
            const containerRect = container.getBoundingClientRect();
            const fieldRect = fieldGroup.getBoundingClientRect();
            const offset = fieldRect.top - containerRect.top;

            container.scrollTo({
              top: container.scrollTop + offset - 20,
              behavior: 'smooth',
            });
            targetEl.focus({ preventScroll: true });
          }
        }, 50);
      }
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      if (!isSupabaseConfigured) {
        throw new Error(
          'Supabase is not configured yet. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your project settings.'
        );
      }

      // Format optional notes (company/website) into the message column
      const formattedMessage = [
        details.trim(),
        company.trim() ? `Company / Brand: ${company.trim()}` : '',
        currentWebsite.trim() ? `Current Website: ${currentWebsite.trim()}` : '',
      ]
        .filter(Boolean)
        .join('\n\n');

      const { error } = await supabase.from('inquiries').insert([
        {
          name: name.trim(),
          email: email.trim(),
          service: websiteType,
          budget: budget,
          message: formattedMessage || details.trim(),
        },
      ]);

      if (error) {
        throw new Error(error.message || 'Failed to submit inquiry. Please try again.');
      }

      setIsSubmitting(false);
      setIsSuccess(true);

      // Smooth UX transition to confirmation screen after showing "Inquiry Sent ✓"
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
      successTimerRef.current = setTimeout(() => {
        setIsSubmitted(true);
      }, 700);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Something went wrong while sending your inquiry. Please try again.';
      console.error('Error submitting inquiry to Supabase:', err);
      setSubmitError(errorMessage);
      setIsSubmitting(false);
      setIsSuccess(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="inquiry-modal-backdrop"
          id="project-inquiry-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="inquiry-modal-title"
        >
          <motion.div
            className="inquiry-modal-dialog"
            id="project-inquiry-modal-dialog"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e: MouseEvent) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              className="inquiry-modal-close"
              onClick={handleClose}
              aria-label="Close inquiry modal"
              id="inquiry-modal-close-btn"
            >
              <X size={18} aria-hidden="true" />
            </button>

            <div className="inquiry-modal-scroll" ref={scrollContainerRef}>
              {isSubmitted ? (
                <motion.div
                  className="inquiry-success-view"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="inquiry-success-badge">
                    <Check size={26} aria-hidden="true" />
                  </div>
                  <h3 className="inquiry-success-title">Inquiry Sent ✓</h3>
                  <p className="inquiry-success-desc">
                    Thanks for starting a conversation! I&rsquo;ll review your project and get back to you soon.
                  </p>
                  <div className="inquiry-success-actions">
                    <button
                      type="button"
                      className="inquiry-done-btn"
                      onClick={handleClose}
                    >
                      Done
                    </button>
                    <button
                      type="button"
                      className="inquiry-reset-btn"
                      onClick={() => {
                        if (successTimerRef.current) clearTimeout(successTimerRef.current);
                        if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
                        setIsSubmitted(false);
                        setIsSuccess(false);
                        setIsSubmitting(false);
                        setSubmitError(null);
                        setName('');
                        setEmail('');
                        setCompany('');
                        setCurrentWebsite('');
                        setDetails('');
                      }}
                    >
                      Submit another inquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
                  {/* Modal Header */}
                  <div className="inquiry-header">
                    <div className="inquiry-tag">
                      <span className="inquiry-tag-dot" aria-hidden="true" />
                      <span>PROJECT INQUIRY</span>
                    </div>
                    <h3 className="inquiry-title" id="inquiry-modal-title">
                      Start your <span className="inquiry-title-serif">project.</span>
                    </h3>
                    <p className="inquiry-subtitle">
                      Tell me about your goals, and let&apos;s create a digital experience that moves your business forward.
                    </p>
                  </div>

                  {/* Name & Email: Two columns on desktop */}
                  <div className="inquiry-row-2col">
                      <div className="inquiry-field-group">
                        <label htmlFor="inquiry-name" className="inquiry-label">
                          <span>
                            Your Name <span className="inquiry-label-required">*</span>
                          </span>
                        </label>
                        <input
                          ref={firstInputRef}
                          id="inquiry-name"
                          type="text"
                          className={`inquiry-input ${errors.name ? 'has-error' : ''}`}
                          placeholder="e.g. Elena Rostova"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                          }}
                          required
                        />
                        {errors.name && <span className="inquiry-error-msg">{errors.name}</span>}
                      </div>

                      <div className="inquiry-field-group">
                        <label htmlFor="inquiry-email" className="inquiry-label">
                          <span>
                            Email Address <span className="inquiry-label-required">*</span>
                          </span>
                        </label>
                        <input
                          id="inquiry-email"
                          type="email"
                          className={`inquiry-input ${errors.email ? 'has-error' : ''}`}
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                          }}
                          required
                        />
                        {errors.email && <span className="inquiry-error-msg">{errors.email}</span>}
                      </div>
                    </div>

                    {/* Company / Brand & Current Website: Two columns on desktop */}
                    <div className="inquiry-row-2col">
                      <div className="inquiry-field-group">
                        <label htmlFor="inquiry-company" className="inquiry-label">
                          <span>Company / Brand</span>
                          <span className="inquiry-optional-badge">Optional</span>
                        </label>
                        <input
                          id="inquiry-company"
                          type="text"
                          className="inquiry-input"
                          placeholder="e.g. Studio Mono or Personal"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                        />
                      </div>

                      <div className="inquiry-field-group">
                        <label htmlFor="inquiry-website" className="inquiry-label">
                          <span>Current Website</span>
                          <span className="inquiry-optional-badge">Optional</span>
                        </label>
                        <input
                          id="inquiry-website"
                          type="url"
                          className="inquiry-input"
                          placeholder="https://"
                          value={currentWebsite}
                          onChange={(e) => setCurrentWebsite(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Website Type (Selectable Pills) */}
                    <div className="inquiry-pills-group">
                      <span className="inquiry-label">Website Type</span>
                      <div className="inquiry-pills-row" role="radiogroup" aria-label="Website type selection">
                        {WEBSITE_TYPES.map((type) => {
                          const isActive = websiteType === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              role="radio"
                              aria-checked={isActive}
                              className={`inquiry-pill-btn ${isActive ? 'is-active' : ''}`}
                              onClick={() => setWebsiteType(type)}
                            >
                              <span className="inquiry-pill-dot" aria-hidden="true" />
                              <span>{type}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Project Budget (Selectable Pills) */}
                    <div className="inquiry-pills-group">
                      <span className="inquiry-label">Project Budget</span>
                      <div className="inquiry-pills-row" role="radiogroup" aria-label="Project budget selection">
                        {BUDGET_RANGES.map((range) => {
                          const isActive = budget === range;
                          return (
                            <button
                              key={range}
                              type="button"
                              role="radio"
                              aria-checked={isActive}
                              className={`inquiry-pill-btn ${isActive ? 'is-active' : ''}`}
                              onClick={() => setBudget(range)}
                            >
                              <span className="inquiry-pill-dot" aria-hidden="true" />
                              <span>{range}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Project Details Textarea */}
                    <div className="inquiry-field-group">
                      <label htmlFor="inquiry-details" className="inquiry-label">
                        <span>
                          Project Details <span className="inquiry-label-required">*</span>
                        </span>
                      </label>
                      <textarea
                        id="inquiry-details"
                        rows={4}
                        className={`inquiry-textarea ${errors.details ? 'has-error' : ''}`}
                        placeholder="Tell me about your vision, key goals, timeline, or links to references..."
                        value={details}
                        onChange={(e) => {
                          setDetails(e.target.value);
                          if (errors.details) setErrors((prev) => ({ ...prev, details: undefined }));
                        }}
                        required
                      />
                      {errors.details && <span className="inquiry-error-msg">{errors.details}</span>}
                    </div>

                    {/* Submit Area */}
                    <div className="inquiry-actions">
                      {submitError && (
                        <div className="inquiry-submit-error" role="alert">
                          <AlertCircle size={16} className="inquiry-submit-error-icon" aria-hidden="true" />
                          <span>{submitError}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        className={`inquiry-submit-btn ${isSuccess ? 'is-success' : ''}`}
                        id="inquiry-submit-button"
                        disabled={isSubmitting || isSuccess}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                            <span>Sending your inquiry...</span>
                          </>
                        ) : isSuccess ? (
                          <>
                            <Check size={16} aria-hidden="true" />
                            <span>Inquiry Sent ✓</span>
                          </>
                        ) : (
                          <>
                            <span>Start a Conversation →</span>
                            <ArrowRight size={16} aria-hidden="true" />
                          </>
                        )}
                      </button>

                      <p className="inquiry-meta-note">
                        I&rsquo;ll review your project and reply within 24 hours.
                      </p>
                    </div>
                  </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
