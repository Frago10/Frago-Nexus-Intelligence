"use client";

import dynamic from "next/dynamic";
import {
  LogoConceptA,
  LogoConceptB,
  LogoConceptC,
  LogoConceptD,
} from "@/components/brand/LogoConcepts";

const SculptureConceptA = dynamic(
  () => import("@/components/three/SculptureConcepts").then((m) => m.SculptureConceptA),
  { ssr: false }
);
const SculptureConceptB = dynamic(
  () => import("@/components/three/SculptureConcepts").then((m) => m.SculptureConceptB),
  { ssr: false }
);
const SculptureConceptC = dynamic(
  () => import("@/components/three/SculptureConcepts").then((m) => m.SculptureConceptC),
  { ssr: false }
);
const SculptureConceptD = dynamic(
  () => import("@/components/three/SculptureConcepts").then((m) => m.SculptureConceptD),
  { ssr: false }
);

const logoConcepts = [
  {
    code: "L/01",
    name: "VECTOR LOCK",
    pitch: "Tres trazos vectoriales convergentes con un nodo de neón en el cruce.",
    desc: "Ultra-minimal. Tipo Linear / Arc / Vercel. Lee como sistema técnico, no como letra. Escala perfecto a favicon. Más limpio y serio que el N actual.",
    tags: ["Minimal", "System", "Geometric"],
    Component: LogoConceptA,
  },
  {
    code: "L/02",
    name: "HEX CORE",
    pitch: "Hexágono fragmentado con núcleo neón pulsante.",
    desc: "Símbolo de nodo de red. Molecular / blockchain / web3 vibe. Profundidad geométrica. El core pulsa como un latido. Tech industrial.",
    tags: ["Network", "Node", "Industrial"],
    Component: LogoConceptB,
  },
  {
    code: "L/03",
    name: "PULSE SIGIL",
    pitch: "Onda de señal con un pulso de neón viajando bajo ella.",
    desc: "Sin letterform. Lee como 'latido de IA' o señal en vivo. Sigilo abstracto que se siente vivo. Más distintivo, menos genérico.",
    tags: ["Alive", "Signal", "Abstract"],
    Component: LogoConceptC,
  },
  {
    code: "L/04",
    name: "APERTURE MARK",
    pitch: "Diafragma de cámara con iris de neón en el centro.",
    desc: "Símbolo de precisión óptica. 'Lens to the future'. Las 6 hojas metálicas reflejan luz. El iris de neón parpadea como un sistema vigilante. Editorial, premium.",
    tags: ["Precision", "Optical", "Editorial"],
    Component: LogoConceptD,
  },
];

const sculptureConcepts = [
  {
    code: "S/A",
    name: "PLASMA NEURAL CORE",
    pitch: "Esfera de partículas neón con núcleo pulsante. Sinapsis viva.",
    desc: "Una constelación que respira en torno a un núcleo brillante. Las líneas se conectan dinámicamente conforme las partículas drifean. Representa una IA literalmente pensando.",
    tags: ["Synapse", "Particles", "Living"],
    Component: SculptureConceptA,
  },
  {
    code: "S/B",
    name: "FACETED CRYSTAL",
    pitch: "Icosaedro oscuro con aristas de neón. Inteligencia cristalizada.",
    desc: "Geometría sagrada en metal oscuro con bordes que brillan. Un núcleo interno late dentro del cristal. Lujoso, joyería tech, fortaleza intelectual.",
    tags: ["Crystal", "Gem", "Premium"],
    Component: SculptureConceptB,
  },
  {
    code: "S/C",
    name: "ENERGY TOROID",
    pitch: "Reactor de fusión: anillo de partículas + núcleo brillante.",
    desc: "Toroide de plasma con partículas fluyendo a lo largo de su superficie y un sol de neón en el centro. Iron Man arc reactor / motor de inteligencia.",
    tags: ["Reactor", "Power", "Cinematic"],
    Component: SculptureConceptC,
  },
  {
    code: "S/D",
    name: "MORPHING ORGANISM",
    pitch: "Wireframe que respira y se ondula. Criatura digital viva.",
    desc: "Geometría que se deforma continuamente con noise procedural. No es una forma fija — es un organismo. Adaptación, evolución, IA orgánica.",
    tags: ["Alive", "Organic", "Evolving"],
    Component: SculptureConceptD,
  },
];

