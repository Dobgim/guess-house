import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Heart, Leaf } from 'lucide-react';
import { Layout } from '../components/Layout';

const TEAM = [
  { name: 'Marie Ngounou', role: 'Co-Founder & Director', initial: 'M' },
  { name: 'Jean Ngounou', role: 'Co-Founder & Director', initial: 'J' },
  { name: 'Clarisse Fotso', role: 'Guest Relations Manager', initial: 'C' },
];

const VALUES = [
  { icon: <Heart className="w-6 h-6" />, title: 'Genuine Warmth', desc: 'Every guest is treated as family, with personal touches that go beyond expectation.' },
  { icon: <Award className="w-6 h-6" />, title: 'Uncompromising Quality', desc: 'Premium linens, curated menus, and impeccable standards in every detail.' },
  { icon: <Leaf className="w-6 h-6" />, title: 'Sustainable Hosting', desc: 'We source produce locally, minimize waste, and honor our natural environment.' },
];

export const About: React.FC = () => (
  <Layout>
    {/* Header */}
    <section id="about-header" className="bg-charcoal pt-10 pb-20 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 60% 50%, rgba(197,168,128,0.5) 0%, transparent 60%)' }} />
      <div className="relative z-10">
        <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Our Story</p>
        <h1 className="font-serif text-5xl font-semibold text-cream-light mb-4">About M&J Luxurious Apartment</h1>
        <p className="text-cream-dark/65 max-w-xl mx-auto leading-relaxed">
          Born from a vision of elevated hospitality and local pride, M&J Luxurious Apartment is more than just accommodation — it's an experience.
        </p>
      </div>
    </section>

    {/* Story Section */}
    <section id="story" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="h-96 rounded-2xl relative overflow-hidden flex items-end p-8 shadow-xl">
            <img 
              src="/collage.jpg" 
              alt="M&J Apartments Collage" 
              className="absolute inset-0 w-full h-full object-cover opacity-60" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
            <div className="relative z-10">
              <p className="font-serif text-cream-light text-2xl italic mb-1">M&J Luxurious Apartment</p>
              <p className="text-gold text-xs font-semibold uppercase tracking-wider">Established 2024 · Douala, Cameroon</p>
            </div>
          </div>
          <div>
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">The Beginning</p>
            <h2 className="font-serif text-4xl font-semibold text-charcoal mb-6 leading-tight">
              Built from Passion for Douala and its People
            </h2>
            <p className="text-charcoal-light leading-relaxed mb-4">
              M&J Luxurious Apartment was founded in 2024 by Marie & Jean Ngounou, Douala-born hospitality professionals who returned home with a singular mission: to create a world-class retreat that celebrates the raw beauty and culture of Littoral Cameroon.
            </p>
            <p className="text-charcoal-light leading-relaxed mb-6">
              Built with quality materials and decorated with artisan crafts from Bafang and Foumban, the apartment blends contemporary comfort with authentic Cameroonian soul. The result is a sanctuary where every corner tells a story.
            </p>
            <Link to="/rooms" className="inline-flex items-center gap-2 text-gold hover:text-gold-dark font-medium border-b border-gold/50 hover:border-gold transition-all">
              Explore Our Apartments <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* Values */}
    <section id="values" className="py-20 bg-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">What We Stand For</p>
        <h2 className="font-serif text-4xl font-semibold text-charcoal mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VALUES.map((v) => (
            <div key={v.title} className="bg-cream-light rounded-2xl p-8 border border-gold/10 hover:border-gold/30 hover:shadow-md transition-all duration-300 text-left">
              <div className="text-gold mb-4 p-3 bg-gold/10 rounded-xl inline-block">{v.icon}</div>
              <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">{v.title}</h3>
              <p className="text-charcoal-light text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section id="team" className="py-20 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">The People Behind M&J Luxurious Apartment</p>
        <h2 className="font-serif text-4xl font-semibold text-cream-light mb-12">Meet Our Team</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {TEAM.map((member) => (
            <div key={member.name} className="flex flex-col items-center w-48">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold/30 to-sage/30 border-2 border-gold/30 flex items-center justify-center font-serif text-4xl font-bold text-gold mb-4">
                {member.initial}
              </div>
              <p className="font-serif text-lg font-semibold text-cream-light">{member.name}</p>
              <p className="text-sage text-xs font-medium mt-1 text-center">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);
