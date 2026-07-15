/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Palet baru: latar terang (paper) + teks nyaris hitam (ink)
        // + aksen gold terinspirasi hardware/eyelet sepatu kulit premium.
        paper: {
          DEFAULT: '#FFFFFF',
          soft: '#F6F4F1',
        },
        ink: {
          DEFAULT: '#14110F',
          soft: '#2A2622',
        },
        gold: {
          DEFAULT: '#A87C2E',
          soft: '#F1E4CC',
          dark: '#8A6423',
        },
      },
      fontFamily: {
        display: ['"Poppins"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: 0, transform: 'translateY(-12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease-out',
        slideDown: 'slideDown 0.3s ease-out',
        shake: 'shake 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
}
