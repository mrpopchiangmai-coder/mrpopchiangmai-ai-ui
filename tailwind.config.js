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
          50: '#fff1f2',
          100: '#ffe4e6',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          accent: '#00f2fe',
          emerald: '#10b981',
        },
        dark: {
          bg: '#0b0f19',
          card: '#111827',
          border: '#1f293d',
          hover: '#1a233a',
        }
      },
    },
  },
  plugins: [],
}
