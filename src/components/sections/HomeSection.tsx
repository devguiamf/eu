"use client";

import { motion } from "motion/react";
import { SectionShell } from "@/components/layout/SectionShell";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { Reveal } from "@/components/motion/Reveal";
import { KineticText } from "@/components/motion/KineticText";
import { MediaSlot } from "@/components/motion/MediaSlot";
import { useMotionPreference } from "@/components/providers/MotionPreferenceProvider";
import { profile } from "@/content/profile";

/**
 * Section 1 — Home. A looping media layer sits behind the kinetic name entrance,
 * drifting at a different scroll speed than the text above it (background vs.
 * foreground parallax depth).
 */
export function HomeSection() {
  const { reducedMotion } = useMotionPreference();

  return (
    <SectionShell id="home" label="Início" className="items-center justify-center bg-ink">
      <ParallaxLayer depth={-0.6} className="absolute inset-x-0 -top-[15%] h-[130%]">
        <MediaSlot
          alt="Efeito visual animado de fundo"
          variant="aurora"
          src={profile.heroMediaSrc}
          type={profile.heroMediaType ?? "video"}
          className="h-full w-full"
        />
      </ParallaxLayer>

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/60"
      />

      <ParallaxLayer
        depth={0.3}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <Reveal
          as="p"
          className="mb-5 font-mono text-xs uppercase tracking-[0.5em] text-accent"
        >
          {profile.welcome}
        </Reveal>

        <KineticText
          as="h1"
          text={profile.name}
          className="justify-center font-display text-[15vw] font-medium leading-[0.95] text-paper sm:text-[10vw] lg:text-[7.5vw]"
        />

        <Reveal
          delay={0.7}
          as="p"
          className="mt-7 max-w-xl text-balance font-sans text-base text-paper-dim sm:text-lg"
        >
          {profile.tagline}
        </Reveal>
      </ParallaxLayer>

      <Reveal
        delay={1.1}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-paper-dim"
      >
        <div className="flex flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.35em]">
          <span>Role para explorar</span>
          <motion.span
            className="h-8 w-px bg-paper-dim/50"
            style={{ transformOrigin: "top" }}
            animate={reducedMotion ? undefined : { scaleY: [0.3, 1, 0.3] }}
            transition={
              reducedMotion ? undefined : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
            }
          />
        </div>
      </Reveal>
    </SectionShell>
  );
}
