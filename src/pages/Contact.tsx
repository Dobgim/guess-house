import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { Layout } from '../components/Layout';
import { CONTACTS } from '../data/mockData';

export const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSubmitted(true);
    }
  };

  return (
    <Layout>
      <section id="contact-header" className="bg-charcoal pt-10 pb-16 text-center">
        <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Get in Touch</p>
        <h1 className="font-serif text-5xl font-semibold text-cream-light mb-4">Contact Us</h1>
        <p className="text-cream-dark/65 max-w-xl mx-auto">
          Whether you have a question, need a special arrangement, or just want to say hello — we're always here for you.
        </p>
      </section>

      <section id="contact-body" className="py-16 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Contact Cards */}
            <div className="lg:col-span-2 space-y-4">
              {[
                { icon: <Phone className="w-5 h-5" />, label: 'Phone / WhatsApp', value: CONTACTS.phone, href: `tel:${CONTACTS.phone}` },
                { icon: <Mail className="w-5 h-5" />, label: 'Email', value: CONTACTS.email, href: `mailto:${CONTACTS.email}` },
                { icon: <MapPin className="w-5 h-5" />, label: 'Address', value: `${CONTACTS.address}, ${CONTACTS.city}`, href: undefined },
                { icon: <Clock className="w-5 h-5" />, label: 'Reception Hours', value: '24 hours, 7 days a week', href: undefined },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="flex gap-4 bg-cream-light p-5 rounded-2xl border border-gold/10 hover:border-gold/30 shadow-sm hover:shadow-md transition-all">
                  <div className="text-gold p-2.5 bg-gold/10 rounded-xl h-fit">{icon}</div>
                  <div>
                    <p className="text-xs text-sage font-semibold uppercase tracking-wider mb-1">{label}</p>
                    {href ? (
                      <a href={href} className="text-charcoal font-medium text-sm hover:text-gold transition-colors">{value}</a>
                    ) : (
                      <p className="text-charcoal font-medium text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* WhatsApp Quick */}
              <a href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer" id="contact-whatsapp"
                className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#1ebe5b] text-white px-6 py-3.5 rounded-2xl font-semibold text-sm shadow-md hover:shadow-lg transition-all">
                <span className="text-lg">💬</span> Chat on WhatsApp Now
              </a>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 bg-cream-light rounded-2xl p-8 border border-gold/15 shadow-sm">
              <h2 className="font-serif text-2xl font-semibold text-charcoal mb-6">Send Us a Message</h2>
              {submitted ? (
                <div className="text-center py-10">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <p className="font-serif text-xl text-charcoal font-semibold mb-2">Message Sent!</p>
                  <p className="text-charcoal-light text-sm">Thank you, {form.name}. We'll respond to {form.email} within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-sage font-semibold uppercase tracking-wider">Full Name *</label>
                      <input id="contact-name" type="text" required
                        value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        className="border border-gold/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold bg-cream" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-sage font-semibold uppercase tracking-wider">Email *</label>
                      <input id="contact-email" type="email" required
                        value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className="border border-gold/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold bg-cream" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-sage font-semibold uppercase tracking-wider">Subject</label>
                    <input id="contact-subject" type="text"
                      value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="e.g. Room enquiry, Airport transfer…"
                      className="border border-gold/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold bg-cream" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-sage font-semibold uppercase tracking-wider">Message *</label>
                    <textarea id="contact-message" required rows={5}
                      value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us how we can help you…"
                      className="border border-gold/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold bg-cream resize-none" />
                  </div>
                  <button id="contact-submit" type="submit"
                    className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-cream-light px-8 py-3 rounded-xl font-semibold text-sm transition-all shadow hover:shadow-md">
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
