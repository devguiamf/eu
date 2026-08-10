"use client";

import { useSyncExternalStore } from "react";

const MOBILE_QUERY = "(max-width: 768px)";

const mediaQueryList = typeof window !== "undefined" ? window.matchMedia(MOBILE_QUERY) : undefined;

function subscribe(onChange: () => void) {
  mediaQueryList?.addEventListener("change", onChange);
  return () => mediaQueryList?.removeEventListener("change", onChange);
}

function getSnapshot() {
  return mediaQueryList?.matches ?? false;
}

function getServerSnapshot() {
  return false;
}

/**
 * Tracks whether the viewport is at or below the mobile breakpoint. See
 * `usePrefersReducedMotion` for why this uses `useSyncExternalStore`.
 */
export function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
