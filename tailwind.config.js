/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        night: "#1f2a37",
        cosmos: "#fef7f1",
        neon: {
          pink: "#f28482",
          blue: "#f6bd60",
          lime: "#84a59d",
          amber: "#f5cac3",
        },
      },
      boxShadow: {
        glow: "0 0 30px rgba(242, 132, 130, 0.35)",
        "glass-lg":
          "0 25px 60px rgba(244, 181, 156, 0.35), inset 0 1px 0 rgba(255,255,255,0.4)",
      },
      backgroundImage: {
        "grid-glow":
          "linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.25), transparent 45%)",
      },
      animation: {
        "slow-spin": "spin 18s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      borderRadius: {
        xl: "1.5rem",
      },
    },
  },
  plugins: [],
};

