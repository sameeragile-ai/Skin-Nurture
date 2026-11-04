import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { Menu, X, Phone, Clock, MapPin, Sparkles, Calendar } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { CLINIC_INFO, createWhatsAppConsultUrl } from '../utils/constants';

interface NavItem {
  name: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Treatments & Services', path: '/treatments' },
  { name: 'Pre-Wedding Packages', path: '/packages' },
  { name: 'Meet Dr. Hina', path: '/about' },
  { name: 'Patient Results', path: '/results' },
  { name: 'Contact & Clinic', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const { openBooking } = useBooking();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const location = useLocation();
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;

    if (latest > 40) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    if (latest > 180 && diff > 8 && !mobileMenuOpen) {
      setIsHidden(true);
    } else if (diff < -6) {
      setIsHidden(false);
    }
  });

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';
  const isTransparentTop = isHome && !isScrolled;

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: '-100%' },
        }}
        animate={isHidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-panel shadow-sm py-3 border-b border-[#C5A059]/20'
            : isHome
            ? 'bg-transparent py-5 text-[#FAF7F2]'
            : 'bg-[#FAF7F2]/90 backdrop-blur-md py-4 border-b border-[#C5A059]/15'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo Lockup */}
          <NavLink
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-lg"
          >
            <div className="w-10 h-10 rounded-full border border-[#C5A059]/50 overflow-hidden bg-white/90 p-0.5 flex items-center justify-center shrink-0 shadow-sm group-hover:border-[#C5A059] transition-colors">
              <img
                src="/brand/logo-gold.png"
                alt="Skin Nurture Clinic"
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.innerHTML = `<span class="font-serif font-bold text-xs text-[#0F4C3A]">SN</span>`;
                  }
                }}
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-serif text-lg sm:text-xl font-semibold tracking-wide transition-colors ${
                  isTransparentTop ? 'text-[#FAF7F2]' : 'text-[#0F4C3A]'
                }`}
              >
                Skin Nurture
              </span>
              <span
                className={`text-[9px] tracking-[0.2em] uppercase font-sans font-medium transition-colors -mt-0.5 ${
                  isTransparentTop ? 'text-[#FAF7F2]/80' : 'text-[#C5A059]'
                }`}
              >
                Dermatology Clinic
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onMouseEnter={() => setHoveredPath(item.path)}
                  onMouseLeave={() => setHoveredPath(null)}
                  className={`relative px-3.5 py-2 text-xs xl:text-sm font-medium transition-colors ${
                    isActive
                      ? isTransparentTop
                        ? 'text-white font-semibold'
                        : 'text-[#0F4C3A] font-semibold'
                      : isTransparentTop
                      ? 'text-[#FAF7F2]/80 hover:text-white'
                      : 'text-[#222426]/75 hover:text-[#0F4C3A]'
                  }`}
                >
                  <span className="relative z-10 whitespace-nowrap">{item.name}</span>
                  {hoveredPath === item.path && (
                    <motion.div
                      layoutId="navbar-hover"
                      className="absolute inset-x-2 bottom-0.5 h-[2px] bg-gradient-to-r from-[#C5A059] to-[#E5C378] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {isActive && !hoveredPath && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-x-2 bottom-0.5 h-[2px] bg-[#C5A059] rounded-full"
                    />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Zone: Quick Call & Book Consultation Button */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <a
              href={`tel:${CLINIC_INFO.phoneInternational}`}
              className={`hidden sm:flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                isTransparentTop ? 'text-white/80 hover:text-white' : 'text-neutral-600 hover:text-[#0F4C3A]'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="font-mono">{CLINIC_INFO.phoneDisplay}</span>
            </a>

            {/* Book Consultation Primary Button */}
            <button
              onClick={() => openBooking()}
              className="relative inline-flex items-center justify-center overflow-hidden rounded-full p-[1px] group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#C5A059] via-[#E5C378] to-[#C5A059] transition-all duration-300 group-hover:opacity-90" />
              <span
                className={`relative px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold tracking-wide rounded-full transition-colors flex items-center gap-2 ${
                  isTransparentTop
                    ? 'bg-[#0F4C3A] text-white group-hover:bg-[#0C3B2E]'
                    : 'bg-[#FAF7F2] text-[#0F4C3A] group-hover:bg-white'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="hidden sm:inline">Book Consultation</span>
                <span className="sm:hidden">Book</span>
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className={`lg:hidden p-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] ${
                isTransparentTop ? 'text-white hover:bg-white/10' : 'text-[#0F4C3A] hover:bg-[#C5A059]/10'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Scroll Progress Line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C5A059] via-[#0F4C3A] to-[#C5A059] origin-left"
          style={{ scaleX: scrollYProgress }}
        />
      </motion.header>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 lg:hidden bg-[#0C3B2E] text-[#FAF7F2] flex flex-col justify-between pt-24 pb-8 px-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              <div className="border-b border-[#C5A059]/20 pb-4">
                <span className="font-serif text-2xl text-[#FAF7F2]">Skin Nurture Clinic</span>
                <p className="text-xs text-[#C5A059] tracking-wider uppercase mt-1">
                  Dr. Hina Faisal · Consultant Dermatologist
                </p>
              </div>

              <nav className="flex flex-col gap-3">
                {NAV_ITEMS.map((item, idx) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * idx }}
                  >
                    <NavLink
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between text-lg font-serif py-2.5 border-b border-white/5 transition-colors ${
                          isActive ? 'text-[#C5A059] font-medium' : 'text-[#FAF7F2]/80 hover:text-white'
                        }`
                      }
                    >
                      <span>{item.name}</span>
                      <span className="text-xs text-[#C5A059]/70 tracking-widest font-mono">0{idx + 1}</span>
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4 mt-8 pt-6 border-t border-[#C5A059]/20 text-xs text-[#FAF7F2]/75">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Mon – Sat: 7:00 PM – 9:00 PM</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>Main Autobhan Road, Hyderabad</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openBooking();
                  }}
                  className="py-3 px-4 bg-gradient-to-r from-[#C5A059] to-[#B88E3A] text-[#0C3B2E] font-bold text-center rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Visit</span>
                </button>
                <a
                  href={createWhatsAppConsultUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-white/10 hover:bg-white/15 text-white font-medium text-center rounded-xl text-xs flex items-center justify-center gap-1.5 border border-[#C5A059]/30"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
