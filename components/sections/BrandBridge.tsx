"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { WordReveal } from "@/components/reveal/WordReveal";

/**
 * BrandBridge — a 100vh punchy transition between Hero and MorphSection.
 * Single statement, scroll-revealed, dark void background with subtle parallax.
 * "Hay una diferencia entre usar IA y construir con ella."
 */
export function BrandBridge() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Soft parallax + glow ramp
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.4]);
  const lineXLeft = useTransform(scrollYProgress, [0, 1], ["-40%", "40%"]);
  const lineXRight = useTransform(scrollYProgress, [0, 1], ["40%", "-40%"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100vh] items-center overflow-hidden bg-nexus-void"
      aria-label="Brand bridge"
    >
      {/* Faint radial glow */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="pointer-events-none absolute inset-0 bg-radial-neon opacity-40"
      />
      {/* Fine grid */}
      <div className="pointer-events-none absolute inset-0 grid-fine opacity-15 mask-radial-fade" />

      {/* Two horizontal neon ribbons that drift opposite ways on scroll */}
      <motion.div
        style={{ x: lineXLeft }}
        className="pointer-events-none absolute left-0 right-0 top-[35%] h-px bg-gradient-to-r from-transparent via-nexus-neon/50 to-transparent shadow-[0_0_24px_#A6FF00]"
      />
      <motion.div
        style={{ x: lineXRight }}
        className="pointer-events-none absolute left-0 right-0 bottom-[35%] h-px bg-gradient-to-r from-transparent via-nexus-neon/30 to-transparent shadow-[0_0_24px_#A6FF00]"
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        {/* Eyebrow code */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-nexus-neon shadow-[0_0_8px_#A6FF00]" />
          <span className="label-mono text-nexus-neon">BRG/02 · BRIDGE</span>
        </motion.div>

        {/* Main statement — large editorial typography */}
        <h2 className="font-display text-[clamp(2rem,5.2vw,4.6rem)] font-light leading-[1.06] tracking-[-0.03em] text-balance">
          <WordReveal
            active={inView}
            text="Hay una diferencia"
            baseDelay={0.2}
            wordClassName="text-nexus-chrome/80"
            wrapperClassName="block"
          />
          <WordReveal
            active={inView}
            text="entre usar IA"
            baseDelay={0.5}
            wordClassName="text-metallic"
            wrapperClassName="block"
          />
          <WordReveal
            active={inView}
            text="y construir con ella."
            baseDelay={0.8}
            wordClassName="text-neon-grad drop-shadow-[0_0_22px_rgba(166,255,0,0.35)]"
            wrapperClassName="block"
          />
        </h2>

        {/* Footnote */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex max-w-md items-start gap-4"
        >
          <span className="mt-2 h-px w-12 flex-none bg-nexus-neon" />
          <p className="text-[14px] leading-relaxed text-nexus-chrome/55">
            Operamos en la segunda. Cada arquitectura nuestra es una hipótesis
            de negocio resuelta con código de producción.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
