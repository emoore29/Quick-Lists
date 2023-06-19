/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-brand": "#4B3832",
        "light-accent": "#858886",
        "dark-accent": "#7D756C",
        "light-shade": "#c6beb7",
        "dark-shade": "#1E1D20",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
