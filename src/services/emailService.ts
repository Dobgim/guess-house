import type { Booking } from '../context/BookingContext';

// ─────────────────────────────────────────────────────────────────────────────
// PROVIDER TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type EmailProvider = 'WEB3FORMS' | 'EMAILJS' | 'NONE';

export interface Web3FormsConfig {
  accessKey: string;
  toEmail?: string;      // Optional override to route receipts to specific address
}

export interface EmailJSConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// STORAGE KEYS
// ─────────────────────────────────────────────────────────────────────────────

const PROVIDER_KEY      = 'vjr_email_provider';        // active provider
const WEB3FORMS_KEY     = 'vjr_web3forms_config';
const EMAILJS_KEY       = 'vjr_emailjs_config';

// ─────────────────────────────────────────────────────────────────────────────
// PROVIDER MANAGEMENT
// ─────────────────────────────────────────────────────────────────────────────

export const getActiveProvider = (): EmailProvider => {
  return (localStorage.getItem(PROVIDER_KEY) as EmailProvider) || 'NONE';
};

export const setActiveProvider = (provider: EmailProvider) => {
  localStorage.setItem(PROVIDER_KEY, provider);
};

// ─────────────────────────────────────────────────────────────────────────────
// WEB3FORMS — CONFIG
// ─────────────────────────────────────────────────────────────────────────────

export const getWeb3FormsConfig = (): Web3FormsConfig => {
  const saved = localStorage.getItem(WEB3FORMS_KEY);
  if (saved) {
    try { return JSON.parse(saved); } catch (_) { /* ignore */ }
  }
  return {
    accessKey: (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string) || '',
    toEmail:   (import.meta.env.VITE_WEB3FORMS_TO_EMAIL as string)   || '',
  };
};

export const saveWeb3FormsConfig = (config: Web3FormsConfig) => {
  localStorage.setItem(WEB3FORMS_KEY, JSON.stringify(config));
};

export const clearWeb3FormsConfig = () => {
  localStorage.removeItem(WEB3FORMS_KEY);
};

export const isWeb3FormsConfigured = (config = getWeb3FormsConfig()): boolean => {
  return !!config.accessKey;
};

// ─────────────────────────────────────────────────────────────────────────────
// EMAILJS — CONFIG (legacy / fallback)
// ─────────────────────────────────────────────────────────────────────────────

export const getEmailJSConfig = (): EmailJSConfig => {
  const saved = localStorage.getItem(EMAILJS_KEY);
  if (saved) {
    try {
      const config = JSON.parse(saved);
      if (config.serviceId && config.templateId && config.publicKey) return config;
    } catch (_) { /* ignore */ }
  }
  return {
    serviceId: (import.meta.env.VITE_EMAILJS_SERVICE_ID  as string) || '',
    templateId: (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string) || '',
    publicKey:  (import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string) || '',
  };
};

export const saveEmailJSConfig = (config: EmailJSConfig) => {
  localStorage.setItem(EMAILJS_KEY, JSON.stringify(config));
};

export const clearEmailJSConfig = () => {
  localStorage.removeItem(EMAILJS_KEY);
};

export const isEmailJSConfigured = (config = getEmailJSConfig()): boolean => {
  return !!(config.serviceId && config.templateId && config.publicKey);
};

// Backwards-compatible aliases
export const getEmailConfig    = getEmailJSConfig;
export const saveEmailConfig   = saveEmailJSConfig;
export const clearEmailConfig  = clearEmailJSConfig;
export const isEmailConfigured = isEmailJSConfigured;

// ─────────────────────────────────────────────────────────────────────────────
// SHARED RECEIPT PAYLOAD BUILDER
// ─────────────────────────────────────────────────────────────────────────────

export const buildReceiptPayload = (booking: Booking) => ({
  booking_id:      booking.id,
  guest_name:      booking.guestDetails.fullName,
  guest_email:     booking.guestDetails.email,
  guest_phone:     booking.guestDetails.phone,
  room_name:       booking.room.name,
  check_in:        new Date(booking.checkIn).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
  check_out:       new Date(booking.checkOut).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
  guests:          String(booking.guests),
  total_price:     `${booking.totalPrice.toLocaleString()} XAF`,
  payment_method:  booking.guestDetails.paymentMethod === 'MTN_MOMO'
                     ? 'MTN Mobile Money'
                     : booking.guestDetails.paymentMethod === 'ORANGE_MONEY'
                       ? 'Orange Money'
                       : 'Credit / Debit Card',
  payment_phone:   booking.guestDetails.paymentPhone || 'N/A',
  created_at:      new Date(booking.createdAt).toLocaleString('en-GB'),
  // Web3Forms meta — overridden inside the sender
  subject:         `La Villa Rielle — Booking Receipt ${booking.id}`,
  from_name:       'La Villa Rielle Reservations',
});

