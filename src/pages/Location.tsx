import React from 'react';
import { MapPin, Clock, Car, Phone, ExternalLink } from 'lucide-react';
import { Layout } from '../components/Layout';
import { CONTACTS, ATTRACTIONS } from '../data/mockData';

const HOW_TO_GET_HERE = [
  { icon: <Car className="w-5 h-5" />, method: 'By Car / Taxi', desc: 'Drive to Bonamussadi, Douala. M&J Luxurious Apartment is located in a quiet residential street, 2 minutes from the Bonamussadi Rond-Point.' },
  { icon: <Clock className="w-5 h-5" />, method: 'From Douala Airport', desc: 'Approximately 20 minutes by car. We recommend pre-booking an airport transfer with us for door-to-door convenience.' },
  { icon: <Phone className="w-5 h-5" />, method: 'Need Help?', desc: 'Call us on +237 6XX XXX XXX and we\'ll guide you from any major landmark in Douala or arrange pickup.' },
];

export const Location: React.FC = () => (
  <Layout>
    <section id="location-header" className="bg-charcoal pt-10 pb-16 text-center">
      <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Find Us</p>
      <h1 className="font-serif text-5xl font-semibold text-cream-light mb-4">Location & Directions</h1>
      <p className="text-cream-dark/65 max-w-xl mx-auto leading-relaxed">
        Nestled in the heart of Bonamussadi, Douala, Cameroon, close to the beautiful Wouri River.
      </p>
    </section>

    <section id="location-body" className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Map Placeholder */}
          <div className="space-y-6">
            <div className="h-80 rounded-2xl bg-gradient-to-br from-emerald-900 to-slate-900 border border-gold/15 shadow-xl flex items-center justify-center relative overflow-hidden">
              <div className="text-center">
                <MapPin className="w-10 h-10 text-gold mx-auto mb-2" />
                <p className="font-serif text-cream-light/80 text-lg italic">M&J Luxurious Apartment</p>
                <p className="text-cream-light/50 text-sm">Bonamussadi, Douala</p>
              </div>
              <div className="absolute bottom-4 right-4">
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-cream-light text-charcoal text-xs font-medium px-3 py-1.5 rounded-full shadow hover:shadow-md transition-all">
                  <ExternalLink className="w-3 h-3" /> Open in Google Maps
                </a>
              </div>
            </div>

            {/* Address Box */}
            <div className="bg-cream-light border border-gold/15 rounded-2xl p-5 flex gap-4 items-start shadow-sm">
              <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-charcoal mb-1">M&J Luxurious Apartment</p>
                <p className="text-charcoal-light text-sm leading-relaxed">{CONTACTS.address}</p>
                <p className="text-charcoal-light text-sm">{CONTACTS.city}, {CONTACTS.country}</p>
              </div>
            </div>
          </div>

          {/* Directions & Attractions */}
          <div className="space-y-8">
            {/* How to Get Here */}
            <div>
              <h2 className="font-serif text-2xl font-semibold text-charcoal mb-5">How to Get Here</h2>
              <div className="space-y-4">
                {HOW_TO_GET_HERE.map((item) => (
                  <div key={item.method} className="flex gap-4 bg-cream-light p-5 rounded-2xl border border-gold/10 hover:border-gold/25 transition-all shadow-sm">
                    <div className="text-gold shrink-0 p-2 bg-gold/10 rounded-xl h-fit">{item.icon}</div>
                    <div>
                      <p className="font-semibold text-charcoal text-sm mb-1">{item.method}</p>
                      <p className="text-charcoal-light text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Attractions */}
            <div>
              <h2 className="font-serif text-2xl font-semibold text-charcoal mb-5">Nearby Attractions</h2>
              <div className="space-y-3">
                {ATTRACTIONS.map((att) => (
                  <div key={att.id} className="flex items-start gap-4 bg-cream-light p-4 rounded-xl border border-gold/10 hover:border-gold/25 transition-all shadow-sm">
                    <div className="text-2xl shrink-0">{att.emoji}</div>
                    <div>
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <p className="font-semibold text-charcoal text-sm">{att.name}</p>
                        <span className="text-gold text-xs font-medium">{att.distance}</span>
                      </div>
                      <p className="text-charcoal-light text-xs leading-relaxed mt-0.5">{att.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);
