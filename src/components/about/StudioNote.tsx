import React from "react";
import { Reveal } from "@/components/ui/Reveal";
import { showContinuityNote } from "@/data/about";

export function StudioNote() {
  return (
    <section className="w-full bg-[var(--orange-tint)] py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="max-w-[44rem]">
          <Reveal>
            <h2 className="text-[var(--ink)]">How the studio works</h2>

            <div className="mt-6 flex flex-col gap-5 text-[1.125rem] text-[var(--ink)] leading-relaxed">
              <p>
                Orvilyn is an independent studio, founded by me. You deal with me
                directly, from the first call to launch day and after.
              </p>

              {/* TODO: keep "you’ll always know" only if you will tell clients whenever a collaborator joins their project. */}
              <p>
                On bigger projects I bring in trusted collaborators, so nothing
                waits on one pair of hands. You’ll always know who is working on
                your project.
              </p>

              {showContinuityNote && (
                <p>
                  Everything I build comes with documentation, and you own the
                  code. If life ever gets in the way, a collaborator can step in
                  without starting from scratch.
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
