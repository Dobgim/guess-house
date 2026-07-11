import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, BedDouble, ArrowRight } from 'lucide-react';
import type { Room } from '../data/mockData';
import { useBooking } from '../context/BookingContext';

interface RoomCardProps {
  room: Room;
  onQuickView?: (room: Room) => void;
}

const FALLBACK_GRADIENTS: Record<string, string> = {
  '1': 'from-stone-700 to-stone-900',
  '2': 'from-emerald-800 to-emerald-950',
  '3': 'from-slate-700 to-slate-900',
  '4': 'from-amber-800 to-amber-950',
  '5': 'from-orange-700 to-orange-900',
  '6': 'from-purple-800 to-purple-950',
};

export const RoomCard: React.FC<RoomCardProps> = ({ room, onQuickView }) => {
  const { selectRoom } = useBooking();
  const gradient = FALLBACK_GRADIENTS[room.id] || 'from-stone-700 to-stone-900';

  const handleBook = () => {
    selectRoom(room.id);
  };

  return (
    <div
      id={`room-card-${room.id}`}
      className="group bg-cream-light rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gold/10 hover:border-gold/30 transition-all duration-400 hover:-translate-y-1 flex flex-col"
    >
      {/* Room Image */}
      <div className="relative overflow-hidden h-52">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
          <div className="text-center p-4">
            <p className="font-serif text-cream-light/80 text-lg italic">{room.view}</p>
          </div>
        </div>
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-charcoal/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          {onQuickView && (
            <button
              id={`quick-view-${room.id}`}
              onClick={() => onQuickView(room)}
              className="bg-cream-light text-charcoal px-4 py-2 rounded-full text-sm font-medium hover:bg-gold hover:text-cream-light transition-all shadow"
            >
              Quick View
            </button>
          )}
        </div>
        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-charcoal/80 backdrop-blur-sm text-cream-light px-3 py-1.5 rounded-full text-xs font-semibold border border-gold/25">
          From {room.price.toLocaleString()} XAF<span className="text-gold/70">/night</span>
        </div>
        {/* Featured Badge */}
        {room.featured && (
          <div className="absolute top-3 left-3 bg-gold text-cream-light px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            ★ Featured
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < Math.floor(room.rating) ? 'fill-gold text-gold' : 'fill-gold/20 text-gold/20'}`}
            />
          ))}
          <span className="text-xs text-charcoal-light ml-1">{room.rating} ({room.reviewsCount} reviews)</span>
        </div>

        <h3 className="font-serif text-lg font-semibold text-charcoal mb-1 group-hover:text-gold transition-colors">
          {room.name}
        </h3>
        <p className="text-sm text-charcoal-light leading-relaxed mb-3 flex-grow line-clamp-2">
          {room.description}
        </p>

        {/* Room Details */}
        <div className="flex items-center gap-4 text-xs text-sage font-medium border-t border-gold/10 pt-3 mb-4">
          <span className="flex items-center gap-1">
            <BedDouble className="w-3.5 h-3.5" />
            {room.bedType}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            Up to {room.capacity} guests
          </span>
          <span>{room.size} m²</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            id={`book-room-${room.id}`}
            to="/booking"
            onClick={handleBook}
            className="flex-1 text-center bg-gold hover:bg-gold-dark text-cream-light text-sm font-semibold py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
          >
            Book Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
