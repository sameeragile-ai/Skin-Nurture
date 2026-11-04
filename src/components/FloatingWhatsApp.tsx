import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { createWhatsAppConsultUrl } from '../utils/constants';

export const FloatingWhatsApp: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="pointer-events-auto p-3 rounded-full bg-white text-[#0F4C3A] shadow-lg border border-[#C5A059]/30 hover:bg-[#FAF7F2] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <motion.a
        href={createWhatsAppConsultUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Dr. Hina Faisal Clinic on WhatsApp"
        className="pointer-events-auto group relative flex items-center shadow-2xl rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Subtle pulsing outer ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping opacity-40 pointer-events-none" />

        <div className="relative flex items-center gap-2.5 bg-[#0C3B2E] text-white pl-4 pr-5 py-3 rounded-full border border-[#C5A059]/40 shadow-xl">
          <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm">
            <MessageCircle className="w-4 h-4 fill-white" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-[#C5A059] font-medium uppercase tracking-wider leading-none">
              Online
            </span>
            <span className="text-xs font-semibold text-[#FAF7F2] tracking-wide mt-0.5">
              WhatsApp Us
            </span>
          </div>
        </div>
      </motion.a>
    </div>
  );
};
