import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Wifi, Zap, Wind, Coffee, ChevronDown, ArrowRight } from 'lucide-react';
import { Layout } from '../components/Layout';
import { BookingWidget } from '../components/BookingWidget';
import { RoomCard } from '../components/RoomCard';
import { ROOMS, REVIEWS, FAQS } from '../data/mockData';

const HERO_STATS = [
  { label: 'Happy Guests', value: '500+' },
  { label: 'Luxury Suites', value: '6' },
  { label: 'Years of Excellence', value: '8' },
  { label: 'Average Rating', value: '4.8★' },
];

const AMENITY_ICONS = [
  { icon: <Wifi className="w-7 h-7" />, label: 'High-Speed Wi-Fi', desc: '100 Mbps fibre' },
  { icon: <Zap className="w-7 h-7" />, label: 'Constant Power', desc: 'Auto-switch generator' },
  { icon: <Wind className="w-7 h-7" />, label: 'Air Conditioning', desc: 'Climate controlled' },
  { icon: <ShieldCheck className="w-7 h-7" />, label: '24/7 Security', desc: 'CCTV & guard' },
  { icon: <Coffee className="w-7 h-7" />, label: 'Free Breakfast', desc: 'Daily continental' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55, ease: [0.25, 1, 0.5, 1] as const } }),
};

