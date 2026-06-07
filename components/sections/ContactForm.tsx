"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type Status = "idle" | "sending" | "ok" | "error";

const budgets = ["< 10k", "10k – 30k", "30k – 80k", "80k +", "Por definir"];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "No se pudo enviar.");
      }
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Error inesperado.");
    }
  }

  return (
    <div className="mx-auto mt-14 max-w-xl text-left">
      <AnimatePresence mode="wait">
        {status === "ok" ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-nexus-neon/30 bg-nexus-neon/[0.04] p-8 text-center backdrop-blur-xl"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-nexus-neon/10">
              <svg className="h-6 w-6 text-nexus-neon" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="mt-5 font-display text-xl font-light text-nexus-chrome">
              Conexión establecida.
            </h3>
            <p className="mt-2 text-[14px] text-nexus-chrome/60">
              Recibimos tu mensaje. Respondemos en menos de 24 h con los próximos pasos.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 font-mono text-[11px] tracking-wider2 text-nexus-neon underline-offset-4 hover:underline"
            >
              ENVIAR OTRO MENSAJE
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4 rounded-2xl border border-nexus-chrome/10 bg-nexus-void/40 p-6 backdrop-blur-xl sm:p-8"
          >
            {/* honeypot — hidden from humans */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="name" label="Nombre" required placeholder="Tu nombre" />
              <Field name="email" type="email" label="Email" required placeholder="tu@empresa.com" />
            </div>
            <Field name="company" label="Empresa" placeholder="Opcional" />

            <div>
              <Label>Presupuesto</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {budgets.map((b, i) => (
                  <label key={b} className="cursor-pointer">
                    <input
                      type="radio"
                      name="budget"
                      value={b}
                      defaultChecked={i === budgets.length - 1}
                      className="peer sr-only"
                    />
                    <span className="inline-block rounded-full border border-nexus-chrome/15 px-3 py-1.5 text-[12px] text-nexus-chrome/60 transition-all peer-checked:border-nexus-neon/50 peer-checked:bg-nexus-neon/10 peer-checked:text-nexus-neon">
                      {b}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="message">Mensaje</Label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Cuéntanos qué quieres construir o automatizar…"
                className="mt-2 w-full resize-none rounded-xl border border-nexus-chrome/15 bg-nexus-void/60 px-4 py-3 text-[14px] text-nexus-chrome placeholder:text-nexus-chrome/30 outline-none transition-colors focus:border-nexus-neon/50"
              />
            </div>

            {status === "error" && (
              <p className="text-[13px] text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-nexus-neon px-8 py-4 text-[13px] font-semibold tracking-wider2 text-nexus-void shadow-neon-md transition-shadow hover:shadow-neon-lg disabled:opacity-60"
            >
              <span className="relative z-10">
                {status === "sending" ? "ENVIANDO…" : "ENVIAR BRIEFING"}
              </span>
              {status !== "sending" && (
                <svg className="relative z-10 h-3 w-3 transition-transform group-hover:translate-x-1" viewBox="0 0 12 12" fill="none">
                  <path d="M1 6h10m0 0L7 2m4 4L7 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
            <p className="text-center font-mono text-[10px] tracking-wider2 text-nexus-chrome/35">
              CIFRADO EN TRÁNSITO · CERO COMPROMISO
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="label-mono text-nexus-chrome/55">
      {children}
    </label>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-nexus-chrome/15 bg-nexus-void/60 px-4 py-3 text-[14px] text-nexus-chrome placeholder:text-nexus-chrome/30 outline-none transition-colors focus:border-nexus-neon/50"
      />
    </div>
  );
}
