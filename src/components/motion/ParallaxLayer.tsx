"use client";

import type { ReactNode } from "react";
import { motion, useTransform } from "motion/react";
import { useSectionRef } from "@/components/layout/SectionShell";
import { useSectionProgress } from "@/hooks/useSectionProgress";
import { useMotionPreference } from "@/components/providers/MotionPreferenceProvider";
import { cn } from "@/lib/utils";

interface ParallaxLayerProps {
  /**
   * Relative travel speed, roughly -1..1. Negative depths (background) move
   * opposite/slower to positive depths (foreground), creating layered depth.
   */
  depth: number;
  /** Max travel distance as a percentage of the layer's own size at depth = 1. */
  range?: number;
  className?: string;
  children: ReactNode;
}

/**
 * Moves its content vertically based on the enclosing section's own scroll
 * progress (not the page's), scaled by `depth` and zeroed out on mobile or
 * under reduced motion via `parallaxFactor`.
 */
export function ParallaxLayer({ depth, range = 16, className, children }: ParallaxLayerProps) {
  const sectionRef = useSectionRef();
  const { scrollYProgress } = useSectionProgress(sectionRef);
  const { parallaxFactor, reducedMotion } = useMotionPreference();
  const travel = depth * range * parallaxFactor;
  const y = useTransform(scrollYProgress, [0, 1], [`${-travel}%`, `${travel}%`]);

  if (reducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div style={{ y }} className={cn(className)}>
      {children}
    </motion.div>
  );
}
