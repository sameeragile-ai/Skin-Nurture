import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { BookingProvider } from './context/BookingContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Loader } from './components/Loader';
import { ScrollToTop } from './components/ScrollToTop';

// Pages
import { Home } from './pages/Home';
import { Treatments } from './pages/Treatments';
import { Packages } from './pages/Packages';
import { BookAppointment } from './pages/BookAppointment';
import { About } from './pages/About';
import { Results } from './pages/Results';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex flex-col min-h-screen"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/treatments" element={<Treatments />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/book" element={<BookAppointment />} />
          <Route path="/about" element={<About />} />
          <Route path="/results" element={<Results />} />
          <Route path="/contact" element={<Contact />} />
          {/* Graceful redirects for any legacy links */}
          <Route path="/shop" element={<Navigate to="/treatments" replace />} />
          <Route path="/shop/:id" element={<Navigate to="/treatments" replace />} />
          <Route path="/checkout" element={<Navigate to="/book" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <BookingProvider>
      <Router>
        <ScrollToTop />
        <Loader />
        <div className="flex flex-col min-h-screen bg-[#FAF7F2] text-[#222426] selection:bg-[#C5A059]/20 selection:text-[#0F4C3A]">
          <Navbar />
          <main className="flex-1">
            <AnimatedRoutes />
          </main>
          <Footer />
          <BookingModal />
          <FloatingWhatsApp />
        </div>
      </Router>
    </BookingProvider>
  );
}
