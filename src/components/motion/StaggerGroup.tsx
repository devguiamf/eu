"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import { useMotionPreference } from "@/components/providers/MotionPreferenceProvider";
import { DURATION, EASE, STAGGER } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

type StaggerTag = "div" | "ul" | "ol";
type ItemTag = "div" | "li" | "article";

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  as?: StaggerTag;
  /** Delay between each child's entrance, in seconds. */
  stagger?: number;
  delayChildren?: number;
  amount?: number;
  once?: boolean;
}

/**
 * Parent for `StaggerItem` children. Applies Motion's variant propagation:
 * children inherit "hidden"/"visible" from this element's `whileInView`
 * state, entering in a cascade rather than all at once.
 */
export function StaggerGroup({
  children,
  className,
  as = "div",
  stagger = STAGGER.standard,
  delayChildren = 0,
  amount = 0.2,
  once = true,
}: StaggerGroupProps) {
  const { reducedMotion } = useMotionPreference();
  const MotionComponent = motion[as];

  const variants: Variants = {
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : stagger,
        delayChildren: reducedMotion ? 0 : delayChildren,
      },
    },
  };

  return (
    <MotionComponent
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </MotionComponent>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: ItemTag;
}

/** A single cascading entry inside a `StaggerGroup`. */
export function StaggerItem({ children, className, as = "div" }: StaggerItemProps) {
  const { reducedMotion } = useMotionPreference();
  const MotionComponent = motion[as];

  const variants: Variants = reducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: DURATION.reduced, ease: EASE.linear } },
      }
    : {
        hidden: { opacity: 0, y: 24, scale: 0.98 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: DURATION.standard, ease: EASE.signature },
        },
      };

  return (
    <MotionComponent className={cn(className)} variants={variants}>
      {children}
    </MotionComponent>
  );
}
