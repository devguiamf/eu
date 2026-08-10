"use client";

import Lenis from "lenis";
import Snap from "lenis/snap";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useMotionPreference } from "./MotionPreferenceProvider";

interface SmoothScrollValue {
  lenis: Lenis | null;
  snap: Snap | null;
}

const EMPTY_VALUE: SmoothScrollValue = { lenis: null, snap: null };

const SmoothScrollContext = createContext<SmoothScrollValue>(EMPTY_VALUE);

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Owns the Lenis smooth-scroll instance and the lenis/snap plugin that
 * provides section snapping (CSS scroll-snap fights Lenis's virtual scroll,
 * so snapping is delegated to Lenis itself).
 *
 * Lenis is a genuine external system — it must be created and torn down as
 * a side effect, not derived during render — so it's exposed to the tree
 * via `useSyncExternalStore` rather than effect + setState.
 *
 * When the user prefers reduced motion, Lenis is never instantiated at all:
 * the page falls back to plain native scrolling with no snapping.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const { reducedMotion } = useMotionPreference();
  const valueRef = useRef<SmoothScrollValue>(EMPTY_VALUE);

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (reducedMotion) {
        valueRef.current = EMPTY_VALUE;
        onStoreChange();
        return () => {};
      }

      const lenis = new Lenis({
        duration: 1.1,
        easing: easeOutCubic,
        smoothWheel: true,
        touchMultiplier: 1.5,
      });

      const panels = Array.from(document.querySelectorAll<HTMLElement>("[data-snap-panel]"));
      const snap = new Snap(lenis, { type: "mandatory", duration: 1, easing: easeOutCubic });
      snap.addElements(panels, { align: ["start"] });

      let frameId = requestAnimationFrame(function raf(time) {
        lenis.raf(time);
        frameId = requestAnimationFrame(raf);
      });

      valueRef.current = { lenis, snap };
      onStoreChange();

      return () => {
        cancelAnimationFrame(frameId);
        snap.destroy();
        lenis.destroy();
        valueRef.current = EMPTY_VALUE;
      };
    },
    [reducedMotion],
  );

  const getSnapshot = useCallback(() => valueRef.current, []);
  const getServerSnapshot = useCallback(() => EMPTY_VALUE, []);

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
}
