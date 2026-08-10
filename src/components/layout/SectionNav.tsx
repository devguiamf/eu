"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { useMotionPreference } from "@/components/providers/MotionPreferenceProvider";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion-tokens";

export interface SectionNavItem {
  id: string;
  label: string;
}

interface SectionNavProps {
  items: SectionNavItem[];
}

/**
 * Fixed dot navigation. Tracks the most visible `data-nav-group` via a single
 * IntersectionObserver and scrolls to the first panel of a group on click,
 * through Lenis when available or native `scrollIntoView` otherwise.
 */
export function SectionNav({ items }: SectionNavProps) {
  const { lenis } = useSmoothScroll();
  const { reducedMotion } = useMotionPreference();
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const elementGroups = new Map<Element, string>();
    for (const item of items) {
      document.querySelectorAll(`[data-nav-group="${item.id}"]`).forEach((el) => {
        elementGroups.set(el, item.id);
      });
    }

    const visibleRatios = new Map<Element, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibleRatios.set(entry.target, entry.intersectionRatio);
        }

        const totals = new Map<string, number>();
        visibleRatios.forEach((ratio, el) => {
          const groupId = elementGroups.get(el);
          if (!groupId) return;
          totals.set(groupId, Math.max(totals.get(groupId) ?? 0, ratio));
        });

        let bestId = "";
        let bestRatio = 0.15;
        totals.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });
        if (bestId) setActiveId(bestId);
      },
      { threshold: [0, 0.15, 0.3, 0.5, 0.75, 1] },
    );

    elementGroups.forEach((_, el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  function goTo(id: string) {
    const target = document.querySelector<HTMLElement>(`[data-nav-group="${id}"]`);
    if (!target) return;

    if (lenis) {
      lenis.scrollTo(target, {
        duration: 1.2,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });
    } else {
      target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    }
  }

  return (
    <nav
      aria-label="Navegação de seções"
      className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-4 md:flex lg:right-8"
    >
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => goTo(item.id)}
            aria-label={item.label}
            aria-current={isActive}
            className="group relative flex h-6 w-6 items-center justify-center"
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full border border-paper/40 transition-colors duration-300",
                isActive ? "bg-accent border-accent" : "bg-transparent group-hover:border-paper/80",
              )}
            />
            {isActive && (
              <motion.span
                layoutId="section-nav-ring"
                className="absolute inset-0 rounded-full border border-accent/60"
                transition={{ duration: 0.4, ease: EASE.signature }}
              />
            )}
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-ink/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/70 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
