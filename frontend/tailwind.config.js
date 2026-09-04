/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          dark: '#07120d',
          card: '#0e2017',
          hover: '#152d20',
          green: '#10b981',
          gold: '#f59e0b',
          border: '#1a3827'
        }
      }
    },
  },
  plugins: [],
}
