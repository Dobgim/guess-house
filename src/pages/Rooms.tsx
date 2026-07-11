import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, BedDouble, ArrowRight, SlidersHorizontal, X } from 'lucide-react';
import { Layout } from '../components/Layout';
import { RoomCard } from '../components/RoomCard';
import { BookingWidget } from '../components/BookingWidget';
import type { Room } from '../data/mockData';
import { ROOMS } from '../data/mockData';
import { useBooking } from '../context/BookingContext';

const ROOM_TYPES = ['All', 'VIP', '1st Floor', '2nd Floor', '3rd Floor'];

export const Rooms: React.FC = () => {
  const [filter, setFilter] = useState({ type: 'All', maxPrice: 100000, minGuests: 1 });
  const [quickView, setQuickView] = useState<Room | null>(null);
  const { selectRoom } = useBooking();

  const filtered = ROOMS.filter((r) => {
    const typeMatch = filter.type === 'All' ||
      r.name.toLowerCase().includes(filter.type.toLowerCase());
    const priceMatch = r.price <= filter.maxPrice;
    const guestMatch = r.capacity >= filter.minGuests;
    return typeMatch && priceMatch && guestMatch;
  });

  return (
    <Layout>
      {/* Header */}
      <section id="rooms-header" className="bg-charcoal pt-10 pb-16 text-center">
        <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Accommodations</p>
        <h1 className="font-serif text-5xl font-semibold text-cream-light mb-4">
          Our Apartments
        </h1>
        <p className="text-cream-dark/70 max-w-xl mx-auto leading-relaxed mb-10">
          Choose from seven beautifully appointed apartments, each floor offering left and right units plus a VIP apartment.
        </p>
        <div className="max-w-4xl mx-auto px-4">
          <BookingWidget />
        </div>
      </section>

      <section id="rooms-list" className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div id="room-filters" className="flex flex-wrap items-center gap-4 mb-10 p-4 bg-cream-light rounded-2xl border border-gold/10 shadow-sm">
            <div className="flex items-center gap-2 text-sage font-medium text-sm">
              <SlidersHorizontal className="w-4 h-4" />
              Filter:
            </div>
            {/* Type Filter */}
            <div className="flex gap-2 flex-wrap">
              {ROOM_TYPES.map((t) => (
                <button
                  key={t}
                  id={`filter-type-${t}`}
                  onClick={() => setFilter((f) => ({ ...f, type: t }))}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${filter.type === t ? 'bg-gold border-gold text-cream-light' : 'border-gold/20 text-charcoal-light hover:border-gold/50'}`}
                >
                  {t}
                </button>
              ))}
            </div>
            {/* Guest Filter */}
            <div className="flex items-center gap-2 ml-auto">
              <Users className="w-4 h-4 text-sage" />
              <label className="text-xs text-charcoal-light font-medium">Min Guests:</label>
              <select
                id="filter-guests"
                value={filter.minGuests}
                onChange={(e) => setFilter((f) => ({ ...f, minGuests: Number(e.target.value) }))}
                className="border border-gold/20 text-charcoal text-sm px-2 py-1 rounded-lg focus:outline-none focus:border-gold bg-transparent"
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>{n}+</option>
                ))}
              </select>
            </div>
            {/* Price Filter */}
            <div className="flex items-center gap-3">
              <label className="text-xs text-charcoal-light font-medium whitespace-nowrap">Max: {filter.maxPrice.toLocaleString()} XAF</label>
              <input
                id="filter-price"
                type="range"
                min={30000}
                max={100000}
                step={5000}
                value={filter.maxPrice}
                onChange={(e) => setFilter((f) => ({ ...f, maxPrice: Number(e.target.value) }))}
                className="w-28 accent-gold"
              />
            </div>
          </div>

          {/* Results Count */}
          <p className="text-charcoal-light text-sm mb-6">
            Showing <strong className="text-charcoal">{filtered.length}</strong> {filtered.length === 1 ? 'apartment' : 'apartments'} available
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-charcoal-light">
              <p className="font-serif text-2xl mb-3">No apartments match your filters</p>
              <button onClick={() => setFilter({ type: 'All', maxPrice: 100000, minGuests: 1 })} className="text-gold underline">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((room) => (
                <RoomCard key={room.id} room={room} onQuickView={setQuickView} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick View Modal */}
      {quickView && (
        <div id="quick-view-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/70 backdrop-blur-sm p-4">
          <div className="bg-cream-light rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gold/20">
            {/* Image area */}
            <div className="relative h-56 bg-gradient-to-br from-stone-700 to-stone-900 rounded-t-2xl flex items-center justify-center">
              <p className="font-serif text-cream-light/70 text-xl italic">{quickView.view}</p>
              <button
                id="quick-view-close"
                onClick={() => setQuickView(null)}
                className="absolute top-4 right-4 bg-charcoal/60 text-cream-light hover:text-gold p-1.5 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(quickView.rating) ? 'fill-gold text-gold' : 'fill-gold/15 text-gold/15'}`} />
                ))}
                <span className="text-xs text-charcoal-light ml-1">{quickView.rating} ({quickView.reviewsCount} reviews)</span>
              </div>
              <h2 className="font-serif text-2xl font-semibold mb-2">{quickView.name}</h2>
              <p className="text-charcoal-light leading-relaxed mb-4 text-sm">{quickView.detailedDescription}</p>

              <div className="grid grid-cols-2 gap-3 text-sm mb-5">
                <div className="bg-cream p-3 rounded-xl flex items-center gap-2 text-sage font-medium">
                  <BedDouble className="w-4 h-4" /> {quickView.bedType}
                </div>
                <div className="bg-cream p-3 rounded-xl flex items-center gap-2 text-sage font-medium">
                  <Users className="w-4 h-4" /> Up to {quickView.capacity} guests
                </div>
              </div>

              <div className="mb-5">
                <p className="text-xs text-charcoal-light font-semibold uppercase tracking-widest mb-2">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {quickView.amenities.map((a) => (
                    <span key={a} className="bg-sage/10 text-sage-dark border border-sage/20 px-2.5 py-1 rounded-full text-xs font-medium">{a}</span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gold/10 pt-4">
                <div>
                  <p className="text-xs text-charcoal-light">From</p>
                  <p className="font-serif text-2xl font-bold text-charcoal">
                    {quickView.price.toLocaleString()} <span className="text-base font-normal text-charcoal-light">XAF/night</span>
                  </p>
                </div>
                <Link
                  id={`quick-view-book-${quickView.id}`}
                  to="/booking"
                  onClick={() => { selectRoom(quickView.id); setQuickView(null); }}
                  className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-cream-light px-6 py-3 rounded-xl font-semibold text-sm shadow transition-all"
                >
                  Book This Apartment <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};
