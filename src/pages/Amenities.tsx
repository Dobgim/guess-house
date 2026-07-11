import React from 'react';
import { Wifi, Zap, Wind, Coffee, ShieldCheck, Car, Utensils, Droplets, Tv, Lock, Trees, Clock } from 'lucide-react';
import { Layout } from '../components/Layout';

const AMENITIES = [
  { icon: <Wifi className="w-8 h-8" />, name: '100 Mbps Fibre Wi-Fi', desc: 'Blazing-fast internet coverage throughout the entire property.' },
  { icon: <Zap className="w-8 h-8" />, name: 'Constant Power', desc: 'Auto-switch diesel generator ensures zero power interruptions.' },
  { icon: <Droplets className="w-8 h-8" />, name: 'Borehole Water', desc: 'Private filtered borehole water — clean, safe, and always available.' },
  { icon: <Coffee className="w-8 h-8" />, name: 'Daily Breakfast', desc: 'Complimentary continental or local Cameroonian breakfast daily.' },
  { icon: <ShieldCheck className="w-8 h-8" />, name: '24/7 Security', desc: 'Trained security guards plus CCTV monitoring of all entry points.' },
  { icon: <Car className="w-8 h-8" />, name: 'Private Parking', desc: 'Secured private parking space available for all guests on-site.' },
  { icon: <Wind className="w-8 h-8" />, name: 'Air Conditioning', desc: 'Individual climate control units in every room and suite.' },
  { icon: <Tv className="w-8 h-8" />, name: 'Smart TV / DSTV', desc: 'Large Smart TV with DSTV Premium in each room for premium viewing.' },
  { icon: <Utensils className="w-8 h-8" />, name: 'Room Service', desc: 'In-room dining available from 7 AM to 10 PM. Breakfast served in lounge.' },
  { icon: <Lock className="w-8 h-8" />, name: 'Electronic Room Lock', desc: 'Contactless key card access to each suite for enhanced security.' },
  { icon: <Trees className="w-8 h-8" />, name: 'Garden Lounge', desc: 'Manicured tropical garden with seating areas and city/river views.' },
  { icon: <Clock className="w-8 h-8" />, name: '24/7 Front Desk', desc: 'Our concierge team is available around the clock for all requests.' },
];

export const Amenities: React.FC = () => (
  <Layout>
    <section id="amenities-header" className="bg-charcoal pt-10 pb-16 text-center">
      <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">What's Included</p>
      <h1 className="font-serif text-5xl font-semibold text-cream-light mb-4">Premium Amenities</h1>
      <p className="text-cream-dark/65 max-w-xl mx-auto leading-relaxed">
        Every amenity has been selected to ensure your stay in Douala is as comfortable, safe, and enjoyable as possible.
      </p>
    </section>

    <section id="amenities-grid" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AMENITIES.map((a) => (
            <div
              key={a.name}
              className="group bg-cream-light rounded-2xl p-6 border border-gold/10 hover:border-gold/35 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex gap-5 items-start"
            >
              <div className="text-gold shrink-0 p-3 bg-gold/10 rounded-xl group-hover:bg-gold/15 transition-colors">
                {a.icon}
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-charcoal mb-1">{a.name}</h3>
                <p className="text-charcoal-light text-sm leading-relaxed">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Note Banner */}
        <div className="mt-12 bg-charcoal rounded-2xl p-6 text-center border border-gold/20">
          <p className="text-gold font-serif text-lg font-semibold mb-2">All Amenities Included in Your Stay</p>
          <p className="text-cream-dark/70 text-sm">
            No hidden charges. Every amenity listed above is complimentary for all guests during their stay at M&J Luxurious Guest House.
          </p>
        </div>
      </div>
    </section>
  </Layout>
);
