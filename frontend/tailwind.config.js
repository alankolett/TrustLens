/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F0F3F9',
          100: '#E2E8F4',
          800: '#1B224E',
          900: '#1E2761',
          950: '#0F1433'
        },
        saffron: {
          500: '#FF6B35',
          600: '#EA580C',
          700: '#C2410C'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}
