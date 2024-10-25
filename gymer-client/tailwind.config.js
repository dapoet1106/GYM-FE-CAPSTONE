/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        customGreen: '#C9CEAB',
        customGreen1: '#022C0B'
      },
      container: {
    center: true,
    padding: {
      DEFAULT: "1rem",
      sm: "3rem",

    },
      },
    },
  },
  plugins: [],
}
