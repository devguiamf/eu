"use client";

import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { DiscordIcon, EmailIcon, LinkedinIcon } from "@/components/icons/ContactIcons";
import { NOISE_DATA_URI } from "@/lib/noise";
import { contactChannels, type ContactChannel } from "@/content/contact";
import { profile } from "@/content/profile";

const ICONS: Record<ContactChannel["id"], typeof DiscordIcon> = {
  discord: DiscordIcon,
  linkedin: LinkedinIcon,
  email: EmailIcon,
};

/**
 * Section 5 — Contato. Big centered CTA with three magnetic channel buttons
 * over an ember-toned glow and grain texture that ties back to the rest of
 * the site.
 */
export function ContatoSection() {
  return (
    <SectionShell id="contato" label="Contato" className="items-center justify-center bg-ink">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{ backgroundImage: `url("${NOISE_DATA_URI}")` }}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.4em] text-accent">
          Vamos conversar
        </Reveal>

        <Reveal
          delay={0.1}
          as="h2"
          className="mt-4 text-balance font-display text-4xl text-paper sm:text-6xl"
        >
          Bora criar algo <span className="italic text-accent">memorável</span>?
        </Reveal>

        <Reveal
          delay={0.2}
          as="p"
          className="mt-5 max-w-md text-balance text-sm text-paper-dim sm:text-base"
        >
          Estou aberto a novos projetos, colaborações e boas conversas sobre tecnologia e design.
        </Reveal>

        <StaggerGroup
          className="mt-12 flex flex-wrap items-center justify-center gap-5 sm:gap-8"
          stagger={0.08}
        >
          {contactChannels.map((channel) => {
            const Icon = ICONS[channel.id];
            const isExternal = channel.id !== "email";
            return (
              <StaggerItem key={channel.id}>
                <MagneticButton
                  href={channel.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  aria-label={`${channel.label}: ${channel.handle}`}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-line px-8 py-7 text-paper hover:border-accent hover:text-accent"
                >
                  <Icon className="h-7 w-7 transition-transform duration-300 group-hover:-translate-y-1" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.3em]">
                    {channel.label}
                  </span>
                  <span className="text-xs text-paper-dim transition-colors duration-300 group-hover:text-accent/80">
                    {channel.handle}
                  </span>
                </MagneticButton>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <Reveal
          delay={0.4}
          as="p"
          className="mt-16 font-mono text-[11px] uppercase tracking-[0.3em] text-paper-dim/60"
        >
          © {new Date().getFullYear()} {profile.name}
        </Reveal>
      </div>
    </SectionShell>
  );
}
