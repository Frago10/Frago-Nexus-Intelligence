"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { useIntro } from "./IntroContext";

const DURATION_MS = 1500;
const HOLD_MS = 280;

export function CinematicLoader() {
  const { state, advance } = useIntro();
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (state !== "loading") return;
    let raf = 0;
    const start = performance.now();
    const tick = () => {
      const elapsed = performance.now() - start;
      const p = Math.min(1, elapsed / DURATION_MS);
      const eased = 1 - Math.pow(1 - p, 3);
      setPct(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => advance("intro"), HOLD_MS);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [state, advance]);

  return (
    <AnimatePresence>
      {state === "loading" && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-nexus-void"
        >
          {/* fine grid */}
          <div className="absolute inset-0 grid-fine opacity-30 mask-radial-fade" />

          {/* horizon scan line */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{ duration: 2.4, ease: "linear", repeat: Infinity }}
            className="pointer-events-none absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-nexus-neon to-transparent opacity-70 shadow-[0_0_24px_#A6FF00]"
          />

          {/* HUD corners */}
          <span className="absolute left-8 top-8 h-4 w-4 border-l border-t border-nexus-neon/60" />
          <span className="absolute right-8 top-8 h-4 w-4 border-r border-t border-nexus-neon/60" />
          <span className="absolute bottom-8 left-8 h-4 w-4 border-b border-l border-nexus-neon/60" />
          <span className="absolute bottom-8 right-8 h-4 w-4 border-b border-r border-nexus-neon/60" />

          {/* center stack */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Drawing-in N mark */}
            <DrawingMark />

            {/* status row */}
            <div className="mt-12 flex w-[280px] items-center justify-between font-mono text-[10px] tracking-wider2 text-nexus-chrome/60">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                INITIALIZING NEXUS
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-nexus-neon"
              >
                {String(pct).padStart(3, "0")}%
              </motion.span>
            </div>

            {/* progress bar */}
            <div className="mt-3 h-px w-[280px] overflow-hidden bg-nexus-chrome/15">
              <motion.div
                className="h-full bg-nexus-neon shadow-[0_0_12px_#A6FF00]"
                style={{ width: `${pct}%` }}
              />
            </div>

            {/* tiny status lines (animated typewriter feel) */}
            <div className="mt-8 flex flex-col items-center gap-1 font-mono text-[9px] tracking-wider2 text-nexus-chrome/35">
              <StatusLine delay={0.6} text="› MODELS  CONNECTED" />
              <StatusLine delay={0.9} text="› AGENTS  ONLINE" />
              <StatusLine delay={1.15} text="› SYSTEM  STABLE" />
            </div>
          </div>

          {/* bottom telemetry */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-wider2 text-nexus-chrome/30">
            FRG-NXS · BOOT 04.7 · 2026
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StatusLine({ delay, text }: { delay: number; text: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      {text}
    </motion.span>
  );
}

/**
 * Hex Core mark assembled live: outer hexagon draws in, inner hex,
 * then 6 facet spokes, then the neon core ignites with a pulse, and
 * finally the neon slash crosses through. Total ~1.4s choreography.
 */
function DrawingMark() {
  const facetLines: [number, number, number, number][] = [
    [50, 8, 50, 26],
    [87, 30, 72, 38],
    [87, 70, 72, 62],
    [50, 92, 50, 74],
    [13, 70, 28, 62],
    [13, 30, 28, 38],
  ];

  return (
    <svg
      width="140"
      height="140"
      viewBox="0 0 100 100"
      fill="none"
      className="drop-shadow-[0_0_24px_rgba(166,255,0,0.3)]"
    >
      <defs>
        <linearGradient id="loader-metallic" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f5f7fa" />
          <stop offset="35%" stopColor="#c8ccd1" />
          <stop offset="60%" stopColor="#6e7278" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id="loader-neon" x1="10" y1="90" x2="90" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7acc00" stopOpacity="0" />
          <stop offset="25%" stopColor="#A6FF00" />
          <stop offset="50%" stopColor="#c4ff4d" />
          <stop offset="75%" stopColor="#A6FF00" />
          <stop offset="100%" stopColor="#7acc00" stopOpacity="0" />
        </linearGradient>
        <filter id="loader-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer hexagon — draws in */}
      <motion.polygon
        points="50,8 87,30 87,70 50,92 13,70 13,30"
        stroke="url(#loader-metallic)"
        strokeWidth="2.5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0.6 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />

      {/* Inner hexagon */}
      <motion.polygon
        points="50,26 72,38 72,62 50,74 28,62 28,38"
        stroke="#c8ccd1"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
      />

      {/* Facet spokes */}
      {facetLines.map(([x1, y1, x2, y2], i) => (
        <motion.line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#c8ccd1"
          strokeWidth="0.7"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.45 }}
          transition={{ duration: 0.35, delay: 0.65 + i * 0.04, ease: "easeOut" }}
        />
      ))}

      {/* Neon core — ignites with pulse */}
      <motion.circle
        cx="50"
        cy="50"
        r="6"
        fill="#A6FF00"
        filter="url(#loader-glow)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 1.1], opacity: [0, 1, 0.95] }}
        transition={{ duration: 0.8, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "50px 50px" }}
      />
      <motion.circle
        cx="50"
        cy="50"
        r="2"
        fill="#eaffb3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.1 }}
      />

      {/* Neon slash */}
      <motion.line
        x1="20"
        y1="80"
        x2="80"
        y2="20"
        stroke="url(#loader-neon)"
        strokeWidth="1.8"
        filter="url(#loader-glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.15, ease: "easeOut" }}
      />
    </svg>
  );
}
