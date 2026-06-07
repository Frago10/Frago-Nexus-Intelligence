"use client";

import { motion } from "motion/react";

type LogoMarkProps = {
  className?: string;
  size?: number;
  animated?: boolean;
};

/**
 * Hex Core — premium polish.
 * - Layered metallic gradient (5-stop chrome with mid-darks for depth)
 * - Outer hex stays still; inner hex counter-rotates slightly
 * - Orbiting telemetry dot riding the inner ring
 * - Multi-layer pulsing neon core
 * - Slash with anim'd glow + soft offset shadow
 * - Subtle rotating scan arc on the outer ring
 */
export function LogoMark({ className, size = 56, animated = true }: LogoMarkProps) {
  const rot = animated
    ? { animate: { rotate: 360 }, transition: { duration: 60, repeat: Infinity, ease: "linear" } }
    : {};
  const counter = animated
    ? { animate: { rotate: -360 }, transition: { duration: 90, repeat: Infinity, ease: "linear" } }
    : {};
  const orbit = animated
    ? { animate: { rotate: 360 }, transition: { duration: 12, repeat: Infinity, ease: "linear" } }
    : {};

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-label="Frago's Nexus Intelligence"
    >
      <defs>
        {/* Deeper 5-stop chrome */}
        <linearGradient id="hex-metallic" x1="15" y1="10" x2="85" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="25%" stopColor="#c8ccd1" />
          <stop offset="50%" stopColor="#4a4d52" />
          <stop offset="75%" stopColor="#a8abb0" />
          <stop offset="100%" stopColor="#f5f7fa" />
        </linearGradient>
        <linearGradient id="hex-inner" x1="30" y1="30" x2="70" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e8eaed" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#6e7278" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="hex-neon" x1="10" y1="90" x2="90" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7acc00" stopOpacity="0" />
          <stop offset="25%" stopColor="#A6FF00" />
          <stop offset="50%" stopColor="#eaffb3" />
          <stop offset="75%" stopColor="#A6FF00" />
          <stop offset="100%" stopColor="#7acc00" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="hex-core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#eaffb3" stopOpacity="1" />
          <stop offset="40%" stopColor="#A6FF00" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#A6FF00" stopOpacity="0" />
        </radialGradient>
        <filter id="hex-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="hex-glow-strong" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer hex — slow rotation */}
      <motion.g style={{ originX: "50px", originY: "50px" }} {...rot}>
        <polygon
          points="50,8 87,30 87,70 50,92 13,70 13,30"
          stroke="url(#hex-metallic)"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Scan arc: a bright segment that sweeps around the outer hex */}
        {animated && (
          <motion.path
            d="M 50 8 L 87 30"
            stroke="#A6FF00"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.8"
            filter="url(#hex-glow)"
            animate={{ opacity: [0, 0.9, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.g>

      {/* Internal facet lines — depth (static) */}
      <g opacity="0.45">
        <line x1="50" y1="8" x2="50" y2="26" stroke="#c8ccd1" strokeWidth="0.7" />
        <line x1="87" y1="30" x2="72" y2="38" stroke="#c8ccd1" strokeWidth="0.7" />
        <line x1="87" y1="70" x2="72" y2="62" stroke="#c8ccd1" strokeWidth="0.7" />
        <line x1="50" y1="92" x2="50" y2="74" stroke="#c8ccd1" strokeWidth="0.7" />
        <line x1="13" y1="70" x2="28" y2="62" stroke="#c8ccd1" strokeWidth="0.7" />
        <line x1="13" y1="30" x2="28" y2="38" stroke="#c8ccd1" strokeWidth="0.7" />
      </g>

      {/* Inner hex — counter rotation */}
      <motion.g style={{ originX: "50px", originY: "50px" }} {...counter}>
        <polygon
          points="50,26 72,38 72,62 50,74 28,62 28,38"
          stroke="url(#hex-inner)"
          strokeWidth="1"
          fill="none"
        />
        {/* Vertex micro-dots */}
        {[
          [50, 26],
          [72, 38],
          [72, 62],
          [50, 74],
          [28, 62],
          [28, 38],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.9" fill="#c8ccd1" opacity="0.7" />
        ))}
      </motion.g>

      {/* Orbiting telemetry dot — rides a circle inscribed in the hex */}
      {animated && (
        <motion.g style={{ originX: "50px", originY: "50px" }} {...orbit}>
          <circle cx="50" cy="20" r="1.4" fill="#A6FF00" filter="url(#hex-glow)" />
        </motion.g>
      )}

      {/* Pulsing neon core — multi-layer */}
      <circle cx="50" cy="50" r="9" fill="url(#hex-core-glow)" opacity="0.6" />
      {animated ? (
        <motion.circle
          cx="50"
          cy="50"
          r="6"
          fill="#A6FF00"
          filter="url(#hex-glow-strong)"
          initial={{ scale: 1, opacity: 0.85 }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "50px 50px" }}
        />
      ) : (
        <circle cx="50" cy="50" r="6" fill="#A6FF00" filter="url(#hex-glow-strong)" />
      )}
      <circle cx="50" cy="50" r="2" fill="#eaffb3" />
      <circle cx="50" cy="50" r="0.6" fill="#ffffff" />

      {/* Neon slash — outer glow band */}
      {animated ? (
        <motion.line
          x1="20"
          y1="80"
          x2="80"
          y2="20"
          stroke="url(#hex-neon)"
          strokeWidth="2.4"
          opacity="0.35"
          filter="url(#hex-glow-strong)"
          animate={{ opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : (
        <line
          x1="20"
          y1="80"
          x2="80"
          y2="20"
          stroke="url(#hex-neon)"
          strokeWidth="2.4"
          opacity="0.35"
          filter="url(#hex-glow-strong)"
        />
      )}
      {/* Neon slash — bright core */}
      {animated ? (
        <motion.line
          x1="20"
          y1="80"
          x2="80"
          y2="20"
          stroke="url(#hex-neon)"
          strokeWidth="1.4"
          filter="url(#hex-glow)"
          initial={{ opacity: 0.9 }}
          animate={{ opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : (
        <line
          x1="20"
          y1="80"
          x2="80"
          y2="20"
          stroke="url(#hex-neon)"
          strokeWidth="1.4"
          filter="url(#hex-glow)"
        />
      )}
      {/* Slash hair-light — ultra-thin bright filament */}
      <line x1="20" y1="80" x2="80" y2="20" stroke="#eaffb3" strokeWidth="0.4" opacity="0.85" />
    </svg>
  );
}

export function LogoLockup({ className }: { className?: string }) {
  return (
    <div className={"flex items-center gap-3 " + (className ?? "")}>
      <LogoMark size={36} />
      <div className="flex flex-col leading-none">
        <span className="font-mono text-[10px] tracking-wider2 text-nexus-chrome/60">
          FRAGO&apos;S
        </span>
        <span className="font-display text-[15px] font-medium tracking-[0.18em] text-nexus-chrome">
          NEXUS
        </span>
        <span className="font-display text-[8px] tracking-wider2 text-nexus-neon">
          INTELLIGENCE
        </span>
      </div>
    </div>
  );
}