// ─────────────────────────────────────────────────────────────────────────────
// RESULT TYPE
// ─────────────────────────────────────────────────────────────────────────────

export interface EmailSendResult {
  success: boolean;
  message: string;
  provider?: EmailProvider;
  error?: unknown;
}

// ─────────────────────────────────────────────────────────────────────────────
// WEB3FORMS SENDER
// ─────────────────────────────────────────────────────────────────────────────

const sendViaWeb3Forms = async (booking: Booking): Promise<EmailSendResult> => {
  const config = getWeb3FormsConfig();
  if (!isWeb3FormsConfigured(config)) {
    return { success: false, provider: 'WEB3FORMS', message: 'Web3Forms access key is not configured.' };
  }

  const payload = buildReceiptPayload(booking);

  // Web3Forms wants a flat FormData or JSON body with `access_key`
  const body = {
    access_key: config.accessKey,
    ...(config.toEmail ? { to: config.toEmail } : {}),
    ...payload,
    // Build a rich HTML receipt as the message body
    message: `
🏨 La Villa Rielle — Booking Confirmation
==========================================
Booking ID    : ${payload.booking_id}
Guest Name    : ${payload.guest_name}
Email         : ${payload.guest_email}
Phone         : ${payload.guest_phone}

Room          : ${payload.room_name}
Check-In      : ${payload.check_in}
Check-Out     : ${payload.check_out}
Guests        : ${payload.guests}

Payment Method: ${payload.payment_method}
Payment Phone : ${payload.payment_phone}
Total Paid    : ${payload.total_price}
Confirmed At  : ${payload.created_at}

Thank you for choosing La Villa Rielle.
We look forward to welcoming you!
    `.trim(),
  };

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });

    const json = await res.json();

    if (res.ok && json.success) {
      return {
        success: true,
        provider: 'WEB3FORMS',
        message: `Receipt sent to ${booking.guestDetails.email} via Web3Forms!`,
      };
    }

    throw new Error(json.message || `Status ${res.status}`);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[Web3Forms] Send failed:', err);
    return { success: false, provider: 'WEB3FORMS', message: `Web3Forms error: ${msg}`, error: err };
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// EMAILJS SENDER
// ─────────────────────────────────────────────────────────────────────────────

const sendViaEmailJS = async (booking: Booking): Promise<EmailSendResult> => {
  const config = getEmailJSConfig();
  if (!isEmailJSConfigured(config)) {
    return { success: false, provider: 'EMAILJS', message: 'EmailJS credentials are not configured.' };
  }

  const templateParams = buildReceiptPayload(booking);

  try {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id:      config.serviceId,
        template_id:     config.templateId,
        user_id:         config.publicKey,
        template_params: templateParams,
      }),
    });

    if (res.ok) {
      return {
        success: true,
        provider: 'EMAILJS',
        message: `Receipt sent to ${booking.guestDetails.email} via EmailJS!`,
      };
    }

    const errText = await res.text();
    throw new Error(errText || `Status ${res.status}`);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[EmailJS] Send failed:', err);
    return { success: false, provider: 'EMAILJS', message: `EmailJS error: ${msg}`, error: err };
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN ENTRY POINT  — auto-routes to the active provider
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Sends a booking receipt email using whichever provider is currently active
 * (Web3Forms → EmailJS → simulation fallback).
 *
 * Provider priority:
 *   1. Explicitly set active provider (localStorage `vjr_email_provider`)
 *   2. Auto-detect: Web3Forms if key exists, else EmailJS if keys exist
 *   3. Simulation (console log)
 */
export const sendBookingReceiptEmail = async (booking: Booking): Promise<EmailSendResult> => {
  let provider = getActiveProvider();

  // Auto-detect if no explicit choice has been saved
  if (provider === 'NONE') {
    if (isWeb3FormsConfigured()) provider = 'WEB3FORMS';
    else if (isEmailJSConfigured()) provider = 'EMAILJS';
  }

  if (provider === 'WEB3FORMS') return sendViaWeb3Forms(booking);
  if (provider === 'EMAILJS')   return sendViaEmailJS(booking);

  // Simulation fallback
  const payload = buildReceiptPayload(booking);
  console.warn('[EmailService] No provider configured — simulated receipt payload:', payload);
  return {
    success: false,
    provider: 'NONE',
    message: 'No email provider configured. Receipt was simulated in the developer console.',
  };
};
