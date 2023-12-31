import { type Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "570px",
      md: "640px",
      lg: "750px",
      xl: "1024px",
      "2xl": "1280px",
      "3xl": "1536px",
    },
    extend: {
      boxShadow: {
        glow: "0 0 6px 3px rgba(232, 121, 249, 0.2)",
      },
      colors: {
        darktextalt: "#64748b",
        darktext: "#475569",
        glowblue: "#A5B4FC",
      },
      fontSize: {
        "8xl": "6rem",
        "9xl": "7rem",
      },
      animation: {
        "gradient-x": "gradient-x 4s ease infinite",
        shift: "shift 10s ease infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          // shift: {
          //   "0%, 100%": { backgroundPosition: "0% 50%" },
          //   "50%": { backgroundPosition: "100% 50%" },
          // },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
} satisfies Config;
