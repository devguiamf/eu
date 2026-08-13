"use client";

import {
  useCallback,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { createPortal } from "react-dom";
import { MediaSlot } from "@/components/motion/MediaSlot";
import { useMotionPreference } from "@/components/providers/MotionPreferenceProvider";
import { cn } from "@/lib/utils";

const STRIP_COUNT = 14;
const PULL_THRESHOLD = 110;
const REST_CORD = 32;
const SHAKE_MS = 0.5;
const FALL_BASE_DELAY = 0.35;
const FALL_DURATION = 2.35;
const FALL_EASE = [0.16, 1, 0.3, 1] as const;

interface StripPlan {
  id: number;
  startLeft: number;
  startTop: number;
  width: number;
  height: number;
  endX: number;
  endY: number;
  settleLeft: number;
  settleTop: number;
  rotate: number;
  delay: number;
}

interface ShreddablePortraitProps {
  src?: string;
  alt: string;
  className?: string;
  children?: ReactNode;
}

function buildStripPlans(frame: DOMRect, contato: DOMRect, count: number): StripPlan[] {
  const stripW = frame.width / count;
  const floorBand = Math.min(frame.height * 0.42, 120);

  return Array.from({ length: count }, (_, i) => {
    const drift = (Math.random() - 0.5) * 40;
    const pile = Math.random() * 28;
    const t = count === 1 ? 0.5 : i / (count - 1);
    const endX = contato.left + contato.width * (0.12 + t * 0.76) + drift;
    const endY = contato.bottom - floorBand - pile;

    return {
      id: i,
      startLeft: frame.left + i * stripW,
      startTop: frame.top,
      width: stripW + 0.5,
      height: frame.height,
      endX,
      endY,
      settleLeft: endX - contato.left,
      settleTop: endY - contato.top,
      rotate: (Math.random() - 0.5) * 36,
      delay: FALL_BASE_DELAY + i * 0.055 + Math.random() * 0.05,
    };
  });
}

/**
 * Portrait with a pull-cord easter egg: drag the handle past a threshold and
 * the photo shreds into strips that fall to the Contato section floor until reload.
 */
export function ShreddablePortrait({ src, alt, className, children }: ShreddablePortraitProps) {
  const { reducedMotion } = useMotionPreference();
  const frameRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const startClientY = useRef(0);
  const pullAtPointerDown = useRef(0);
  const shredLocked = useRef(false);
  const landedIds = useRef(new Set<number>());

  const [dragging, setDragging] = useState(false);
  const [shredding, setShredding] = useState(false);
  const [shredded, setShredded] = useState(false);
  const [settled, setSettled] = useState(false);
  const [strips, setStrips] = useState<StripPlan[]>([]);
  const [floorEl, setFloorEl] = useState<HTMLElement | null>(null);

  const pullY = useMotionValue(0);
  const springPull = useSpring(pullY, { stiffness: 420, damping: 28, mass: 0.7 });
  const shakeX = useMotionValue(0);
  const frameScaleY = useMotionValue(1);

  const handleStripLanded = useCallback((id: number) => {
    if (landedIds.current.has(id)) return;
    landedIds.current.add(id);
    if (landedIds.current.size < STRIP_COUNT) return;
    const floor = document.querySelector<HTMLElement>("#contato [data-shred-floor]");
    if (floor) setFloorEl(floor);
    setSettled(true);
  }, []);

  const triggerShred = useCallback(() => {
    if (shredLocked.current || !src || !frameRef.current) return;
    const contato = document.getElementById("contato");
    if (!contato) return;

    shredLocked.current = true;
    draggingRef.current = false;
    setDragging(false);
    landedIds.current = new Set();

    const frame = frameRef.current.getBoundingClientRect();
    const contatoRect = contato.getBoundingClientRect();
    const plans = buildStripPlans(frame, contatoRect, STRIP_COUNT);
    setStrips(plans);
    setShredding(true);

    void animate(pullY, 0, { type: "spring", stiffness: 500, damping: 40 });
    void animate(frameScaleY, [1, 0.94, 1.02, 1], {
      duration: 0.45,
      ease: [0.34, 1.4, 0.64, 1],
    });
    void animate(shakeX, [0, -7, 7, -6, 5, -3, 2, 0], {
      duration: SHAKE_MS,
      ease: "easeInOut",
    }).then(() => {
      setShredded(true);
      setShredding(false);
    });
  }, [pullY, frameScaleY, shakeX, src]);

  const onPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (shredLocked.current || reducedMotion || !src) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    draggingRef.current = true;
    setDragging(true);
    startClientY.current = event.clientY;
    pullAtPointerDown.current = pullY.get();
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!draggingRef.current || shredLocked.current) return;
    const raw = Math.max(0, event.clientY - startClientY.current + pullAtPointerDown.current);
    const resisted =
      raw <= PULL_THRESHOLD ? raw : PULL_THRESHOLD + (raw - PULL_THRESHOLD) * 0.22;
    pullY.set(resisted);
    if (raw >= PULL_THRESHOLD) {
      triggerShred();
    }
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setDragging(false);
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      /* already released */
    }
    if (!shredLocked.current) {
      void animate(pullY, 0, { type: "spring", stiffness: 380, damping: 16, mass: 0.85 });
    }
  };

  if (reducedMotion || !src) {
    return (
      <div className={cn("aspect-[4/5] overflow-hidden rounded-sm border border-line", className)}>
        <div className="group relative h-full w-full">
          <MediaSlot alt={alt} variant="conic" type="gif" src={src} className="h-full w-full" />
          {children}
        </div>
      </div>
    );
  }

  const cordVisible = !shredded && !shredding;
  const showOverlay = Boolean(children) && !dragging && !shredding && !shredded;

  return (
    <>
      <div className={cn("relative", className)}>
        <motion.div
          ref={frameRef}
          className="aspect-[4/5] overflow-hidden rounded-sm border border-line bg-ink"
          style={{ x: shakeX, scaleY: frameScaleY }}
        >
          <div className="group relative h-full w-full">
            {!shredding && !shredded ? (
              <MediaSlot alt={alt} variant="conic" type="gif" src={src} className="h-full w-full" />
            ) : (
              <div className="absolute inset-0 bg-ink" aria-hidden />
            )}
            {showOverlay ? children : null}
          </div>
        </motion.div>

        {cordVisible && (
          <div className="absolute left-1/2 top-full z-30 flex -translate-x-1/2 flex-col items-center">
            <CordVisual pullMotion={springPull} />
            <button
              type="button"
              aria-label="Puxar corda"
              className="pointer-events-auto -mt-0.5 flex h-[22px] w-[22px] shrink-0 cursor-grab touch-none items-center justify-center rounded-full border border-accent/80 bg-paper shadow-[0_2px_8px_rgba(0,0,0,0.35)] active:cursor-grabbing"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              <span className="block h-2 w-2 rounded-full border border-accent/70 bg-accent/30" aria-hidden />
            </button>
          </div>
        )}
      </div>

      {typeof document !== "undefined" &&
        !settled &&
        strips.length > 0 &&
        createPortal(
          <motion.div
            className="pointer-events-none fixed inset-0 z-50 overflow-visible"
            style={{ x: shredding ? shakeX : 0 }}
            aria-hidden
          >
            {strips.map((strip) => (
              <FlyingStrip
                key={strip.id}
                src={src}
                strip={strip}
                count={STRIP_COUNT}
                onLanded={handleStripLanded}
              />
            ))}
          </motion.div>,
          document.body,
        )}

      {typeof document !== "undefined" &&
        settled &&
        floorEl &&
        strips.length > 0 &&
        createPortal(
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            {strips.map((strip) => (
              <SettledStrip key={strip.id} src={src} strip={strip} count={STRIP_COUNT} />
            ))}
          </div>,
          floorEl,
        )}
    </>
  );
}

