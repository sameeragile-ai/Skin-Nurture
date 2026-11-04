import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { ShoppingBag, Menu, X, Phone, Clock, MapPin, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CLINIC_INFO, createWhatsAppConsultUrl } from '../utils/constants';

interface NavItem {
  name: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Treatments', path: '/treatments' },
  { name: 'Shop', path: '/shop' },
  { name: 'About', path: '/about' },
  { name: 'Results', path: '/results' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { scrollY, scrollYProgress } = useScroll();

  // Handle scroll transforms and hide/show direction
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;

    if (latest > 40) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Hide on rapid scroll down, reveal on scroll up
    if (latest > 180 && diff > 8 && !mobileMenuOpen) {
      setIsHidden(true);
    } else if (diff < -6) {
      setIsHidden(false);
    }
  });

  // Lock body scroll when mobile menu is open
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

  // Close mobile menu on route change
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
                alt="Skin Nurture Clinic Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback to monogram SVG
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

          {/* Desktop Navigation Links with animated sliding underline */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onMouseEnter={() => setHoveredPath(item.path)}
                  onMouseLeave={() => setHoveredPath(null)}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? isTransparentTop
                        ? 'text-white font-semibold'
                        : 'text-[#0F4C3A] font-semibold'
                      : isTransparentTop
                      ? 'text-[#FAF7F2]/80 hover:text-white'
                      : 'text-[#222426]/75 hover:text-[#0F4C3A]'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {/* Sliding Underline Indicator */}
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

          {/* Right Action Zone: Cart + Consultation Pill Button */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Cart Icon with popping count badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label={`Open shopping bag with ${totalItems} items`}
              className={`relative p-2 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] ${
                isTransparentTop
                  ? 'hover:bg-white/10 text-white'
                  : 'hover:bg-[#C5A059]/10 text-[#0F4C3A]'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0.4 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-gradient-to-r from-[#C5A059] to-[#B88E3A] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* Book Consultation Button */}
            <a
              href={createWhatsAppConsultUrl()}
              target="_blank"
              rel="noopener noreferrer"
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
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="hidden sm:inline">Book Consultation</span>
                <span className="sm:hidden">Book</span>
              </span>
            </a>

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
            {/* Top clinic identity */}
            <div className="flex flex-col gap-6">
              <div className="border-b border-[#C5A059]/20 pb-4">
                <span className="font-serif text-2xl text-[#FAF7F2]">Skin Nurture Clinic</span>
                <p className="text-xs text-[#C5A059] tracking-wider uppercase mt-1">
                  Dr. Hina Faisal · Dermatologist
                </p>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-3">
                {NAV_ITEMS.map((item, idx) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * idx }}
                  >
                    <NavLink
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between text-xl font-serif py-2 border-b border-white/5 transition-colors ${
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

            {/* Mobile Footer Contact & CTA */}
            <div className="flex flex-col gap-4 mt-8 pt-6 border-t border-[#C5A059]/20 text-xs text-[#FAF7F2]/75">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Mon – Sat: 7:00 PM – 9:00 PM</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>Main Autobhan Road, Hyderabad</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>{CLINIC_INFO.phoneDisplay}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-2">
                <a
                  href={createWhatsAppConsultUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-gradient-to-r from-[#C5A059] to-[#B88E3A] text-[#0C3B2E] font-semibold text-center rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>WhatsApp Booking</span>
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="py-3 px-4 bg-white/10 hover:bg-white/15 text-white font-medium text-center rounded-xl text-xs flex items-center justify-center gap-1.5 border border-[#C5A059]/30"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Bag ({totalItems})</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
