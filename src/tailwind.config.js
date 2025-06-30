/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      colors: {
        primary: "#22c55e", // green-500
        secondary: "#0ea5e9", // blue-500
      },
      boxShadow: {
        grid: "0 0 0 1px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
}
