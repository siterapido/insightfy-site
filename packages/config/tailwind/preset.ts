import type { Config } from "tailwindcss";

/**
 * Insightfy design tokens as a Tailwind preset.
 * Consumed by apps/web and packages/ui via `presets: [insightfyPreset]`.
 */
const preset = {
  theme: {
    extend: {
      colors: {
        "bg-base": "#08090c",
        surface: "#0e1014",
        border: "rgba(255,255,255,0.08)",
        text: {
          DEFAULT: "#f5f7fa",
          muted: "#9aa3af",
        },
        muted: "#9aa3af",
        accent: {
          DEFAULT: "#22d3ee",
          secondary: "#38bdf8",
        },
        "accent-secondary": "#38bdf8",
        "diff-add": "#34d399",
        "diff-remove": "#f87171",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
} satisfies Partial<Config>;

export default preset;
