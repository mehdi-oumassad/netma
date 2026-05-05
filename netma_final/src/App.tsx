/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { HeroSection } from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import PortfolioSection from './components/PortfolioSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleLanguageChange = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 600);
  }, []);

  return (
    <div className="min-h-screen w-full font-sans antialiased selection:bg-white selection:text-black">
      {/* Language-change micro-animation overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="lang-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none fixed inset-0 z-[9999] bg-[#050505]/60 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <HeroSection onLanguageChange={handleLanguageChange} />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
