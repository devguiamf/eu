"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMotionPreference } from "@/components/providers/MotionPreferenceProvider";
import { DURATION, EASE } from "@/lib/motion-tokens";

interface CatRunProps {
  active: boolean;
  onComplete: () => void;
}

/**
 * Easter-egg overlay: cat.gif enters from the bottom-right, crosses left, and exits.
 * Under reduced motion, fades in place at the corner then out — no slide.
 */
export function CatRun({ active, onComplete }: CatRunProps) {
  const { reducedMotion } = useMotionPreference();

  return (
    <AnimatePresence>
      {active &&
        (reducedMotion ? (
          <motion.img
            key="cat-run-reduced"
            src="/media/cat.gif"
            alt=""
            aria-hidden
            className="pointer-events-none fixed bottom-6 right-6 z-[100] w-36 select-none sm:w-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: DURATION.slow + 0.4,
              ease: EASE.linear,
              times: [0, 0.2, 0.75, 1],
            }}
            onAnimationComplete={onComplete}
          />
        ) : (
          <motion.img
            key="cat-run"
            src="/media/cat.gif"
            alt=""
            aria-hidden
            className="pointer-events-none fixed bottom-6 left-0 z-[100] w-36 select-none sm:w-40"
            initial={{ x: "100vw" }}
            animate={{ x: "-10rem" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 7, ease: EASE.signature }}
            onAnimationComplete={onComplete}
          />
        ))}
    </AnimatePresence>
  );
}
