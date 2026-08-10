"use client";

import { SectionShell } from "@/components/layout/SectionShell";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { MediaSlot } from "@/components/motion/MediaSlot";
import { profile } from "@/content/profile";
import { timeline } from "@/content/timeline";

/**
 * Section 2 — Trajetória. A faint oversized watermark drifts slowly in the
 * background, the portrait sits at a mid depth, and the timeline column
 * (independent internal scroll) cascades in as the panel enters view.
 */
export function TrajetoriaSection() {
  return (
    <SectionShell id="trajetoria" label="Trajetória" className="bg-ink">
      <ParallaxLayer
        depth={-0.4}
        className="pointer-events-none absolute inset-x-0 -top-[10%] flex h-[120%] items-center justify-center"
      >
        <span className="select-none whitespace-nowrap font-display text-[22vw] font-medium text-paper/[0.04] lg:text-[16vw]">
          TRAJETÓRIA
        </span>
      </ParallaxLayer>

      <div
        data-lenis-prevent
        className="scrollbar-thin relative z-10 mx-auto grid h-full w-full max-w-6xl grid-cols-1 items-start gap-6 overflow-y-auto px-6 py-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16 lg:overflow-visible lg:px-10 lg:py-24"
      >
        <ParallaxLayer depth={0.45} className="flex flex-col gap-5 lg:gap-6">
          <Reveal className="aspect-[4/5] w-40 overflow-hidden rounded-sm border border-line sm:w-56 lg:w-full lg:max-w-sm">
            <MediaSlot
              alt={`Retrato de ${profile.name}`}
              variant="conic"
              type="gif"
              src={profile.portraitSrc}
              className="h-full w-full"
            />
          </Reveal>

          <Reveal delay={0.15} className="max-w-sm">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
              {profile.location}
            </p>
            <h2 className="mt-3 font-display text-xl text-paper lg:text-2xl">{profile.role}</h2>
            <div className="mt-3 hidden flex-col gap-2 text-sm leading-relaxed text-paper-dim sm:flex">
              {profile.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </ParallaxLayer>

        <div className="flex flex-col lg:h-full lg:max-h-full lg:justify-center">
          <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.4em] text-accent">
            Minha jornada
          </Reveal>
          <Reveal delay={0.1} as="h2" className="mt-3 font-display text-3xl text-paper sm:text-4xl lg:text-5xl">
            Trajetória
          </Reveal>

          <div className="scrollbar-thin mt-6 lg:mt-8 lg:max-h-[50vh] lg:overflow-y-auto lg:pr-4">
            <StaggerGroup as="ul" stagger={0.1} delayChildren={0.25} className="flex flex-col gap-5 lg:gap-6">
              {timeline.map((milestone) => (
                <StaggerItem key={milestone.year} as="li" className="border-l border-line pl-5">
                  <p className="font-mono text-sm text-accent">{milestone.year}</p>
                  <h3 className="mt-1 font-display text-lg text-paper">{milestone.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-paper-dim">
                    {milestone.description}
                  </p>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
