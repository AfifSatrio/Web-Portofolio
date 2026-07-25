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
        '4': '4px',
        '8': '8px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '48': '48px',
        '64': '64px',
        '96': '96px',
        '128': '128px',
      },
      maxWidth: {
        'container': '1280px',
      },
    },
  },
  plugins: [],
};

export default config;
