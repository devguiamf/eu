"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";

interface MotionPreferenceValue {
  /** True if the OS/browser requests reduced motion. Disables Lenis, snap, and parallax entirely. */
  reducedMotion: boolean;
  /** True at or below the mobile breakpoint. */
  isMobile: boolean;
  /**
   * Multiplier for parallax travel distance: 1 on full desktop, 0 on mobile
   * or reduced motion. Consumers multiply their depth by this factor rather
   * than branching, so "disabling" parallax is just a value of zero.
   */
  parallaxFactor: number;
  /** True when tilt/magnetic pointer-driven micro-interactions should run. */
  pointerEffectsEnabled: boolean;
}

const MotionPreferenceContext = createContext<MotionPreferenceValue | null>(null);

export function MotionPreferenceProvider({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const value = useMemo<MotionPreferenceValue>(
    () => ({
      reducedMotion,
      isMobile,
      parallaxFactor: reducedMotion || isMobile ? 0 : 1,
      pointerEffectsEnabled: !reducedMotion && !isMobile,
    }),
    [reducedMotion, isMobile],
  );

  return (
    <MotionPreferenceContext.Provider value={value}>{children}</MotionPreferenceContext.Provider>
  );
}

export function useMotionPreference() {
  const ctx = useContext(MotionPreferenceContext);
  if (!ctx) {
    throw new Error("useMotionPreference must be used within a MotionPreferenceProvider");
  }
  return ctx;
}
