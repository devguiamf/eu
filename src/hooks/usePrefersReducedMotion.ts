"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

// Evaluated once per module instance: `undefined` on the server bundle,
// created once on the client bundle and reused across every hook call.
const mediaQueryList = typeof window !== "undefined" ? window.matchMedia(QUERY) : undefined;

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
 * Resolves the user's `prefers-reduced-motion` preference and keeps it in
 * sync if they change it mid-session.
 *
 * Uses `useSyncExternalStore` rather than `useState` + `useEffect`: this is
 * React's sanctioned pattern for a value that can only be known client-side
 * (the server always assumes `false`) — it lets React reconcile the real
 * value right after hydration without emitting a hydration-mismatch error.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
