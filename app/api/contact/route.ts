import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ── Lightweight in-memory rate limiter (best-effort, per warm instance) ──
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > MAX_PER_WINDOW;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  budget?: string;
  // honeypot — must stay empty
  website?: string;
};

function clean(v: unknown, max = 4000): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Demasiadas solicitudes. Intenta en un minuto." },
      { status: 429 }
    );
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (clean(body.website)) {
    return NextResponse.json({ ok: true }); // silently accept & drop
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const company = clean(body.company, 160);
  const budget = clean(body.budget, 60);
  const message = clean(body.message, 4000);

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Nombre, email y mensaje son obligatorios." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Email no válido." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "hello@fragosnexus.ai";
  const from = process.env.CONTACT_FROM_EMAIL ?? "Nexus <onboarding@resend.dev>";

  // If no provider is configured yet, don't fail the UX — log and accept.
  if (!apiKey) {
    console.info("[contact] (no RESEND_API_KEY) lead:", {
      name,
      email,
      company,
      budget,
      message,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;color:#111">
      <h2 style="margin:0 0 12px">Nuevo briefing · Nexus Intelligence</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${company ? `<p><strong>Empresa:</strong> ${escapeHtml(company)}</p>` : ""}
      ${budget ? `<p><strong>Presupuesto:</strong> ${escapeHtml(budget)}</p>` : ""}
      <p><strong>Mensaje:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Briefing · ${name}${company ? ` (${company})` : ""}`,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[contact] resend error:", res.status, detail);
      return NextResponse.json(
        { ok: false, error: "No se pudo enviar el mensaje. Escríbenos por email." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Error inesperado. Intenta de nuevo." },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
