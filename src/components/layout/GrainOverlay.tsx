"use client";

import { motion } from "motion/react";
import { useMotionPreference } from "@/components/providers/MotionPreferenceProvider";
import { NOISE_DATA_URI } from "@/lib/noise";
import { cn } from "@/lib/utils";

/**
 * Global cinematic film-grain layer. Subtle and static under reduced motion,
 * gently drifting otherwise. Sits above every section for a consistent
 * texture across the whole site.
 */
export function GrainOverlay({ className }: { className?: string }) {
  const { reducedMotion } = useMotionPreference();

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-[60] overflow-hidden opacity-[0.05] mix-blend-overlay",
        className,
      )}
    >
      <motion.div
        className="absolute -inset-1/2"
        style={{ backgroundImage: `url("${NOISE_DATA_URI}")`, backgroundRepeat: "repeat" }}
        animate={
          reducedMotion
            ? undefined
            : { x: ["0%", "-4%", "3%", "-2%", "0%"], y: ["0%", "3%", "-3%", "2%", "0%"] }
        }
        transition={reducedMotion ? undefined : { duration: 1.6, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
