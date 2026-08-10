"use client";

import { Fragment, useState, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { SectionShell, useSectionRef } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { MediaSlot } from "@/components/motion/MediaSlot";
import { useMotionPreference } from "@/components/providers/MotionPreferenceProvider";
import { useSectionProgress } from "@/hooks/useSectionProgress";
import { EASE } from "@/lib/motion-tokens";
import { projects, type Project } from "@/content/projects";

/**
 * Section 4 — Projetos. Each project is its OWN full-viewport snap panel
 * (rather than an inner scroller, which would fight the global Lenis snap).
 * As one panel scrolls out and the next scrolls in, both scale/fade against
 * their own local scroll progress, producing the requested sequential
 * parallax slide/scale between projects. A final "selected work" index panel
 * offers a compact list view with a cursor-follow preview.
 */
export function ProjetosSection() {
  return (
    <Fragment>
      {projects.map((project, index) => (
        <SectionShell
          key={project.slug}
          id={`projeto-${project.slug}`}
          navGroup="projetos"
          label={`Projeto: ${project.title}`}
          className="bg-ink"
        >
          <ProjectPanelContent project={project} index={index} total={projects.length} />
        </SectionShell>
      ))}
      <SelectedWorkPanel />
    </Fragment>
  );
}

function ProjectPanelContent({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const sectionRef = useSectionRef();
  const { scrollYProgress } = useSectionProgress(sectionRef);
  const { reducedMotion, parallaxFactor, pointerEffectsEnabled } = useMotionPreference();

  const scaleFloor = 1 - 0.08 * parallaxFactor;
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [scaleFloor, 1, scaleFloor]);
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [`${6 * parallaxFactor}%`, "0%", `${-6 * parallaxFactor}%`],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65, 1], [0.4, 1, 1, 1, 0.4]);

  const content = (
    <div className="group relative h-full w-full">
      <MediaSlot
        alt={project.title}
        variant={project.mediaVariant}
        src={project.mediaSrc}
        type={project.mediaType ?? "video"}
        playOnHover={pointerEffectsEnabled}
        className="h-full w-full"
      />

      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />

      <div className="absolute left-6 top-6 z-10 font-mono text-xs tracking-[0.3em] text-paper-dim lg:left-10 lg:top-10">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 overflow-hidden p-6 lg:p-14">
        <div
          className={
            pointerEffectsEnabled
              ? "translate-y-6 opacity-0 transition-all duration-500 ease-signature group-hover:translate-y-0 group-hover:opacity-100"
              : "translate-y-0 opacity-100"
          }
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            {project.role} · {project.year}
          </p>
          <h3 className="mt-2 font-display text-4xl italic text-paper sm:text-6xl">
            {project.title}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-paper-dim">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line px-3 py-1 font-mono text-[10px] text-paper-dim"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (reducedMotion) {
    return content;
  }

  return (
    <motion.div style={{ scale, y, opacity }} className="h-full w-full">
      {content}
    </motion.div>
  );
}

function SelectedWorkPanel() {
  const { pointerEffectsEnabled } = useMotionPreference();
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 220, damping: 28, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 220, damping: 28, mass: 0.5 });

  const hoveredProject = projects.find((project) => project.slug === hoveredSlug) ?? null;

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    mouseX.set(event.clientX);
    mouseY.set(event.clientY);
  }

  return (
    <SectionShell
      id="projetos-lista"
      navGroup="projetos"
      label="Lista de trabalhos selecionados"
      className="bg-ink"
    >
      <div
        className="relative z-10 mx-auto flex h-full w-full max-w-4xl flex-col justify-center px-6 lg:px-10"
        onMouseMove={pointerEffectsEnabled ? handleMouseMove : undefined}
      >
        <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.4em] text-accent">
          Trabalhos selecionados
        </Reveal>

        <StaggerGroup as="ul" stagger={0.06} className="mt-6 flex flex-col divide-y divide-line">
          {projects.map((project) => (
            <StaggerItem key={project.slug} as="li">
              <a
                href={project.href ?? `#projeto-${project.slug}`}
                onMouseEnter={() => setHoveredSlug(project.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                className="group flex items-center justify-between py-5"
              >
                <span className="font-display text-2xl text-paper transition-colors duration-300 group-hover:text-accent sm:text-3xl">
                  {project.title}
                </span>
                <span className="font-mono text-xs text-paper-dim">{project.year}</span>
              </a>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      {pointerEffectsEnabled && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed z-20 h-40 w-64 overflow-hidden rounded-sm"
          style={{ left: springX, top: springY, x: "-50%", y: "-50%" }}
          animate={{ opacity: hoveredProject ? 1 : 0, scale: hoveredProject ? 1 : 0.92 }}
          transition={{ duration: 0.3, ease: EASE.signature }}
        >
          {hoveredProject && (
            <MediaSlot
              alt={hoveredProject.title}
              variant={hoveredProject.mediaVariant}
              src={hoveredProject.mediaSrc}
              type={hoveredProject.mediaType ?? "video"}
              className="h-full w-full"
            />
          )}
        </motion.div>
      )}
    </SectionShell>
  );
}
