import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        line: "var(--line)",
        accent: "var(--accent)",
        brand: "var(--brand)",
        warn: "var(--warn)",
        focus: "var(--focus)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        input: "8px",
        card: "14px",
        panel: "22px",
      },
      boxShadow: {
        soft: "0 2px 6px rgba(20,20,20,.05), 0 12px 28px rgba(20,20,20,.08)",
      },
      spacing: {
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "6": "24px",
        "8": "32px",
        "12": "48px",
        "16": "64px",
      },
    },
  },
  plugins: [],
};

export default config;
