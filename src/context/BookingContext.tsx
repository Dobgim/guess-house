import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Room } from '../data/mockData';
import { ROOMS } from '../data/mockData';

export type BookingDetails = {
  fullName: string;
  email: string;
  phone: string;
  paymentMethod: 'MTN_MOMO' | 'ORANGE_MONEY' | 'CARD';
  paymentPhone: string;
};

export type Booking = {
  id: string;
  room: Room;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  guestDetails: BookingDetails;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED';
  createdAt: string;
  qrCodeValue: string;
};

interface BookingContextType {
  checkIn: string;
  checkOut: string;
  guests: number;
  selectedRoom: Room | null;
  billingDetails: BookingDetails;
  bookings: Booking[];
  currentBooking: Booking | null;
  setSearchParams: (checkIn: string, checkOut: string, guests: number) => void;
  selectRoom: (roomId: string | null) => void;
  updateBillingDetails: (details: Partial<BookingDetails>) => void;
  createBooking: () => Promise<Booking>;
  clearCart: () => void;
  getBookingById: (id: string) => Booking | undefined;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const initialBilling: BookingDetails = {
  fullName: '',
  email: '',
  phone: '',
  paymentMethod: 'MTN_MOMO',
  paymentPhone: '',
};

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default search params: check-in tomorrow, check-out day after tomorrow
  const getTomorrowStr = (addDays = 1) => {
    const d = new Date();
    d.setDate(d.getDate() + addDays);
    return d.toISOString().split('T')[0];
  };

  const [checkIn, setCheckIn] = useState<string>(getTomorrowStr(1));
  const [checkOut, setCheckOut] = useState<string>(getTomorrowStr(2));
  const [guests, setGuests] = useState<number>(1);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [billingDetails, setBillingDetails] = useState<BookingDetails>(initialBilling);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);

  // Load bookings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mjguesthouse_bookings');
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved bookings', e);
      }
    }
  }, []);

  const setSearchParams = (inDate: string, outDate: string, guestCount: number) => {
    setCheckIn(inDate);
    setCheckOut(outDate);
    setGuests(guestCount);
  };

  const selectRoom = (roomId: string | null) => {
    if (roomId === null) {
      setSelectedRoom(null);
    } else {
      const room = ROOMS.find((r) => r.id === roomId);
      if (room) {
        setSelectedRoom(room);
      }
    }
  };

  const updateBillingDetails = (details: Partial<BookingDetails>) => {
    setBillingDetails((prev) => ({ ...prev, ...details }));
  };

  const clearCart = () => {
    setSelectedRoom(null);
    setBillingDetails(initialBilling);
    setCurrentBooking(null);
  };

  const calculateNights = (inStr: string, outStr: string) => {
    const d1 = new Date(inStr);
    const d2 = new Date(outStr);
    const diff = d2.getTime() - d1.getTime();
    const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
  };

  const createBooking = async (): Promise<Booking> => {
    if (!selectedRoom) throw new Error('No room selected');

    const nights = calculateNights(checkIn, checkOut);
    const totalPrice = selectedRoom.price * nights;
    const bookingId = 'MJ-' + Math.floor(100000 + Math.random() * 900000);

    const newBooking: Booking = {
      id: bookingId,
      room: selectedRoom,
      checkIn,
      checkOut,
      guests,
      totalPrice,
      guestDetails: billingDetails,
      status: 'CONFIRMED', // Simulated immediate confirmation for user demonstration
      createdAt: new Date().toISOString(),
      qrCodeValue: `MJ-VERIFY-${bookingId}-${selectedRoom.id}-${checkIn}`,
    };

    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    localStorage.setItem('mjguesthouse_bookings', JSON.stringify(updatedBookings));
    setCurrentBooking(newBooking);

    return newBooking;
  };

  const getBookingById = (id: string) => {
    return bookings.find((b) => b.id === id);
  };

  return (
    <BookingContext.Provider
      value={{
        checkIn,
        checkOut,
        guests,
        selectedRoom,
        billingDetails,
        bookings,
        currentBooking,
        setSearchParams,
        selectRoom,
        updateBillingDetails,
        createBooking,
        clearCart,
        getBookingById,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
