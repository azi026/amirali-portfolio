/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Navbar, ProjectInquiryModal } from './components';
import { Hero, About, Works, Process, Feedbacks, Pricing, Contact, Footer } from './sections';
import type { WebsiteType } from './components/ProjectInquiryModal';

export default function App() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<WebsiteType>('Landing Page');

  const handleOpenInquiry = (serviceType?: string) => {
    if (
      serviceType === 'Landing Page' ||
      serviceType === 'Business Website' ||
      serviceType === 'Premium Experience'
    ) {
      setSelectedPackage(serviceType);
    }
    setIsInquiryOpen(true);
  };

  useEffect(() => {
    // Intercept clicks on the "Start a project" primary CTA or custom triggers
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('#contact-primary-btn, [data-open-inquiry="true"]');
      if (target) {
        e.preventDefault();
        const serviceAttr = target.getAttribute('data-service') as WebsiteType | null;
        if (serviceAttr) {
          setSelectedPackage(serviceAttr);
        }
        setIsInquiryOpen(true);
      }
    };

    const handleHash = () => {
      if (window.location.hash === '#inquiry') {
        setIsInquiryOpen(true);
      }
    };

    const handleCustomOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ serviceType?: WebsiteType }>;
      if (customEvent.detail?.serviceType) {
        setSelectedPackage(customEvent.detail.serviceType);
      }
      setIsInquiryOpen(true);
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('open-inquiry', handleCustomOpen);

    handleHash();

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('open-inquiry', handleCustomOpen);
    };
  }, []);

  return (
    <div className="app-layout">
      <Navbar onOpenInquiry={() => handleOpenInquiry()} />
      <main>
        <Hero />
        <About />
        <Works />
        <Process />
        <Feedbacks />
        <Pricing onOpenInquiry={handleOpenInquiry} />
        <Contact onOpenInquiry={() => handleOpenInquiry()} />
      </main>
      <Footer />
      <ProjectInquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        initialWebsiteType={selectedPackage}
      />
    </div>
  );
}

