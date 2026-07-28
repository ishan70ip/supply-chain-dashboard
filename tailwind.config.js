/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Premium aesthetic: Fraunces (expressive serif) for display, Inter for UI/body
        display: ['Fraunces', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#0a1633',
          900: '#101f45',
          800: '#1a2c5c',
        },
        champagne: {
          100: '#f7ecd4',
          200: '#f0dcae',
          300: '#e6c886',
          400: '#d9b166',
          500: '#c9a15a',
          600: '#a88344',
        },
      },
      letterSpacing: {
        widest2: '0.22em',
      },
    },
  },
  plugins: [],
};
