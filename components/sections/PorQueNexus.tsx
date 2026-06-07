"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { SectionHeader } from "@/components/reveal/WordReveal";
import { TiltCard } from "@/components/interaction/Magnetic";

const pillars = [
  {
    code: "01",
    title: "Production-grade",
    pitch: "Sin demos, sin POCs.",
    desc: "Cada sistema que diseñamos está pensado para escalar bajo carga real desde el día uno. Observabilidad, seguridad y CI/CD construidos en la arquitectura, no añadidos al final.",
    tags: ["SLOs", "Observabilidad", "Hardened"],
  },
  {
    code: "02",
    title: "Squad senior embebido",
    pitch: "No outsourcing offshore.",
    desc: "Engineers staff-level + ML researchers que conocen tu negocio y tu código. Sprints semanales, demos quincenales, ownership total del delivery. Comunicación en tu zona horaria.",
    tags: ["Staff Eng", "ML Research", "Embedded"],
  },
  {
    code: "03",
    title: "AI nativa, no add-on",
    pitch: "Arquitecturas centradas en modelos.",
    desc: "No añadimos IA como un parche sobre legacy. Diseñamos sistemas en torno a inferencia, retrieval y agentes desde el blueprint inicial. El modelo es ciudadano de primera clase.",
    tags: ["LLM-first", "RAG", "Agents"],
  },
  {
    code: "04",
    title: "Hardware-aware",
    pitch: "La economía de inferencia importa.",
    desc: "Optimizamos por latencia, costo y eficiencia energética en cada capa: model selection, quantization, batching, caching y región de deployment. La unidad económica de tu IA, defendida.",
    tags: ["Latency", "Cost-eng", "Green"],
  },
  {
    code: "05",
    title: "Evals como código",
    pitch: "Calidad medible, no anecdótica.",
    desc: "Cada feature de IA ships con un eval suite versionado. Drift, regresiones y comportamientos emergentes detectados en CI. Decisiones de modelo basadas en datos, no en hype.",
    tags: ["Evals", "Drift", "Regression"],
  },
  {
    code: "06",
    title: "Transferencia total",
    pitch: "Al final, tu equipo opera sin nosotros.",
    desc: "Documentación viva, runbooks, formación al squad interno y handover gradual planificado desde el primer sprint. No creamos dependencia. Construimos capacidad permanente.",
    tags: ["Docs", "Runbooks", "Handover"],
  },
];

export function PorQueNexus() {
  return (
    <section id="por-que" className="relative overflow-hidden py-32 lg:py-44">
      {/* Background atmosphere */}
      <div className="absolute inset-0 grid-overlay opacity-25 mask-radial-fade" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nexus-chrome/15 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeader
            eyebrow="POR QUÉ NEXUS"
            parts={[
              { text: "Seis razones por las que", className: "text-nexus-chrome/60" },
              { text: "los equipos de élite", className: "text-metallic", newLine: true },
              { text: "nos eligen.", className: "text-neon-grad" },
            ]}
          />
          <p className="max-w-sm text-[14px] leading-relaxed text-nexus-chrome/55">
            No somos una agencia. No somos un proveedor. Somos el equipo
            con el que construyes infraestructura de IA que sobrevive a la
            próxima década.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {pillars.map((p, i) => (
            <PillarCard key={p.code} pillar={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarCard({
  pillar,
  index,
}: {
  pillar: (typeof pillars)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <TiltCard max={6} scale={1.015} className="group relative h-full">
        <div className="relative h-full overflow-hidden rounded-2xl p-px">
          {/* Gradient border */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-nexus-chrome/15 via-nexus-chrome/[0.02] to-transparent" />
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-b from-nexus-neon/25 via-nexus-neon/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden
          />

          <div className="glass-panel relative h-full rounded-2xl p-7 lg:p-8">
            <span className="corner-mark tl" />
            <span className="corner-mark tr" />
            <span className="corner-mark bl" />
            <span className="corner-mark br" />

            <div className="flex items-start justify-between">
              <span className="font-display text-[42px] font-light leading-none tracking-tight text-metallic transition-all duration-500 group-hover:text-neon-grad">
                {pillar.code}
              </span>
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-nexus-neon opacity-50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-nexus-neon" />
              </span>
            </div>

            <h3 className="mt-8 font-display text-xl font-light tracking-tight text-nexus-chrome">
              {pillar.title}
            </h3>
            <p className="mt-1.5 text-[12.5px] font-medium tracking-wide text-nexus-neon/85">
              {pillar.pitch}
            </p>
            <p className="mt-5 text-[13.5px] leading-relaxed text-nexus-chrome/60">
              {pillar.desc}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {pillar.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-nexus-chrome/10 bg-nexus-carbon/40 px-2.5 py-1 font-mono text-[9px] tracking-wider2 text-nexus-chrome/55"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Scan line on hover */}
            <div className="ring-scan absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
