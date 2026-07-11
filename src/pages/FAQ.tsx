import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Layout } from '../components/Layout';
import { FAQS } from '../data/mockData';

const CATEGORIES = ['All', ...Array.from(new Set(FAQS.map((f) => f.category)))];

export const FAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = activeCategory === 'All'
    ? FAQS
    : FAQS.filter((f) => f.category === activeCategory);

  return (
    <Layout>
      <section id="faq-header" className="bg-charcoal pt-10 pb-16 text-center">
        <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Help Center</p>
        <h1 className="font-serif text-5xl font-semibold text-cream-light mb-4">Frequently Asked Questions</h1>
        <p className="text-cream-dark/65 max-w-xl mx-auto">
          Everything you need to know about staying at M&J Luxurious Apartment. Can't find your answer? Contact us directly.
        </p>
      </section>

      <section id="faq-body" className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div id="faq-filters" className="flex flex-wrap gap-2 justify-center mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                id={`faq-filter-${cat}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${activeCategory === cat ? 'bg-gold border-gold text-cream-light' : 'border-gold/20 text-charcoal-light hover:border-gold/50'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div id="faq-accordion" className="space-y-3">
            {filtered.map((faq) => (
              <div key={faq.id} className="border border-gold/15 rounded-xl overflow-hidden bg-cream-light shadow-sm">
                <button
                  id={`faq-q-${faq.id}`}
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full flex items-start justify-between px-5 py-4 text-left hover:bg-gold/3 transition-colors"
                >
                  <span className="text-charcoal font-medium text-sm pr-4 leading-snug">{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 text-gold mt-0.5 transition-transform duration-300 ${openId === faq.id ? 'rotate-180' : ''}`} />
                </button>
                {openId === faq.id && (
                  <div className="px-5 pb-4 pt-1 text-charcoal-light text-sm leading-relaxed border-t border-gold/10">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 bg-charcoal rounded-2xl p-8 text-center border border-gold/15">
            <p className="font-serif text-xl font-semibold text-cream-light mb-2">Still Have Questions?</p>
            <p className="text-cream-dark/65 text-sm mb-5">
              Our team is available 24/7 to assist with any enquiry. Reach us via WhatsApp or email.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://wa.me/237600000000" target="_blank" rel="noopener noreferrer"
                id="faq-whatsapp-btn"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-semibold text-sm shadow hover:opacity-90 transition">
                💬 Chat on WhatsApp
              </a>
              <a href="mailto:info@mjluxuriousguesthouse.com" id="faq-email-btn"
                className="flex items-center justify-center gap-2 border border-gold text-gold hover:bg-gold/10 px-6 py-3 rounded-xl font-medium text-sm transition">
                ✉️ Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
