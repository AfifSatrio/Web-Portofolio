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
          950: "#101010",
          900: "#1A1A1A",
          800: "#262626",
          700: "#333333",
          600: "#737373",
          500: "#A3A3A3",
          400: "#B3B3B3",
          300: "#D4D4D4",
          200: "#E5E5E5",
        },
        surface: { DEFAULT: "#0A0A0A", card: "#1A1A1A", subtle: "#101010" },
        ink: { DEFAULT: "#FAFAFA", secondary: "#B3B3B3", muted: "#A3A3A3" },
        line: { DEFAULT: "#333333", subtle: "#262626", strong: "#737373" },
        feedback: { error: "#FCA5A5", success: "#BBF7D0" },
      },
      borderRadius: { control: "4px", card: "8px" },
      transitionDuration: { fast: "150ms", ui: "200ms", reveal: "400ms" },
      fontFamily: {
        archivo: ["var(--font-archivo)", "sans-serif"],
        sans: ["var(--font-general-sans)", "Inter", "sans-serif"],
      },
      spacing: {
        "sp-4": "4px",
        "sp-8": "8px",
        "sp-16": "16px",
        "sp-24": "24px",
        "sp-32": "32px",
        "sp-48": "48px",
        "sp-64": "64px",
        "sp-96": "96px",
        "sp-128": "128px",
      },
      maxWidth: {
        container: "1200px",
      },
      animation: {
        marquee: "marquee 20s linear infinite",
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
