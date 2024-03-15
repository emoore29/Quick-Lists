/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // LIGHT MODE
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        onBackground: "rgb(var(--color-on-background), <alpha-value>)",
        onPrimary: "var(--color-on-primary)",
        onSecondary: "var(--color-on-secondary)",
        onSurface: "rgb(var(--color-on-surface), <alpha-value>)",
        // DARK MODE
        dmPrimary: "var(--color-darkmode-primary)",
        dmSecondary: "var(--color-darkmode-secondary)",
        dmBackground: "var(--color-darkmode-background)",
        dmSurface: "var(--color-darkmode-surface)",
        dmRaisedSurface: "var(--color-darkmode-raised-surface)",
        dmOnBackground:
          "rgb(var(--color-darkmode-on-background), <alpha-value>)",
        dmOnPrimary: "var(--color-darkmode-on-primary)",
        dmOnSecondary: "var(--color-darkmode-on-secondary)",
        dmOnSurface: "rgb(var(--color-darkmode-on-surface), <alpha-value>)",
      },
      fontFamily: {
        lateef: ["Lateef", "serif"],
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        kalam: ["Kalam", "handwriting"],
        robotoSlab: ["Roboto Slab", "serif"],
      },
      fontWeight: {
        thin: 100,
        light: 200,
      },
      boxShadow: {
        lightSm: "0 3px 6px 1px rgb(15, 9, 7, 0.1)",
        darkSm: "0 3px 6px 1px rgb(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
