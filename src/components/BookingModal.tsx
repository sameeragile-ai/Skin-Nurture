import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { X, Calendar, Clock, MapPin, Sparkles, MessageCircle, CheckCircle2, Phone, ShieldCheck } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { TREATMENTS } from '../data/treatments';
import { CLINIC_INFO, formatPKR } from '../utils/constants';

const TIME_SLOTS = [
  '7:00 PM – 7:30 PM',
  '7:30 PM – 8:00 PM',
  '8:00 PM – 8:30 PM',
  '8:30 PM – 9:00 PM',
];

export const BookingModal: React.FC = () => {
  const { isBookingOpen, closeBooking, selectedTreatment } = useBooking();

  const [treatmentId, setTreatmentId] = useState<string>('consultation');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredSlot, setPreferredSlot] = useState(TIME_SLOTS[0]);
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [appointmentRef, setAppointmentRef] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (selectedTreatment) {
      setTreatmentId(selectedTreatment.id);
    } else {
      setTreatmentId('trt-06'); // Default to Dermatologist Diagnostic Consultation
    }
  }, [selectedTreatment]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isBookingOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setIsSuccess(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isBookingOpen]);

  const activeTreatmentObj = TREATMENTS.find((t) => t.id === treatmentId);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!patientName.trim()) errs.name = 'Please provide your full name';
    if (!patientPhone.trim() || patientPhone.length < 10) {
      errs.phone = 'Please provide a valid WhatsApp number (e.g. 0318 3939139)';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    const refCode = `SNC-APT-${Math.floor(1000 + Math.random() * 9000)}`;
    setAppointmentRef(refCode);

    const selectedName = activeTreatmentObj ? activeTreatmentObj.name : 'Dermatologist Diagnostic Consultation';
    const selectedFee = activeTreatmentObj ? formatPKR(activeTreatmentObj.price) : 'Rs. 2,000';

    const text = `*New Clinical Appointment Request - Skin Nurture Clinic*
----------------------------------------
*Patient Name:* ${patientName}
*WhatsApp Contact:* ${patientPhone}
*Procedure / Concern:* ${selectedName}
*Fee / Package:* ${selectedFee}
*Preferred Date:* ${preferredDate || 'Next available slot (Mon-Sat)'}
*Preferred Time:* ${preferredSlot}
${notes ? `*Patient Notes:* ${notes}\n` : ''}
*Ref Code:* ${refCode}
----------------------------------------
_Please confirm my consultation booking with Dr. Hina Faisal at Bone & Joint Hospital Building, Autobhan Road, Hyderabad._`;

    // Confetti
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#0F4C3A', '#C5A059', '#E5C378'],
      });
    } catch {
      // ignore
    }

    // Open WhatsApp
    const waUrl = `https://wa.me/${CLINIC_INFO.whatsappRaw}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');

    setIsSuccess(true);
  };

  if (!isBookingOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeBooking}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative bg-[#FAF7F2] rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#C5A059]/30 shadow-2xl z-10 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={closeBooking}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/80 hover:bg-white text-neutral-600 shadow-xs transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>

          {isSuccess ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 text-[#0F4C3A] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8 text-[#0F4C3A]" />
              </div>

              <div>
                <span className="text-[10px] text-[#C5A059] uppercase font-bold tracking-widest block">
                  Reference: {appointmentRef}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F4C3A] mt-1">
                  Appointment Request Sent!
                </h3>
                <p className="text-xs text-neutral-600 max-w-md mx-auto mt-2 leading-relaxed font-light">
                  Thank you, <strong className="text-neutral-900 font-semibold">{patientName}</strong>. Your appointment request has been transferred directly to our clinic WhatsApp coordinator. We will confirm your timing slot with Dr. Hina Faisal shortly.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-neutral-200 text-left text-xs text-neutral-700 space-y-2 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Service:</span>
                  <span className="font-semibold text-neutral-900">{activeTreatmentObj?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Preferred Slot:</span>
                  <span className="font-semibold text-neutral-900">{preferredSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Location:</span>
                  <span className="text-neutral-900">Autobhan Road, Hyderabad</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2 max-w-md mx-auto">
                <a
                  href={`https://wa.me/${CLINIC_INFO.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-[#0F4C3A] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Open WhatsApp</span>
                </a>
                <button
                  onClick={closeBooking}
                  className="flex-1 py-3 px-4 border border-[#C5A059] text-[#0F4C3A] rounded-xl text-xs font-semibold hover:bg-[#C5A059]/10"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Header */}
              <div className="pr-8 mb-6">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A059] block mb-1">
                  Dr. Hina Faisal · Consultant Dermatologist
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F4C3A]">
                  Book a Consultation
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Mon – Sat: 7:00 PM – 9:00 PM</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Autobhan Road, Hyderabad</span>
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Treatment Selection */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Select Clinical Procedure / Package *
                  </label>
                  <select
                    value={treatmentId}
                    onChange={(e) => setTreatmentId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 bg-white text-xs text-neutral-800 font-medium focus:outline-none focus:border-[#C5A059]"
                  >
                    <optgroup label="Doctor Consultations">
                      <option value="trt-06">Dermatologist Diagnostic Consultation (Rs. 2,000)</option>
                    </optgroup>
                    <optgroup label="Pre-Wedding & Bridal Care Packages">
                      <option value="pkg-01">Complete Bridal Glowing Package (Package 01 - Rs. 55,000)</option>
                      <option value="pkg-02">Whitening Glowing Package (Package 02 - Rs. 43,000)</option>
                      <option value="pkg-03">Acne Scar Correction Package (Package 03 - Rs. 35,000)</option>
                      <option value="pkg-04">Anti-Pigmentation Skin Care Package (Package 04 - Rs. 24,000)</option>
                      <option value="pkg-05">Hair Restoration & Density Package (Package 05 - Rs. 65,000)</option>
                      <option value="pkg-06">Skin Rejuvenation & Lip Plump (Package 06 - Rs. 40,000)</option>
                      <option value="pkg-07">Laser Hair Reduction Body Package (Package 07 - Rs. 28,000)</option>
                      <option value="pkg-08">Face Glowing Package (Package 08 - Rs. 20,000)</option>
                    </optgroup>
                    <optgroup label="Clinical Dermatology & Aesthetic Procedures">
                      <option value="trt-01">Signature HydraFacial MD Elite (Rs. 6,500)</option>
                      <option value="trt-02">Medical Chemical Peel (Rs. 4,500)</option>
                      <option value="trt-03">Platelet-Rich Plasma (PRP) Face Vampire Facial (Rs. 14,000)</option>
                      <option value="trt-04">PRP Hair Loss & Scalp Density Therapy (Rs. 12,000)</option>
                      <option value="trt-05">Laser Hair Reduction - Single Session (Rs. 8,000)</option>
                      <option value="trt-07">Carbon Laser Hollywood Glow Peel (Rs. 7,500)</option>
                      <option value="trt-08">Collagen Induction Microneedling (Rs. 9,000)</option>
                    </optgroup>
                  </select>
                </div>

                {/* Patient Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Patient Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ayesha Khan"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs bg-white focus:outline-none ${
                        errors.name ? 'border-rose-500 bg-rose-50/20' : 'border-neutral-300 focus:border-[#C5A059]'
                      }`}
                    />
                    {errors.name && <p className="text-[10px] text-rose-500 mt-0.5">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      WhatsApp Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0318 3939139"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs bg-white focus:outline-none ${
                        errors.phone ? 'border-rose-500 bg-rose-50/20' : 'border-neutral-300 focus:border-[#C5A059]'
                      }`}
                    />
                    {errors.phone && <p className="text-[10px] text-rose-500 mt-0.5">{errors.phone}</p>}
                  </div>
                </div>

                {/* Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Preferred Day (Mon – Sat)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Tomorrow / Friday"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 bg-white text-xs focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Preferred Time Slot (7–9 PM)
                    </label>
                    <select
                      value={preferredSlot}
                      onChange={(e) => setPreferredSlot(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 bg-white text-xs font-medium focus:outline-none focus:border-[#C5A059]"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Medical Notes */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Chief Skin / Hair Concern (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Describe duration of condition, previous treatments, or wedding timeline..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 bg-white text-xs focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-[#0F4C3A] to-[#165B4C] hover:from-[#0C3B2E] hover:to-[#0F4C3A] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Confirm Appointment on WhatsApp</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Private Consultation · Direct Doctor Schedule Confirmation</span>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
