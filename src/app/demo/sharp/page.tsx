"use client";

import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Bebas_Neue, Plus_Jakarta_Sans } from "next/font/google";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  ChartColumn,
  Check,
  Lock,
  MessageSquare,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sharp-display",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sharp-sans",
  display: "swap",
});

type CurrencyKey = "GBP" | "USD" | "CAD";
type ViewMode = "client" | "owner";

interface RegionConfig {
  key: CurrencyKey;
  label: string;
  symbol: string;
  city: string;
  cutPrice: number;
  savedFee: number;
  defaultRevenue: number;
  minRevenue: number;
  maxRevenue: number;
  stepRevenue: number;
  address: string;
}

const REGIONS: Record<CurrencyKey, RegionConfig> = {
  GBP: {
    key: "GBP",
    label: "£ GBP",
    symbol: "£",
    city: "LONDON",
    cutPrice: 45,
    savedFee: 9,
    defaultRevenue: 2400,
    minRevenue: 1000,
    maxRevenue: 15000,
    stepRevenue: 100,
    address: "42 Redchurch St, Shoreditch, London",
  },
  USD: {
    key: "USD",
    label: "$ USD",
    symbol: "$",
    city: "NEW YORK",
    cutPrice: 55,
    savedFee: 11,
    defaultRevenue: 3000,
    minRevenue: 1000,
    maxRevenue: 18000,
    stepRevenue: 100,
    address: "118 Crosby St, SoHo, New York",
  },
  CAD: {
    key: "CAD",
    label: "C$ CAD",
    symbol: "CA$",
    city: "TORONTO",
    cutPrice: 60,
    savedFee: 12,
    defaultRevenue: 3600,
    minRevenue: 1000,
    maxRevenue: 20000,
    stepRevenue: 100,
    address: "642 Queen St W, Toronto",
  },
};

interface Barber {
  id: string;
  name: string;
  pillLabel: string;
  role: string;
  initial: string;
  specialty: string;
}

const BARBERS: Barber[] = [
  {
    id: "tony",
    name: "Tony",
    pillLabel: "Tony (Master)",
    role: "Master Barber",
    initial: "T",
    specialty: "Skin Fade & Beard",
  },
  {
    id: "marcus",
    name: "Marcus",
    pillLabel: "Marcus",
    role: "Senior Stylist",
    initial: "M",
    specialty: "Scissor Crop & Taper",
  },
  {
    id: "jay",
    name: "Jay",
    pillLabel: "Jay",
    role: "Fade Specialist",
    initial: "J",
    specialty: "Razor Lineup & Fade",
  },
];

interface TimeSlot {
  id: string;
  pillLabel: string;
  displayTime: string;
  smsTime: string;
}

const TIME_SLOTS: TimeSlot[] = [
  {
    id: "430",
    pillLabel: "Today 4:30",
    displayTime: "4:30",
    smsTime: "4:30 PM",
  },
  {
    id: "515",
    pillLabel: "5:15",
    displayTime: "5:15",
    smsTime: "5:15 PM",
  },
  {
    id: "600",
    pillLabel: "6:00",
    displayTime: "6:00",
    smsTime: "6:00 PM",
  },
];

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const EASE_DRAWER = [0.32, 0.72, 0, 1] as const;

function resolveInitialCurrency(searchParams: URLSearchParams): CurrencyKey {
  const loc = searchParams.get("loc")?.toLowerCase();
  if (loc === "us" || loc === "ny" || loc === "usa" || searchParams.has("ny") || searchParams.has("us")) {
    return "USD";
  }
  if (
    loc === "ca" ||
    loc === "toronto" ||
    loc === "cad" ||
    searchParams.has("ca") ||
    searchParams.has("toronto")
  ) {
    return "CAD";
  }
  if (loc === "uk" || loc === "london" || searchParams.has("uk")) {
    return "GBP";
  }
  return "GBP";
}

