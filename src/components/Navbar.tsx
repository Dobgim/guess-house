import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { CONTACT_DETAILS } from '../data/mockData';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Suites', path: '/rooms' },
    { name: 'Amenities', path: '/amenities' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Location', path: '/location' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'FAQs', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleBookNow = () => {
    setIsOpen(false);
    navigate('/rooms');
  };

  return (
    <header
      id="main-nav-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass border-b border-gold/15 py-3 shadow-md'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            id="nav-logo"
            to="/"
            className="flex flex-col items-start focus:outline-none"
            onClick={() => setIsOpen(false)}
          >
            <span className="font-serif text-2xl font-semibold tracking-wider text-charcoal">
              M&J <span className="text-gold">LUXURIOUS</span>
            </span>
            <span className="text-[9px] tracking-[0.25em] text-sage font-medium uppercase -mt-1">
              Guest House
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-colors duration-200 hover:text-gold ${
                    isActive ? 'text-gold border-b border-gold/40 pb-1' : 'text-charcoal-light'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              id="cta-whatsapp"
              href={CONTACT_DETAILS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-gold text-gold hover:bg-gold hover:text-cream-light font-medium text-sm rounded transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            <button
              id="cta-book-now"
              onClick={handleBookNow}
              className="inline-flex items-center gap-2 px-5 py-2 bg-gold hover:bg-gold-dark text-cream-light font-medium text-sm rounded shadow-sm hover:shadow transition-all duration-300"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Now</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="text-charcoal hover:text-gold focus:outline-none p-1"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          id="mobile-drawer-backdrop"
          className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-drawer"
        className={`fixed top-0 right-0 bottom-0 w-80 max-w-full bg-cream-light z-50 shadow-2xl p-6 transform transition-transform duration-300 lg:hidden flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-gold/15 pb-4 mb-6">
          <span className="font-serif text-xl font-semibold tracking-wider text-charcoal">
            M&J <span className="text-gold">LUXURIOUS</span>
          </span>
          <button
            id="mobile-drawer-close"
            onClick={() => setIsOpen(false)}
            className="text-charcoal hover:text-gold p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Links */}
        <nav id="mobile-nav" className="flex flex-col space-y-4 mb-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-base font-medium tracking-wide py-1 border-l-2 pl-3 transition-colors ${
                  isActive
                    ? 'border-gold text-gold bg-gold/5'
                    : 'border-transparent text-charcoal-light hover:text-gold'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Drawer CTAs */}
        <div className="mt-auto space-y-3">
          <a
            id="mobile-cta-whatsapp"
            href={CONTACT_DETAILS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="w-full flex items-center justify-center gap-2 py-3 border border-gold text-gold font-medium rounded hover:bg-gold/5 transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>Inquire on WhatsApp</span>
          </a>
          <button
            id="mobile-cta-book-now"
            onClick={handleBookNow}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gold text-cream-light font-medium rounded hover:bg-gold-dark shadow transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Book A Suite Now</span>
          </button>
        </div>
      </div>
    </header>
  );
};
