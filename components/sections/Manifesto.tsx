"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { WordReveal } from "@/components/reveal/WordReveal";
import { useInView } from "motion/react";

const lines: { text: string; className: string }[] = [
  { text: "No vendemos", className: "text-nexus-chrome/55" },
  { text: "inteligencia artificial.", className: "text-metallic" },
  { text: "Construimos los sistemas", className: "text-nexus-chrome/85" },
  { text: "que la hacen", className: "text-nexus-chrome/85" },
  { text: "real.", className: "text-neon-grad drop-shadow-[0_0_28px_rgba(166,255,0,0.45)]" },
];

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  // Subtle parallax + glow intensity tied to scroll through the section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, 1, 1, 0]);
  const scanX = useTransform(scrollYProgress, [0, 1], ["-100%", "100%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100vh] items-center overflow-hidden bg-nexus-void py-32 lg:py-48"
      aria-label="Manifiesto"
    >
      {/* Atmospheric layers */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="pointer-events-none absolute inset-0 bg-radial-neon opacity-70"
      />
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-20 mask-radial-fade" />
      {/* Vertical scan line that traverses with scroll */}
      <motion.div
        style={{ x: scanX }}
        className="pointer-events-none absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-nexus-neon to-transparent opacity-50 shadow-[0_0_24px_#A6FF00]"
      />

      {/* Top + bottom thin border accents */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nexus-chrome/15 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-nexus-chrome/15 to-transparent" />

      <div className="relative mx-auto w-full max-w-6xl px-6 text-center lg:px-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex items-center justify-center gap-3"
        >
          <span className="h-px w-12 bg-nexus-neon shadow-[0_0_8px_#A6FF00]" />
          <span className="label-mono text-nexus-neon">MANIFIESTO · MNFST/01</span>
          <span className="h-px w-12 bg-nexus-neon shadow-[0_0_8px_#A6FF00]" />
        </motion.div>

        {/* Editorial typography — word-by-word reveal */}
        <motion.h2
          style={{ y: titleY }}
          className="font-display text-[clamp(2.2rem,6.6vw,6.4rem)] font-light leading-[1.04] tracking-[-0.035em] text-balance"
        >
          {lines.map((line, i) => (
            <WordReveal
              key={i}
              active={inView}
              text={line.text}
              wordClassName={line.className}
              wrapperClassName="block"
              baseDelay={0.25 + i * 0.18}
              step={0.06}
            />
          ))}
        </motion.h2>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-[10px] tracking-wider2 text-nexus-chrome/40"
        >
          <span>FRAGO&apos;S NEXUS INTELLIGENCE</span>
          <span className="h-px w-12 bg-nexus-chrome/30" />
          <span>MADRID · 2026</span>
          <span className="h-px w-12 bg-nexus-chrome/30" />
          <span className="text-nexus-neon/70">∞</span>
        </motion.div>

        {/* HUD micro-marks at corners */}
        <span className="pointer-events-none absolute -left-2 -top-2 h-4 w-4 border-l border-t border-nexus-neon/50" />
        <span className="pointer-events-none absolute -right-2 -top-2 h-4 w-4 border-r border-t border-nexus-neon/50" />
        <span className="pointer-events-none absolute -bottom-2 -left-2 h-4 w-4 border-b border-l border-nexus-neon/50" />
        <span className="pointer-events-none absolute -bottom-2 -right-2 h-4 w-4 border-b border-r border-nexus-neon/50" />
      </div>
    </section>
  );
}
