"use client";

import { useRef, type PointerEvent, type ReactNode, type RefObject } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useMotionPreference } from "@/components/providers/MotionPreferenceProvider";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  /** How strongly the button follows the cursor, 0..1. */
  strength?: number;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

/**
 * Pulls itself toward the cursor within its own bounds and springs back on
 * leave. Disabled on mobile and under reduced motion, where it's a static
 * link/button with only a CSS color transition.
 */
export function MagneticButton({
  children,
  className,
  href,
  onClick,
  strength = 0.4,
  target,
  rel,
  ...ariaProps
}: MagneticButtonProps) {
  const { pointerEffectsEnabled } = useMotionPreference();
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function handlePointerMove(event: PointerEvent<HTMLAnchorElement | HTMLButtonElement>) {
    if (!pointerEffectsEnabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  const sharedProps = {
    onPointerMove: handlePointerMove,
    onPointerLeave: handlePointerLeave,
    onClick,
    className: cn(
      "relative inline-flex items-center justify-center transition-colors duration-300",
      className,
    ),
    style: pointerEffectsEnabled ? { x: springX, y: springY } : undefined,
    ...ariaProps,
  };

  if (href) {
    return (
      <motion.a
        ref={ref as RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        {...sharedProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button ref={ref as RefObject<HTMLButtonElement>} type="button" {...sharedProps}>
      {children}
    </motion.button>
  );
}
