import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Lightbox } from '../components/Lightbox';
import { ZoomIn } from 'lucide-react';

const GALLERY_ITEMS = [
  { id: '1', label: 'VIP Apartment — Living Area', category: 'Apartments', gradient: 'from-stone-700 to-stone-900' },
  { id: '2', label: 'Apartment Balcony City View', category: 'Views', gradient: 'from-slate-700 to-slate-900' },
  { id: '3', label: '1st Floor Apartment — Sleeping Area', category: 'Apartments', gradient: 'from-emerald-800 to-emerald-950' },
  { id: '4', label: 'Secure On-Site Parking & Entrance', category: 'Common Areas', gradient: 'from-green-800 to-green-950' },
  { id: '5', label: '2nd Floor Apartment Kitchenette', category: 'Apartments', gradient: 'from-amber-800 to-amber-950' },
  { id: '6', label: 'Classic Queen Bed Setup', category: 'Apartments', gradient: 'from-yellow-700 to-yellow-900' },
  { id: '7', label: 'City Skyline View from 3rd Floor', category: 'Views', gradient: 'from-purple-800 to-purple-950' },
  { id: '8', label: 'Reception Desk & Main Lobby', category: 'Common Areas', gradient: 'from-rose-700 to-rose-900' },
  { id: '9', label: 'Sunset View Double Bed Apartment', category: 'Apartments', gradient: 'from-orange-700 to-orange-900' },
  { id: '10', label: 'Building Exterior & Facade', category: 'Common Areas', gradient: 'from-teal-800 to-teal-950' },
  { id: '11', label: 'Main Lobby Seating Area', category: 'Common Areas', gradient: 'from-lime-700 to-lime-900' },
  { id: '12', label: 'Royal Apartment Seating Area', category: 'Apartments', gradient: 'from-indigo-700 to-indigo-900' },
];

const CATEGORIES = ['All', 'Apartments', 'Views', 'Common Areas'];

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const filtered = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((g) => g.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <Layout>
      <section id="gallery-header" className="bg-charcoal pt-10 pb-16 text-center">
        <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Visual Tour</p>
        <h1 className="font-serif text-5xl font-semibold text-cream-light mb-4">Photo Gallery</h1>
        <p className="text-cream-dark/65 max-w-xl mx-auto leading-relaxed">
          Step inside M&J Luxurious Apartment through our gallery. Explore our apartments and breathtaking city views.
        </p>
      </section>

      <section id="gallery-section" className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          <div id="gallery-filters" className="flex flex-wrap gap-2 justify-center mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                id={`gallery-filter-${cat}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${activeCategory === cat ? 'bg-gold border-gold text-cream-light' : 'border-gold/20 text-charcoal-light hover:border-gold/50'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((item, index) => (
              <div
                key={item.id}
                id={`gallery-item-${item.id}`}
                className="group relative h-56 rounded-2xl overflow-hidden cursor-pointer border border-gold/10 hover:border-gold/30 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                onClick={() => openLightbox(index)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-transform duration-500 group-hover:scale-105`} />
                {/* Overlay */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center text-cream-light gap-2">
                    <ZoomIn className="w-8 h-8" />
                    <span className="text-xs font-medium">View</span>
                  </div>
                </div>
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-3">
                  <p className="text-cream-light text-xs font-medium line-clamp-1">{item.label}</p>
                  <p className="text-gold/70 text-[10px]">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        images={filtered.map((g) => g.id)}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setLightboxIndex((i) => (i - 1 + filtered.length) % filtered.length)}
        onNext={() => setLightboxIndex((i) => (i + 1) % filtered.length)}
        captions={filtered.map((g) => g.label)}
      />
    </Layout>
  );
};
