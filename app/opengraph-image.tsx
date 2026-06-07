/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Frago's Nexus Intelligence — Build smarter. Scale faster.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(ellipse at center, #0a0a0b 0%, #050505 70%), linear-gradient(135deg, #050505 0%, #0a0a0b 100%)",
          padding: 80,
          color: "#e8eaed",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* corner brackets */}
        <div
          style={{
            position: "absolute",
            left: 40,
            top: 40,
            width: 20,
            height: 20,
            borderLeft: "1px solid #A6FF00",
            borderTop: "1px solid #A6FF00",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 40,
            top: 40,
            width: 20,
            height: 20,
            borderRight: "1px solid #A6FF00",
            borderTop: "1px solid #A6FF00",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 40,
            bottom: 40,
            width: 20,
            height: 20,
            borderLeft: "1px solid #A6FF00",
            borderBottom: "1px solid #A6FF00",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 40,
            bottom: 40,
            width: 20,
            height: 20,
            borderRight: "1px solid #A6FF00",
            borderBottom: "1px solid #A6FF00",
          }}
        />

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* Hex mark */}
          <svg width="64" height="64" viewBox="0 0 100 100">
            <polygon
              points="50,8 87,30 87,70 50,92 13,70 13,30"
              stroke="#c8ccd1"
              strokeWidth="3"
              fill="none"
            />
            <circle cx="50" cy="50" r="10" fill="#A6FF00" />
            <line
              x1="20"
              y1="80"
              x2="80"
              y2="20"
              stroke="#A6FF00"
              strokeWidth="3"
            />
          </svg>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{ fontSize: 14, color: "rgba(232,234,237,0.6)", letterSpacing: 3 }}>
              FRAGO&apos;S
            </span>
            <span style={{ fontSize: 22, color: "#e8eaed", letterSpacing: 6, marginTop: 4 }}>
              NEXUS
            </span>
            <span style={{ fontSize: 11, color: "#A6FF00", letterSpacing: 6, marginTop: 4 }}>
              INTELLIGENCE
            </span>
          </div>
        </div>

        {/* Body */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: 40 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 30,
            }}
          >
            <div style={{ width: 40, height: 1, background: "#A6FF00" }} />
            <span
              style={{
                fontSize: 12,
                letterSpacing: 6,
                color: "#A6FF00",
              }}
            >
              AI · SAAS · AUTOMATIZACIÓN · CONSULTORÍA
            </span>
          </div>
          <h1
            style={{
              fontSize: 76,
              fontWeight: 300,
              letterSpacing: -2,
              lineHeight: 1.05,
              margin: 0,
              maxWidth: 900,
            }}
          >
            <span style={{ color: "#e8eaed" }}>Build smarter.</span>{" "}
            <span style={{ color: "#A6FF00" }}>Scale faster.</span>
          </h1>
          <p
            style={{
              fontSize: 22,
              color: "rgba(232,234,237,0.6)",
              maxWidth: 800,
              marginTop: 32,
              lineHeight: 1.4,
            }}
          >
            Infraestructura de IA de élite para empresas que operan en la frontera.
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 12,
            color: "rgba(232,234,237,0.4)",
            letterSpacing: 4,
            borderTop: "1px solid rgba(232,234,237,0.1)",
            paddingTop: 24,
          }}
        >
          <span>FRAGOSNEXUS.AI</span>
          <span>MADRID · 2026</span>
          <span>NX-04.7</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
