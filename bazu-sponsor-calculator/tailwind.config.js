/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bazu-orange': '#FF6B35',
        'bazu-red': '#E63946',
        'bazu-dark': '#0A0A0A',
        'bazu-gray': '#1A1A1A',
      },
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
