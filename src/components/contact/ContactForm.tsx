"use client";

import React, { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { site } from "@/data/site";
import { INTERESTS } from "@/lib/validateLead";
import { submitLead } from "@/app/contact/actions";
import { initialContactState } from "@/app/contact/state";
import { getDoors } from "@/components/contact/ContactDoors";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center font-semibold rounded-full px-8 py-4 bg-[var(--orange)] text-[var(--on-orange)] select-none cursor-pointer transition-[background-color,transform,box-shadow,opacity] duration-200 hover:bg-[var(--orange-strong)] active:scale-[0.97] disabled:opacity-70 disabled:cursor-not-allowed group"
    >
      <span>{pending ? "Sending…" : "Send it over"}</span>
      <ArrowRight
        size={18}
        className="ml-2 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
        aria-hidden="true"
      />
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitLead, initialContactState);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartedAt(Date.now());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (state.status === "success") {
      successHeadingRef.current?.focus();
    } else if (state.status === "error" && state.fieldErrors) {
      const fieldOrder = ["name", "email", "message", "interests", "phone"];
      for (const field of fieldOrder) {
        if (state.fieldErrors[field]) {
          if (field === "interests") {
            const checkbox = formRef.current?.querySelector<HTMLInputElement>(
              'input[name="interests"]'
            );
            checkbox?.focus();
          } else {
            const input = formRef.current?.querySelector<HTMLElement>(
              `[name="${field}"]`
            );
            input?.focus();
          }
          break;
        }
      }
    }
  }, [state]);

  const doors = getDoors();

  if (state.status === "success") {
    return (
      <Reveal>
        <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[28px] p-6 md:p-10 shadow-[var(--shadow-card)] flex flex-col items-start">
          <div className="w-14 h-14 rounded-full bg-[var(--butter)] flex items-center justify-center text-[var(--ink)] mb-6 shrink-0">
            <CheckCircle2 size={28} aria-hidden="true" />
          </div>
          <h2
            ref={successHeadingRef}
            tabIndex={-1}
            className="text-[var(--ink)] mb-4 outline-none font-[family-name:var(--font-display)]"
          >
            Got it. Thanks.
          </h2>
          <p className="text-[var(--muted)] text-base leading-relaxed mb-6">
            We’ll reply within 24 hours.
            {site.whatsapp && site.whatsapp.trim().length > 0
              ? " In a hurry? Message us on WhatsApp."
              : ""}
          </p>
          <Button href="/" variant="link">
            Back to home
          </Button>
        </div>
      </Reveal>
    );
  }

  const formKey = state.values
    ? `${state.values.name}-${state.values.email}-${state.values.phone}-${state.values.message}-${state.values.interests.join(",")}`
    : "initial";

  return (
    <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[28px] p-6 md:p-10 shadow-[var(--shadow-card)]">
      <form
        ref={formRef}
        key={formKey}
        action={formAction}
        noValidate
        className="flex flex-col gap-6"
      >
        {/* a) Hidden input startedAt */}
        <input type="hidden" name="startedAt" value={startedAt ?? ""} />

        {/* b) Honeypot div */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>

        {/* General error message box */}
        {state.status === "error" && state.message && (
          <div
            role="alert"
            className="rounded-[14px] px-4 py-3.5 border border-[color-mix(in_srgb,var(--ink)_25%,transparent)] text-[var(--ink)] text-sm font-medium"
          >
            {state.message}
            {doors.length > 0 ? " Or reach us another way on this page." : ""}
          </div>
        )}

        {/* c) Your name */}
        <div>
          <label
            htmlFor="contact-name"
            className="block font-semibold text-[var(--ink)] mb-2"
          >
            Your name
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            autoComplete="name"
            defaultValue={state.values?.name ?? ""}
            aria-invalid={Boolean(state.fieldErrors?.name)}
            aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
            className="w-full bg-[var(--surface)] border border-[var(--line)] rounded-[14px] px-4 py-3.5 text-base text-[var(--ink)] outline-none focus:outline-2 focus:outline-[var(--orange)] focus:outline-offset-2 transition-shadow"
          />
          {state.fieldErrors?.name && (
            <div
              id="name-error"
              aria-live="polite"
              className="flex items-center gap-1.5 mt-2 text-sm font-semibold text-[var(--ink)]"
            >
              <AlertCircle
                size={16}
                className="text-[var(--ink)] shrink-0"
                aria-hidden="true"
              />
              <span>{state.fieldErrors.name}</span>
            </div>
          )}
        </div>

        {/* d) Email */}
        <div>
          <label
            htmlFor="contact-email"
            className="block font-semibold text-[var(--ink)] mb-2"
          >
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@yourbusiness.com"
            defaultValue={state.values?.email ?? ""}
            aria-invalid={Boolean(state.fieldErrors?.email)}
            aria-describedby={
              state.fieldErrors?.email ? "email-error" : undefined
            }
            className="w-full bg-[var(--surface)] border border-[var(--line)] rounded-[14px] px-4 py-3.5 text-base text-[var(--ink)] placeholder:text-[var(--muted)]/60 outline-none focus:outline-2 focus:outline-[var(--orange)] focus:outline-offset-2 transition-shadow"
          />
          {state.fieldErrors?.email && (
            <div
              id="email-error"
              aria-live="polite"
              className="flex items-center gap-1.5 mt-2 text-sm font-semibold text-[var(--ink)]"
            >
              <AlertCircle
                size={16}
                className="text-[var(--ink)] shrink-0"
                aria-hidden="true"
              />
              <span>{state.fieldErrors.email}</span>
            </div>
          )}
        </div>

        {/* e) What’s annoying you? */}
        <div>
          <label
            htmlFor="contact-message"
            className="block font-semibold text-[var(--ink)] mb-2"
          >
            What’s annoying you?
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            placeholder="The spreadsheet nobody trusts, the website that never gets calls, the thing you do by hand every Friday…"
            defaultValue={state.values?.message ?? ""}
            aria-invalid={Boolean(state.fieldErrors?.message)}
            aria-describedby={
              state.fieldErrors?.message ? "message-error" : undefined
            }
            className="w-full bg-[var(--surface)] border border-[var(--line)] rounded-[14px] px-4 py-3.5 text-base text-[var(--ink)] placeholder:text-[var(--muted)]/60 outline-none focus:outline-2 focus:outline-[var(--orange)] focus:outline-offset-2 resize-y transition-shadow"
          />
          {state.fieldErrors?.message && (
            <div
              id="message-error"
              aria-live="polite"
              className="flex items-center gap-1.5 mt-2 text-sm font-semibold text-[var(--ink)]"
            >
              <AlertCircle
                size={16}
                className="text-[var(--ink)] shrink-0"
                aria-hidden="true"
              />
              <span>{state.fieldErrors.message}</span>
            </div>
          )}
        </div>

        {/* f) Anything in particular? (optional) */}
        <fieldset className="border-0 p-0 m-0">
          <legend className="block font-semibold text-[var(--ink)] mb-2">
            Anything in particular? (optional)
          </legend>
          <div
            className="flex flex-wrap gap-[10px]"
            role="group"
            aria-describedby={
              state.fieldErrors?.interests ? "interests-error" : undefined
            }
          >
            {INTERESTS.map((item) => (
              <label
                key={item}
                className="inline-flex cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  name="interests"
                  value={item}
                  defaultChecked={state.values?.interests?.includes(item)}
                  className="peer sr-only"
                />
                <span className="rounded-full px-4 py-2 font-semibold text-[0.9rem] border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] transition-colors peer-checked:bg-[var(--ink)] peer-checked:text-[var(--bg)] peer-checked:border-[var(--ink)] peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--orange)] peer-focus-visible:outline-offset-2">
                  {item}
                </span>
              </label>
            ))}
          </div>
          {state.fieldErrors?.interests && (
            <div
              id="interests-error"
              aria-live="polite"
              className="flex items-center gap-1.5 mt-2 text-sm font-semibold text-[var(--ink)]"
            >
              <AlertCircle
                size={16}
                className="text-[var(--ink)] shrink-0"
                aria-hidden="true"
              />
              <span>{state.fieldErrors.interests}</span>
            </div>
          )}
        </fieldset>

        {/* g) WhatsApp or phone (optional) */}
        <div>
          <label
            htmlFor="contact-phone"
            className="block font-semibold text-[var(--ink)] mb-2"
          >
            WhatsApp or phone (optional)
          </label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            defaultValue={state.values?.phone ?? ""}
            aria-invalid={Boolean(state.fieldErrors?.phone)}
            aria-describedby={
              state.fieldErrors?.phone ? "phone-error" : "phone-helper"
            }
            className="w-full bg-[var(--surface)] border border-[var(--line)] rounded-[14px] px-4 py-3.5 text-base text-[var(--ink)] outline-none focus:outline-2 focus:outline-[var(--orange)] focus:outline-offset-2 transition-shadow"
          />
          <p
            id="phone-helper"
            className="text-[var(--muted)] text-[0.875rem] mt-1.5"
          >
            Only if you’d rather we reached out there.
          </p>
          {state.fieldErrors?.phone && (
            <div
              id="phone-error"
              aria-live="polite"
              className="flex items-center gap-1.5 mt-2 text-sm font-semibold text-[var(--ink)]"
            >
              <AlertCircle
                size={16}
                className="text-[var(--ink)] shrink-0"
                aria-hidden="true"
              />
              <span>{state.fieldErrors.phone}</span>
            </div>
          )}
        </div>

        {/* h) Submit button & muted text */}
        <div className="pt-2">
          <SubmitButton />
          <p className="text-[var(--muted)] text-sm mt-3">
            We’ll only use your details to reply to you.
          </p>
        </div>
      </form>
    </div>
  );
}
