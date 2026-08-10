"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useMotionPreference } from "@/components/providers/MotionPreferenceProvider";
import { NOISE_DATA_URI } from "@/lib/noise";
import { EASE } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

export type MediaVariant = "aurora" | "conic" | "grid" | "ember";

interface MediaSlotProps {
  /** Path under /public, e.g. "/media/project-1.mp4". Omit to use the procedural fallback. */
  src?: string;
  type?: "video" | "gif";
  poster?: string;
  alt: string;
  className?: string;
  variant?: MediaVariant;
  /** If true, the video only plays (and scales up) while hovered; otherwise it autoplays looping. */
  playOnHover?: boolean;
  rounded?: string;
}

const VARIANT_GRADIENTS: Record<MediaVariant, string> = {
  aurora: "from-black via-accent/50 to-[#1a1408]",
  conic: "from-white via-[#3b82f6]/45 to-[#1e3a8a]/50",
  grid: "from-[#1c1a16] via-ink to-[#2a2420]",
  ember: "from-[#c65b3a]/25 via-ink to-accent/25",
};

/**
 * A drop-in slot for looping preview media. Renders a `<video>` or animated
 * `<img>` when `src` is supplied; otherwise renders a procedural gradient +
 * grain placeholder in the same aspect so the layout is final before real
 * assets exist. Swapping in real media never requires touching the section
 * component, only the content data file.
 */
export function MediaSlot({
  src,
  type = "video",
  poster,
  alt,
  className,
  variant = "aurora",
  playOnHover = false,
  rounded = "rounded-none",
}: MediaSlotProps) {
  const { reducedMotion } = useMotionPreference();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !playOnHover) return;
    if (hovered && !reducedMotion) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [hovered, playOnHover, reducedMotion]);

  if (src && type === "video") {
    return (
      <motion.div
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        animate={playOnHover ? { scale: hovered && !reducedMotion ? 1.045 : 1 } : undefined}
        transition={{ duration: 0.5, ease: EASE.signature }}
        className={cn("relative overflow-hidden", rounded, className)}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          autoPlay={!playOnHover && !reducedMotion}
          preload="metadata"
          aria-label={alt}
        />
      </motion.div>
    );
  }

  if (src && type === "gif") {
    return (
      <div className={cn("relative overflow-hidden", rounded, className)}>
        {/* GIF animation can't be reproduced via next/image without losing its loop, so a plain img is used intentionally. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      </div>
    );
  }

  return (
    <div
      className={cn("relative overflow-hidden bg-ink", rounded, className)}
      role="img"
      aria-label={alt}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br", VARIANT_GRADIENTS[variant])} />
      <div
        className={cn(
          "absolute -inset-1/3 opacity-60",
          !reducedMotion && "animate-[aurora-drift_16s_ease-in-out_infinite]",
        )}
        style={{
          backgroundImage:
            "radial-gradient(closest-side, color-mix(in oklab, var(--color-accent) 45%, transparent), transparent)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.09] mix-blend-overlay"
        style={{ backgroundImage: `url("${NOISE_DATA_URI}")` }}
      />
    </div>
  );
}
