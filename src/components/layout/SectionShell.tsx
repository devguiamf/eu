"use client";

import { createContext, useContext, useRef, type ReactNode, type RefObject } from "react";
import { cn } from "@/lib/utils";

const SectionRefContext = createContext<RefObject<HTMLElement | null> | null>(null);

/** Gives motion primitives (ParallaxLayer, Reveal, etc.) access to the enclosing section's element without prop drilling. */
export function useSectionRef() {
  const ctx = useContext(SectionRefContext);
  if (!ctx) {
    throw new Error("useSectionRef must be used within a SectionShell");
  }
  return ctx;
}

interface SectionShellProps {
  id: string;
  /** Groups multiple panels (e.g. every project) under one nav dot. Defaults to `id`. */
  navGroup?: string;
  label: string;
  className?: string;
  children: ReactNode;
}

/**
 * One full-viewport panel. Registers itself as a Lenis snap target via
 * `data-snap-panel` and as a nav-tracking target via `data-nav-group`.
 */
export function SectionShell({ id, navGroup, label, className, children }: SectionShellProps) {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      id={id}
      data-snap-panel
      data-nav-group={navGroup ?? id}
      aria-label={label}
      className={cn(
        "relative flex h-dvh min-h-dvh w-full flex-col overflow-hidden",
        className,
      )}
    >
      <SectionRefContext.Provider value={ref}>{children}</SectionRefContext.Provider>
    </section>
  );
}
