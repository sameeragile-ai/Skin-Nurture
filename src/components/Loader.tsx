import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoaderProps {
  onComplete?: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let hasSeenLoader = false;
    try {
      hasSeenLoader = sessionStorage.getItem('skin_nurture_loader_seen') === 'true';
    } catch {
      hasSeenLoader = false;
    }

    if (!hasSeenLoader) {
      setVisible(true);
      try {
        sessionStorage.setItem('skin_nurture_loader_seen', 'true');
      } catch {
        // ignore
      }

      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => {
              setVisible(false);
              onComplete?.();
            }, 300);
            return 100;
          }
          return prev + 5;
        });
      }, 70);

      return () => clearInterval(timer);
    } else {
      onComplete?.();
    }
  }, [onComplete]);

  const brandName = 'SKIN NURTURE';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
            opacity: 0,
            transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0C3B2E] text-[#FAF7F2] overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.18)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            {/* Animated Monogram "SN" SVG */}
            <div className="w-24 h-24 mb-6 relative flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#C5A059"
                  strokeWidth="1.5"
                  strokeDasharray="283"
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.4, ease: 'easeInOut' }}
                />
                {/* Letter S */}
                <motion.path
                  d="M38 34 C30 34 26 40 26 44 C26 51 40 52 40 58 C40 64 34 66 28 66"
                  fill="none"
                  stroke="#FAF7F2"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.2, ease: 'easeInOut' }}
                />
                {/* Letter N */}
                <motion.path
                  d="M48 66 L48 34 L68 66 L68 34"
                  fill="none"
                  stroke="#C5A059"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.4, delay: 0.4, ease: 'easeInOut' }}
                />
              </svg>
            </div>

            {/* Letter by letter reveal */}
            <div className="flex items-center justify-center gap-1.5 mb-2 overflow-hidden">
              {brandName.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.05,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className="font-serif text-2xl md:text-3xl font-light tracking-[0.25em] text-[#FAF7F2]"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="text-xs tracking-[0.3em] uppercase text-[#C5A059] font-medium mb-8"
            >
              Dermatology & Aesthetics · Dr. Hina Faisal
            </motion.p>

            {/* Thin Gradient Progress Bar */}
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#C5A059] via-[#E5C378] to-[#C5A059]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
            <span className="text-[10px] text-white/50 tracking-widest mt-2 font-mono">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
