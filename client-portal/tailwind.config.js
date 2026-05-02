/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: { primary: "#050505", secondary: "#0B0B0D", surface: "#101114", card: "#141417", subtle: "#1C1C21" },
        accent: { DEFAULT: "#39FF14", soft: "#2DE510", muted: "#1E9F11" },
        text: { primary: "#F5F5F7", muted: "#A1A1AA", soft: "#6B7280" },
        gold: { DEFAULT: "#C6A96A", soft: "#D8BC82" }
      },
      boxShadow: {
        glow: "0 0 30px rgba(57,255,20,0.18)",
        soft: "0 10px 40px rgba(0,0,0,0.28)"
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
