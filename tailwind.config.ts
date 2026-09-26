import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#0A0A0A",
        white: "#FFFFFF",
        mono: {
          900: "#1A1A1A",
          800: "#262626",
          700: "#333333",
          500: "#A3A3A3",
          300: "#D4D4D4",
          200: "#E5E5E5",
        },
        surface: { subtle: "#101010" },
        ink: { DEFAULT: "#FAFAFA", secondary: "#B3B3B3", muted: "#A3A3A3" },
        line: { DEFAULT: "#333333", strong: "#737373" },
        feedback: { error: "#E5E5E5" },
      },
      borderRadius: { control: "4px", card: "8px" },
      transitionDuration: { ui: "200ms" },
      fontFamily: {
        sans: ["var(--font-general-sans)", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
