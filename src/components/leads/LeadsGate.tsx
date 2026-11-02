"use client";

import React, { useState, useTransition } from "react";
import { Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { loginLeadsAction } from "@/app/leads/actions";

export function LeadsGate() {
  const [passcode, setPasscode] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setError("Enter passcode to unlock");
      return;
    }
    setError(null);

    startTransition(async () => {
      const res = await loginLeadsAction(passcode);
      if (!res.success) {
        setError(res.error || "Incorrect passcode");
      }
    });
  };

  return (
    <section className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-8 sm:p-10 shadow-[var(--shadow-card)]">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-[var(--orange-tint)] flex items-center justify-center text-[var(--orange-strong)] mb-4">
            <Lock size={26} aria-hidden="true" />
          </div>
          <h1 className="font-[var(--font-display)] text-2xl font-bold text-[var(--ink)] tracking-tight">
            Leads
          </h1>
          <p className="text-[var(--muted)] text-sm mt-1.5">
            Enter your passcode to view client inquiries.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <input
                type={showPasscode ? "text" : "password"}
                autoFocus
                autoComplete="current-password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Passcode"
                className="w-full bg-[var(--bg)] border border-[var(--line)] rounded-xl px-4 py-3.5 pr-11 text-base text-[var(--ink)] placeholder:text-[var(--muted)]/60 focus:border-[var(--orange)] focus:bg-[var(--surface)] transition-colors duration-150 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPasscode(!showPasscode)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--ink)] transition-colors duration-150 p-1"
                aria-label={showPasscode ? "Hide passcode" : "Show passcode"}
              >
                {showPasscode ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {error && (
              <p className="text-sm font-medium text-red-600 mt-2 text-left" role="alert">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full h-12 bg-[var(--orange)] hover:bg-[var(--orange-strong)] text-[var(--on-orange)] font-semibold rounded-xl flex items-center justify-center gap-2 select-none transition-[background-color,transform] duration-160 active:scale-[0.97] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span>{isPending ? "Checking..." : "Unlock"}</span>
            {!isPending && <ArrowRight size={18} aria-hidden="true" />}
          </button>
        </form>
      </div>
    </section>
  );
}
