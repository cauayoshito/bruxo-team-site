// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0B",
        surface: "#111215",
        card: "#15171B",
        border: "#23262B",
        muted: "#9CA3AF",
        brand: {
          red: "#E5242A",
          redHover: "#C71F24",
        },
      },
      boxShadow: {
        subtle:
          "0 1px 0 0 rgba(255,255,255,0.06) inset, 0 6px 24px rgba(0,0,0,0.4)",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"], // ← define a fonte global
      },
    },
  },
  plugins: [],
};
export default config;
