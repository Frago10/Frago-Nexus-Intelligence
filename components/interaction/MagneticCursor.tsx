"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * HUD Reticle cursor. Four corner brackets frame the pointer position +
 * a single-pixel center crosshair dot. Brackets grow & brighten over
 * interactive elements. Mounted once globally; only active on
 * hover-capable, large-screen devices.
 */
export function MagneticCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Outer reticle lags slightly for a satisfying offset
  const reticleX = useSpring(x, { stiffness: 240, damping: 24, mass: 0.55 });
  const reticleY = useSpring(y, { stiffness: 240, damping: 24, mass: 0.55 });

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover)").matches;
    const wide = window.innerWidth >= 1024;
    if (!canHover || !wide) return;

    setEnabled(true);
    document.documentElement.classList.add("nx-custom-cursor");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="hot"]'
      );
      setHot(!!interactive);
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });

    return () => {
      document.documentElement.classList.remove("nx-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Outer reticle — 4 corner brackets framing the pointer */}
      <motion.div
        aria-hidden
        style={{ x: reticleX, y: reticleY }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
      >
        <motion.div
          animate={{
            scale: pressed ? 0.78 : hot ? 1.55 : 1,
            opacity: hot ? 1 : 0.65,
            rotate: hot ? 45 : 0,
          }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-7 w-7"
          style={{ transformOrigin: "50% 50%" }}
        >
          {/* corner brackets */}
          <span className="absolute left-0 top-0 h-[6px] w-[6px] border-l border-t border-nexus-neon shadow-[0_0_6px_#A6FF00]" />
          <span className="absolute right-0 top-0 h-[6px] w-[6px] border-r border-t border-nexus-neon shadow-[0_0_6px_#A6FF00]" />
          <span className="absolute bottom-0 left-0 h-[6px] w-[6px] border-l border-b border-nexus-neon shadow-[0_0_6px_#A6FF00]" />
          <span className="absolute bottom-0 right-0 h-[6px] w-[6px] border-r border-b border-nexus-neon shadow-[0_0_6px_#A6FF00]" />

          {/* faint inner box that appears on hot zones */}
          <motion.span
            animate={{ opacity: hot ? 0.35 : 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-[3px] border border-nexus-neon/50"
          />
        </motion.div>
      </motion.div>

      {/* Inner crosshair — tiny center cross, snappy 1:1 follow */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            scale: pressed ? 1.6 : hot ? 0.6 : 1,
            opacity: hot ? 0.85 : 1,
          }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="relative h-3 w-3"
        >
          {/* horizontal hair */}
          <span className="absolute left-1/2 top-1/2 h-px w-2 -translate-x-1/2 -translate-y-1/2 bg-nexus-neon shadow-[0_0_4px_#A6FF00]" />
          {/* vertical hair */}
          <span className="absolute left-1/2 top-1/2 h-2 w-px -translate-x-1/2 -translate-y-1/2 bg-nexus-neon shadow-[0_0_4px_#A6FF00]" />
        </motion.div>
      </motion.div>
    </>
  );
}
