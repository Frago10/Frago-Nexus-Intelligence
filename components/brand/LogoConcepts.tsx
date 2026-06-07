"use client";

import { motion } from "motion/react";

/* Shared defs (used by all concepts) */
function CommonDefs() {
  return (
    <defs>
      <linearGradient id="lc-metallic" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f5f7fa" />
        <stop offset="35%" stopColor="#c8ccd1" />
        <stop offset="60%" stopColor="#6e7278" />
        <stop offset="100%" stopColor="#ffffff" />
      </linearGradient>
      <linearGradient id="lc-neon" x1="10" y1="90" x2="90" y2="10" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#7acc00" stopOpacity="0" />
        <stop offset="20%" stopColor="#A6FF00" />
        <stop offset="50%" stopColor="#c4ff4d" />
        <stop offset="80%" stopColor="#A6FF00" />
        <stop offset="100%" stopColor="#7acc00" stopOpacity="0" />
      </linearGradient>
      <filter id="lc-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="1.6" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

const animatedSlash = {
  initial: { opacity: 0.85 },
  animate: {
    opacity: [0.85, 1, 0.85],
    filter: [
      "drop-shadow(0 0 6px #A6FF00)",
      "drop-shadow(0 0 18px #A6FF00)",
      "drop-shadow(0 0 6px #A6FF00)",
    ],
  },
  transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
};

/* =====================================================
   A. VECTOR LOCK
   Three vector strokes converge into an implied N.
   Minimal, sci-tech, system-grade. (Linear / Arc / Vercel territory.)
   ===================================================== */
export function LogoConceptA({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-label="Vector Lock">
      <CommonDefs />
      {/* Left vertical stroke */}
      <motion.line
        x1="22"
        y1="14"
        x2="22"
        y2="86"
        stroke="url(#lc-metallic)"
        strokeWidth="6"
        strokeLinecap="square"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
      {/* Right vertical stroke */}
      <motion.line
        x1="78"
        y1="14"
        x2="78"
        y2="86"
        stroke="url(#lc-metallic)"
        strokeWidth="6"
        strokeLinecap="square"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
      />
      {/* Neon diagonal */}
      <motion.line
        x1="22"
        y1="14"
        x2="78"
        y2="86"
        stroke="url(#lc-neon)"
        strokeWidth="3.5"
        strokeLinecap="round"
        filter="url(#lc-glow)"
        {...animatedSlash}
      />
      {/* Intersection node */}
      <circle cx="50" cy="50" r="3" fill="#A6FF00" filter="url(#lc-glow)" />
      {/* Endpoint nodes */}
      <circle cx="22" cy="14" r="1.6" fill="#c8ccd1" />
      <circle cx="78" cy="86" r="1.6" fill="#c8ccd1" />
    </svg>
  );
}

/* =====================================================
   B. HEX CORE
   Hexagonal network node with pulsing neon core.
   Reads as data-network / blockchain / molecular AI.
   ===================================================== */
export function LogoConceptB({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-label="Hex Core">
      <CommonDefs />
      {/* Outer hex */}
      <polygon
        points="50,8 87,30 87,70 50,92 13,70 13,30"
        stroke="url(#lc-metallic)"
        strokeWidth="2.5"
        fill="none"
      />
      {/* Inner hex */}
      <polygon
        points="50,26 72,38 72,62 50,74 28,62 28,38"
        stroke="#c8ccd1"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
      {/* Internal facets — sense of depth */}
      <line x1="50" y1="8" x2="50" y2="26" stroke="#c8ccd1" strokeWidth="0.7" opacity="0.45" />
      <line x1="87" y1="30" x2="72" y2="38" stroke="#c8ccd1" strokeWidth="0.7" opacity="0.45" />
      <line x1="87" y1="70" x2="72" y2="62" stroke="#c8ccd1" strokeWidth="0.7" opacity="0.45" />
      <line x1="50" y1="92" x2="50" y2="74" stroke="#c8ccd1" strokeWidth="0.7" opacity="0.45" />
      <line x1="13" y1="70" x2="28" y2="62" stroke="#c8ccd1" strokeWidth="0.7" opacity="0.45" />
      <line x1="13" y1="30" x2="28" y2="38" stroke="#c8ccd1" strokeWidth="0.7" opacity="0.45" />

      {/* Pulsing neon core */}
      <motion.circle
        cx="50"
        cy="50"
        r="6"
        fill="#A6FF00"
        filter="url(#lc-glow)"
        initial={{ scale: 1, opacity: 0.85 }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "50px 50px" }}
      />
      <circle cx="50" cy="50" r="2" fill="#eaffb3" />

      {/* Neon slash */}
      <motion.line
        x1="20"
        y1="80"
        x2="80"
        y2="20"
        stroke="url(#lc-neon)"
        strokeWidth="1.8"
        filter="url(#lc-glow)"
        {...animatedSlash}
      />
    </svg>
  );
}

/* =====================================================
   C. PULSE SIGIL
   Waveform / signal sigil — reads as "AI heartbeat".
   No letterform. Distinctly different from typography.
   ===================================================== */
export function LogoConceptC({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-label="Pulse Sigil">
      <CommonDefs />
      {/* Outer frame brackets */}
      <path d="M 14 26 L 14 14 L 26 14" stroke="#c8ccd1" strokeWidth="1.2" />
      <path d="M 86 26 L 86 14 L 74 14" stroke="#c8ccd1" strokeWidth="1.2" />
      <path d="M 14 74 L 14 86 L 26 86" stroke="#c8ccd1" strokeWidth="1.2" />
      <path d="M 86 74 L 86 86 L 74 86" stroke="#c8ccd1" strokeWidth="1.2" />

      {/* Waveform / pulse - the central mark */}
      <motion.path
        d="M 18 50 L 28 50 L 33 30 L 42 70 L 50 22 L 58 78 L 67 30 L 72 50 L 82 50"
        stroke="url(#lc-metallic)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />

      {/* Neon underline accent — the "alive" pulse */}
      <motion.line
        x1="18"
        y1="60"
        x2="82"
        y2="60"
        stroke="url(#lc-neon)"
        strokeWidth="1.4"
        filter="url(#lc-glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      />

      {/* Pulse dot moving along the line */}
      <motion.circle
        r="1.8"
        fill="#A6FF00"
        filter="url(#lc-glow)"
        initial={{ cx: 18, cy: 60 }}
        animate={{ cx: [18, 82, 18], cy: 60 }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

/* =====================================================
   D. APERTURE MARK
   Iris / aperture composed of metallic blades around a
   neon core — reads as "lens on the future" / precision optics.
   ===================================================== */
export function LogoConceptD({ size = 120 }: { size?: number }) {
  const blades = [0, 60, 120, 180, 240, 300]; // 6 blades
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-label="Aperture Mark">
      <CommonDefs />
      {/* Outer ring */}
      <circle cx="50" cy="50" r="42" stroke="url(#lc-metallic)" strokeWidth="1.5" />
      {/* Outer ring ticks */}
      {blades.map((deg, i) => (
        <line
          key={i}
          x1="50"
          y1="6"
          x2="50"
          y2="11"
          stroke="#c8ccd1"
          strokeWidth="1"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}

      {/* Aperture blades */}
      <motion.g
        initial={{ rotate: -20, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ transformOrigin: "50px 50px" }}
      >
        {blades.map((deg, i) => (
          <polygon
            key={i}
            points="50,50 76,38 64,64"
            fill="url(#lc-metallic)"
            stroke="#6e7278"
            strokeWidth="0.4"
            opacity="0.88"
            transform={`rotate(${deg} 50 50)`}
          />
        ))}
      </motion.g>

      {/* Central iris hole */}
      <circle cx="50" cy="50" r="7" fill="#050505" />
      {/* Neon iris ring */}
      <motion.circle
        cx="50"
        cy="50"
        r="7"
        stroke="#A6FF00"
        strokeWidth="1.4"
        fill="none"
        filter="url(#lc-glow)"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        style={{ transformOrigin: "50px 50px" }}
      />
      {/* Inner neon dot */}
      <circle cx="50" cy="50" r="1.8" fill="#eaffb3" filter="url(#lc-glow)" />

      {/* Slash crossing through */}
      <motion.line
        x1="14"
        y1="86"
        x2="86"
        y2="14"
        stroke="url(#lc-neon)"
        strokeWidth="1.2"
        opacity="0.7"
        filter="url(#lc-glow)"
        {...animatedSlash}
      />
    </svg>
  );
}
