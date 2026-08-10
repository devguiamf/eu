"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useMotionPreference } from "@/components/providers/MotionPreferenceProvider";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  maxTilt?: number;
  glow?: boolean;
}

/**
 * Pointer-driven 3D tilt with a soft radial glow that follows the cursor.
 * Disabled on mobile and under reduced motion, where it renders as a plain
 * static card.
 */
export function TiltCard({ children, className, maxTilt = 9, glow = true }: TiltCardProps) {
  const { pointerEffectsEnabled } = useMotionPreference();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), {
    stiffness: 260,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), {
    stiffness: 260,
    damping: 24,
  });
  const glowX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(py, [0, 1], ["0%", "100%"]);
  const glowBackground = useTransform([glowX, glowY], ([gx, gy]) =>
    `radial-gradient(220px circle at ${gx} ${gy}, color-mix(in oklab, var(--color-accent) 35%, transparent), transparent 70%)`,
  );

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!pointerEffectsEnabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  }

  function handlePointerLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  if (!pointerEffectsEnabled) {
    return (
      <div className={cn("relative", className)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={cn("group relative", className)}
    >
      {children}
      {glow && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glowBackground }}
        />
      )}
    </motion.div>
  );
}
