"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useRef } from "react";
import { useIntro } from "@/components/intro/IntroContext";
import { Magnetic } from "@/components/interaction/Magnetic";
import { WordReveal } from "@/components/reveal/WordReveal";

const NeuralScene = dynamic(
  () => import("@/components/three/NeuralScene").then((m) => m.NeuralScene),
  { ssr: false }
);
const HeroPlasmaScene = dynamic(
  () => import("@/components/three/HeroPlasmaScene").then((m) => m.HeroPlasmaScene),
  { ssr: false }
);

export function Hero() {
  const { state, scrollProgress, advance } = useIntro();
  const heroRef = useRef<HTMLElement>(null);

  // Track scroll progress through the hero (0 → 1)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    scrollProgress.current = v;
  });

  const isIntro = state !== "loading";

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      {/* Background neural net (atmospheric, full bleed) */}
      <NeuralScene
        className="absolute inset-0 z-0 opacity-35"
        nodeCount={70}
        connectionDistance={1.05}
      />

      {/* Grid + neon radial glow */}
      <div className="absolute inset-0 z-[1] grid-overlay opacity-40 mask-radial-fade" />
      <div className="absolute inset-0 z-[1] bg-radial-neon" />

      {/* Plasma Neural Core sculpture — contained to right half on md+ */}
      <HeroPlasmaScene
        className="absolute inset-0 z-[2] overflow-hidden md:left-auto md:right-0 md:w-1/2"
        scrollProgress={scrollProgress}
      />

      {/* Readability scrim — vertical fade + soft left-side falloff over the seam */}
      <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-b from-nexus-void/40 via-transparent to-nexus-void" />
      <div className="pointer-events-none absolute inset-0 z-[3] hidden bg-gradient-to-r from-nexus-void from-30% via-nexus-void/40 via-50% to-transparent to-65% md:block" />

      {/* HUD corner brackets */}
      <div className="pointer-events-none absolute inset-6 z-[5] lg:inset-10">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: isIntro ? 1 : 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="absolute left-0 top-0 h-5 w-5 border-l border-t border-nexus-neon/50"
        />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: isIntro ? 1 : 0 }}
          transition={{ delay: 0.18, duration: 0.6 }}
          className="absolute right-0 top-0 h-5 w-5 border-r border-t border-nexus-neon/50"
        />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: isIntro ? 1 : 0 }}
          transition={{ delay: 0.26, duration: 0.6 }}
          className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-nexus-neon/50"
        />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: isIntro ? 1 : 0 }}
          transition={{ delay: 0.34, duration: 0.6 }}
          className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-nexus-neon/50"
        />
      </div>

      {/* Choreographed scan line on intro */}
      {isIntro && (
        <motion.div
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: "100%", opacity: [0, 0.9, 0.9, 0] }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="pointer-events-none absolute inset-x-0 z-[6] h-px bg-gradient-to-r from-transparent via-nexus-neon to-transparent shadow-[0_0_24px_#A6FF00]"
        />
      )}

      {/* Bottom horizon */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[4] h-px bg-gradient-to-r from-transparent via-nexus-neon/40 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[4] h-40 bg-gradient-to-t from-nexus-void via-nexus-void/30 to-transparent" />

      {/* Content layer */}
      <div className="relative z-[10] mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 pt-32 pb-28 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-3">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isIntro ? 1 : 0 }}
                transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ originX: 0 }}
                className="block h-px w-10 bg-nexus-neon shadow-[0_0_8px_#A6FF00]"
              />
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: isIntro ? 1 : 0, x: isIntro ? 0 : -8 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="label-mono text-nexus-neon"
              >
                AI · SaaS · Automatización · Consultoría
              </motion.span>
            </div>

            {/* Headline — word-by-word reveal */}
            <h1
              className="font-display text-[clamp(2.4rem,5.6vw,5.4rem)] font-light leading-[1.05] tracking-[-0.03em] text-balance"
              aria-label="Conectamos inteligencia con acción para generar resultados reales."
            >
              <WordReveal
                active={isIntro}
                text="Conectamos inteligencia"
                baseDelay={0.45}
                wrapperClassName="block"
                wordClassName="text-metallic"
              />
              <WordReveal
                active={isIntro}
                text="con acción para generar"
                baseDelay={0.7}
                wrapperClassName="block"
                wordClassName="text-nexus-chrome/90"
              />
              <WordReveal
                active={isIntro}
                text="resultados reales."
                baseDelay={0.95}
                wrapperClassName="block"
                wordClassName="text-neon-grad drop-shadow-[0_0_24px_rgba(166,255,0,0.35)]"
              />
            </h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: isIntro ? 1 : 0, y: isIntro ? 0 : 12 }}
              transition={{ delay: 1.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-md text-pretty text-[14.5px] leading-relaxed text-nexus-chrome/65 lg:text-[15.5px]"
            >
              Infraestructura de IA de élite para empresas que operan en la
              frontera. Diseñamos sistemas autónomos, agentes y plataformas que
              escalan al ritmo de tu ambición.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: isIntro ? 1 : 0, y: isIntro ? 0 : 14 }}
              transition={{ delay: 1.65, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              onAnimationComplete={() => {
                if (state === "intro") advance("done");
              }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Magnetic strength={0.3}>
                <a
                  href="#contacto"
                  className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-nexus-neon px-7 py-3.5 text-[13px] font-semibold tracking-wider2 text-nexus-void shadow-neon-md transition-shadow hover:shadow-neon-lg"
                >
                  <span className="relative z-10">BUILD SMARTER. SCALE FASTER.</span>
                  <svg
                    className="relative z-10 h-3 w-3 transition-transform group-hover:translate-x-1"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M1 6h10m0 0L7 2m4 4L7 10"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a
                  href="#capacidades"
                  className="group inline-flex items-center gap-3 px-2 py-3 text-[12px] font-medium tracking-wider2 text-nexus-chrome/70 transition-colors hover:text-nexus-chrome"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-nexus-chrome/20 transition-colors group-hover:border-nexus-neon">
                    <span className="h-1 w-1 rounded-full bg-nexus-chrome/60 transition-colors group-hover:bg-nexus-neon" />
                  </span>
                  EXPLORAR CAPACIDADES
                </a>
              </Magnetic>
            </motion.div>
          </div>

          {/* Right column intentionally empty on lg — sculpture lives in the
              absolutely-positioned canvas above. */}
          <div className="hidden lg:col-span-5 lg:block" aria-hidden />
        </div>

        {/* Bottom telemetry strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: isIntro ? 1 : 0, y: isIntro ? 0 : 12 }}
          transition={{ delay: 1.95, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-10 left-6 right-6 z-[10] lg:left-10 lg:right-10"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-nexus-chrome/10 pt-5">
            <div className="flex items-center gap-6">
              <Telemetry label="LATENCIA" value="0.08ms" />
              <Telemetry label="MODELOS" value="142" />
              <Telemetry label="AGENTES" value="27" />
            </div>
            <div className="flex items-center gap-6">
              <Telemetry label="UPTIME" value="99.998%" align="right" />
              <Telemetry label="N°" value="NX-04.7" align="right" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Telemetry({
  label,
  value,
  align = "left",
}: {
  label: string;
  value: string;
  align?: "left" | "right";
}) {
  return (
    <div
      className={"flex flex-col " + (align === "right" ? "items-end" : "items-start")}
    >
      <span className="font-mono text-[9px] tracking-wider2 text-nexus-chrome/40">
        {label}
      </span>
      <span className="font-mono text-[12px] tracking-wide text-nexus-chrome/80">
        {value}
      </span>
    </div>
  );
}
