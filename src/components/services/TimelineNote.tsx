import React from "react";
import Link from "next/link";
import { Zap } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function TimelineNote() {
  return (
    <section className="w-full bg-[var(--surface)] border-t border-[var(--line)] py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 md:p-8 rounded-[24px] bg-[var(--orange-tint)] border border-[var(--line)]">
            <div className="flex items-start gap-4 max-w-[42rem]">
              <div className="w-10 h-10 rounded-full bg-[var(--orange)] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Zap size={20} className="fill-current" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-[1.125rem] font-bold text-[var(--ink)]">
                  Need a faster turnaround?
                </h3>
                <p className="text-[var(--muted)] text-[1rem] mt-1 leading-relaxed">
                  Timelines can be fast-tracked for focused scopes or urgent launches.
                  If you have a hard deadline, tell us up front and we’ll let you know what’s realistically possible.
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center font-bold text-[0.95rem] text-[var(--ink)] bg-[var(--surface)] hover:bg-white border border-[var(--line)] px-5 py-3 rounded-full transition-transform duration-160 ease-out active:scale-[0.97] shrink-0 self-start md:self-auto"
            >
              Discuss your deadline &rarr;
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
