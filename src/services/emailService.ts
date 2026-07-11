import type { Booking } from '../context/BookingContext';

export interface EmailJSConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

const STORAGE_KEY = 'mjguesthouse_emailjs_config';

// Load credentials from environment variables or localStorage overrides
export const getEmailConfig = (): EmailJSConfig => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const config = JSON.parse(saved);
      if (config.serviceId && config.templateId && config.publicKey) {
        return config;
      }
    } catch (e) {
      console.error('Failed to parse saved email config', e);
    }
  }

  // Fallback to environment variables
  return {
    serviceId: (import.meta.env.VITE_EMAILJS_SERVICE_ID as string) || '',
    templateId: (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string) || '',
    publicKey: (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string) || '',
  };
};

// Save custom credentials to localStorage
export const saveEmailConfig = (config: EmailJSConfig) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
};

// Clear custom credentials
export const clearEmailConfig = () => {
  localStorage.removeItem(STORAGE_KEY);
};

// Check if credentials are fully configured
export const isEmailConfigured = (config = getEmailConfig()): boolean => {
  return !!(config.serviceId && config.templateId && config.publicKey);
};

export interface EmailSendResult {
  success: boolean;
  message: string;
  error?: any;
}

/**
 * Sends a booking receipt email using EmailJS.
 * If credentials are not configured, it simulates the send and logs details.
 */
export const sendBookingReceiptEmail = async (booking: Booking): Promise<EmailSendResult> => {
  const config = getEmailConfig();

  const templateParams = {
    booking_id: booking.id,
    guest_name: booking.guestDetails.fullName,
    guest_email: booking.guestDetails.email,
    guest_phone: booking.guestDetails.phone,
    room_name: booking.room.name,
    check_in: new Date(booking.checkIn).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    check_out: new Date(booking.checkOut).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    guests: booking.guests,
    total_price: `${booking.totalPrice.toLocaleString()} XAF`,
    payment_method: booking.guestDetails.paymentMethod === 'MTN_MOMO' 
      ? 'MTN Mobile Money' 
      : booking.guestDetails.paymentMethod === 'ORANGE_MONEY' 
        ? 'Orange Money' 
        : 'Credit / Debit Card',
    payment_phone: booking.guestDetails.paymentPhone || 'N/A',
    created_at: new Date(booking.createdAt).toLocaleString('en-GB'),
  };

  if (!isEmailConfigured(config)) {
    console.warn('EmailJS credentials are not configured. Simulation payload:', templateParams);
    return {
      success: false,
      message: 'EmailJS is not configured. The email receipt was simulated in the developer console.',
    };
  }

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: config.serviceId,
        template_id: config.templateId,
        user_id: config.publicKey,
        template_params: templateParams,
      }),
    });

    if (response.ok) {
      return {
        success: true,
        message: `Successfully sent automated receipt to ${booking.guestDetails.email}!`,
      };
    } else {
      const errorText = await response.text();
      throw new Error(errorText || `Status ${response.status}`);
    }
  } catch (error: any) {
    console.error('Failed to send email via EmailJS:', error);
    return {
      success: false,
      message: `Failed to send email: ${error.message || error}`,
      error,
    };
  }
};
