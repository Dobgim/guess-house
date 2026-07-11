import React from 'react';
import { Layout } from '../components/Layout';

export const Terms: React.FC = () => (
  <Layout>
    <section id="terms-header" className="bg-charcoal pt-10 pb-12 text-center">
      <h1 className="font-serif text-4xl font-semibold text-cream-light mb-2">Terms & Conditions</h1>
      <p className="text-cream-dark/60 text-sm">Effective Date: January 1, 2024</p>
    </section>
    <section id="terms-body" className="py-14 bg-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 prose prose-stone prose-headings:font-serif prose-headings:text-charcoal prose-p:text-charcoal-light prose-p:leading-relaxed prose-li:text-charcoal-light">
        <h2>1. Reservations & Payments</h2>
        <p>All bookings require full payment at the time of reservation unless a specific deposit arrangement has been agreed upon. Prices are quoted in XAF (Central African Franc). We accept MTN Mobile Money, Orange Money, and major credit/debit cards.</p>
        <h2>2. Check-In & Check-Out</h2>
        <p>Standard check-in is from 2:00 PM and check-out by 12:00 PM (noon). Late check-out may be requested and is subject to availability and additional charges.</p>
        <h2>3. Cancellation Policy</h2>
        <ul>
          <li>Cancellations made 7+ days before arrival: Full refund.</li>
          <li>Cancellations made 3–6 days before arrival: 50% refund.</li>
          <li>Cancellations made within 48 hours: No refund.</li>
          <li>No-shows will be charged in full.</li>
        </ul>
        <h2>4. Guest Conduct</h2>
        <p>Guests are expected to respect the property, neighbors, and other guests. La Villa Rielle reserves the right to request immediate departure without refund in cases of unruly behavior, damage to property, or violation of these terms.</p>
        <h2>5. Liability</h2>
        <p>La Villa Rielle is not responsible for loss of personal belongings, cash, or valuables. We recommend using the in-room safe or our front desk safekeeping service.</p>
        <h2>6. Modifications</h2>
        <p>We reserve the right to modify these Terms & Conditions at any time. Changes will be posted on our website and take effect immediately upon publication.</p>
        <h2>7. Governing Law</h2>
        <p>These terms shall be governed by the laws of the Republic of Cameroon. Disputes will be subject to the jurisdiction of the courts of Buea, Southwest Region.</p>
      </div>
    </section>
  </Layout>
);
