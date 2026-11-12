/**
 * Safe attribution and event analytics tracker.
 * Dispatches to window.fbq and window.gtag if present, otherwise silently no-ops.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export type EventName =
  | "form_start"
  | "form_step_complete"
  | "form_submit_success"
  | "thanks_view"
  | "whatsapp_click"
  | "booking_click";

export interface AttributionData {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  fbclid?: string;
  gclid?: string;
  landingPage?: string;
  referrer?: string;
}

const STORAGE_KEY = "orvilyn_attribution";

/**
 * Capture URL params and referrer into sessionStorage on first landing.
 */
export function captureAttribution(): AttributionData | null {
  if (typeof window === "undefined") return null;

  try {
    const existing = window.sessionStorage.getItem(STORAGE_KEY);
    if (existing) {
      return JSON.parse(existing) as AttributionData;
    }

    const params = new URLSearchParams(window.location.search);
    const data: AttributionData = {
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
      utmContent: params.get("utm_content") || undefined,
      utmTerm: params.get("utm_term") || undefined,
      fbclid: params.get("fbclid") || undefined,
      gclid: params.get("gclid") || undefined,
      landingPage: window.location.pathname,
      referrer: document.referrer || undefined,
    };

    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
  } catch {
    return null;
  }
}

/**
 * Read currently stored attribution data.
 */
export function getAttribution(): AttributionData {
  if (typeof window === "undefined") return {};

  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as AttributionData;
    }
  } catch {
    // ignore
  }

  return {};
}

/**
 * Safely track an event with Meta Pixel (fbq) and Google Analytics (gtag).
 */
export function trackEvent(name: EventName, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  try {
    // 1. Google Analytics
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params);
    }

    // 2. Meta Pixel
    if (typeof window.fbq === "function") {
      // Map conversion events to standard Meta events where applicable
      if (name === "form_submit_success" || name === "thanks_view") {
        window.fbq("track", "Lead", params);
      } else if (name === "form_start") {
        window.fbq("trackCustom", "FormStart", params);
      } else {
        window.fbq("trackCustom", name, params);
      }
    }
  } catch {
    // Silently suppress tracking errors
  }
}

/**
 * Format dynamic WhatsApp prefilled text based on service and campaign
 */
export function buildWhatsAppUrl(service?: string): string {
  const attribution = getAttribution();
  const campaign = attribution.utmCampaign || "website";
  const servicePart = service && service !== "Not sure yet" ? service : "a project";
  const text = `Hi Orvilyn, I'd like to talk about ${servicePart}. (ref: ${campaign})`;
  
  // Site whatsapp number digits
  const phone = "2348071658176";
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
