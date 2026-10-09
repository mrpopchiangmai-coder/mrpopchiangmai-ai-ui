/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#FACC15', // Iconic Mr. Pop Yellow
          yellowHover: '#EAB308',
          red: '#DC2626',    // Mr. Pop Racing Red
          redHover: '#B91C1C',
          black: '#0A0A0A',  // Bold Black
          500: '#FACC15',
          600: '#EAB308',
          700: '#CA8A04',
          accent: '#FACC15',
          emerald: '#10b981',
        },
        dark: {
          bg: '#0A0A0A',
          card: '#141414',
          border: '#262626',
          hover: '#1F1F1F',
        }
      },
    },
  },
  plugins: [],
}
