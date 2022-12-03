/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      header: ["Allerta Stencil"],
    },
    colors: {
      primary: "#4269E2",
      white: "#ffffff",
      yellow: "#FFC107",
      secondary: "rgba(217, 217, 217, 0.05)",
    },
  },
  plugins: [],
};
