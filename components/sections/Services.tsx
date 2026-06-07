"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { SectionHeader } from "@/components/sections/Capabilities";

const services = [
  {
    code: "S/01",
    name: "AI Systems Architecture",
    pitch: "Arquitecturas LLM, RAG y agentes — diseñadas para producción a escala.",
    deliverables: [
      "Diagnóstico y blueprint estratégico",
      "Stack model + retrieval + orquestación",
      "Hardening, observabilidad y SLOs",
    ],
  },
  {
    code: "S/02",
    name: "Autonomous Agents",
    pitch: "Agentes que ejecutan flujos críticos con herramientas reales y memoria.",
    deliverables: [
      "Modelado de tareas + tool registry",
      "Guardrails, evaluación y eval-loops",
      "Integración con tus sistemas internos",
    ],
  },
  {
    code: "S/03",
    name: "SaaS Intelligence",
    pitch: "Productos SaaS con IA nativa — desde el prototipo a la plataforma.",
    deliverables: [
      "UX inteligente y arquitectura multitenant",
      "Pipeline de modelos y feature store",
      "Roadmap de monetización y escalado",
    ],
  },
  {
    code: "S/04",
    name: "Automation Engineering",
    pitch: "Workflows que eliminan el trabajo repetitivo de tu organización.",
    deliverables: [
      "Auditoría de procesos y ROI",
      "Implementación end-to-end + APIs",
      "Monitorización y mejora continua",
    ],
  },
  {
    code: "S/05",
    name: "Technology Consulting",
    pitch: "Consultoría ejecutiva para C-levels que deciden el rumbo tecnológico.",
    deliverables: [
      "Estrategia AI/Data 12–36 meses",
      "Evaluación de talento y stack",
      "Comité asesor recurrente",
    ],
  },
  {
    code: "S/06",
    name: "Elite Engineering Squad",
    pitch: "Equipos compactos y senior, embebidos en tu organización por ciclos.",
    deliverables: [
      "Senior engineers + ML researchers",
      "Ownership total de delivery",
      "Transferencia de conocimiento",
    ],
  },
];

export function Services() {
  return (
    <section id="servicios" className="relative py-32 lg:py-44">
      {/* angled accent line */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-nexus-chrome/15 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeader
            eyebrow="SERVICIOS"
            parts={[
              { text: "Construimos", className: "text-nexus-chrome/60" },
              { text: " infraestructura", className: "text-metallic" },
              { text: "de inteligencia", className: "text-metallic", newLine: true },
              { text: " a medida.", className: "text-neon-grad" },
            ]}
          />
          <p className="max-w-sm text-[14px] leading-relaxed text-nexus-chrome/55">
            Cada proyecto comienza con una hipótesis de negocio y termina con un
            sistema que opera en producción. Sin demos.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 divide-y divide-nexus-chrome/10 border-y border-nexus-chrome/10 md:grid-cols-2 md:divide-y-0 md:[&>*:nth-child(even)]:border-l md:[&>*:nth-child(even)]:border-nexus-chrome/10 md:[&>*:nth-child(n+3)]:border-t md:[&>*:nth-child(n+3)]:border-nexus-chrome/10">
          {services.map((s, i) => (
            <ServiceRow key={s.code} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative cursor-default px-2 py-10 transition-colors duration-500 hover:bg-nexus-neon/[0.015] lg:px-8 lg:py-12"
    >
      <div className="flex items-start justify-between gap-8">
        <div className="flex-1">
          <span className="font-mono text-[10px] tracking-wider2 text-nexus-neon/70">
            {service.code}
          </span>
          <h3 className="mt-3 font-display text-2xl font-light tracking-tight text-nexus-chrome transition-colors group-hover:text-neon-grad lg:text-[28px]">
            {service.name}
          </h3>
          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-nexus-chrome/55">
            {service.pitch}
          </p>
          <ul className="mt-6 space-y-2">
            {service.deliverables.map((d) => (
              <li
                key={d}
                className="flex items-start gap-3 text-[13px] text-nexus-chrome/65"
              >
                <span className="mt-2 inline-block h-px w-3 flex-none bg-nexus-neon/60" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          className="hidden flex-none items-center gap-2 self-start pt-2 font-mono text-[10px] tracking-wider2 text-nexus-chrome/40 transition-colors group-hover:text-nexus-neon md:flex"
          initial={false}
        >
          <span>EXPLORAR</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-nexus-chrome/15 transition-all duration-500 group-hover:border-nexus-neon group-hover:shadow-neon-sm">
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
              <path d="M1 6h10m0 0L7 2m4 4L7 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
