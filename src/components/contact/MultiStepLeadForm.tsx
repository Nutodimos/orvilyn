"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useTransition,
  useId,
} from "react";
import { ArrowLeft, ArrowRight, Check, AlertCircle, PhoneCall, Loader2 } from "lucide-react";
import { COUNTRY_CALLING_CODES } from "@/data/countryCallingCodes";
import {
  SERVICE_OPTIONS,
  BUDGET_RANGES_NGN,
  BUDGET_RANGES_INTL,
} from "@/lib/leadSchema";
import {
  captureAttribution,
  getAttribution,
  trackEvent,
  buildWhatsAppUrl,
  type AttributionData,
} from "@/lib/track";
import { submitMultiStepLead } from "@/app/contact/multiStepActions";
import { initialMultiStepState, type MultiStepState } from "@/app/contact/multiStepState";

export interface MultiStepLeadFormProps {
  initialService?: string;
  className?: string;
  sourceContext?: string;
}

export function MultiStepLeadForm({
  initialService,
  className = "",
  sourceContext = "contact_page",
}: MultiStepLeadFormProps) {
  // Step tracker: 1, 2, 3, 4
  const [step, setStep] = useState<number>(1);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  // Form field state
  const [service, setService] = useState<string>(initialService ?? "");
  const [message, setMessage] = useState<string>("");
  const [region, setRegion] = useState<"NG" | "INTL">("NG");
  const [budgetRange, setBudgetRange] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [contactMethod, setContactMethod] = useState<"email" | "whatsapp">("email");
  const [email, setEmail] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+234");
  const [whatsappNumber, setWhatsappNumber] = useState<string>("");

  // Honeypot & timing
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [companyHoneypot, setCompanyHoneypot] = useState<string>("");

  // Validation & Server submission state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverState, setServerState] = useState<MultiStepState>(initialMultiStepState);
  const [isPending, startTransition] = useTransition();
  const [attribution, setAttribution] = useState<AttributionData>({});

  const formRef = useRef<HTMLFormElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const hasStartedEventFired = useRef<boolean>(false);

  const errorSummaryId = useId();

  // Initialize attribution and region detection
  useEffect(() => {
    const attr = captureAttribution() || getAttribution();
    setAttribution(attr);

    setStartedAt(Date.now());

    // Timezone check for region
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz === "Africa/Lagos") {
        setRegion("NG");
        setCountryCode("+234");
      } else {
        setRegion("INTL");
        setCountryCode("+1");
      }
    } catch {
      // Default stays NG
    }
  }, []);

  // When step changes, move focus to step heading for accessibility & screen readers
  useEffect(() => {
    if (stepHeadingRef.current) {
      stepHeadingRef.current.focus();
    }
  }, [step]);

  // Track initial interaction
  const triggerFormStart = () => {
    if (!hasStartedEventFired.current) {
      hasStartedEventFired.current = true;
      trackEvent("form_start", { context: sourceContext });
    }
  };

  // Step 1: Auto-advance after selecting service
  const handleServiceSelect = (selected: string) => {
    triggerFormStart();
    setService(selected);
    setErrors((prev) => ({ ...prev, service: "" }));

    setTimeout(() => {
      setDirection("forward");
      setStep(2);
      trackEvent("form_step_complete", { step: 1, service: selected });
    }, 240);
  };

  // Step 2 Continue
  const handleStep2Continue = () => {
    triggerFormStart();
    if (message.trim().length < 10) {
      setErrors((prev) => ({
        ...prev,
        message: "Give us a little more detail (at least 10 characters).",
      }));
      return;
    }
    setErrors((prev) => ({ ...prev, message: "" }));
    setDirection("forward");
    setStep(3);
    trackEvent("form_step_complete", { step: 2 });
  };

  // Step 3: Auto-advance after budget select
  const handleBudgetSelect = (selected: string) => {
    triggerFormStart();
    setBudgetRange(selected);
    setErrors((prev) => ({ ...prev, budgetRange: "" }));

    setTimeout(() => {
      setDirection("forward");
      setStep(4);
      trackEvent("form_step_complete", { step: 3, budget: selected, region });
    }, 240);
  };

  // Go Back
  const handleBack = () => {
    if (step > 1) {
      setDirection("backward");
      setStep((prev) => prev - 1);
    }
  };

  // Step 4 Submit validation
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    triggerFormStart();

    const newErrors: Record<string, string> = {};
    if (name.trim().length < 2) {
      newErrors.name = "Please tell us your name.";
    }

    if (contactMethod === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!email.trim() || !emailRegex.test(email.trim())) {
        newErrors.email = "That email doesn’t look right.";
      }
    } else {
      const cleanPhone = whatsappNumber.replace(/[^0-9]/g, "");
      if (cleanPhone.length < 6 || cleanPhone.length > 15) {
        newErrors.whatsapp = "Please enter a valid phone number.";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const formData = new FormData();
    formData.set("service", service);
    formData.set("message", message);
    formData.set("budgetRange", budgetRange);
    formData.set("region", region);
    formData.set("name", name);
    formData.set("contactMethod", contactMethod);
    if (contactMethod === "email") {
      formData.set("email", email.trim());
    } else {
      const formattedWhatsapp = `${countryCode} ${whatsappNumber.trim()}`;
      formData.set("whatsapp", formattedWhatsapp);
    }

    formData.set("company", companyHoneypot);
    formData.set("startedAt", String(startedAt ?? Date.now()));

    // Attribution
    if (attribution.utmSource) formData.set("utmSource", attribution.utmSource);
    if (attribution.utmMedium) formData.set("utmMedium", attribution.utmMedium);
    if (attribution.utmCampaign) formData.set("utmCampaign", attribution.utmCampaign);
    if (attribution.utmContent) formData.set("utmContent", attribution.utmContent);
    if (attribution.utmTerm) formData.set("utmTerm", attribution.utmTerm);
    if (attribution.fbclid) formData.set("fbclid", attribution.fbclid);
    if (attribution.gclid) formData.set("gclid", attribution.gclid);
    if (attribution.landingPage) formData.set("landingPage", attribution.landingPage);
    if (attribution.referrer) formData.set("referrer", attribution.referrer);

    startTransition(async () => {
      try {
        const res = await submitMultiStepLead(initialMultiStepState, formData);
        if (res && res.status === "error") {
          setServerState(res);
          if (res.fieldErrors) {
            setErrors(res.fieldErrors);
          }
        }
      } catch (err) {
        // In Next.js, redirect() throws an internal NEXT_REDIRECT error which is normal behavior
        if ((err as Error)?.message?.includes("NEXT_REDIRECT")) {
          trackEvent("form_submit_success", { service, budget: budgetRange });
          throw err;
        }
        setServerState({
          status: "error",
          message: "Something didn't go through. Please try WhatsApp instead.",
        });
      }
    });
  };

  const budgetOptions = region === "NG" ? BUDGET_RANGES_NGN : BUDGET_RANGES_INTL;

  return (
    <div
      className={`bg-[var(--surface)] border border-[var(--line)] rounded-[28px] p-6 sm:p-8 md:p-10 shadow-[var(--shadow-card)] relative overflow-hidden ${className}`}
    >
      {/* Progress Bar & Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-2.5">
          <div className="flex items-center gap-2">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1 text-[var(--ink)] hover:text-[var(--orange)] transition-colors p-1 -ml-1 rounded select-none cursor-pointer"
                aria-label="Go back to previous step"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                <span className="capitalize font-bold text-xs">Back</span>
              </button>
            )}
          </div>
          <span aria-live="polite">Step {step} of 4</span>
        </div>

        {/* Thin Orange Progress Bar */}
        <div
          className="w-full h-1.5 bg-[var(--line)] rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={step}
          aria-valuemin={1}
          aria-valuemax={4}
        >
          <div
            className="h-full bg-[var(--orange)] rounded-full transition-[width] duration-300 ease-out"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Server error alert */}
      {serverState.status === "error" && (
        <div
          role="alert"
          id={errorSummaryId}
          className="mb-6 rounded-[14px] p-4 bg-red-50 border border-red-200 text-red-900 text-sm flex items-start gap-3"
        >
          <AlertCircle size={18} className="shrink-0 text-red-600 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium">{serverState.message}</p>
            <div className="mt-2">
              <a
                href={buildWhatsAppUrl(service)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { source: "error_state" })}
                className="inline-flex items-center gap-1.5 font-semibold text-[var(--orange-strong)] hover:underline"
              >
                <span>Chat with us directly on WhatsApp</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Form Form Tag */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className="relative"
      >
        {/* Honeypot field */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={companyHoneypot}
            onChange={(e) => setCompanyHoneypot(e.target.value)}
          />
        </div>

        {/* STEP 1: What do you need? */}
        {step === 1 && (
          <div
            className="animate-in fade-in duration-200"
            style={{
              transition: "transform 200ms cubic-bezier(0.23, 1, 0.32, 1), opacity 200ms ease-out",
            }}
          >
            <h2
              ref={stepHeadingRef}
              tabIndex={-1}
              className="text-2xl sm:text-3xl font-bold text-[var(--ink)] mb-2 font-[family-name:var(--font-display)] outline-none"
            >
              What do you need?
            </h2>
            <p className="text-[var(--muted)] text-sm sm:text-base mb-6">
              Pick the closest match. We can always adjust later.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="group" aria-label="Service options">
              {SERVICE_OPTIONS.map((opt) => {
                const isSelected = service === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleServiceSelect(opt)}
                    className={`min-h-[52px] px-5 py-3.5 rounded-[16px] border text-left font-semibold text-base select-none cursor-pointer flex items-center justify-between transition-[transform,background-color,border-color,box-shadow] duration-160 active:scale-[0.98] ${
                      isSelected
                        ? "bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)] shadow-[var(--shadow-card)]"
                        : "bg-[var(--surface)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--muted)] hover:bg-[var(--bg)]"
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && (
                      <Check size={18} className="text-[var(--orange)] shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {errors.service && (
              <p className="mt-3 text-sm font-semibold text-red-600 flex items-center gap-1.5">
                <AlertCircle size={15} />
                <span>{errors.service}</span>
              </p>
            )}
          </div>
        )}

        {/* STEP 2: What's annoying you? */}
        {step === 2 && (
          <div
            className="animate-in fade-in duration-200"
            style={{
              transition: "transform 200ms cubic-bezier(0.23, 1, 0.32, 1), opacity 200ms ease-out",
            }}
          >
            <h2
              ref={stepHeadingRef}
              tabIndex={-1}
              className="text-2xl sm:text-3xl font-bold text-[var(--ink)] mb-2 font-[family-name:var(--font-display)] outline-none"
            >
              What’s annoying you?
            </h2>
            <p className="text-[var(--muted)] text-sm sm:text-base mb-5">
              Explain it in plain English. No technical terms necessary.
            </p>

            <div>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (e.target.value.trim().length >= 10) {
                    setErrors((prev) => ({ ...prev, message: "" }));
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    handleStep2Continue();
                  }
                }}
                placeholder="The spreadsheet nobody trusts, the website that never gets calls, the thing you do by hand every Friday…"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "step2-message-error" : undefined}
                className="w-full bg-[var(--surface)] border border-[var(--line)] rounded-[18px] p-4 text-base text-[var(--ink)] placeholder:text-[var(--muted)]/60 outline-none focus:outline-2 focus:outline-[var(--orange)] focus:outline-offset-2 resize-y transition-shadow"
              />
              <div className="flex items-center justify-between text-xs text-[var(--muted)] mt-1.5">
                <span>Min 10 characters</span>
                <span>{message.trim().length} chars</span>
              </div>
            </div>

            {errors.message && (
              <p
                id="step2-message-error"
                className="mt-2 text-sm font-semibold text-red-600 flex items-center gap-1.5"
              >
                <AlertCircle size={15} />
                <span>{errors.message}</span>
              </p>
            )}

            <div className="mt-6 flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleStep2Continue}
                className="inline-flex items-center justify-center font-semibold rounded-full px-8 py-3.5 bg-[var(--orange)] text-[var(--on-orange)] select-none cursor-pointer transition-[background-color,transform,box-shadow] duration-160 hover:bg-[var(--orange-strong)] active:scale-[0.97]"
              >
                <span>Continue</span>
                <ArrowRight size={18} className="ml-2 shrink-0" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Rough budget? */}
        {step === 3 && (
          <div
            className="animate-in fade-in duration-200"
            style={{
              transition: "transform 200ms cubic-bezier(0.23, 1, 0.32, 1), opacity 200ms ease-out",
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
              <h2
                ref={stepHeadingRef}
                tabIndex={-1}
                className="text-2xl sm:text-3xl font-bold text-[var(--ink)] font-[family-name:var(--font-display)] outline-none"
              >
                Rough budget?
              </h2>

              {/* Currency switcher */}
              <button
                type="button"
                onClick={() => setRegion((r) => (r === "NG" ? "INTL" : "NG"))}
                className="text-xs font-semibold text-[var(--orange-strong)] hover:underline self-start sm:self-auto cursor-pointer"
              >
                {region === "NG" ? "Switch to USD ($)" : "Switch to NGN (₦)"}
              </button>
            </div>

            <p className="text-[var(--muted)] text-sm sm:text-base mb-6">
              Ballpark figures help us propose realistic scopes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="group" aria-label="Budget options">
              {budgetOptions.map((b) => {
                const isSelected = budgetRange === b;
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => handleBudgetSelect(b)}
                    className={`min-h-[52px] px-5 py-3.5 rounded-[16px] border text-left font-semibold text-base select-none cursor-pointer flex items-center justify-between transition-[transform,background-color,border-color,box-shadow] duration-160 active:scale-[0.98] ${
                      isSelected
                        ? "bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)] shadow-[var(--shadow-card)]"
                        : "bg-[var(--surface)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--muted)] hover:bg-[var(--bg)]"
                    }`}
                  >
                    <span>{b}</span>
                    {isSelected && (
                      <Check size={18} className="text-[var(--orange)] shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {errors.budgetRange && (
              <p className="mt-3 text-sm font-semibold text-red-600 flex items-center gap-1.5">
                <AlertCircle size={15} />
                <span>{errors.budgetRange}</span>
              </p>
            )}
          </div>
        )}

        {/* STEP 4: Where should we reach you? */}
        {step === 4 && (
          <div
            className="animate-in fade-in duration-200"
            style={{
              transition: "transform 200ms cubic-bezier(0.23, 1, 0.32, 1), opacity 200ms ease-out",
            }}
          >
            <h2
              ref={stepHeadingRef}
              tabIndex={-1}
              className="text-2xl sm:text-3xl font-bold text-[var(--ink)] mb-2 font-[family-name:var(--font-display)] outline-none"
            >
              Where should we reach you?
            </h2>
            <p className="text-[var(--muted)] text-sm sm:text-base mb-6">
              Pick your preferred channel for our reply.
            </p>

            <div className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="lead-name"
                  className="block font-semibold text-sm text-[var(--ink)] mb-1.5"
                >
                  Your name
                </label>
                <input
                  id="lead-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (e.target.value.trim().length >= 2) {
                      setErrors((prev) => ({ ...prev, name: "" }));
                    }
                  }}
                  placeholder="Alex Doe"
                  className="w-full bg-[var(--surface)] border border-[var(--line)] rounded-[14px] px-4 py-3 text-base text-[var(--ink)] outline-none focus:outline-2 focus:outline-[var(--orange)] focus:outline-offset-2 transition-shadow"
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Preferred method toggle */}
              <div>
                <span className="block font-semibold text-sm text-[var(--ink)] mb-2">
                  Contact preference
                </span>
                <div className="grid grid-cols-2 gap-2 p-1 bg-[var(--bg)] border border-[var(--line)] rounded-[16px]">
                  <button
                    type="button"
                    onClick={() => {
                      setContactMethod("email");
                      setErrors((prev) => ({ ...prev, whatsapp: "" }));
                    }}
                    className={`py-2.5 px-4 rounded-[12px] font-semibold text-sm transition-[background-color,color,box-shadow] select-none cursor-pointer ${
                      contactMethod === "email"
                        ? "bg-[var(--surface)] text-[var(--ink)] shadow-sm border border-[var(--line)]"
                        : "text-[var(--muted)] hover:text-[var(--ink)]"
                    }`}
                  >
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setContactMethod("whatsapp");
                      setErrors((prev) => ({ ...prev, email: "" }));
                    }}
                    className={`py-2.5 px-4 rounded-[12px] font-semibold text-sm transition-[background-color,color,box-shadow] select-none cursor-pointer ${
                      contactMethod === "whatsapp"
                        ? "bg-[var(--surface)] text-[var(--ink)] shadow-sm border border-[var(--line)]"
                        : "text-[var(--muted)] hover:text-[var(--ink)]"
                    }`}
                  >
                    WhatsApp
                  </button>
                </div>
              </div>

              {/* Email Input */}
              {contactMethod === "email" && (
                <div>
                  <label
                    htmlFor="lead-email"
                    className="block font-semibold text-sm text-[var(--ink)] mb-1.5"
                  >
                    Email address
                  </label>
                  <input
                    id="lead-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((prev) => ({ ...prev, email: "" }));
                    }}
                    placeholder="you@yourbusiness.com"
                    className="w-full bg-[var(--surface)] border border-[var(--line)] rounded-[14px] px-4 py-3 text-base text-[var(--ink)] placeholder:text-[var(--muted)]/60 outline-none focus:outline-2 focus:outline-[var(--orange)] focus:outline-offset-2 transition-shadow"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              )}

              {/* WhatsApp Input with Country Code */}
              {contactMethod === "whatsapp" && (
                <div>
                  <label
                    htmlFor="lead-whatsapp"
                    className="block font-semibold text-sm text-[var(--ink)] mb-1.5"
                  >
                    WhatsApp phone number
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      aria-label="Country code"
                      className="w-36 bg-[var(--surface)] border border-[var(--line)] rounded-[14px] px-3 py-3 text-sm text-[var(--ink)] font-semibold outline-none focus:outline-2 focus:outline-[var(--orange)] focus:outline-offset-2 cursor-pointer"
                    >
                      {COUNTRY_CALLING_CODES.map((c) => (
                        <option key={`${c.code}-${c.dialCode}`} value={c.dialCode}>
                          {c.code} ({c.dialCode})
                        </option>
                      ))}
                    </select>

                    <input
                      id="lead-whatsapp"
                      type="tel"
                      autoComplete="tel-national"
                      value={whatsappNumber}
                      onChange={(e) => {
                        setWhatsappNumber(e.target.value);
                        setErrors((prev) => ({ ...prev, whatsapp: "" }));
                      }}
                      placeholder="801 234 5678"
                      className="flex-1 bg-[var(--surface)] border border-[var(--line)] rounded-[14px] px-4 py-3 text-base text-[var(--ink)] placeholder:text-[var(--muted)]/60 outline-none focus:outline-2 focus:outline-[var(--orange)] focus:outline-offset-2 transition-shadow"
                    />
                  </div>
                  {errors.whatsapp && (
                    <p className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      <span>{errors.whatsapp}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Submit button & assurance */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full sm:w-auto inline-flex items-center justify-center font-semibold rounded-full px-8 py-4 bg-[var(--orange)] text-[var(--on-orange)] select-none cursor-pointer transition-[background-color,transform,box-shadow,opacity] duration-160 hover:bg-[var(--orange-strong)] active:scale-[0.97] disabled:opacity-75 disabled:cursor-not-allowed group shadow-[var(--shadow-button)]"
                >
                  {isPending ? (
                    <>
                      <Loader2 size={18} className="animate-spin mr-2 shrink-0" />
                      <span>Sending…</span>
                    </>
                  ) : (
                    <>
                      <span>Send it over</span>
                      <ArrowRight
                        size={18}
                        className="ml-2 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </>
                  )}
                </button>

                <p className="text-[var(--muted)] text-xs sm:text-sm mt-3 leading-relaxed">
                  Reply within 24 hours, from a real person. We&apos;ll only use your details to reply to you.
                </p>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
