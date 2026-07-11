import React, { useState, useEffect } from 'react';
import { Mail, CreditCard, X, ExternalLink, Save, CheckCircle2, AlertCircle, RefreshCw, Send } from 'lucide-react';
import { getEmailConfig, saveEmailConfig, clearEmailConfig, isEmailConfigured, sendBookingReceiptEmail } from '../services/emailService';
import type { Booking } from '../context/BookingContext';

interface IntegrationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IntegrationsPanel: React.FC<IntegrationsPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'email' | 'payment'>('email');
  const [emailConfig, setEmailConfig] = useState(getEmailConfig());
  const [isSaved, setIsSaved] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [testSending, setTestSending] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  // Payment Integration Configs (mocked state for dashboard configuration)
  const [paymentMode, setPaymentMode] = useState<'SIMULATED' | 'LIVE_NOTCHPAY' | 'LIVE_CAMPAY'>('SIMULATED');
  const [notchPublicKey, setNotchPublicKey] = useState('');
  const [campayAppId, setCampayAppId] = useState('');
  const [paymentSaved, setPaymentSaved] = useState(false);

  useEffect(() => {
    // Load payment config
    const mode = localStorage.getItem('mjguesthouse_payment_mode') as any;
    if (mode) setPaymentMode(mode);
    setNotchPublicKey(localStorage.getItem('mjguesthouse_notch_key') || '');
    setCampayAppId(localStorage.getItem('mjguesthouse_campay_id') || '');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    saveEmailConfig(emailConfig);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleClearEmail = () => {
    clearEmailConfig();
    setEmailConfig({ serviceId: '', templateId: '', publicKey: '' });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleSavePayment = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('mjguesthouse_payment_mode', paymentMode);
    localStorage.setItem('mjguesthouse_notch_key', notchPublicKey);
    localStorage.setItem('mjguesthouse_campay_id', campayAppId);
    setPaymentSaved(true);
    setTimeout(() => setPaymentSaved(false), 3000);
  };

  const handleSendTestEmail = async () => {
    if (!testEmail) return;
    setTestSending(true);
    setTestResult(null);

    // Create a mock booking for testing
    const mockBooking: Booking = {
      id: 'MJ-TEST',
      room: {
        id: '1',
        name: 'Presidential Suite (Test)',
        slug: 'presidential-suite-test',
        description: 'Test Apartment',
        detailedDescription: 'Test Apartment Detailed Description',
        price: 150000,
        rating: 4.9,
        reviewsCount: 12,
        images: [],
        amenities: [],
        featured: true,
        view: 'Garden View',
        bedType: 'King Size',
        capacity: 2,
        size: 85
      },
      checkIn: new Date().toISOString().split('T')[0],
      checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      guests: 2,
      totalPrice: 150000,
      guestDetails: {
        fullName: 'Test Developer / Admin',
        email: testEmail,
        phone: '+237 679 554 114',
        paymentMethod: 'MTN_MOMO',
        paymentPhone: '+237 679 554 114'
      },
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
      qrCodeValue: 'MJ-VERIFY-TEST'
    };

    const result = await sendBookingReceiptEmail(mockBooking);
    setTestSending(false);
    setTestResult({
      success: result.success,
      message: result.message
    });
  };

  const isConfigured = isEmailConfigured(emailConfig);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm">
      <div className="relative bg-cream-light border border-gold/20 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-charcoal text-cream-light p-6 flex justify-between items-center border-b border-gold/15">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gold/15 border border-gold/30 rounded-xl">
              <Mail className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-semibold tracking-wide">Automated System Configs</h2>
              <p className="text-xs text-cream-dark/50">Manage booking receipts and payment gateways</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-cream-dark hover:text-cream-light p-1.5 rounded-full hover:bg-cream-light/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gold/10 bg-cream">
          <button
            onClick={() => setActiveTab('email')}
            className={`flex-1 py-3.5 text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 'email'
                ? 'border-gold text-gold bg-gold/5'
                : 'border-transparent text-charcoal-light hover:text-gold hover:bg-gold/5'
            }`}
          >
            <Mail className="w-4 h-4" />
            Email Receipts (EmailJS)
          </button>
          <button
            onClick={() => setActiveTab('payment')}
            className={`flex-1 py-3.5 text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 'payment'
                ? 'border-gold text-gold bg-gold/5'
                : 'border-transparent text-charcoal-light hover:text-gold hover:bg-gold/5'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            Payments (Campay/NotchPay)
          </button>
        </div>

        {/* Content Container */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          
          {/* TAB 1: EMAILJS CONFIGURATION */}
          {activeTab === 'email' && (
            <div className="space-y-6">
              
              {/* Connection Status Indicator */}
              <div className={`p-4 rounded-2xl flex items-center gap-3.5 border ${
                isConfigured 
                  ? 'bg-green-50 border-green-200 text-green-800' 
                  : 'bg-amber-50 border-amber-200 text-amber-800'
              }`}>
                {isConfigured ? (
                  <>
                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
                    <div>
                      <p className="font-bold text-sm">Automated Email System Active</p>
                      <p className="text-xs opacity-90">Real booking receipts are currently configured to be sent to guest emails.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
                    <div>
                      <p className="font-bold text-sm">Simulation Mode (EmailJS Inactive)</p>
                      <p className="text-xs opacity-90">Booking receipts will only be logged to the developer console. Fill in the keys below to go live.</p>
                    </div>
                  </>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSaveEmail} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-sage font-bold uppercase tracking-wider">Service ID *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. service_xxxxxxx"
                      value={emailConfig.serviceId}
                      onChange={(e) => setEmailConfig({ ...emailConfig, serviceId: e.target.value })}
                      className="border border-gold/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold bg-cream"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-sage font-bold uppercase tracking-wider">Template ID *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. template_xxxxxxx"
                      value={emailConfig.templateId}
                      onChange={(e) => setEmailConfig({ ...emailConfig, templateId: e.target.value })}
                      className="border border-gold/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold bg-cream"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-sage font-bold uppercase tracking-wider">Public Key (User ID) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. YOUR_PUBLIC_KEY"
                    value={emailConfig.publicKey}
                    onChange={(e) => setEmailConfig({ ...emailConfig, publicKey: e.target.value })}
                    className="border border-gold/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold bg-cream"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-gold hover:bg-gold-dark text-cream-light py-2.5 rounded-xl font-semibold text-sm transition-all shadow flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save Configuration
                  </button>
                  {isConfigured && (
                    <button
                      type="button"
                      onClick={handleClearEmail}
                      className="border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2.5 rounded-xl font-medium text-sm transition-all"
                    >
                      Clear
                    </button>
                  )}
                </div>
                {isSaved && (
                  <p className="text-xs text-green-600 font-medium text-center animate-pulse">✓ Credentials updated successfully!</p>
                )}
              </form>

              {/* Test Email Section */}
              {isConfigured && (
                <div className="bg-cream border border-gold/15 rounded-2xl p-5 space-y-3.5">
                  <h3 className="text-sm font-semibold text-charcoal flex items-center gap-2">
                    <Send className="w-4 h-4 text-gold" /> Test System Live
                  </h3>
                  <p className="text-xs text-charcoal-light">
                    Send a real booking receipt to an email address now to test your template layout.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="e.g. test@example.com"
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                      className="flex-1 border border-gold/20 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-gold bg-cream-light"
                    />
                    <button
                      onClick={handleSendTestEmail}
                      disabled={testSending || !testEmail}
                      className="bg-charcoal hover:bg-charcoal-dark text-cream-light px-4 py-2 rounded-xl font-semibold text-sm transition-all shadow disabled:opacity-50 flex items-center gap-1.5"
                    >
                      {testSending ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                      Send Test
                    </button>
                  </div>
                  {testResult && (
                    <p className={`text-xs font-semibold ${testResult.success ? 'text-green-600' : 'text-red-600'}`}>
                      {testResult.success ? '✓' : '✗'} {testResult.message}
                    </p>
                  )}
                </div>
              )}

              {/* Instructions Guide */}
              <div className="bg-charcoal/5 rounded-2xl p-5 text-xs space-y-2 border border-gold/5">
                <p className="font-bold text-charcoal flex items-center gap-1.5">
                  How to setup free automated receipts with EmailJS:
                </p>
                <ol className="list-decimal pl-4 space-y-1.5 text-charcoal-light">
                  <li>Create a free account on <a href="https://www.emailjs.com" target="_blank" rel="noreferrer" className="text-gold font-semibold hover:underline inline-flex items-center gap-0.5">emailjs.com <ExternalLink className="w-3 h-3" /></a></li>
                  <li>Link your email account (like Gmail or Outlook) to create an <strong>Email Service</strong>.</li>
                  <li>Create an <strong>Email Template</strong> containing the following mapping keys:
                    <ul className="list-disc pl-4 mt-1 grid grid-cols-2 gap-x-4 gap-y-0.5 font-mono text-[10px] text-sage">
                      <li>{"{{booking_id}}"}</li>
                      <li>{"{{guest_name}}"}</li>
                      <li>{"{{guest_email}}"}</li>
                      <li>{"{{guest_phone}}"}</li>
                      <li>{"{{room_name}}"}</li>
                      <li>{"{{check_in}}"}</li>
                      <li>{"{{check_out}}"}</li>
                      <li>{"{{total_price}}"}</li>
                      <li>{"{{payment_method}}"}</li>
                    </ul>
                  </li>
                  <li>Copy your <strong>Service ID</strong>, <strong>Template ID</strong>, and <strong>Public Key</strong> into this panel.</li>
                </ol>
              </div>

            </div>
          )}

          {/* TAB 2: PAYMENTS (CAMPAY / NOTCHPAY) */}
          {activeTab === 'payment' && (
            <div className="space-y-6">
              
              <div className="p-4 bg-gold/5 border border-gold/15 rounded-2xl space-y-2">
                <p className="font-bold text-charcoal text-sm">Automated Cameroon Mobile Money Integration</p>
                <p className="text-xs text-charcoal-light leading-relaxed">
                  For automated MTN Mobile Money and Orange Money payments in Cameroon, we suggest integrating your platform with a payment aggregator like <strong>Notch Pay</strong> or <strong>Campay</strong>.
                </p>
              </div>

              {/* Configuration Form */}
              <form onSubmit={handleSavePayment} className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-sage font-bold uppercase tracking-wider">Payment Mode</label>
                  <select
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value as any)}
                    className="border border-gold/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold bg-cream"
                  >
                    <option value="SIMULATED">Simulated Checkout (Demo Prompt - Recommended for testing)</option>
                    <option value="LIVE_NOTCHPAY">Live Checkout (Notch Pay Integration)</option>
                    <option value="LIVE_CAMPAY">Live Checkout (Campay Integration)</option>
                  </select>
                </div>

                {/* Notch Pay Sub-options */}
                {paymentMode === 'LIVE_NOTCHPAY' && (
                  <div className="flex flex-col gap-1.5 p-4 bg-cream border border-gold/15 rounded-2xl space-y-2 animate-in slide-in-from-top duration-200">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-sage font-bold uppercase tracking-wider">Notch Pay Public Key *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. pk_live_xxxxxxxxxxxxxxxxxxxxxx"
                        value={notchPublicKey}
                        onChange={(e) => setNotchPublicKey(e.target.value)}
                        className="border border-gold/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold bg-cream-light"
                      />
                    </div>
                    <p className="text-[10px] text-charcoal-light">
                      Collect payments automatically by loading the Notch Pay JS library. You can find your credentials in your <a href="https://business.notchpay.co/developer/api-keys" target="_blank" rel="noreferrer" className="text-gold font-medium hover:underline inline-flex items-center gap-0.5">Notch Pay Dashboard <ExternalLink className="w-3.5 h-3.5" /></a>.
                    </p>
                  </div>
                )}

                {/* Campay Sub-options */}
                {paymentMode === 'LIVE_CAMPAY' && (
                  <div className="flex flex-col gap-1.5 p-4 bg-cream border border-gold/15 rounded-2xl space-y-2 animate-in slide-in-from-top duration-200">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-sage font-bold uppercase tracking-wider">Campay App Token/ID *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. app_xxxxxxxxxxxxxxxxxxxxxx"
                        value={campayAppId}
                        onChange={(e) => setCampayAppId(e.target.value)}
                        className="border border-gold/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold bg-cream-light"
                      />
                    </div>
                    <p className="text-[10px] text-charcoal-light">
                      Requires setup on your <a href="https://www.campay.net" target="_blank" rel="noreferrer" className="text-gold font-medium hover:underline inline-flex items-center gap-0.5">Campay Portal <ExternalLink className="w-3.5 h-3.5" /></a>. When payments are made, Campay's webhook notifications trigger booking confirm.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold-dark text-cream-light py-2.5 rounded-xl font-semibold text-sm transition-all shadow flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Payment Settings
                </button>

                {paymentSaved && (
                  <p className="text-xs text-green-600 font-medium text-center animate-pulse">✓ Payment settings updated successfully!</p>
                )}
              </form>

              {/* Aggregators explanation flow chart */}
              <div className="bg-charcoal text-cream-light rounded-2xl p-5 space-y-3 border border-gold/15">
                <p className="text-xs font-bold text-gold uppercase tracking-widest">How automated payment verification works:</p>
                <div className="text-[10px] font-mono text-cream-dark/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-gold text-charcoal font-bold w-4 h-4 rounded-full flex items-center justify-center">1</span>
                    <span>Guest initiates payment (Momo/OM/Card) on site</span>
                  </div>
                  <div className="h-4 border-l border-gold/30 ml-2" />
                  <div className="flex items-center gap-2">
                    <span className="bg-gold text-charcoal font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>
                    <span>Payment provider triggers OTP push on guest phone</span>
                  </div>
                  <div className="h-4 border-l border-gold/30 ml-2" />
                  <div className="flex items-center gap-2">
                    <span className="bg-gold text-charcoal font-bold w-4 h-4 rounded-full flex items-center justify-center">3</span>
                    <span>Guest enters code. Payment provider checks balance</span>
                  </div>
                  <div className="h-4 border-l border-gold/30 ml-2" />
                  <div className="flex items-center gap-2">
                    <span className="bg-gold text-charcoal font-bold w-4 h-4 rounded-full flex items-center justify-center">4</span>
                    <span>Provider sends success Webhook status back to site</span>
                  </div>
                  <div className="h-4 border-l border-gold/30 ml-2" />
                  <div className="flex items-center gap-2 text-gold">
                    <span className="bg-gold text-charcoal font-bold w-4 h-4 rounded-full flex items-center justify-center">5</span>
                    <span>Booking is confirmed; automated email receipt is sent!</span>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
        
        {/* Footer info banner */}
        <div className="bg-cream border-t border-gold/10 p-4 text-center">
          <p className="text-[10px] text-charcoal-light">
            Designed for <strong>La Villa Rielle</strong>. Secure connections via HTTPS.
          </p>
        </div>

      </div>
    </div>
  );
};
