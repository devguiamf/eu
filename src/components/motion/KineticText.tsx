"use client";

import { motion } from "motion/react";
import { useMotionPreference } from "@/components/providers/MotionPreferenceProvider";
import { DURATION, EASE, STAGGER } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

type KineticTag = "h1" | "h2" | "p" | "span";

interface KineticTextProps {
  text: string;
  as?: KineticTag;
  className?: string;
  /** Per-word inline class, e.g. for accent color on a specific word via a separate call. */
  wordClassName?: string;
  delay?: number;
}

/**
 * Word-by-word masked rise entrance for the hero name. Each word sits in an
 * `overflow-hidden` mask so it appears to rise up into place. Falls back to
 * a single opacity fade under reduced motion.
 */
export function KineticText({ text, as = "span", className, wordClassName, delay = 0 }: KineticTextProps) {
  const { reducedMotion } = useMotionPreference();
  const words = text.split(" ");
  const Wrapper = motion[as];

  if (reducedMotion) {
    return (
      <Wrapper
        className={cn(className)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DURATION.reduced, ease: EASE.linear, delay: 0 }}
      >
        {text}
      </Wrapper>
    );
  }

  return (
    <Wrapper className={cn("inline-flex flex-wrap", className)}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.12em]">
          <motion.span
            className={cn("inline-block", wordClassName)}
            initial={{ y: "115%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: DURATION.slow,
              ease: EASE.emphasized,
              delay: delay + index * STAGGER.dramatic,
            }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Wrapper>
  );
}