export const Home: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const featuredRooms = ROOMS.filter((r) => r.featured);
  const previewFaqs = FAQS.slice(0, 4);
  const testimonials = REVIEWS.slice(0, 3);

  return (
    <Layout>
      {/* ──── HERO ──── */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden -mt-20">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-stone-800 to-sage-dark">
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(197,168,128,0.35) 0%, transparent 60%), radial-gradient(circle at 70% 70%, rgba(96,108,93,0.25) 0%, transparent 55%)' }}
          />
          {/* Subtle pattern */}
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, #C5A880 0, #C5A880 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 bg-gold/15 border border-gold/30 text-gold px-4 py-1.5 rounded-full text-sm font-medium"
          >
            <Star className="w-3.5 h-3.5 fill-gold" />
            Douala's Most Treasured Luxury Retreat
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
            className="font-serif text-5xl md:text-7xl font-bold text-cream-light leading-tight mb-4 tracking-tight"
          >
            M&J Luxurious <span className="text-gold italic">Guest House</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
            className="text-cream-dark/80 text-lg md:text-xl max-w-2xl leading-relaxed mb-12 font-light"
          >
            A sanctuary of elegance in Bonamussadi. Experience world-class suites, breathtaking Wouri River views, and personalized hospitality — all in the heart of Douala.
          </motion.p>

          {/* Booking Widget */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeUp}
            className="w-full max-w-4xl"
          >
            <BookingWidget />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={4}
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16"
          >
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="font-serif text-3xl font-bold text-gold">{stat.value}</span>
                <span className="text-cream-dark/60 text-sm mt-0.5">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/60"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* ──── FEATURED ROOMS ──── */}
      <section id="featured-rooms" className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Accommodations</p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-charcoal mb-4">
              Signature Suites
            </h2>
            <p className="text-charcoal-light max-w-xl mx-auto leading-relaxed">
              Each suite is thoughtfully designed to evoke comfort, elegance, and the natural beauty of Littoral Cameroon.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {featuredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
          <div className="text-center">
            <Link
              id="view-all-rooms"
              to="/rooms"
              className="inline-flex items-center gap-2 border border-gold text-gold hover:bg-gold hover:text-cream-light px-8 py-3 rounded-xl font-medium transition-all duration-300"
            >
              View All Suites <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ──── ABOUT TEASER ──── */}
      <section id="about-teaser" className="py-24 bg-charcoal text-cream-light overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Placeholder */}
            <div className="relative h-80 lg:h-[450px] rounded-2xl overflow-hidden order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-stone-700 to-stone-900 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-serif text-cream-light/60 text-3xl italic mb-2">Our Story</p>
                  <p className="text-gold/60 text-sm">Est. 2018 • Douala, Cameroon</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-charcoal/60 to-transparent" />
              <div className="absolute bottom-6 left-6 bg-gold/90 text-cream-light px-4 py-2 rounded-xl text-sm font-semibold shadow-lg">
                Est. 2018 • Douala, Cameroon
              </div>
            </div>
            {/* Text */}
            <div className="order-1 lg:order-2">
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">Our Story</p>
              <h2 className="font-serif text-4xl font-semibold text-cream-light mb-6 leading-tight">
                Where Coastal Luxury Meets <span className="text-gold italic">Timeless Elegance</span>
              </h2>
              <p className="text-cream-dark/75 leading-relaxed mb-4">
                Opened in 2018 in the prestigious neighborhood of Bonamussadi, M&J Luxurious Guest House was built with one purpose — to provide an authentic premium experience in the heart of Douala, Littoral Cameroon.
              </p>
              <p className="text-cream-dark/75 leading-relaxed mb-8">
                Each architectural detail, from the handcrafted premium woodwork to the open terraces overlooking the Wouri River, reflects our deep pride in local culture and our commitment to world-class comfort.
              </p>
              <Link
                id="learn-more-about"
                to="/about"
                className="inline-flex items-center gap-2 text-gold hover:text-gold-light font-medium border-b border-gold/50 hover:border-gold transition-all"
              >
                Learn Our Story <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ──── AMENITIES ──── */}
      <section id="amenities-preview" className="py-20 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">What's Included</p>
          <h2 className="font-serif text-4xl font-semibold text-charcoal mb-12">
            Premium Amenities
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {AMENITY_ICONS.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-3 bg-cream-light rounded-2xl p-6 w-40 shadow-sm border border-gold/10 hover:border-gold/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="text-gold">{item.icon}</div>
                <p className="font-medium text-charcoal text-sm">{item.label}</p>
                <p className="text-charcoal-light text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              id="view-amenities"
              to="/amenities"
              className="text-gold hover:text-gold-dark font-medium underline underline-offset-4 text-sm"
            >
              View Full Amenities List →
            </Link>
          </div>
        </div>
      </section>

      {/* ──── TESTIMONIALS ──── */}
      <section id="testimonials" className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Guest Reviews</p>
            <h2 className="font-serif text-4xl font-semibold text-charcoal">What Our Guests Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((review) => (
              <div key={review.id} className="bg-cream-light rounded-2xl p-6 border border-gold/10 hover:border-gold/25 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-gold text-gold' : 'fill-gold/15 text-gold/15'}`} />
                  ))}
                </div>
                <p className="text-charcoal-light text-sm leading-relaxed italic flex-grow mb-4">
                  "{review.comment.slice(0, 180)}..."
                </p>
                <div className="flex items-center gap-3 border-t border-gold/10 pt-4">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold/30 to-sage/30 flex items-center justify-center text-charcoal font-serif font-bold text-sm">
                    {review.author[0]}
                  </div>
                  <div>
                    <p className="text-charcoal font-semibold text-sm">{review.author}</p>
                    <p className="text-charcoal-light text-xs">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/reviews" className="text-gold hover:text-gold-dark font-medium underline underline-offset-4 text-sm">
              Read All Reviews →
            </Link>
          </div>
        </div>
      </section>

      {/* ──── FAQ PREVIEW ──── */}
      <section id="faq-preview" className="py-20 bg-charcoal">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Common Questions</p>
            <h2 className="font-serif text-4xl font-semibold text-cream-light">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {previewFaqs.map((faq) => (
              <div key={faq.id} className="border border-gold/15 rounded-xl overflow-hidden">
                <button
                  id={`faq-toggle-${faq.id}`}
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-cream-light hover:text-gold transition-colors font-medium text-sm"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 ml-3 transition-transform duration-300 ${openFaq === faq.id ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === faq.id && (
                  <div className="px-5 pb-4 text-cream-dark/70 text-sm leading-relaxed border-t border-gold/10">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/faq" className="text-gold hover:text-gold-light font-medium underline underline-offset-4 text-sm">
              View All FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* ──── FINAL CTA ──── */}
      <section id="cta-section" className="py-20 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-cream-light text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4 leading-tight">
            Ready for an Unforgettable Stay?
          </h2>
          <p className="text-cream-light/85 mb-8 text-lg font-light leading-relaxed">
            Reserve your suite today and experience the finest hospitality in Douala, Cameroon.
          </p>
          <Link
            id="cta-book-suite"
            to="/rooms"
            className="inline-flex items-center gap-3 bg-charcoal hover:bg-charcoal-dark text-cream-light px-10 py-4 rounded-2xl font-semibold text-base shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Browse & Book Our Suites
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};
