"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "motion/react";
import { useRef } from "react";

const cases = [
  {
    code: "CASE/01",
    industry: "FINTECH",
    title: "Detección de fraude en tiempo real.",
    problem:
      "Banco europeo perdía €4.2M/año en transacciones fraudulentas detectadas demasiado tarde.",
    solution:
      "Ensemble en tiempo real: LLM razonador + GBDT + reglas. Decisión en <80ms p99.",
    metric: { value: "-73%", label: "FRAUDE DETECTADO" },
    metricSecondary: { value: "€3.1M", label: "AHORRADOS AÑO 1" },
    tags: ["Real-time", "Ensemble", "Risk"],
  },
  {
    code: "CASE/02",
    industry: "SAAS B2B",
    title: "Operación de soporte autónoma.",
    problem:
      "1.200 tickets/día y NPS cayendo. El equipo de CX no escalaba con el crecimiento.",
    solution:
      "Agentes autónomos: triage → respuesta → escalación, con eval suite versionado en CI.",
    metric: { value: "68%", label: "TICKETS AUTO-RESUELTOS" },
    metricSecondary: { value: "+18", label: "PUNTOS NPS" },
    tags: ["Agents", "Evals", "Production"],
  },
  {
    code: "CASE/03",
    industry: "INDUSTRIAL",
    title: "Forecasting de cadena de suministro.",
    problem:
      "Stock-outs frecuentes sobre 14K SKUs por modelos estadísticos sin contexto cualitativo.",
    solution:
      "Forecasting híbrido: statistical baseline + LLM context (news, weather, seasonality narratives).",
    metric: { value: "-42%", label: "STOCK-OUTS" },
    metricSecondary: { value: "€8M", label: "WORKING CAPITAL LIBERADO" },
    tags: ["Forecasting", "Hybrid", "Supply"],
  },
  {
    code: "CASE/04",
    industry: "LEGAL",
    title: "Pipeline RAG sobre corpus legal.",
    problem:
      "Estudio jurídico revisaba 800 contratos/mes manualmente. Bottleneck en escalado.",
    solution:
      "RAG con re-ranking + 6 niveles de severidad + eval suite vs. abogados senior.",
    metric: { value: "92%", label: "PRECISIÓN VS SENIOR" },
    metricSecondary: { value: "-85%", label: "TIEMPO DE REVISIÓN" },
    tags: ["RAG", "Domain", "Quality"],
  },
  {
    code: "CASE/05",
    industry: "HEALTHCARE",
    title: "Triage adaptativo asistido.",
    problem:
      "Sistema de salud público con bottlenecks en triage de pacientes ambulatorios.",
    solution:
      "Agente EHR-aware con contexto histórico, asistiendo decisiones clínicas en tiempo real.",
    metric: { value: "-38%", label: "TIEMPO DE ESPERA" },
    metricSecondary: { value: "+24%", label: "PRECISIÓN PRIMARIA" },
    tags: ["EHR", "Clinical", "Adaptive"],
  },
];