function formatMoney(amount: number, symbol: string, decimals = 0): string {
  return `${symbol}${amount.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

/**
 * Lightweight Web Audio synthesizer for tactile UI feedback and Apple Pay double-chime.
 * Zero external audio assets required.
 */
function createSoundEngine() {
  let ctx: AudioContext | null = null;

  const getContext = (): AudioContext | null => {
    if (typeof window === "undefined") return null;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    if (!ctx) {
      ctx = new AudioCtx();
    }
    if (ctx.state === "suspended") {
      void ctx.resume();
    }
    return ctx;
  };

  const playTapTick = () => {
    try {
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate(8);
      }
      const audio = getContext();
      if (!audio) return;
      const now = audio.currentTime;
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.035);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.038);

      osc.connect(gain);
      gain.connect(audio.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Audio playback blocked or unsupported
    }
  };

  const playApplePayChime = () => {
    try {
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate([12, 40, 18]);
      }
      const audio = getContext();
      if (!audio) return;
      const now = audio.currentTime;

      const notes = [
        { freq: 987.77, start: 0, duration: 0.24, peak: 0.16 }, // B5
        { freq: 1318.51, start: 0.095, duration: 0.52, peak: 0.2 }, // E6
      ];

      for (const note of notes) {
        const startTime = now + note.start;

        // Fundamental bell tone
        const osc = audio.createOscillator();
        const gain = audio.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(note.freq, startTime);

        gain.gain.setValueAtTime(0.0001, startTime);
        gain.gain.linearRampToValueAtTime(note.peak, startTime + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0008, startTime + note.duration);

        osc.connect(gain);
        gain.connect(audio.destination);
        osc.start(startTime);
        osc.stop(startTime + note.duration + 0.02);

        // Subtle glassy harmonic overtone
        const harmonic = audio.createOscillator();
        const hGain = audio.createGain();
        harmonic.type = "sine";
        harmonic.frequency.setValueAtTime(note.freq * 2, startTime);

        hGain.gain.setValueAtTime(0.0001, startTime);
        hGain.gain.linearRampToValueAtTime(note.peak * 0.18, startTime + 0.008);
        hGain.gain.exponentialRampToValueAtTime(0.0005, startTime + note.duration * 0.65);

        harmonic.connect(hGain);
        hGain.connect(audio.destination);
        harmonic.start(startTime);
        harmonic.stop(startTime + note.duration + 0.02);
      }
    } catch {
      // Audio playback blocked or unsupported
    }
  };

  return { playTapTick, playApplePayChime };
}

function SharpDemoInner() {
  const searchParams = useSearchParams();
  const prefersReducedMotion = useReducedMotion();
  const soundRef = useRef<ReturnType<typeof createSoundEngine> | null>(null);

  const getSound = useCallback(() => {
    if (soundRef.current === null) {
      soundRef.current = createSoundEngine();
    }
    return soundRef.current;
  }, []);

  const initialCurrency = useMemo(
    () => resolveInitialCurrency(new URLSearchParams(searchParams.toString())),
    [searchParams]
  );

  const [currency, setCurrency] = useState<CurrencyKey>(initialCurrency);
  const [viewMode, setViewMode] = useState<ViewMode>("client");
  const [selectedBarberId, setSelectedBarberId] = useState<string>("tony");
  const [selectedSlotId, setSelectedSlotId] = useState<string>("430");
  const [hasTappedSlot, setHasTappedSlot] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Payment Sheet & Payoff State
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [depositConfirmed, setDepositConfirmed] = useState<boolean>(false);
  const [showSmsToast, setShowSmsToast] = useState<boolean>(false);

  // Owner Calculator State
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(
    REGIONS[initialCurrency].defaultRevenue
  );
  const [marketplaceFeePct, setMarketplaceFeePct] = useState<number>(20);

  const smsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (smsTimerRef.current) {
        clearTimeout(smsTimerRef.current);
      }
    };
  }, []);

  const region = REGIONS[currency];
  const selectedBarber =
    BARBERS.find((b) => b.id === selectedBarberId) ?? BARBERS[0];
  const selectedSlot =
    TIME_SLOTS.find((s) => s.id === selectedSlotId) ?? TIME_SLOTS[0];

  const clientName = selectedBarber.id === "marcus" ? "Devon" : "Marcus";

  const handleCurrencyChange = useCallback(
    (next: CurrencyKey) => {
      if (next === currency) return;
      getSound().playTapTick();
      const prevRegion = REGIONS[currency];
      const nextRegion = REGIONS[next];
      // Preserve relative slider position or reset to region default if untouched
      const ratio =
        (monthlyRevenue - prevRegion.minRevenue) /
        (prevRegion.maxRevenue - prevRegion.minRevenue);
      const mapped =
        monthlyRevenue === prevRegion.defaultRevenue
          ? nextRegion.defaultRevenue
          : Math.round(
              (nextRegion.minRevenue +
                ratio * (nextRegion.maxRevenue - nextRegion.minRevenue)) /
                nextRegion.stepRevenue
            ) * nextRegion.stepRevenue;
      setCurrency(next);
      setMonthlyRevenue(
        Math.min(nextRegion.maxRevenue, Math.max(nextRegion.minRevenue, mapped))
      );
    },
    [currency, getSound, monthlyRevenue]
  );

  const handleSelectBarber = (barberId: string) => {
    getSound().playTapTick();
    setSelectedBarberId(barberId);
    setHasTappedSlot(true);
    setDepositConfirmed(false);
    setShowSmsToast(false);
  };

  const handleSelectSlot = (slotId: string) => {
    getSound().playTapTick();
    setSelectedSlotId(slotId);
    setHasTappedSlot(true);
    setDepositConfirmed(false);
    setShowSmsToast(false);
  };

  const handleOpenSheet = () => {
    getSound().playTapTick();
    setIsMenuOpen(false);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    getSound().playTapTick();
    setIsSheetOpen(false);
  };

  const handleConfirmDeposit = () => {
    if (depositConfirmed) return;
    getSound().playApplePayChime();
    setDepositConfirmed(true);
    if (smsTimerRef.current) {
      clearTimeout(smsTimerRef.current);
    }
    smsTimerRef.current = setTimeout(() => {
      setShowSmsToast(true);
    }, 600);
  };

  const handleSwitchToOwner = () => {
    getSound().playTapTick();
    setIsSheetOpen(false);
    setShowSmsToast(false);
    setViewMode("owner");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  };

  const handleSwitchView = (mode: ViewMode) => {
    if (mode === viewMode) return;
    getSound().playTapTick();
    setViewMode(mode);
    setIsMenuOpen(false);
  };

  // Calculator math
  const monthlyLoss = Math.round((monthlyRevenue * marketplaceFeePct) / 100);
  const annualLoss = monthlyLoss * 12;

  const ctaMessage = encodeURIComponent(
    "Hey Somidotun, I just tried the Sharp & Co CHAIR demo and want to see how this works for my shop."
  );
  const claimHref = `/contact?interest=Web+app&message=${ctaMessage}`;

  return (
    <div
      className={`${bebasNeue.variable} ${plusJakarta.variable} min-h-dvh bg-[#FAF5EE] text-[#1A1816] selection:bg-[#CFB062]/30 selection:text-[#1A1816]`}
      style={{ fontFamily: "var(--font-sharp-sans), system-ui, sans-serif" }}
    >
      {/* Top Floating "Orvilyn Demo Switcher" Bar (Sticky Top) */}
      <header className="sticky top-0 z-50 w-full bg-[#1A1816]/95 backdrop-blur-md text-[#FAF5EE] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2.5">
          {/* Left: Orvilyn geometric 'V' logo + Live Interactive Demo badge */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              aria-label="Orvilyn home"
              className="flex items-center gap-2 group focus-visible:outline-2 focus-visible:outline-[#F06424] rounded-md"
            >
              <span className="w-7 h-7 rounded-lg bg-[#F06424] flex items-center justify-center shadow-sm transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] group-active:scale-95">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4.5 5.5L12 19L19.5 5.5"
                    stroke="#FAF5EE"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="font-bold tracking-tight text-sm sm:text-base text-[#FAF5EE]">
                Orvilyn
              </span>
            </Link>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-[#FAF5EE]/90 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
              Live Interactive Demo
            </span>
          </div>

          {/* Center/Right: Mode Toggle + Currency Toggle */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            {/* Mode Toggle */}
            <div
              role="tablist"
              aria-label="Demo view mode"
              className="inline-flex items-center rounded-full bg-white/10 p-0.5 border border-white/10"
            >
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === "client"}
                onClick={() => handleSwitchView("client")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-[background-color,color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] ${
                  viewMode === "client"
                    ? "bg-[#FAF5EE] text-[#1A1816] shadow-sm"
                    : "text-[#FAF5EE]/80 hover:text-white"
                }`}
              >
                <Smartphone size={14} aria-hidden="true" />
                <span>Client 3-Tap Flow</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === "owner"}
                onClick={() => handleSwitchView("owner")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-[background-color,color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] ${
                  viewMode === "owner"
                    ? "bg-[#F06424] text-white shadow-sm"
                    : "text-[#FAF5EE]/80 hover:text-white"
                }`}
              >
                <ChartColumn size={14} aria-hidden="true" />
                <span>Owner Dashboard &amp; Savings</span>
              </button>
            </div>

            {/* Currency Toggle */}
            <div
              role="group"
              aria-label="Currency and city selector"
              className="inline-flex items-center rounded-full bg-white/10 p-0.5 border border-white/10"
            >
              {(["GBP", "USD", "CAD"] as CurrencyKey[]).map((key) => {
                const active = currency === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleCurrencyChange(key)}
                    aria-pressed={active}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-[background-color,color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] ${
                      active
                        ? "bg-[#CFB062] text-[#0C0C0C]"
                        : "text-[#FAF5EE]/75 hover:text-white"
                    }`}
                  >
                    {REGIONS[key].label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      {viewMode === "client" ? (
        <main className="md:py-10 md:px-4 flex flex-col items-center justify-center">
          {/* Phone Bezel on Desktop, Full-bleed on Mobile */}
          <div className="relative w-full md:max-w-[420px] min-h-[calc(100dvh-92px)] md:min-h-[780px] bg-[#0C0C0C] text-[#F7F5F0] md:rounded-[44px] md:border-[6px] md:border-[#1F1D1A] md:shadow-2xl overflow-hidden flex flex-col">
            {/* Subtle Desktop Bezel Dynamic Island */}
            <div className="hidden md:flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-24 h-5 rounded-full bg-[#1A1A19] border border-white/5 flex items-center justify-end pr-2">
                <span className="w-2 h-2 rounded-full bg-[#101010] border border-white/10" />
              </div>
            </div>

            {/* iOS SMS Notification Toast (Slides down at top of phone screen) */}
            <AnimatePresence>
              {showSmsToast && (
                <motion.div
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, transform: "translateY(-110%)" }
                  }
                  animate={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 1, transform: "translateY(0%)" }
                  }
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, transform: "translateY(-110%)" }
                  }
                  transition={{ duration: 0.28, ease: EASE_DRAWER }}
                  className="absolute top-3 left-3 right-3 z-40 rounded-2xl bg-[#1F1F23]/95 backdrop-blur-xl border border-white/15 p-3.5 shadow-[0_18px_40px_rgba(0,0,0,0.65)]"
                  role="status"
                  aria-live="polite"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#CFB062] text-[#0C0C0C] font-extrabold text-base flex items-center justify-center shrink-0">
                      S
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[11px] font-bold text-[#F7F5F0] truncate">
                          Sharp & Co · Automated SMS (Sent 24h prior)
                        </p>
                        <button
                          type="button"
                          onClick={() => setShowSmsToast(false)}
                          aria-label="Dismiss notification"
                          className="text-white/40 hover:text-white/80 cursor-pointer shrink-0"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <p className="text-xs text-[#D0CCC4] leading-snug mt-1">
                        &ldquo;Hey {clientName}, see you at {selectedSlot.smsTime} today with{" "}
                        {selectedBarber.name}. Deposit locked — see you soon!&rdquo;
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Inner App Content */}
            <div className="relative flex-1 flex flex-col justify-between px-5 pt-4 pb-6">
              {/* Top App Header */}
              <div className="flex items-center justify-between">
                <span
                  className="text-2xl tracking-[0.06em] text-[#F7F5F0] leading-none"
                  style={{ fontFamily: "var(--font-sharp-display), sans-serif" }}
                >
                  SHARP & CO
                </span>
                <button
                  type="button"
                  onClick={() => {
                    getSound().playTapTick();
                    setIsMenuOpen((prev) => !prev);
                  }}
                  aria-expanded={isMenuOpen}
                  aria-label="Toggle shop menu"
                  className="w-10 h-10 -mr-2 rounded-xl flex flex-col items-center justify-center gap-1.5 text-[#F7F5F0] hover:bg-white/5 cursor-pointer transition-[background-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-95"
                >
                  <span className="w-5 h-[1.5px] bg-[#F7F5F0] rounded-full" />
                  <span className="w-5 h-[1.5px] bg-[#CFB062] rounded-full" />
                </button>
              </div>

              {/* Minimal Slide-down Shop Menu Drawer */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, transform: "translateY(-8px) scale(0.98)" }
                    }
                    animate={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : { opacity: 1, transform: "translateY(0px) scale(1)" }
                    }
                    exit={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, transform: "translateY(-8px) scale(0.98)" }
                    }
                    transition={{ duration: 0.18, ease: EASE_OUT }}
                    className="mt-2 rounded-2xl bg-[#141413] border border-[#CFB062]/35 p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#CFB062]">
                        {region.city} STUDIO
                      </span>
                      <span className="text-xs text-[#9A9690]">Open today · Until 8:00 PM</span>
                    </div>
                    <p className="text-xs text-[#D0CCC4]">{region.address}</p>
                    <button
                      type="button"
                      onClick={handleSwitchToOwner}
                      className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#F7F5F0] flex items-center justify-between cursor-pointer transition-[background-color,transform] duration-150 active:scale-[0.98]"
                    >
                      <span>Preview Owner Dashboard</span>
                      <ArrowRight size={14} className="text-[#CFB062]" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hero Section */}
              <div className="mt-5 mb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#CFB062]">
                  BARBERSHOP · {region.city}
                </p>
                <h1
                  className="mt-2 text-5xl leading-[0.92] text-[#F7F5F0] whitespace-pre-line tracking-[0.02em]"
                  style={{ fontFamily: "var(--font-sharp-display), sans-serif" }}
                >
                  {"SHARP. ON TIME.\nEVERY TIME."}
                </h1>
                <p className="mt-2.5 text-sm text-[#D0CCC4]">
                  Pick your barber, pick your time, done.
                </p>
              </div>

              {/* Atmospheric Barber Card & Interactive Slot Selector (TAP 1) */}
              <div
                className="relative rounded-2xl p-4 border border-white/5 overflow-hidden bg-gradient-to-br from-[#2C1E16] via-[#171210] to-[#0C0C0C]"
                style={{
                  boxShadow: "0 20px 45px rgba(0, 0, 0, 0.55)",
                }}
              >
                {/* Warm radial gold glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-12 -right-10 w-56 h-56 rounded-full opacity-70"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(207, 176, 98, 0.2) 0%, rgba(207, 176, 98, 0.04) 45%, transparent 72%)",
                  }}
                />

                {/* Top atmospheric studio header + Barber Switcher Pills */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-[#CFB062]">
                      <Sparkles size={12} aria-hidden="true" />
                      {selectedBarber.specialty}
                    </span>
                    <span className="text-[11px] font-medium text-[#9A9690]">
                      30 min · Deposit {formatMoney(region.cutPrice, region.symbol)}
                    </span>
                  </div>

                  {/* Barber Switcher Pills */}
                  <div
                    role="group"
                    aria-label="Select barber"
                    className="grid grid-cols-3 gap-1.5 mb-4"
                  >
                    {BARBERS.map((barber) => {
                      const active = barber.id === selectedBarber.id;
                      return (
                        <button
                          key={barber.id}
                          type="button"
                          onClick={() => handleSelectBarber(barber.id)}
                          aria-pressed={active}
                          className={`py-2 px-2 rounded-xl text-xs font-semibold border cursor-pointer transition-[background-color,border-color,color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] truncate ${
                            active
                              ? "bg-[#CFB062]/15 border-[#CFB062] text-[#F7F5F0]"
                              : "bg-black/30 border-white/10 text-[#9A9690] hover:border-[#CFB062]/45 hover:text-[#F7F5F0]"
                          }`}
                        >
                          {barber.pillLabel}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Free Slot Interactive Card */}
                  <button
                    type="button"
                    onClick={handleOpenSheet}
                    className="w-full text-left rounded-xl bg-[#141413]/95 border border-[#CFB062]/35 hover:border-[#CFB062] p-3 flex items-center justify-between gap-3 cursor-pointer transition-[border-color,transform,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-[#CFB062] text-[#0C0C0C] font-extrabold text-base flex items-center justify-center shrink-0">
                        {selectedBarber.initial}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-[#9A9690] leading-tight">
                          Next free slot
                        </p>
                        <p className="text-sm font-bold text-white truncate mt-0.5">
                          Today {selectedSlot.displayTime} · with {selectedBarber.name}
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-full bg-white/5 border border-[#CFB062]/35 px-2.5 py-1 text-[11px] font-semibold text-[#F7F5F0] whitespace-nowrap">
                      Skin Fade · {formatMoney(region.cutPrice, region.symbol)}
                    </span>
                  </button>
                </div>
              </div>

              {/* Action Stack: Primary CTA (TAP 2) + 3 Quick-Tap Time Pills + Social Proof */}
              <div className="mt-4 space-y-3">
                <button
                  type="button"
                  onClick={handleOpenSheet}
                  className="w-full bg-[#CFB062] hover:bg-[#E5CA82] text-[#0C0C0C] font-extrabold py-4 px-5 rounded-2xl text-base cursor-pointer transition-[background-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] shadow-[0_10px_30px_rgba(207,176,98,0.22)]"
                >
                  {hasTappedSlot
                    ? `Lock in ${selectedSlot.displayTime} with ${selectedBarber.name} →`
                    : "Book your chair"}
                </button>

                {/* 3 Quick-Tap Time Pills */}
                <div
                  role="group"
                  aria-label="Quick select appointment time"
                  className="grid grid-cols-3 gap-2"
                >
                  {TIME_SLOTS.map((slot) => {
                    const active = slot.id === selectedSlot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => handleSelectSlot(slot.id)}
                        aria-pressed={active}
                        className={`py-2.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-[background-color,border-color,color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] ${
                          active
                            ? "bg-[#CFB062] text-[#0C0C0C] border border-[#CFB062]"
                            : "bg-transparent border border-[#CFB062]/60 text-white hover:border-[#CFB062]"
                        }`}
                      >
                        {active && <Check size={13} strokeWidth={3} aria-hidden="true" />}
                        <span>{slot.pillLabel}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Footer Social Proof */}
                <p className="pt-1 text-center text-xs font-medium text-[#9A9690]">
                  <span className="text-[#CFB062]">4.9 ★</span> from 1,200+ cuts ·{" "}
                  <span className="text-[#F7F5F0]/80">0% Marketplace Commission</span>
                </p>
              </div>
            </div>

            {/* INTERACTIVE OVERLAY: Instant Apple Pay / Stripe Sheet (TAP 3) */}
            <AnimatePresence>
              {isSheetOpen && (
                <>
                  {/* Scrim */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: EASE_OUT }}
                    onClick={handleCloseSheet}
                    className="absolute inset-0 z-20 bg-black/70 backdrop-blur-[2px]"
                  />

                  {/* Bottom Sheet */}
                  <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Instant deposit checkout"
                    initial={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, transform: "translateY(100%)" }
                    }
                    animate={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : { opacity: 1, transform: "translateY(0%)" }
                    }
                    exit={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, transform: "translateY(100%)" }
                    }
                    transition={{ duration: 0.28, ease: EASE_DRAWER }}
                    className="absolute bottom-0 left-0 right-0 z-30 bg-[#18181B] rounded-t-3xl border-t border-white/15 p-6 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]"
                  >
                    {/* Handle */}
                    <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-5" />

                    {/* Top Row: Apple Pay Pill + Direct to Shop Stripe */}
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <div className="inline-flex items-center gap-1.5 rounded-lg bg-white text-[#0C0C0C] px-3 py-1 text-sm font-extrabold tracking-tight">
                        <svg
                          width="13"
                          height="16"
                          viewBox="0 0 14 17"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M11.62 8.95c-.02-2.01 1.64-2.98 1.71-3.02-.93-1.36-2.38-1.55-2.89-1.57-1.22-.12-2.4.73-3.02.73-.63 0-1.59-.71-2.62-.69-1.34.02-2.58.78-3.27 1.98-1.4 2.43-.36 6.03 1 8 .67.97 1.46 2.05 2.5 2.01 1-.04 1.38-.65 2.6-.65 1.21 0 1.56.65 2.61.63 1.08-.02 1.76-.98 2.42-1.95.77-1.12 1.08-2.21 1.1-2.27-.02-.01-2.12-.82-2.14-3.2zM9.55 3.04c.55-.67.93-1.6.82-2.54-.8.03-1.78.53-2.35 1.2-.51.59-.96 1.54-.84 2.45.9.07 1.81-.45 2.37-1.11z" />
                        </svg>
                        <span>Pay</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/10 border border-white/10 px-2.5 py-1 text-[11px] font-semibold text-[#D0CCC4]">
                          <Lock size={11} className="text-[#CFB062]" aria-hidden="true" />
                          Direct to Shop Stripe
                        </span>
                        <button
                          type="button"
                          onClick={handleCloseSheet}
                          aria-label="Close checkout sheet"
                          className="w-7 h-7 rounded-full bg-white/10 text-white/70 hover:text-white flex items-center justify-center cursor-pointer"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="rounded-2xl bg-[#111113] border border-white/10 p-4 space-y-3 mb-5">
                      <div className="flex items-center justify-between gap-2 text-sm">
                        <span className="text-[#D0CCC4]">
                          Chair Deposit (Skin Fade w/ {selectedBarber.name})
                        </span>
                        <span className="font-bold text-white tabular-nums">
                          {formatMoney(region.cutPrice, region.symbol, 2)}
                        </span>
                      </div>
                      <div className="h-px bg-white/10" />
                      <div className="flex items-center justify-between gap-2 text-sm">
                        <span className="text-[#9A9690]">Marketplace Commission Fee</span>
                        <span className="font-bold text-[#4ADE80] tabular-nums">
                          {formatMoney(0, region.symbol, 2)} (Saved{" "}
                          {formatMoney(region.savedFee, region.symbol, 2)})
                        </span>
                      </div>
                    </div>

                    {/* Interactive Deposit Button -> Morphs to Confirmed Green */}
                    <button
                      type="button"
                      onClick={handleConfirmDeposit}
                      className={`w-full py-4 px-5 rounded-2xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer transition-[background-color,color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] ${
                        depositConfirmed
                          ? "bg-[#16A34A] text-white shadow-[0_10px_28px_rgba(22,163,74,0.35)]"
                          : "bg-white hover:bg-[#F3F4F6] text-[#0C0C0C]"
                      }`}
                    >
                      {depositConfirmed ? (
                        <>
                          <Check size={18} strokeWidth={3} aria-hidden="true" />
                          <span>
                            {formatMoney(region.cutPrice, region.symbol, 2)} Locked · 0% Fee
                          </span>
                        </>
                      ) : (
                        <span>Tap to Simulate Instant Deposit</span>
                      )}
                    </button>

                    {/* Reveal Owner Switch CTA after Deposit */}
                    <AnimatePresence>
                      {depositConfirmed && (
                        <motion.div
                          initial={
                            prefersReducedMotion
                              ? { opacity: 0 }
                              : { opacity: 0, transform: "translateY(10px)" }
                          }
                          animate={
                            prefersReducedMotion
                              ? { opacity: 1 }
                              : { opacity: 1, transform: "translateY(0px)" }
                          }
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.22, ease: EASE_OUT }}
                          className="mt-3"
                        >
                          <button
                            type="button"
                            onClick={handleSwitchToOwner}
                            className="w-full py-3.5 px-5 rounded-2xl bg-[#F06424] hover:bg-[#D95318] text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-[background-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]"
                          >
                            <span>See What the Shop Owner Sees →</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </main>
      ) : (
        /* VIEW 2: OWNER DASHBOARD & COMMISSION CALCULATOR */
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
          {/* 1. Live Chair Calendar Card (Dark #141413 card) */}
          <section className="rounded-3xl bg-[#141413] text-[#F7F5F0] border border-[#CFB062]/30 p-5 sm:p-7 shadow-[0_24px_60px_rgba(26,24,22,0.16)]">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#CFB062]/15 border border-[#CFB062]/40 flex items-center justify-center text-[#CFB062]">
                  <CalendarCheck size={20} aria-hidden="true" />
                </div>
                <div>
                  <p
                    className="text-xl tracking-wide text-[#F7F5F0] leading-none"
                    style={{ fontFamily: "var(--font-sharp-display), sans-serif" }}
                  >
                    SHARP & CO · {selectedBarber.name.toUpperCase()}&apos;S CHAIR TODAY
                  </p>
                  <p className="text-xs text-[#9A9690] mt-1">
                    {region.city} Studio · Direct Stripe Payouts Active
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4ADE80]/15 border border-[#4ADE80]/30 px-3 py-1 text-xs font-bold text-[#4ADE80]">
                <ShieldCheck size={14} aria-hidden="true" />
                0 No-Shows This Week
              </span>
            </div>

            {/* Daily Schedule Rows */}
            <div className="mt-5 space-y-2.5">
              {/* Earlier Appointment */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/5 px-4 py-3 flex items-center justify-between gap-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#9A9690] w-16">3:00 PM</span>
                  <span className="font-semibold text-[#D0CCC4]">David</span>
                  <span className="hidden sm:inline text-xs text-[#9A9690]">· Skin Fade</span>
                </div>
                <span className="text-xs font-semibold text-[#9A9690]">
                  {formatMoney(region.cutPrice, region.symbol)} Settled ✓
                </span>
              </div>

              {/* Earlier Appointment 2 */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/5 px-4 py-3 flex items-center justify-between gap-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#9A9690] w-16">3:45 PM</span>
                  <span className="font-semibold text-[#D0CCC4]">Liam</span>
                  <span className="hidden sm:inline text-xs text-[#9A9690]">· Taper & Beard</span>
                </div>
                <span className="text-xs font-semibold text-[#9A9690]">
                  {formatMoney(region.cutPrice, region.symbol)} Settled ✓
                </span>
              </div>

              {/* Live Booked Appointment */}
              <div className="rounded-2xl bg-[#CFB062]/12 border border-[#CFB062] px-4 py-3.5 flex flex-wrap items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#CFB062] w-16">
                    {selectedSlot.smsTime}
                  </span>
                  <span className="font-extrabold text-white">{clientName}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#CFB062] text-[#0C0C0C] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide">
                    {depositConfirmed ? "Just Booked" : "Live Slot"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="text-[#F7F5F0]">
                    {formatMoney(region.cutPrice, region.symbol)} Deposit Paid ✓
                  </span>
                  <span className="text-[#4ADE80]">· 0% Fee</span>
                </div>
              </div>

              {/* Next Slot */}
              <div className="rounded-2xl bg-white/[0.02] border border-dashed border-white/10 px-4 py-3 flex items-center justify-between gap-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#9A9690] w-16">
                    {selectedSlot.id === "515" ? "6:00 PM" : "5:15 PM"}
                  </span>
                  <span className="text-[#9A9690]">Open Chair Slot</span>
                </div>
                <span className="inline-flex items-center gap-1 text-xs text-[#CFB062]">
                  <MessageSquare size={12} aria-hidden="true" />
                  Auto-SMS Armed
                </span>
              </div>
            </div>
          </section>

          {/* 2. Interactive "20% Marketplace Tax" Calculator */}
          <section className="rounded-3xl bg-white border border-[#1A1816]/10 p-5 sm:p-7 shadow-[0_12px_36px_rgba(26,24,22,0.06)]">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-[#EAE3D9] flex items-center justify-center text-[#1A1816]">
                <SlidersHorizontal size={18} aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-[#1A1816] tracking-tight leading-tight">
                  The &ldquo;20% Marketplace Tax&rdquo; Calculator
                </h2>
                <p className="text-xs sm:text-sm text-[#6E6862]">
                  See how much booking apps pull out of your shop every year.
                </p>
              </div>
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {/* Slider 1: Monthly Shop Revenue */}
              <div className="rounded-2xl bg-[#FAF5EE] border border-[#EAE3D9] p-4">
                <div className="flex items-baseline justify-between gap-2 mb-3">
                  <label
                    htmlFor="revenue-slider"
                    className="text-xs font-bold uppercase tracking-wider text-[#6E6862]"
                  >
                    Monthly Shop Revenue
                  </label>
                  <span className="text-xl font-extrabold text-[#1A1816] tabular-nums">
                    {formatMoney(monthlyRevenue, region.symbol)}
                  </span>
                </div>
                <input
                  id="revenue-slider"
                  type="range"
                  min={region.minRevenue}
                  max={region.maxRevenue}
                  step={region.stepRevenue}
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  className="w-full accent-[#F06424] cursor-pointer h-2 rounded-lg"
                />
                <div className="flex justify-between text-[11px] font-semibold text-[#6E6862] mt-2 tabular-nums">
                  <span>{formatMoney(region.minRevenue, region.symbol)}</span>
                  <span>{formatMoney(region.maxRevenue, region.symbol)}</span>
                </div>
              </div>

              {/* Slider 2: Marketplace Fee % */}
              <div className="rounded-2xl bg-[#FAF5EE] border border-[#EAE3D9] p-4">
                <div className="flex items-baseline justify-between gap-2 mb-3">
                  <label
                    htmlFor="fee-slider"
                    className="text-xs font-bold uppercase tracking-wider text-[#6E6862]"
                  >
                    Marketplace Fee %
                  </label>
                  <span className="text-xl font-extrabold text-[#1A1816] tabular-nums">
                    {marketplaceFeePct}%
                  </span>
                </div>
                <input
                  id="fee-slider"
                  type="range"
                  min={15}
                  max={25}
                  step={1}
                  value={marketplaceFeePct}
                  onChange={(e) => setMarketplaceFeePct(Number(e.target.value))}
                  className="w-full accent-[#1A1816] cursor-pointer h-2 rounded-lg"
                />
                <div className="flex justify-between text-[11px] font-semibold text-[#6E6862] mt-2 tabular-nums">
                  <span>15%</span>
                  <span>20%</span>
                  <span>25%</span>
                </div>
              </div>
            </div>

            {/* Live Output Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Red Callout */}
              <div className="rounded-2xl bg-[#FEF2F2] border border-[#FECACA] p-4 sm:p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#991B1B] mb-1.5">
                  What Apps Like Fresha/Booksy Take
                </p>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#DC2626] tabular-nums tracking-tight">
                  -{formatMoney(monthlyLoss, region.symbol)}/mo
                </p>
                <p className="text-sm font-bold text-[#991B1B] mt-1 tabular-nums">
                  (-{formatMoney(annualLoss, region.symbol)}/yr)
                </p>
              </div>

              {/* Green Callout */}
              <div className="rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#166534]">
                    What You Keep With Your Custom Orvilyn App
                  </p>
                  <TrendingUp size={15} className="text-[#16A34A] shrink-0" aria-hidden="true" />
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#15803D] tabular-nums tracking-tight">
                  100% Kept
                </p>
                <p className="text-sm font-bold text-[#166534] mt-1 tabular-nums">
                  ({formatMoney(annualLoss, region.symbol)}/yr stays in your shop)
                </p>
              </div>
            </div>
          </section>

          {/* 3. Bottom Frictionless CTA Card (Orvilyn Branded) */}
          <section className="rounded-3xl bg-[#EAE3D9] border border-[#1A1816]/10 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1816] tracking-tight leading-tight">
                Want this live for your shop in 7 days?
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#6E6862] leading-relaxed">
                Custom branded to your shop. Connected to your Stripe. Automated SMS reminders
                built in.
              </p>
            </div>

            <div className="flex flex-col sm:items-end gap-2.5 shrink-0">
              <Link
                href={claimHref}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#F06424] hover:bg-[#DC5518] text-white font-extrabold px-6 py-4 text-sm sm:text-base transition-[background-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] shadow-[0_12px_28px_rgba(240,100,36,0.28)]"
              >
                <span>Claim Your Custom Shop Build →</span>
              </Link>
              <button
                type="button"
                onClick={() => handleSwitchView("client")}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#6E6862] hover:text-[#1A1816] cursor-pointer py-1"
              >
                <Smartphone size={13} aria-hidden="true" />
                <span>Replay Client 3-Tap Flow</span>
              </button>
            </div>
          </section>
        </main>
      )}
    </div>
  );
}

export default function SharpDemoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-dvh bg-[#0C0C0C] flex items-center justify-center text-[#CFB062] text-sm font-semibold">
          Loading Sharp & Co…
        </div>
      }
    >
      <SharpDemoInner />
    </Suspense>
  );
}
