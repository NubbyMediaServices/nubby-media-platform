export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        charcoal: "#0B0B0D",
        panel: "#141417",
        cream: "#F5F5F7",
        muted: "#A1A1AA",
        neon: "#39FF14",
        gold: "#C6A96A"
      },
      boxShadow: {
        glow: "0 0 32px rgba(57,255,20,0.20)",
        soft: "0 24px 80px rgba(0,0,0,0.35)"
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" }
        }
      },
      animation: {
        fadeUp: "fadeUp .8s ease-out both",
        floatSlow: "floatSlow 7s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
