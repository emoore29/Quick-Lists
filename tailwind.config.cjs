/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-white": "#fdfbf9",
        "main-brand": "#1e120e",
        "light-shade": "#ecdac4",
        "medium-shade": "#8f5843",
        "dark-shade": "#0f0907",
      },
      fontFamily: {
        lateef: ["Lateef", "serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
