"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SectionHeader } from "@/components/sections/Capabilities";

const phases = [
  {
    n: "00",
    name: "Discovery",
    duration: "1–2 sem",
    desc: "Inmersión profunda en tu organización. Mapeamos sistemas, datos, fricción y oportunidad real.",
    artifacts: ["Audit técnico", "Mapa de procesos", "Hipótesis de valor"],
  },
  {
    n: "01",
    name: "Architecture",
    duration: "2–3 sem",
    desc: "Diseñamos el blueprint completo: modelos, datos, agentes, integraciones, observabilidad y seguridad.",
    artifacts: ["System design", "Stack selection", "Roadmap por trimestre"],
  },
  {
    n: "02",
    name: "Build",
    duration: "6–12 sem",
    desc: "Equipo senior ejecutando. Sprints semanales, demos quincenales, deployment continuo desde el día uno.",
    artifacts: ["Producción gradual", "Evals automatizadas", "Dashboards SLO"],
  },
  {
    n: "03",
    name: "Scale",
    duration: "ongoing",
    desc: "Operación con SLOs, mejora continua, expansión de capacidades y formación de tu equipo interno.",
    artifacts: ["SRE compartido", "Roadmap evolutivo", "Handover gradual"],
  },
];

export function Process() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="proceso" ref={ref} className="relative py-32 lg:py-44">
      <div className="absolute inset-0 grid-fine opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="PROCESO"
          parts={[
            { text: "De la hipótesis", className: "text-metallic" },
            { text: " a la", className: "text-nexus-chrome/60" },
            { text: " producción.", className: "text-neon-grad" },
          ]}
        />

        <div className="relative mt-20">
          {/* spine */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-nexus-chrome/10 lg:left-1/2 lg:-translate-x-1/2" />
          <motion.div
            className="absolute left-6 top-0 w-px origin-top bg-gradient-to-b from-nexus-neon via-nexus-neon to-transparent shadow-[0_0_12px_#A6FF00] lg:left-1/2 lg:-translate-x-1/2"
            style={{ scaleY: lineScale, height: "100%" }}
          />

          <ul className="space-y-16 lg:space-y-24">
            {phases.map((p, i) => (
              <PhaseRow key={p.n} phase={p} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function PhaseRow({
  phase,
  index,
}: {
  phase: (typeof phases)[number];
  index: number;
}) {
  const isLeft = index % 2 === 0;
  const ref = useRef<HTMLLIElement>(null);

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-16 lg:pl-0"
    >
      {/* node on spine */}
      <div className="absolute left-6 top-3 -translate-x-1/2 lg:left-1/2">
        <div className="relative">
          <span className="block h-3 w-3 rounded-full border border-nexus-neon bg-nexus-void shadow-[0_0_12px_#A6FF00]" />
          <span className="absolute inset-0 m-auto h-1 w-1 rounded-full bg-nexus-neon" />
        </div>
      </div>

      <div
        className={
          "grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-16 " +
          (isLeft ? "" : "lg:[&>:first-child]:order-2")
        }
      >
        <div className={isLeft ? "lg:pr-10 lg:text-right" : "lg:pl-10"}>
          <span className="font-mono text-[10px] tracking-wider2 text-nexus-chrome/40">
            PHASE / {phase.n} · {phase.duration}
          </span>
          <h3 className="mt-3 font-display text-3xl font-light tracking-tight text-nexus-chrome lg:text-4xl">
            {phase.name}
          </h3>
          <p className="mt-4 text-[14px] leading-relaxed text-nexus-chrome/60">
            {phase.desc}
          </p>
        </div>

        <div className={isLeft ? "lg:pl-10" : "lg:pr-10 lg:text-right"}>
          <div className="glass-panel relative rounded-xl p-6">
            <span className="corner-mark tl" />
            <span className="corner-mark br" />
            <span className="label-mono text-nexus-neon">DELIVERABLES</span>
            <ul className={"mt-4 space-y-2 " + (isLeft ? "" : "lg:items-end")}>
              {phase.artifacts.map((a) => (
                <li
                  key={a}
                  className={
                    "flex items-center gap-3 text-[13px] text-nexus-chrome/75 " +
                    (isLeft ? "" : "lg:flex-row-reverse")
                  }
                >
                  <span className="h-px w-3 flex-none bg-nexus-neon/60" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.li>
  );
}
