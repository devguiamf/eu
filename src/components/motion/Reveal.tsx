"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useMotionPreference } from "@/components/providers/MotionPreferenceProvider";
import { getEntranceTransition, getEntranceVariants } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

type RevealTag = "div" | "span" | "h1" | "h2" | "h3" | "p" | "li" | "ul" | "article";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Extra delay in seconds, ignored under reduced motion. */
  delay?: number;
  as?: RevealTag;
  /** Fraction of the element that must be visible before it reveals. */
  amount?: number;
  once?: boolean;
}

/**
 * The site's single entrance pattern (rise + fade + scale, or a plain fade
 * under reduced motion), triggered by intersection via Motion's `whileInView`.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  amount = 0.3,
  once = true,
}: RevealProps) {
  const { reducedMotion } = useMotionPreference();
  const MotionComponent = motion[as];

  return (
    <MotionComponent
      className={cn(className)}
      variants={getEntranceVariants(reducedMotion)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={getEntranceTransition(reducedMotion, delay)}
    >
      {children}
    </MotionComponent>
  );
}