export function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-10% 0px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Convert vertical scroll into horizontal pan
  // The track contains 5 cards. We want the last card's right edge to align
  // with the viewport's right edge at scrollProgress = 1.
  // total card-track width ≈ 5 × ~92vw + gaps. Pan offset ≈ -((cards-1) * 92%)
  const xRaw = useTransform(
    scrollYProgress,
    [0, 0.06, 1],
    ["6vw", "6vw", `-${(cases.length - 1) * 86}vw`]
  );
  const x = useSpring(xRaw, { stiffness: 90, damping: 22, mass: 0.6 });

  // Stage progress for the rail indicator
  return (
    <section
      ref={sectionRef}
      className="relative bg-nexus-void"
      style={{ height: `${cases.length * 95}vh` }}
      aria-label="Casos de estudio"
    >
      <div className="sticky top-0 flex h-[100vh] w-full flex-col overflow-hidden">
        {/* Grid + glow */}
        <div className="pointer-events-none absolute inset-0 grid-overlay opacity-20 mask-radial-fade" />
        <div className="pointer-events-none absolute inset-0 bg-radial-neon opacity-25" />

        {/* HUD corners */}
        <span className="pointer-events-none absolute left-6 top-6 h-5 w-5 border-l border-t border-nexus-neon/40 lg:left-10 lg:top-10" />
        <span className="pointer-events-none absolute right-6 top-6 h-5 w-5 border-r border-t border-nexus-neon/40 lg:right-10 lg:top-10" />
        <span className="pointer-events-none absolute bottom-6 left-6 h-5 w-5 border-b border-l border-nexus-neon/40 lg:bottom-10 lg:left-10" />
        <span className="pointer-events-none absolute bottom-6 right-6 h-5 w-5 border-b border-r border-nexus-neon/40 lg:bottom-10 lg:right-10" />

        {/* Header strip */}
        <div ref={headerRef} className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-16 lg:px-10 lg:pt-20">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={headerInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ originX: 0 }}
                className="flex items-center gap-3"
              >
                <span className="h-px w-8 bg-nexus-neon shadow-[0_0_8px_#A6FF00]" />
                <span className="label-mono text-nexus-neon">
                  CASE STUDIES · CAT/05
                </span>
              </motion.div>
              <h2 className="mt-4 font-display text-[clamp(1.8rem,3.6vw,2.8rem)] font-light leading-[1.1] tracking-[-0.02em]">
                <span className="text-metallic">Cinco sistemas en</span>{" "}
                <span className="text-neon-grad">producción.</span>
              </h2>
            </div>
            <div className="hidden items-center gap-3 font-mono text-[10px] tracking-wider2 text-nexus-chrome/45 md:flex">
              <span>SCROLL VERTICAL →</span>
              <span className="h-px w-12 bg-nexus-chrome/30" />
              <span>PAN HORIZONTAL</span>
            </div>
          </div>
        </div>

        {/* Horizontal track */}
        <div className="relative z-10 flex flex-1 items-center">
          <motion.div
            style={{ x }}
            className="flex flex-none items-stretch gap-6 pl-0 pr-12 will-change-transform"
          >
            {cases.map((c, i) => (
              <CaseCard key={c.code} c={c} index={i} />
            ))}
          </motion.div>
        </div>

        {/* Bottom progress rail */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 lg:px-10 lg:pb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] tracking-wider2 text-nexus-chrome/45">
              SCROLL
            </span>
            <div className="relative h-px flex-1 bg-nexus-chrome/15">
              <motion.div
                style={{ scaleX: scrollYProgress, originX: 0 }}
                className="absolute inset-0 h-px bg-nexus-neon shadow-[0_0_8px_#A6FF00]"
              />
            </div>
            <span className="font-mono text-[9px] tracking-wider2 text-nexus-chrome/45">
              {cases.length.toString().padStart(2, "0")} CASES
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseCard({ c, index }: { c: (typeof cases)[number]; index: number }) {
  return (
    <article className="relative flex w-[80vw] max-w-[640px] flex-none flex-col rounded-2xl bg-gradient-to-b from-nexus-carbon/60 to-nexus-shadow p-8 shadow-panel lg:w-[58vw] lg:p-10">
      <span className="corner-mark tl" />
      <span className="corner-mark tr" />
      <span className="corner-mark bl" />
      <span className="corner-mark br" />

      {/* Header row */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-wider2 text-nexus-neon/85">
          {c.code}
        </span>
        <span className="rounded-full border border-nexus-chrome/15 bg-nexus-carbon/40 px-2.5 py-1 font-mono text-[9px] tracking-wider2 text-nexus-chrome/65">
          {c.industry}
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-6 font-display text-[clamp(1.6rem,3vw,2.6rem)] font-light leading-[1.1] tracking-[-0.02em]">
        <span className="text-metallic">{c.title.split(".")[0]}.</span>
      </h3>

      {/* Body grid */}
      <div className="mt-8 grid flex-1 grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <span className="label-mono text-nexus-chrome/45">PROBLEMA</span>
          <p className="mt-3 text-[13.5px] leading-relaxed text-nexus-chrome/65">
            {c.problem}
          </p>
        </div>
        <div>
          <span className="label-mono text-nexus-chrome/45">SOLUCIÓN</span>
          <p className="mt-3 text-[13.5px] leading-relaxed text-nexus-chrome/65">
            {c.solution}
          </p>
        </div>
      </div>

      {/* Metrics row */}
      <div className="mt-8 grid grid-cols-2 gap-4 border-t border-nexus-chrome/10 pt-6">
        <Metric value={c.metric.value} label={c.metric.label} />
        <Metric value={c.metricSecondary.value} label={c.metricSecondary.label} accent={false} />
      </div>

      {/* Tags */}
      <div className="mt-6 flex flex-wrap gap-2">
        {c.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-nexus-chrome/10 bg-nexus-carbon/40 px-2.5 py-1 font-mono text-[9px] tracking-wider2 text-nexus-chrome/55"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Card index watermark */}
      <span className="pointer-events-none absolute right-6 bottom-6 font-display text-[120px] font-light leading-none text-nexus-chrome/[0.04]">
        {String(index + 1).padStart(2, "0")}
      </span>
    </article>
  );
}

function Metric({
  value,
  label,
  accent = true,
}: {
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div
        className={
          "font-display text-3xl font-light tracking-tight md:text-4xl " +
          (accent ? "text-neon-grad" : "text-metallic")
        }
      >
        {value}
      </div>
      <div className="mt-2 font-mono text-[9px] tracking-wider2 text-nexus-chrome/45">
        {label}
      </div>
    </div>
  );
}
