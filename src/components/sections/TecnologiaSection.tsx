"use client";

import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { TiltCard } from "@/components/motion/TiltCard";
import { books, certificates, courses, techStack } from "@/content/stack";

interface StudyEntry {
  title: string;
  meta: string;
}

/**
 * Section 3 — Tecnologia / Estudos. A "backdoor" terminal-flavored panel:
 * tech-stack chips up top, then three scrollable study columns, each item
 * tilting toward the cursor with a soft glow on hover.
 */
export function TecnologiaSection() {
  const courseEntries: StudyEntry[] = courses.map((course) => ({
    title: course.title,
    meta: `${course.institution} · ${course.year}`,
  }));
  const bookEntries: StudyEntry[] = books.map((book) => ({
    title: book.title,
    meta: book.author,
  }));
  const certificateEntries: StudyEntry[] = certificates.map((certificate) => ({
    title: certificate.title,
    meta: `${certificate.issuer} · ${certificate.year}`,
  }));

  return (
    <SectionShell id="tecnologia" label="Tecnologia" className="bg-ink">
      <div
        data-lenis-prevent
        className="scrollbar-thin relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col gap-5 overflow-y-auto px-6 py-14 lg:gap-6 lg:overflow-visible lg:px-10 lg:py-20"
      >
        <div>
          <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.4em] text-accent">
            ./backdoor
          </Reveal>
          <Reveal delay={0.1} as="h2" className="mt-3 font-display text-3xl text-paper sm:text-4xl lg:text-5xl">
            Tecnologia &amp; Estudos
          </Reveal>
        </div>

        <StaggerGroup className="flex flex-wrap gap-2.5" stagger={0.035}>
          {techStack.map((tech) => (
            <StaggerItem key={tech.name}>
              <TiltCard maxTilt={6} glow className="rounded-full border border-line px-4 py-2">
                <span className="font-mono text-xs text-paper">{tech.name}</span>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 lg:min-h-0 lg:flex-1">
          <StudyColumn label="Cursos" entries={courseEntries} />
          <StudyColumn label="Livros" entries={bookEntries} />
          <StudyColumn label="Certificados" entries={certificateEntries} />
        </div>
      </div>
    </SectionShell>
  );
}

function StudyColumn({ label, entries }: { label: string; entries: StudyEntry[] }) {
  return (
    <div className="flex flex-col lg:min-h-0">
      <Reveal as="p" className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-paper-dim">
        {label}
      </Reveal>
      <div className="scrollbar-thin lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-3">
        <StaggerGroup as="ul" stagger={0.05} className="flex flex-col gap-3">
          {entries.map((entry) => (
            <StaggerItem key={entry.title} as="li">
              <TiltCard maxTilt={4} glow className="rounded-sm border border-line p-3">
                <p className="font-display text-sm text-paper">{entry.title}</p>
                <p className="mt-1 font-mono text-[11px] text-paper-dim">{entry.meta}</p>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </div>
  );
}
