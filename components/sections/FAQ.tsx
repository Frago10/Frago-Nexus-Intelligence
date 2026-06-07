"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { faqs } from "@/components/seo/JsonLd";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-nexus-neon shadow-[0_0_8px_#A6FF00]" />
          <span className="label-mono text-nexus-neon">PREGUNTAS FRECUENTES</span>
          <span className="h-px w-8 bg-nexus-neon shadow-[0_0_8px_#A6FF00]" />
        </div>

        <h2 className="mx-auto mt-8 max-w-2xl text-center font-display text-[clamp(1.8rem,4vw,3rem)] font-light leading-[1.05] tracking-[-0.02em] text-balance">
          <span className="text-metallic">Todo lo que necesitas saber</span>
        </h2>

        <div className="mt-14 divide-y divide-nexus-chrome/10 border-y border-nexus-chrome/10">
          {faqs.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div key={q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-[16px] font-light text-nexus-chrome">
                    {q}
                  </span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all ${
                      isOpen
                        ? "rotate-45 border-nexus-neon/50 text-nexus-neon"
                        : "border-nexus-chrome/20 text-nexus-chrome/50"
                    }`}
                  >
                    <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 text-[14px] leading-relaxed text-nexus-chrome/60">
                        {a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
