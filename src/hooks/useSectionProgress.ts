"use client";

import type { RefObject } from "react";
import { useScroll } from "motion/react";

/**
 * Local (section-relative) scroll progress, used instead of page-level
 * scroll so parallax and reveal effects are driven by how far a section
 * has travelled through the viewport rather than absolute page position.
 */
export function useSectionProgress(ref: RefObject<HTMLElement | null>) {
  return useScroll({ target: ref, offset: ["start end", "end start"] });
}
