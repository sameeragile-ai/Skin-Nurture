import React, { createContext, useContext, useState } from 'react';
import { Treatment } from '../data/treatments';

interface BookingContextType {
  isBookingOpen: boolean;
  selectedTreatment: Treatment | null;
  openBooking: (treatment?: Treatment) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);

  const openBooking = (treatment?: Treatment) => {
    setSelectedTreatment(treatment || null);
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setSelectedTreatment(null);
  };

  return (
    <BookingContext.Provider
      value={{
        isBookingOpen,
        selectedTreatment,
        openBooking,
        closeBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
