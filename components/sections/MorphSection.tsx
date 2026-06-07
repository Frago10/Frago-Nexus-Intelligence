"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useMotionValueEvent, useTransform } from "motion/react";
import { useMemo, useRef } from "react";
import { LazyMount } from "@/components/perf/LazyMount";

const MorphingPlasma = dynamic(
  () => import("@/components/three/MorphingPlasma").then((m) => m.MorphingPlasma),
  { ssr: false }
);

const stages = [
  {
    code: "01 / SYNAPSE",
    title: "Inteligencia que",
    titleAccent: "respira.",
    desc: "Una constelación de modelos que piensan en paralelo. La capa fundacional de cualquier sistema Nexus.",
  },
  {
    code: "02 / NETWORK",
    title: "Conexión en",
    titleAccent: "estado puro.",
    desc: "Cada agente, cada modelo, ensamblados como un grid molecular. La estructura que orquesta tu operación.",
  },
  {
    code: "03 / HELIX",
    title: "Código que",
    titleAccent: "evoluciona.",
    desc: "Sistemas que aprenden de sí mismos. ADN computacional que muta con cada ciclo de inferencia.",
  },
  {
    code: "04 / ORBIT",
    title: "Inteligencia a",
    titleAccent: "escala global.",
    desc: "Infraestructura preparada para operar 24/7 a escala planetaria. Cada decisión, orbitando tu negocio.",
  },
];

export function MorphSection() {
  const sectionRef = useRef<HTMLElement>(null);
  // Stable mutable object the Canvas reads inside useFrame — bypasses React renders
  const progressRef = useMemo(() => ({ current: 0 }), []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
  });

  return (
    <section
      ref={sectionRef}
      className="relative bg-nexus-void"
      style={{ height: `${stages.length * 100}vh` }}
      aria-label="Morphing intelligence stages"
    >
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden">
        {/* Grid + glow */}
        <div className="absolute inset-0 grid-fine opacity-25 mask-radial-fade" />
        <div className="absolute inset-0 bg-radial-neon opacity-50" />

        {/* The morphing plasma — fills sticky viewport, biased right (lazy-mounted) */}
        <LazyMount
          className="absolute inset-0 md:left-auto md:right-0 md:w-1/2 lg:w-[55%]"
          rootMargin="400px"
        >
          <MorphingPlasma
            className="absolute inset-0"
            scrollProgress={progressRef}
          />
        </LazyMount>

        {/* Scrim on the left so copy reads crisp */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-nexus-void/30 via-transparent to-nexus-void/40" />
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-nexus-void from-25% via-nexus-void/50 via-50% to-transparent to-65% md:block" />

        {/* HUD frame */}
        <div className="pointer-events-none absolute inset-6 lg:inset-10">
          <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-nexus-neon/40" />
          <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-nexus-neon/40" />
          <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-nexus-neon/40" />
          <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-nexus-neon/40" />
        </div>

        {/* Stage progress indicator (right edge) */}
        <StageRail count={stages.length} scrollY={scrollYProgress} />

        {/* Crossfading copy per stage */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-10">
          <div className="relative w-full max-w-2xl">
            {stages.map((s, i) => (
              <StageCopy
                key={s.code}
                stage={s}
                index={i}
                total={stages.length}
                scrollY={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StageCopy({
  stage,
  index,
  total,
  scrollY,
}: {
  stage: (typeof stages)[number];
  index: number;
  total: number;
  scrollY: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Each stage owns 1/total of the scroll range. The middle of its band
  // is full opacity; edges fade. With slight overlap for crossfades.
  const slice = 1 / total;
  const start = index * slice;
  const peak = start + slice * 0.5;
  const end = (index + 1) * slice;
  const fadeIn = Math.max(0, start - slice * 0.25);
  const fadeOut = Math.min(1, end + slice * 0.25);

  const opacity = useTransform(
    scrollY,
    [fadeIn, start, peak, end, fadeOut],
    [0, 0.9, 1, 0.9, 0]
  );
  const y = useTransform(
    scrollY,
    [fadeIn, peak, fadeOut],
    [40, 0, -40]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <div className="flex items-center gap-3">
        <span className="h-px w-10 bg-nexus-neon shadow-[0_0_8px_#A6FF00]" />
        <span className="label-mono text-nexus-neon">{stage.code}</span>
      </div>
      <h2 className="mt-6 font-display text-[clamp(2.2rem,5.4vw,5rem)] font-light leading-[1.02] tracking-[-0.03em] text-balance">
        <span className="text-metallic">{stage.title}</span>{" "}
        <span className="text-neon-grad drop-shadow-[0_0_22px_rgba(166,255,0,0.35)]">
          {stage.titleAccent}
        </span>
      </h2>
      <p className="mt-6 max-w-md text-[15px] leading-relaxed text-nexus-chrome/65">
        {stage.desc}
      </p>
    </motion.div>
  );
}

function StageRail({
  count,
  scrollY,
}: {
  count: number;
  scrollY: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  return (
    <div className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 hidden flex-col items-center gap-3 lg:flex">
      <span className="font-mono text-[9px] tracking-wider2 text-nexus-chrome/40">
        STAGE
      </span>
      {Array.from({ length: count }).map((_, i) => (
        <RailDot key={i} index={i} total={count} scrollY={scrollY} />
      ))}
    </div>
  );
}

function RailDot({
  index,
  total,
  scrollY,
}: {
  index: number;
  total: number;
  scrollY: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const slice = 1 / total;
  const start = index * slice;
  const peak = start + slice * 0.5;
  const end = (index + 1) * slice;
  const scale = useTransform(
    scrollY,
    [Math.max(0, start - slice * 0.3), peak, Math.min(1, end + slice * 0.3)],
    [0.6, 1.7, 0.6]
  );
  const opacity = useTransform(
    scrollY,
    [Math.max(0, start - slice * 0.3), peak, Math.min(1, end + slice * 0.3)],
    [0.35, 1, 0.35]
  );

  return (
    <motion.div
      style={{ scale, opacity }}
      className="h-1.5 w-1.5 rounded-full bg-nexus-neon shadow-[0_0_8px_#A6FF00]"
    />
  );
}
