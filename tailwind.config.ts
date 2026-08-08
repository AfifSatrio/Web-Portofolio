import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        foreground: "#FFFFFF",
        black: "#0A0A0A",
        white: "#FFFFFF",
        mono: {
          900: "#1A1A1A",
          700: "#333333",
          500: "#7A7A7A",
          300: "#B3B3B3",
        },
      },
      fontFamily: {
        archivo: ["var(--font-archivo)", "sans-serif"],
        sans: ["var(--font-general-sans)", "Inter", "sans-serif"],
      },
      spacing: {
        'sp-4': '4px',
        'sp-8': '8px',
        'sp-16': '16px',
        'sp-24': '24px',
        'sp-32': '32px',
        'sp-48': '48px',
        'sp-64': '64px',
        'sp-96': '96px',
        'sp-128': '128px',
      },
      maxWidth: {
        'container': '1280px',
      },
      animation: {
        "marquee": "marquee 20s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
