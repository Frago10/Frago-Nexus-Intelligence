"use client";

import { LogoLockup } from "@/components/brand/LogoMark";

const pillars = ["TECNOLOGÍA", "CONEXIÓN", "INNOVACIÓN", "PRECISIÓN", "ESCALABILIDAD"];

export function Footer() {
  return (
    <footer className="relative border-t border-nexus-chrome/10 bg-nexus-void">
      {/* Brand pillars strip — mirrors the brand sheet bottom row */}
      <div className="border-b border-nexus-chrome/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-1 gap-y-2 px-6 py-6 lg:px-10">
          {pillars.map((p, i) => (
            <div key={p} className="flex items-center gap-3 md:gap-5">
              <span className="font-display text-[12px] font-light tracking-wider2 text-nexus-chrome/65">
                {p}
              </span>
              {i < pillars.length - 1 && (
                <span className="h-3 w-px bg-nexus-neon/40" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <LogoLockup />
            <p className="mt-6 max-w-xs text-[13px] leading-relaxed text-nexus-chrome/50">
              Infraestructura de inteligencia diseñada para empresas que operan en la frontera tecnológica. Madrid · Remoto global.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-nexus-neon opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-nexus-neon" />
              </span>
              <span className="font-mono text-[10px] tracking-wider2 text-nexus-chrome/45">
                ACEPTANDO 3 ENGAGEMENTS · Q3 2026
              </span>
            </div>
          </div>

          <FooterCol
            title="SISTEMA"
            links={[
              ["Capacidades", "#capacidades"],
              ["Servicios", "#servicios"],
              ["Proceso", "#proceso"],
              ["Inteligencia", "#inteligencia"],
            ]}
          />
          <FooterCol
            title="CONTACTO"
            links={[
              ["hello@fragosnexus.ai", "mailto:hello@fragosnexus.ai"],
              ["LinkedIn", "#"],
              ["GitHub", "#"],
              ["Press kit", "#"],
            ]}
          />
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-nexus-chrome/10 pt-6 md:flex-row md:items-center">
          <span className="font-mono text-[10px] tracking-wider2 text-nexus-chrome/35">
            © 2026 FRAGO&apos;S NEXUS INTELLIGENCE · ALL SYSTEMS RESERVED
          </span>
          <span className="font-mono text-[10px] tracking-wider2 text-nexus-chrome/35">
            BUILD NX-04.7 · MADRID
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="label-mono text-nexus-neon">{title}</h4>
      <ul className="mt-5 space-y-3">
        {links.map(([label, href]) => (
          <li key={label}>
            <a
              href={href}
              className="text-[13px] text-nexus-chrome/65 transition-colors hover:text-nexus-chrome"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
