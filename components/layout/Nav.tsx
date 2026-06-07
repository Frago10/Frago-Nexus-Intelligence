"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { LogoLockup } from "@/components/brand/LogoMark";

const links = [
  { label: "Capacidades", href: "#capacidades" },
  { label: "Servicios", href: "#servicios" },
  { label: "Por qué", href: "#por-que" },
  { label: "Proceso", href: "#proceso" },
  { label: "FAQ", href: "#faq" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 140], [0, 0.85]);
  const borderOpacity = useTransform(scrollY, [0, 140], [0, 0.12]);
  const blur = useTransform(scrollY, [0, 140], [0, 18]);
  const backdropFilter = useTransform(blur, (b) => `blur(${b}px) saturate(140%)`);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="absolute inset-0 bg-nexus-void/80"
        style={{ opacity: bgOpacity, backdropFilter, WebkitBackdropFilter: backdropFilter as unknown as string }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nexus-neon to-transparent"
        style={{ opacity: borderOpacity }}
      />

      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#" className="group flex items-center">
          <LogoLockup />
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-[13px] font-medium tracking-wide text-nexus-chrome/70 transition-colors hover:text-nexus-chrome"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-nexus-neon shadow-[0_0_8px_#A6FF00] transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 font-mono text-[10px] tracking-wider2 text-nexus-chrome/50 md:flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-nexus-neon opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-nexus-neon" />
            </span>
            SYSTEM ONLINE
          </span>
          <a
            href="#contacto"
            className="group relative overflow-hidden rounded-full border border-nexus-neon/40 bg-nexus-neon/[0.04] px-5 py-2 text-[12px] font-medium tracking-wider2 text-nexus-neon transition-all hover:bg-nexus-neon/10 hover:shadow-neon-sm"
          >
            <span className="relative z-10">INICIAR</span>
            <span className="absolute inset-0 bg-nexus-neon/0 transition-all duration-500 group-hover:bg-nexus-neon/5" />
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
