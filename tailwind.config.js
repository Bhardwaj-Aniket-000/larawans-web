/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        "primary-light": "#818CF8",
        secondary: "#EC4899",
        accent: "#06B6D4",
        dark: "#0F172A",
        light: "#F8FAFC",
        surface: "#FFFFFF",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        body: ["Inter", "sans-serif"],
        heading: ["Plus Jakarta Sans", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2.5rem",
        "5xl": "3.5rem",
        blob: "40% 60% 70% 30% / 40% 50% 60% 50%",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 8s ease-in-out infinite 2s",
        "spin-slow": "spin 12s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
