import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, ChevronRight, Calendar, User, CreditCard, Download, Star, BedDouble, Users } from 'lucide-react';
import { Layout } from '../components/Layout';
import { useBooking } from '../context/BookingContext';
import type { Booking as BookingRecord } from '../context/BookingContext';
import { ROOMS } from '../data/mockData';

const STEPS = ['Select Suite', 'Guest Details', 'Payment', 'Confirmation'];

const calculateNights = (inStr: string, outStr: string) => {
  const d1 = new Date(inStr);
  const d2 = new Date(outStr);
  const diff = d2.getTime() - d1.getTime();
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

export const Booking: React.FC = () => {
  const [step, setStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);
  const {
    checkIn, checkOut, guests, selectedRoom, billingDetails,
    setSearchParams, selectRoom, updateBillingDetails, createBooking, clearCart
  } = useBooking();
  const navigate = useNavigate();
  const nights = calculateNights(checkIn, checkOut);
  const totalPrice = selectedRoom ? selectedRoom.price * nights : 0;

  const today = new Date().toISOString().split('T')[0];

  const handlePayment = async () => {
    setProcessing(true);
    // Simulate payment delay
    await new Promise((r) => setTimeout(r, 2200));
    const booking = await createBooking();
    setConfirmedBooking(booking);
    setProcessing(false);
    setStep(3);
  };

  const handlePrint = () => window.print();

  return (
    <Layout>
      {/* Header */}
      <section id="booking-header" className="bg-charcoal pt-10 pb-12 text-center">
        <h1 className="font-serif text-4xl font-semibold text-cream-light mb-2">Reserve Your Suite</h1>
        <p className="text-cream-dark/60 text-sm">Complete your booking in just 3 simple steps</p>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Step Progress Bar */}
        {step < 3 && (
          <div id="booking-steps" className="flex items-center justify-center mb-12">
            {STEPS.slice(0, 3).map((s, i) => (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${i < step ? 'bg-gold border-gold text-cream-light' : i === step ? 'border-gold text-gold' : 'border-gold/20 text-charcoal-light'}`}>
                    {i < step ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`text-xs mt-1.5 font-medium ${i === step ? 'text-gold' : 'text-charcoal-light'}`}>{s}</span>
                </div>
                {i < 2 && <div className={`flex-1 h-0.5 mx-3 mb-5 transition-all ${i < step ? 'bg-gold' : 'bg-gold/20'}`} />}
              </React.Fragment>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">

            {/* ── STEP 0: Select Suite ── */}
            {step === 0 && (
              <div id="step-select" className="space-y-6">
                <h2 className="font-serif text-2xl font-semibold text-charcoal">Choose Your Suite & Dates</h2>

                {/* Dates */}
                <div className="bg-cream-light border border-gold/15 rounded-2xl p-5 space-y-4">
                  <h3 className="font-medium text-charcoal flex items-center gap-2"><Calendar className="w-4 h-4 text-gold" /> Stay Dates</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-sage font-semibold uppercase tracking-widest">Check In</label>
                      <input id="booking-checkin" type="date" min={today} value={checkIn}
                        onChange={(e) => setSearchParams(e.target.value, checkOut, guests)}
                        className="border border-gold/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-sage font-semibold uppercase tracking-widest">Check Out</label>
                      <input id="booking-checkout" type="date" min={checkIn} value={checkOut}
                        onChange={(e) => setSearchParams(checkIn, e.target.value, guests)}
                        className="border border-gold/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-sage font-semibold uppercase tracking-widest">Guests</label>
                      <select id="booking-guests" value={guests}
                        onChange={(e) => setSearchParams(checkIn, checkOut, Number(e.target.value))}
                        className="border border-gold/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold bg-transparent">
                        {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Suite Selection */}
                <div className="space-y-3">
                  {ROOMS.map((room) => (
                    <label
                      key={room.id}
                      id={`select-room-${room.id}`}
                      className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${selectedRoom?.id === room.id ? 'border-gold bg-gold/5 shadow-md' : 'border-gold/15 bg-cream-light hover:border-gold/40'}`}
                    >
                      <input type="radio" name="room" value={room.id} checked={selectedRoom?.id === room.id}
                        onChange={() => selectRoom(room.id)} className="mt-1 accent-gold w-4 h-4" />
                      <div className="flex-grow min-w-0">
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <p className="font-serif font-semibold text-charcoal">{room.name}</p>
                          <p className="font-semibold text-gold shrink-0">{room.price.toLocaleString()} XAF/night</p>
                        </div>
                        <p className="text-charcoal-light text-xs mt-1 line-clamp-2">{room.description}</p>
                        <div className="flex gap-3 mt-2 text-xs text-sage font-medium">
                          <span className="flex items-center gap-1"><BedDouble className="w-3 h-3" />{room.bedType}</span>
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" />Up to {room.capacity}</span>
                          <span>{room.size}m²</span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <button id="step-next-1" disabled={!selectedRoom}
                  onClick={() => setStep(1)}
                  className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-cream-light py-3.5 rounded-xl font-semibold transition-all shadow disabled:bg-gold/40 disabled:cursor-not-allowed">
                  Continue to Guest Details <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* ── STEP 1: Guest Details ── */}
            {step === 1 && (
              <div id="step-details" className="space-y-6">
                <h2 className="font-serif text-2xl font-semibold text-charcoal flex items-center gap-2">
                  <User className="w-5 h-5 text-gold" /> Guest Information
                </h2>
                <div className="bg-cream-light border border-gold/15 rounded-2xl p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-sage font-semibold uppercase tracking-wider">Full Name *</label>
                      <input id="guest-name" type="text" required value={billingDetails.fullName}
                        onChange={(e) => updateBillingDetails({ fullName: e.target.value })}
                        placeholder="e.g. Marie Nguema"
                        className="border border-gold/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold bg-cream" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-sage font-semibold uppercase tracking-wider">Phone Number *</label>
                      <input id="guest-phone" type="tel" required value={billingDetails.phone}
                        onChange={(e) => updateBillingDetails({ phone: e.target.value })}
                        placeholder="+237 6XX XXX XXX"
                        className="border border-gold/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold bg-cream" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-sage font-semibold uppercase tracking-wider">Email Address *</label>
                    <input id="guest-email" type="email" required value={billingDetails.email}
                      onChange={(e) => updateBillingDetails({ email: e.target.value })}
                      placeholder="your@email.com"
                      className="border border-gold/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold bg-cream" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(0)} className="flex-1 border border-gold/30 text-charcoal-light hover:text-charcoal py-3 rounded-xl font-medium text-sm transition-all">
                    ← Back
                  </button>
                  <button id="step-next-2"
                    disabled={!billingDetails.fullName || !billingDetails.email || !billingDetails.phone}
                    onClick={() => setStep(2)}
                    className="flex-[2] flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-cream-light py-3 rounded-xl font-semibold transition-all shadow disabled:bg-gold/40 disabled:cursor-not-allowed">
                    Continue to Payment <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 2: Payment ── */}
            {step === 2 && (
              <div id="step-payment" className="space-y-6">
                <h2 className="font-serif text-2xl font-semibold text-charcoal flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-gold" /> Secure Payment
                </h2>

                {/* Payment Method */}
                <div className="bg-cream-light border border-gold/15 rounded-2xl p-5 space-y-3">
                  <p className="text-xs text-sage font-semibold uppercase tracking-wider mb-2">Select Payment Method</p>
                  {[
                    { val: 'MTN_MOMO', label: 'MTN Mobile Money', color: 'bg-yellow-400' },
                    { val: 'ORANGE_MONEY', label: 'Orange Money', color: 'bg-orange-500' },
                    { val: 'CARD', label: 'Credit / Debit Card', color: 'bg-blue-600' },
                  ].map(({ val, label, color }) => (
                    <label key={val} id={`payment-method-${val}`}
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${billingDetails.paymentMethod === val ? 'border-gold bg-gold/5' : 'border-gold/15 hover:border-gold/35'}`}>
                      <input type="radio" name="payment" value={val} checked={billingDetails.paymentMethod === (val as any)}
                        onChange={() => updateBillingDetails({ paymentMethod: val as any })} className="accent-gold w-4 h-4" />
                      <div className={`w-5 h-5 rounded-full ${color}`} />
                      <span className="font-medium text-charcoal text-sm">{label}</span>
                    </label>
                  ))}
                </div>

                {/* Mobile Money Phone */}
                {(billingDetails.paymentMethod === 'MTN_MOMO' || billingDetails.paymentMethod === 'ORANGE_MONEY') && (
                  <div className="bg-cream-light border border-gold/15 rounded-2xl p-5">
                    <label className="text-xs text-sage font-semibold uppercase tracking-wider block mb-2">
                      {billingDetails.paymentMethod === 'MTN_MOMO' ? 'MTN' : 'Orange'} Mobile Money Number
                    </label>
                    <input id="payment-phone" type="tel"
                      value={billingDetails.paymentPhone}
                      onChange={(e) => updateBillingDetails({ paymentPhone: e.target.value })}
                      placeholder="+237 6XX XXX XXX"
                      className="w-full border border-gold/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold bg-cream" />
                    <p className="text-xs text-charcoal-light mt-2">
                      You will receive a payment prompt on this number. Please confirm on your phone to complete booking.
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 border border-gold/30 text-charcoal-light hover:text-charcoal py-3 rounded-xl font-medium text-sm transition-all">
                    ← Back
                  </button>
                  <button id="confirm-pay-btn" onClick={handlePayment} disabled={processing}
                    className="flex-[2] bg-gold hover:bg-gold-dark text-cream-light py-3.5 rounded-xl font-bold text-sm transition-all shadow-md disabled:bg-gold/50 flex items-center justify-center gap-2">
                    {processing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-cream-light/30 border-t-cream-light rounded-full animate-spin" />
                        Processing Payment…
                      </>
                    ) : (
                      <>Confirm & Pay {totalPrice.toLocaleString()} XAF</>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3: Confirmation ── */}
            {step === 3 && confirmedBooking && (
              <div id="step-confirmation" className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/15 border-2 border-gold mb-6">
                  <Check className="w-10 h-10 text-gold" />
                </div>
                <h2 className="font-serif text-3xl font-semibold text-charcoal mb-2">Booking Confirmed!</h2>
                <p className="text-charcoal-light mb-8 text-sm">
                  Thank you, <strong>{confirmedBooking.guestDetails.fullName}</strong>. Your reservation is confirmed and a receipt has been sent to {confirmedBooking.guestDetails.email}.
                </p>

                {/* Booking ID Card */}
                <div className="bg-cream-light border-2 border-dashed border-gold/30 rounded-2xl p-6 mb-8 text-left">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-xs text-sage font-bold uppercase tracking-widest mb-1">Booking Reference</p>
                      <p className="font-serif text-3xl font-bold text-gold">{confirmedBooking.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-sage font-bold uppercase tracking-widest mb-1">Status</p>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">✓ Confirmed</span>
                    </div>
                  </div>
                  <div className="border-t border-gold/15 mt-5 pt-5 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-charcoal-light mb-0.5">Suite</p>
                      <p className="font-semibold text-charcoal">{confirmedBooking.room.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-charcoal-light mb-0.5">Guests</p>
                      <p className="font-semibold text-charcoal">{confirmedBooking.guests}</p>
                    </div>
                    <div>
                      <p className="text-xs text-charcoal-light mb-0.5">Check In</p>
                      <p className="font-semibold text-charcoal">{new Date(confirmedBooking.checkIn).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-xs text-charcoal-light mb-0.5">Check Out</p>
                      <p className="font-semibold text-charcoal">{new Date(confirmedBooking.checkOut).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div className="col-span-2 border-t border-gold/10 pt-3">
                      <div className="flex justify-between">
                        <p className="font-bold text-charcoal">Total Paid</p>
                        <p className="font-bold text-gold text-lg">{confirmedBooking.totalPrice.toLocaleString()} XAF</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button id="print-receipt" onClick={handlePrint}
                    className="flex items-center justify-center gap-2 border border-gold text-gold hover:bg-gold/5 px-6 py-3 rounded-xl font-medium text-sm transition-all">
                    <Download className="w-4 h-4" /> Print Receipt
                  </button>
                  <Link to="/" onClick={clearCart}
                    className="flex items-center justify-center gap-2 bg-charcoal hover:bg-charcoal-dark text-cream-light px-8 py-3 rounded-xl font-semibold text-sm transition-all shadow">
                    Return to Home
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* ── Order Summary Sidebar ── */}
          {step < 3 && (
            <div id="order-summary" className="lg:col-span-1">
              <div className="bg-cream-light border border-gold/15 rounded-2xl p-5 sticky top-24">
                <h3 className="font-serif text-lg font-semibold text-charcoal mb-4 border-b border-gold/10 pb-3">
                  Booking Summary
                </h3>
                {selectedRoom ? (
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-charcoal-light text-xs mb-0.5">Selected Suite</p>
                      <p className="font-semibold text-charcoal">{selectedRoom.name}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-charcoal-light mb-0.5">Check In</p>
                        <p className="font-medium text-charcoal">{new Date(checkIn + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
                      </div>
                      <div>
                        <p className="text-charcoal-light mb-0.5">Check Out</p>
                        <p className="font-medium text-charcoal">{new Date(checkOut + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-charcoal-light">{nights} night{nights > 1 ? 's' : ''} × {selectedRoom.price.toLocaleString()} XAF</p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Star className="w-3 h-3 fill-gold text-gold" />
                      <span className="text-xs text-charcoal-light">{selectedRoom.rating} rating · Free breakfast included</span>
                    </div>
                    <div className="border-t border-gold/15 pt-3 flex justify-between font-bold text-charcoal">
                      <span>Total</span>
                      <span className="text-gold font-semibold">{totalPrice.toLocaleString()} XAF</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-charcoal-light text-sm">Select a suite to see pricing.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
