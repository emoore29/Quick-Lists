/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "brand-white": "#fdfbf9",
        "main-brand": "#1e120e",
        "light-shade": "#ecdac4",
        "medium-shade": "#8f5843",
        "dark-shade": "#0f0907",
        "medium-alt": "#492d22",
        esther: "rgb(var(--color-esther) / <alpha-value>)",
        maximus: "rgb(var(--color-maximus) / <alpha-value>)",
        linx: "rgb(var(--color-linx) / 1)",
      },
      fontFamily: {
        lateef: ["Lateef", "serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      fontWeight: {
        thin: 100,
        light: 200,
      },
      boxShadow: {
        lightSm: "0 3px 6px 1px rgb(15, 9, 7, 0.1)",
        darkSm: "0 3px 6px 1px rgb(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