function CordVisual({ pullMotion }: { pullMotion: MotionValue<number> }) {
  const height = useTransform(pullMotion, (v) => REST_CORD + Math.max(0, v));

  return (
    <motion.div
      style={{ height }}
      className="w-[1.5px] rounded-full bg-gradient-to-b from-accent to-[#8a7048]"
      aria-hidden
    />
  );
}

function stripBackground(src: string, id: number, count: number) {
  const bgPos = count === 1 ? "0% 0" : `${(id / (count - 1)) * 100}% 0`;
  return {
    backgroundImage: `url(${src})`,
    backgroundSize: `${count * 100}% 100%`,
    backgroundPosition: bgPos,
    backgroundRepeat: "no-repeat" as const,
    boxShadow: "1px 0 0 rgba(10,10,12,0.15)",
  };
}

function FlyingStrip({
  src,
  strip,
  count,
  onLanded,
}: {
  src: string;
  strip: StripPlan;
  count: number;
  onLanded: (id: number) => void;
}) {
  const dy = strip.endY - strip.startTop;

  return (
    <motion.div
      className="fixed origin-top will-change-transform"
      style={{
        left: strip.startLeft,
        top: strip.startTop,
        width: strip.width,
        height: strip.height,
        ...stripBackground(src, strip.id, count),
      }}
      initial={{ x: 0, y: 0, rotate: 0 }}
      animate={{
        x: strip.endX - strip.startLeft,
        y: [0, dy + 3, dy],
        rotate: strip.rotate,
      }}
      transition={{
        delay: strip.delay,
        duration: FALL_DURATION,
        ease: FALL_EASE,
        y: {
          delay: strip.delay,
          duration: FALL_DURATION,
          times: [0, 0.92, 1],
          ease: FALL_EASE,
        },
      }}
      onAnimationComplete={() => onLanded(strip.id)}
    />
  );
}

function SettledStrip({
  src,
  strip,
  count,
}: {
  src: string;
  strip: StripPlan;
  count: number;
}) {
  return (
    <div
      className="absolute origin-top"
      style={{
        left: strip.settleLeft,
        top: strip.settleTop,
        width: strip.width,
        height: strip.height,
        transform: `rotate(${strip.rotate}deg)`,
        ...stripBackground(src, strip.id, count),
      }}
    />
  );
}
