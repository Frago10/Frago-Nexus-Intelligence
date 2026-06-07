"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { LogoMark } from "@/components/brand/LogoMark";
import { Magnetic } from "@/components/interaction/Magnetic";
import { LazyMount } from "@/components/perf/LazyMount";
import { ContactForm } from "@/components/sections/ContactForm";

const ParticleField = dynamic(
  () => import("@/components/three/ParticleField").then((m) => m.ParticleField),
  { ssr: false }
);

export function CTA() {
  return (
    <section id="contacto" className="relative overflow-hidden py-32 lg:py-44">
      <LazyMount className="absolute inset-0 opacity-60 mask-radial-fade" rootMargin="400px">
        <ParticleField className="absolute inset-0" count={500} />
      </LazyMount>
      <div className="absolute inset-0 bg-radial-neon opacity-70" />

      <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
        >
          <div className="rounded-2xl border border-nexus-neon/20 bg-nexus-void/40 p-4 backdrop-blur-xl">
            <LogoMark size={64} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mt-10 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-nexus-neon shadow-[0_0_8px_#A6FF00]" />
            <span className="label-mono text-nexus-neon">INICIAR CONEXIÓN</span>
            <span className="h-px w-8 bg-nexus-neon shadow-[0_0_8px_#A6FF00]" />
          </div>

          <h2 className="mx-auto mt-8 max-w-4xl font-display text-[clamp(2.2rem,5.5vw,4.6rem)] font-light leading-[1.02] tracking-[-0.03em] text-balance">
            <span className="text-metallic">Build smarter.</span>{" "}
            <span className="text-neon-grad drop-shadow-[0_0_28px_rgba(166,255,0,0.45)]">
              Scale faster.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-nexus-chrome/65">
            Si tu organización está lista para operar con inteligencia
            de próxima generación, hablemos. Un primer encuentro,
            cero compromiso.
          </p>

          <ContactForm />

          <div className="mt-8 flex items-center justify-center">
            <Magnetic strength={0.18}>
              <a
                href="mailto:hello@fragosnexus.ai"
                className="font-mono text-[12px] tracking-wider2 text-nexus-chrome/60 underline-offset-4 transition-colors hover:text-nexus-neon hover:underline"
              >
                o escríbenos: hello@fragosnexus.ai
              </a>
            </Magnetic>
          </div>
        </motion.div>

        {/* secret-lab decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-[10px] tracking-wider2 text-nexus-chrome/35"
        >
          <span>SEC/LVL-4 · CIPHER OK</span>
          <span className="hidden h-3 w-px bg-nexus-chrome/15 md:block" />
          <span>FRG-NXS · NODE 04.7</span>
          <span className="hidden h-3 w-px bg-nexus-chrome/15 md:block" />
          <span>UTC 2026</span>
        </motion.div>
      </div>
    </section>
  );
}
