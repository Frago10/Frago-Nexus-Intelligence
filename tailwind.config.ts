import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        nexus: {
          void: "#050505",
          shadow: "#0a0a0b",
          carbon: "#111114",
          steel: "#1c1c20",
          silver: "#c8ccd1",
          chrome: "#e8eaed",
          neon: "#A6FF00",
          "neon-soft": "#7acc00",
          "neon-glow": "#c4ff4d",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        nexus: "0.18em",
        wider2: "0.32em",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(180deg, rgba(5,5,5,0) 0%, rgba(5,5,5,0.6) 60%, rgba(5,5,5,1) 100%)",
        "radial-neon":
          "radial-gradient(ellipse at center, rgba(166,255,0,0.18) 0%, rgba(166,255,0,0) 70%)",
        "metallic":
          "linear-gradient(135deg, #f5f7fa 0%, #c8ccd1 35%, #6e7278 65%, #e8eaed 100%)",
      },
      boxShadow: {
        "neon-sm": "0 0 12px rgba(166,255,0,0.35), 0 0 1px rgba(166,255,0,0.6)",
        "neon-md": "0 0 28px rgba(166,255,0,0.45), 0 0 2px rgba(166,255,0,0.7)",
        "neon-lg": "0 0 60px rgba(166,255,0,0.55), 0 0 4px rgba(166,255,0,0.8)",
        "panel": "0 0 0 1px rgba(255,255,255,0.06), 0 20px 80px -20px rgba(0,0,0,0.8)",
      },
      animation: {
        "neon-pulse": "neonPulse 3.2s ease-in-out infinite",
        "scan": "scan 6s linear infinite",
        "float-y": "floatY 8s ease-in-out infinite",
        "stream": "stream 4s linear infinite",
        "shimmer": "shimmer 3s linear infinite",
      },
      keyframes: {
        neonPulse: {
          "0%, 100%": { opacity: "0.6", filter: "drop-shadow(0 0 6px rgba(166,255,0,0.4))" },
          "50%": { opacity: "1", filter: "drop-shadow(0 0 18px rgba(166,255,0,0.85))" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        stream: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
