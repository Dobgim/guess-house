import React from 'react';
import { Layout } from '../components/Layout';

export const PrivacyPolicy: React.FC = () => (
  <Layout>
    <section id="privacy-header" className="bg-charcoal pt-10 pb-12 text-center">
      <h1 className="font-serif text-4xl font-semibold text-cream-light mb-2">Privacy Policy</h1>
      <p className="text-cream-dark/60 text-sm">Effective Date: January 1, 2024</p>
    </section>
    <section id="privacy-body" className="py-14 bg-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 prose prose-stone prose-headings:font-serif prose-headings:text-charcoal prose-p:text-charcoal-light prose-p:leading-relaxed prose-li:text-charcoal-light">
        <h2>1. Information We Collect</h2>
        <p>We collect information you provide when making a booking, contacting us, or subscribing to our newsletter. This includes your name, email address, phone number, and payment details required to process reservations.</p>
        <h2>2. How We Use Your Information</h2>
        <p>Your data is used to confirm and manage bookings, communicate with you about your stay, send you marketing communications (with your consent), and improve our services.</p>
        <h2>3. Data Security</h2>
        <p>We implement industry-standard security measures including SSL encryption, secure payment gateways, and restricted access to personal data. We never sell your personal information to third parties.</p>
        <h2>4. Your Rights</h2>
        <p>You have the right to access, correct, or delete the personal data we hold about you. To exercise these rights, contact us at privacy@lavillarielle.com.</p>
        <h2>5. Cookies</h2>
        <p>Our website uses cookies to improve your browsing experience and analyze site usage. You may disable cookies in your browser settings, though this may affect certain features.</p>
        <h2>6. Contact</h2>
        <p>For privacy-related enquiries, email us at <a href="mailto:privacy@lavillarielle.com" className="text-gold">privacy@lavillarielle.com</a> or write to us at our Buea address.</p>
      </div>
    </section>
  </Layout>
);
