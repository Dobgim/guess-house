import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

interface BookingWidgetProps {
  vertical?: boolean;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({ vertical = false }) => {
  const { checkIn, checkOut, guests, setSearchParams } = useBooking();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/rooms');
  };

  const today = new Date().toISOString().split('T')[0];

  const containerClass = vertical
    ? 'flex flex-col gap-4'
    : 'flex flex-col md:flex-row gap-3 md:gap-0 md:items-end bg-cream-light/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gold/15 p-3 md:p-2';

  const fieldClass = vertical
    ? 'flex flex-col gap-1.5'
    : 'flex-1 flex flex-col gap-1 px-4 py-2 border-b md:border-b-0 md:border-r border-gold/20 last:border-none';

  return (
    <form onSubmit={handleSearch} id="booking-search-widget">
      <div className={containerClass}>
        {/* Check In */}
        <div className={fieldClass}>
          <label className="flex items-center gap-1.5 text-[10px] font-semibold tracking-widest text-sage uppercase">
            <Calendar className="w-3.5 h-3.5" /> Check In
          </label>
          <input
            id="widget-checkin"
            type="date"
            min={today}
            value={checkIn}
            onChange={(e) => setSearchParams(e.target.value, checkOut, guests)}
            className={`bg-transparent text-charcoal font-medium text-sm focus:outline-none cursor-pointer ${vertical ? 'border border-gold/25 rounded-lg px-3 py-2' : ''}`}
            required
          />
        </div>

        {/* Check Out */}
        <div className={fieldClass}>
          <label className="flex items-center gap-1.5 text-[10px] font-semibold tracking-widest text-sage uppercase">
            <Calendar className="w-3.5 h-3.5" /> Check Out
          </label>
          <input
            id="widget-checkout"
            type="date"
            min={checkIn || today}
            value={checkOut}
            onChange={(e) => setSearchParams(checkIn, e.target.value, guests)}
            className={`bg-transparent text-charcoal font-medium text-sm focus:outline-none cursor-pointer ${vertical ? 'border border-gold/25 rounded-lg px-3 py-2' : ''}`}
            required
          />
        </div>

        {/* Guests */}
        <div className={fieldClass}>
          <label className="flex items-center gap-1.5 text-[10px] font-semibold tracking-widest text-sage uppercase">
            <Users className="w-3.5 h-3.5" /> Guests
          </label>
          <select
            id="widget-guests"
            value={guests}
            onChange={(e) => setSearchParams(checkIn, checkOut, Number(e.target.value))}
            className={`bg-transparent text-charcoal font-medium text-sm focus:outline-none cursor-pointer ${vertical ? 'border border-gold/25 rounded-lg px-3 py-2' : ''}`}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <div className={vertical ? '' : 'px-2 py-1'}>
          <button
            id="widget-search-btn"
            type="submit"
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-cream-light font-semibold text-sm px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <span>Find Rooms</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </form>
  );
};
