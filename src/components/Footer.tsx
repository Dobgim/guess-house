import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Award } from 'lucide-react';
import { CONTACT_DETAILS } from '../data/mockData';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer id="main-footer" className="bg-charcoal text-cream-dark border-t border-gold/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex flex-col focus:outline-none">
              <span className="font-serif text-2xl font-semibold tracking-wider text-cream-light">
                M&J <span className="text-gold">LUXURIOUS</span>
              </span>
              <span className="text-[9px] tracking-[0.25em] text-sage font-medium uppercase -mt-1">
                Apartment
              </span>
            </Link>
            <p className="text-sm text-cream-dark/70 leading-relaxed pt-2">
              Located in the prestigious neighborhood of Bonamussadi, Douala, M&J Luxurious Apartment combines modern luxury with premium hospitality. Your sanctuary in Douala.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a href="#" className="text-cream-dark hover:text-gold transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-cream-dark hover:text-gold transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <div className="flex items-center gap-1.5 text-xs text-gold font-medium bg-gold/10 px-2.5 py-1 rounded border border-gold/20">
                <Award className="w-3.5 h-3.5" />
                <span>Premium Quality Approved</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-serif text-lg font-medium text-cream-light mb-4 pb-1 border-b border-gold/25 w-max">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/rooms" className="hover:text-gold transition-colors">Our Luxury Apartments</Link>
              </li>
              <li>
                <Link to="/amenities" className="hover:text-gold transition-colors">Premium Amenities</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-gold transition-colors">Photo Gallery</Link>
              </li>
              <li>
                <Link to="/location" className="hover:text-gold transition-colors">Location & Directions</Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-gold transition-colors">Guest Testimonials</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-gold transition-colors">Frequently Asked Questions</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <h3 className="font-serif text-lg font-medium text-cream-light mb-4 pb-1 border-b border-gold/25 w-max">
              Contact Details
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span className="text-cream-dark/85 leading-relaxed">{CONTACT_DETAILS.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4.5 h-4.5 text-gold shrink-0" />
                <a href={`tel:${CONTACT_DETAILS.phone.replace(/\s+/g, '')}`} className="hover:text-gold transition-colors">
                  {CONTACT_DETAILS.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4.5 h-4.5 text-gold shrink-0" />
                <a href={`mailto:${CONTACT_DETAILS.email}`} className="hover:text-gold transition-colors">
                  {CONTACT_DETAILS.email}
                </a>
              </li>
              <li className="text-xs text-sage font-medium pt-1">
                {CONTACT_DETAILS.workingHours}
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="font-serif text-lg font-medium text-cream-light mb-4 pb-1 border-b border-gold/25 w-max">
              Newsletter
            </h3>
            <p className="text-sm text-cream-dark/70 mb-4 leading-relaxed">
              Subscribe to receive exclusive offers, local tour guides, and booking discounts.
            </p>
            {subscribed ? (
              <div className="bg-sage/10 border border-sage/35 text-sage-light p-3 rounded text-sm text-center">
                Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-charcoal-light border border-gold/20 text-cream-light placeholder-cream-dark/40 px-3 py-2 text-sm rounded focus:outline-none focus:border-gold transition-colors"
                />
                <button
                  type="submit"
                  className="bg-gold hover:bg-gold-dark text-cream-light font-medium py-2 text-sm rounded transition-all shadow-sm"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-gold/15 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-cream-dark/50">
          <p>&copy; 2024 M&J Luxurious Apartment. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