export default function ConceptsPage() {
  return (
    <main className="min-h-screen bg-nexus-void text-nexus-chrome">
      {/* Header */}
      <header className="relative border-b border-nexus-chrome/10 px-6 py-12 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-nexus-neon shadow-[0_0_8px_#A6FF00]" />
            <span className="label-mono text-nexus-neon">DESIGN CONCEPTS · ROUND 02</span>
          </div>
          <h1 className="mt-6 font-display text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.05] tracking-[-0.02em]">
            <span className="text-metallic">Cuatro logos.</span>{" "}
            <span className="text-nexus-chrome/60">Cuatro esculturas.</span>{" "}
            <span className="text-neon-grad">Una identidad.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-nexus-chrome/55">
            Cada opción es un cambio de dirección distinto. Elige uno de cada
            sección — los aplicamos en todo el sitio (nav, loader, hero, footer)
            y seguimos con el siguiente upgrade (#7 — cursor magnético).
          </p>
        </div>
      </header>

      {/* LOGOS */}
      <section className="border-b border-nexus-chrome/10 px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-center gap-3">
            <span className="label-mono text-nexus-chrome/45">01 / LOGO MARKS</span>
            <span className="h-px flex-1 bg-nexus-chrome/10" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {logoConcepts.map((c) => (
              <article
                key={c.code}
                className="glass-panel group relative overflow-hidden rounded-2xl p-8"
              >
                <span className="corner-mark tl" />
                <span className="corner-mark tr" />
                <span className="corner-mark bl" />
                <span className="corner-mark br" />

                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] tracking-wider2 text-nexus-chrome/40">
                    {c.code}
                  </span>
                  <span className="font-mono text-[10px] tracking-wider2 text-nexus-neon">
                    LOGO
                  </span>
                </div>

                <div className="my-8 flex h-44 items-center justify-center">
                  <c.Component size={140} />
                </div>

                <h3 className="font-display text-2xl font-light tracking-tight text-nexus-chrome">
                  {c.name}
                </h3>
                <p className="mt-2 text-[13px] font-medium tracking-wide text-nexus-neon/85">
                  {c.pitch}
                </p>
                <p className="mt-4 text-[14px] leading-relaxed text-nexus-chrome/55">
                  {c.desc}
                </p>
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
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SCULPTURES */}
      <section className="px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-center gap-3">
            <span className="label-mono text-nexus-chrome/45">02 / 3D SCULPTURES</span>
            <span className="h-px flex-1 bg-nexus-chrome/10" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {sculptureConcepts.map((c) => (
              <article
                key={c.code}
                className="glass-panel relative overflow-hidden rounded-2xl"
              >
                <span className="corner-mark tl" />
                <span className="corner-mark tr" />
                <span className="corner-mark bl" />
                <span className="corner-mark br" />

                <div className="relative aspect-square w-full bg-nexus-void/40">
                  <c.Component className="absolute inset-0" />
                  <div className="pointer-events-none absolute inset-0 bg-radial-neon opacity-40" />
                  <div className="absolute left-5 top-5 flex items-center gap-2">
                    <span className="font-mono text-[10px] tracking-wider2 text-nexus-chrome/45">
                      {c.code}
                    </span>
                    <span className="h-px w-6 bg-nexus-neon shadow-[0_0_6px_#A6FF00]" />
                    <span className="font-mono text-[10px] tracking-wider2 text-nexus-neon">
                      3D · LIVE
                    </span>
                  </div>
                </div>

                <div className="border-t border-nexus-chrome/10 p-7">
                  <h3 className="font-display text-2xl font-light tracking-tight text-nexus-chrome">
                    {c.name}
                  </h3>
                  <p className="mt-2 text-[13px] font-medium tracking-wide text-nexus-neon/85">
                    {c.pitch}
                  </p>
                  <p className="mt-4 text-[14px] leading-relaxed text-nexus-chrome/55">
                    {c.desc}
                  </p>
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
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer instructions */}
      <footer className="border-t border-nexus-chrome/10 px-6 py-10 lg:px-10">
        <div className="mx-auto max-w-7xl text-center">
          <p className="font-mono text-[11px] tracking-wider2 text-nexus-chrome/45">
            ELIGE UN LOGO + UNA ESCULTURA · LOS APLICAMOS EN HERO/NAV/LOADER ·
            SEGUIMOS CON #7
          </p>
        </div>
      </footer>
    </main>
  );
}
