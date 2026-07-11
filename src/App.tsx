import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { LiveChat } from './components/LiveChat';

import { Home } from './pages/Home';
import { Rooms } from './pages/Rooms';
import { Booking } from './pages/Booking';
import { About } from './pages/About';
import { Amenities } from './pages/Amenities';
import { Gallery } from './pages/Gallery';
import { Reviews } from './pages/Reviews';
import { Location } from './pages/Location';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Terms } from './pages/Terms';

const NotFound: React.FC = () => (
  <div className="min-h-screen bg-cream flex flex-col items-center justify-center text-center px-4">
    <p className="font-serif text-8xl font-bold text-gold mb-4">404</p>
    <h1 className="font-serif text-3xl font-semibold text-charcoal mb-3">Page Not Found</h1>
    <p className="text-charcoal-light mb-8">The page you're looking for doesn't exist or has been moved.</p>
    <a href="/" className="bg-gold text-cream-light px-8 py-3 rounded-xl font-semibold hover:bg-gold-dark transition-all shadow">
      Return Home
    </a>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <div className="flex flex-col min-h-screen bg-cream font-sans text-charcoal">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/about" element={<About />} />
              <Route path="/amenities" element={<Amenities />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/location" element={<Location />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
          <LiveChat />
        </div>
      </BookingProvider>
    </BrowserRouter>
  );
}

export default App;
